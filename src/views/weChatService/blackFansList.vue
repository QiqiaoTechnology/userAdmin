
<template>
  <div class="app-container">
    <div class="btnlist">
      <el-button
        v-if="selectList.length>0"
        type="success"
        plain
        size="mini"
        icon="el-icon-delete"
        @click="DeblackFans('all')"
      >批量解除拉黑粉丝</el-button>
      <el-button
        plain
        size="mini"
        @click="upList()"
      >同步粉丝到数据库</el-button>
      <el-button
        plain
        size="mini"
        @click="upblackList()"
      >同步黑名单到数据库</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="fansList"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        align="center"
        width="50"
      />
      <el-table-column label="粉丝头像" width="80">
        <template slot-scope="scope">
          <el-image
            style="width: 50px; height: 50px"
            :src="scope.row.headimgurl"
            :preview-src-list="srcList"
          />
        </template>
      </el-table-column>
      <el-table-column label="粉丝昵称">
        <template slot-scope="scope">
          <span>{{ scope.row.nickname }}</span>
        </template>
      </el-table-column>

      <el-table-column label="粉丝所在地">
        <template slot-scope="scope">
          <span>{{ scope.row.province }}  {{ scope.row.city }}</span>
        </template>
      </el-table-column>
      <el-table-column label="粉丝性别">
        <template slot-scope="scope">
          <span>{{ scope.row.sex===2?'女生':scope.row.sex===1?'男生':'未知' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="粉丝状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isBlacklist===0" type="success">正常</el-tag>
          <el-tag v-else type="danger">已拉黑</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="粉丝标签">
        <template slot-scope="scope">
          <div v-if="scope.row.tagidList.length>0">
            <el-tag v-for="(item,index) in scope.row.tagidList" :key="index" size="mini" class="labelItem" type="success" style="margin-right:10px">{{ format(item) }}</el-tag></div>
          <div v-else>空</div>
        </template>
      </el-table-column>
      <el-table-column label="关注时间">
        <template slot-scope="scope">
          <span>{{ scope.row.subscribeTime }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="info" @click="getMsgHistory(scope.row)">
            消息记录
          </el-button>
          <el-button size="mini" type="warning" @click="DeblackFans(scope.row)">
            放出黑名单
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-footer>
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="queryParam.currPage"
        :limit.sync="queryParam.pageSize"
        @pagination="getList"
      />
    </el-footer>
  </div>
</template>

<script>

import {
  getBlackFansList,
  upFansList,
  getFansLableList,
  syncBlacklist,
  pullFromBlacklist
} from '@/api/wechat'
import Pagination from '@/components/Pagination'
import { getAppID } from '@/utils/auth'
export default {
  components: { Pagination },

  data() {
    return {

      total: 0,
      replyContent: '',
      labList: [],
      selectList: [],
      zhLabList: [],
      fansList: [],
      srcList: [],
      listLoading: true,
      replyForm: {
        openid: '',
        replyContent: '',
        replyType: 'text'
      },
      queryParam: {
        appid: '',
        pageSize: 10,
        currPage: 1
      }
    }
  },
  created() {
    this.getFansLableList()
    this.getList()
  },
  methods: {
    upList() {
      upFansList().then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '同步成功'
          })
        }
      })
    },
    upblackList() {
      syncBlacklist().then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '同步成功'
          })
        }
      })
    },
    DeblackFans(data) {
      const _that = this
      _that
        .$confirm('此操作将解除选中黑名单粉丝用户, 是否继续?', '提示', {
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
            datalist.push(data.openid)
            obj = datalist
          }
          pullFromBlacklist(obj).then((response) => {
            _that.$message({
              type: 'success',
              message: '成功解除拉黑该粉丝用户'
            })
            _that.getList()
          })
        })
        .catch(() => {
          _that.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
    },
    getMsgHistory(data) {
      this.$router.push({
        path: '/weChatService/msghistory',
        query: data
      })
    },
    format(item) {
      let zhLab = ''
      this.labList.forEach(x => {
        if (x.id === item) {
          zhLab = x.name
        }
      })
      return zhLab
    },

    handleSelectionChange(val) {
      this.selectList = []
      val.forEach((infoval) => {
        this.selectList.push(infoval.openid)
      })
    },

    getFansLableList() {
      getFansLableList().then(res => {
        this.labList = res.list
      })
    },
    getList() {
      this.listLoading = true
      this.queryParam.appid = getAppID()
      getBlackFansList(this.queryParam).then(response => {
        this.fansList = response.page.list
        this.total = response.page.totalCount
        if (this.fansList.length > 0) {
          this.srcList = this.fansList.map(x => x.headimgurl)
        }
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 1000)
      })
    }

  }
}
</script>
