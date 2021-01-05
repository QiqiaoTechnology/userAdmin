<template>
  <div class="app-container">
    <div class="btnlist">

      <el-date-picker
        v-model="queryParam.startTime"
        align="right"
        type="date"
        placeholder="选择日期"
        format="yyyy/MM/dd HH:mm:ss"
        value-format="yyyy/MM/dd HH:mm:ss"
        :picker-options="pickerOptions"
      />
      <el-select v-model="queryParam.openid" filterable placeholder="请选择粉丝" clearable style="margin-left:10px">
        <el-option
          v-for="item in fansList"
          :key="item.openid"
          :label="item.nickname"
          :value="item.openid"
        />
      </el-select>
      <el-button
        type="primary"
        plain
        size="mini"
        icon="el-icon-search"
        style="margin-left:10px"
        @click="getList"
      >查询</el-button>
      <el-button
        v-if="selectList.length>0"
        type="danger"
        plain
        size="mini"
        icon="el-icon-delete"
        @click="handleDelete('all')"
      >批量删除</el-button>
    </div>
    <div style="font-size: 12px;color: #e64242; margin-bottom: 10px;"><i class="el-icon-warning" /> 全部消息(消息保存5天，多媒体消息3天后无法查看),且回复时间不能超过24小时</div>
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >

      <el-table-column type="selection" label="ID" width="58" />
      <el-table-column label="粉丝头像" width="85">
        <template slot-scope="scope">
          <div>
            <el-image style="width: 50px; height: 50px" :src="scope.row.headImgurl" fit="fill" />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="80">
        <template slot-scope="scope">
          <el-tooltip v-if="scope.row.inOut===0" class="item" effect="dark" content="来自用户的信息" placement="top">
            <el-tag type="success">接收</el-tag>
          </el-tooltip>
          <el-tooltip v-else class="item" effect="dark" content="公众号回复的信息" placement="top">
            <el-tag type="warning">回复</el-tag>
          </el-tooltip>

        </template>
      </el-table-column>
      <el-table-column label="粉丝用户名">
        <template slot-scope="scope">
          <span>{{ scope.row.nickName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="粉丝状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isBlacklist===0" type="success">正常</el-tag>
          <el-tag v-else type="danger">已拉黑</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="消息内容">
        <template slot-scope="scope">
          <span>{{ scope.row.detail.content }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发送时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-if="scope.row.inOut===0" size="mini" type="warning" @click="replyMsg(scope.row)">
            回复
          </el-button>
          <el-button v-if="scope.row.inOut===0" size="mini" type="info" @click="getMsgHistory(scope.row)">
            消息记录
          </el-button>
          <el-button v-if="scope.row.inOut===0" size="mini" type="danger" @click="handleDelete(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParam.currPage"
      :limit.sync="queryParam.pageSize"
      @pagination="getList"
    />
    <!-- 添加表单 -->
    <el-dialog
      :show-close="false"
      :close-on-click-modal="false"
      title="回复内容"
      width="650px"
      :visible.sync="dialoglabelFormVisible"
    >
      <el-form
        ref="msgForm"
        :model="msgForm"
        :rules="rules"
        label-width="0px"
      >
        <el-form-item prop="replyContent">
          <el-input
            v-model.trim="msgForm.replyContent"
            type="textarea"
            maxlength="200"
            show-word-limit
            :autosize="{ minRows: 6, maxRows: 12}"
            placeholder="请输入回复内容"
            autocomplete="off"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelForm('msgForm')">取 消</el-button>
        <el-button
          type="primary"
          @click="handleSubmit('msgForm')"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 当前使用接口 其他待删
import {
  getMsgList,
  replyMsg,
  deleteMsg,
  getFansList
} from '@/api/wechat.js'
import Pagination from '@/components/Pagination'
export default {
  components: { Pagination },
  data() {
    return {
      // 集合
      list: [],
      headeUrl: '',
      watchName: '',
      selectList: [],
      total: 0,
      fansList: [],
      listLoading: true,
      queryParam: {
        msgTypes: 'text',
        pageSize: 8, // 不传也行
        currPage: 1, // 不传也行
        startTime: '',
        openid: ''
      },
      dialoglabelFormVisible: false,
      msgForm: {
        openid: '',
        replyContent: '',
        replyType: 'text'
      },
      rules: {
        replyContent: {
          required: true,
          message: '请输入回复内容',
          trigger: 'blur'
        }
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      }
    }
  },
  created() {
    this.getList() // 账户数据方法初始化
    this.getFansList()
  },
  methods: {
    handleSelectionChange(val) {
      this.selectList = []
      val.forEach((infoval) => {
        this.selectList.push(infoval.id)
      })
    },
    getMsgHistory(data) {
      this.$router.push({
        path: '/weChatService/msghistory',
        query: data
      })
    },
    replyMsg(data) {
      this.dialoglabelFormVisible = true
      this.msgForm.openid = data.openid
    },
    getFansList() {
      getFansList().then(response => {
        this.fansList = response.page.list
      })
    },
    cancelForm(msgForm) {
      this.$refs[msgForm].resetFields()
      this.dialoglabelFormVisible = false
    },

    // 获取列表
    getList() {
      this.listLoading = true
      if (this.queryParam.startTime === '') {
        this.queryParam.startTime = null
      }
      getMsgList(this.queryParam).then((response) => {
        if (response.page) {
          this.list = response.page.list
          this.total = response.page.totalCount
        } else {
          this.list = response.page
          this.total = 0
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.9 * 1000)
      })
    },
    handleSubmit(msgForm) {
      const that = this
      this.$refs[msgForm].validate((valid) => {
        if (valid) {
          replyMsg(this.msgForm).then((res) => {
            that.$message.success('回复成功')
            that.$refs[msgForm].resetFields()
            that.dialoglabelFormVisible = false
            that.getList()
          })
        } else {
          return false
        }
      })
    },
    handleDelete(data) {
      debugger
      const _that = this
      _that
        .$confirm('此操作将永久删除此消息记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          let obj = []
          if (data === 'all') {
            obj = this.selectList
          } else {
            const datalist = []
            datalist.push(data.id)
            obj = datalist
          }
          deleteMsg(obj).then((response) => {
            _that.$message({
              type: 'success',
              message: '成功删除该消息记录'
            })
            _that.getList()
          })
        })
        .catch(() => {
          _that.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>

