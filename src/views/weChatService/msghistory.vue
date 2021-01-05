<template>
  <div class="app-container">
    <!-- 基本信息 -->
    <el-card class="box-card">

      <div v-loading="loading" class="user-message">
        <div class="msgList">
          <div style="margin-right: 28px">
            <el-image :src="headImgurl" />
          </div>
          <div>
            <div style="height: 28px; line-height: 28px">
              粉丝昵称: {{ DetailForm.nickname || "无" }}
            </div>
            <div style="height: 28px; line-height: 28px">
              粉丝地址: {{ DetailForm.province + DetailForm.city || "无" }}
            </div>
            <div style="height: 28px; line-height: 28px">
              粉丝性别: {{ DetailForm.sex===2?'女生':DetailForm.sex===1?'男生':'未知' }}
            </div>
            <div style="height: 28px; line-height: 28px">
              粉丝状态: {{ DetailForm.isBlacklist===1?'已拉黑':DetailForm.isBlacklist===0?'正常':'未知' }}
            </div>
            <div style="height: 28px; line-height: 28px;display: flex;">
              粉丝标签: <div v-if="DetailForm.tagidList.length>0" style="margin:auto">
                <el-tag v-for="(item,index) in DetailForm.tagidList" :key="index" size="mini" class="labelItem" type="success" style="margin-right:10px">{{ format(item) }}</el-tag></div>
              <div v-else style="margin:auto">空</div>
            </div>
          </div>
        </div>
        <el-divider v-if="list.length>0" content-position="left">聊天记录</el-divider>
        <div v-for="(item, index) in list" :key="index" class="msgList">
          <div v-if="item.inOut === 0" class="msgleft">
            <img :src="headImgurl" class="msgImg">
            <div>
              <div class="msgItem">{{ item.detail.content }}</div>
              <div class="msgSmall">{{ item.createTime }}</div>
            </div>
          </div>
          <div v-else class="magright">
            <div class="msgItem">{{ item.detail.content }}</div>
            <div class="msgSmall">{{ item.createTime }}</div>
          </div>
        </div>
        <pagination
          v-show="total > 0"
          style="text-align: center"
          :total="total"
          :page.sync="queryParam.currPage"
          :limit.sync="queryParam.pageSize"
          @pagination="getList"
        />
        <el-divider v-if="list.length>0" content-position="left">回复内容</el-divider>
        <div v-if="list.length>0">
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
          <el-button
            type="primary"
            style="width: 100%;"
            @click="handleSubmit('msgForm')"
          >确 定</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import { getMsgList, getFansInfo, getFansLableList, replyMsg } from '@/api/wechat.js'
import Pagination from '@/components/Pagination'
export default {
  components: { Pagination },
  data() {
    return {
      total: 0,
      loading: true,
      dialogVisible: false,
      columnName: '',
      DetailForm: {
        tagidList: []
      },
      msgForm: {
        openid: '',
        replyContent: '',
        replyType: 'text'
      },
      labList: [],
      list: [],
      queryParam: {
        msgTypes: 'text',
        openid: '',
        pageSize: 20, // 不传也行
        currPage: 1 // 不传也行
      },
      rules: {
        replyContent: {
          required: true,
          message: '请输入回复内容',
          trigger: 'blur'
        }
      }
    }
  },
  created() {
    // 从父页面接收数据并赋值
    const queryParam = this.$route.query
    if (queryParam.openid) {
      this.queryParam.openid = queryParam.openid
      this.msgForm.openid = queryParam.openid

      if (queryParam.headimgurl) {
        this.headImgurl = queryParam.headimgurl
      } else {
        this.headImgurl = queryParam.headImgurl
      }
      this.getList()
      this.getFansLableList()
      this.getFansInfo()
    }
    this.loading = false
  },

  methods: {
    handleSubmit(msgForm) {
      const that = this
      this.$refs[msgForm].validate((valid) => {
        if (valid) {
          replyMsg(this.msgForm).then((res) => {
            that.$message.success('回复成功')
            that.$refs[msgForm].resetFields()
            that.getList()
          })
        } else {
          return false
        }
      })
    },
    getFansLableList() {
      getFansLableList().then(res => {
        this.labList = res.list
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
    getFansInfo() {
      getFansInfo(this.queryParam.openid).then((res) => {
        this.DetailForm = res.wxUser
      })
    },
    getList() {
      this.listLoading = true
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
    }
    // getArticleInfo(vid) {
    //   getArticleInfo(vid).then((res) => {
    //     this.DetailForm = res.data
    //   })
    // }
  }
}
</script>

<style scoped lang='scss'>
/* userinfo */
.msgList {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 28px;
  .msgSmall {
    font-size: 10px;
    color: #909399;
    margin-left: 5px;
    position: absolute;
    width: 200px;
    text-align: left;
    margin-top: 5px;
  }
}
.msgItem {
  padding: 10px 28px;
  background: #ebfaec;
  border-radius: 7px;
  max-width: 100%;
  color: #217924;
  font-size: 13px;
   position: relative
}
.msgImg{
        width: 50px;
    height: 50px;
    margin: 0px 10px;
}
.msgleft {
        display: flex;
.msgItem::before{
  content: "";
  position: absolute;
  top: 7px;
    left: -18px;
  border: 10px solid transparent;
  border-right-color: #ebfaec;
}
}

.magright {
  position: relative;
  left: 100%;
  transform: translateX(-100%);
  .msgSmall {
    text-align: right;
    margin-right: 10px;
    right: 0px;
  }
  .msgItem::before{
    content: "";
    position: absolute;
    top: 8px;
    /* left: 76px; */
    border: 10px solid transparent;
    border-left-color: #ebfaec;
    right: -18px;
}

}

</style>

