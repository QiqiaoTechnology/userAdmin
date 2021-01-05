
<template>
  <div class="app-container">
    <div class="tab-w">
      <div class="btnlist">
        <el-button size="mini" @click="addResMessage"><span class="el-icon-plus" />添加回复规则</el-button>
        <el-button
          v-if="selectList.length>0"
          type="danger"
          plain
          size="mini"
          icon="el-icon-delete"
          @click="handleDelete('all')"
        >批量删除</el-button>
      </div>
      <el-table
        v-loading="listLoading"
        :data="messageList"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
        @selection-change="handleSelectionChange"
      >

        <el-table-column type="selection" label="ID" width="58" />

        <el-table-column label="规则名">
          <template slot-scope="scope">
            <span>{{ scope.row.ruleName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否精确匹配">
          <template slot-scope="scope">
            <span>{{ scope.row.exactMatch?'是':'否' }}</span>
          </template>
        </el-table-column>

        <el-table-column label="关键词">
          <template slot-scope="scope">
            <span>{{ scope.row.matchValue }}</span>
          </template>
        </el-table-column>
        <el-table-column label="回复内容">
          <template slot-scope="scope">
            <span>{{ scope.row.replyContent }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="200"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="scope">

            <el-button
              size="mini"
              type="warning"
              @click="handleEditView(scope.row)"
            >
              修改
            </el-button>
            <el-button
              v-if="!scope.row.isdisable"
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog :title="editFlag===true?'编辑回复':'添加回复'" width="500px" :visible.sync="dialogAddFormVisible">
        <el-form
          ref="addForm"
          :model="addForm"
          :rules="rules"
          class="addForm"
          label-width="130px"
        >
          <el-form-item label="规则名称" prop="ruleName">
            <el-input v-model.trim="addForm.ruleName" placeholder="请输入规则名称" autocomplete="off" />
          </el-form-item>
          <el-form-item label="匹配关键词" prop="matchValue">
            <el-input v-model.trim="addForm.matchValue" placeholder="请输入匹配关键词" autocomplete="off" />
          </el-form-item>
          <el-form-item label="是否精准匹配" prop="exactMatch">
            <el-switch
              v-model="addForm.exactMatch"
              active-color="#13ce66"
              inactive-color="#ff4949"
            />
          </el-form-item>

          <el-form-item label="回复内容" prop="replyContent">
            <el-input v-model.trim="addForm.replyContent" placeholder="请输入回复内容" autocomplete="off" />
          </el-form-item>
          <el-form-item />
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelForm('addForm')">取 消</el-button>
          <el-button @click="submitForm('addForm')">确 定</el-button>
        </div>
      </el-dialog>

    </div>

  </div>
</template>

<script>

import {
  getResponseMessageList
  , setResponseMessages,
  upResponseMessages,
  deleteMsgRule
} from '@/api/wechat'

export default {
  data() {
    return {
      editFlag: false,
      dialogAddFormVisible: false,
      selectList: [],
      addForm: {
        ruleName: '',
        matchValue: '',
        replyContent: '',
        replyType: 'text',
        exactMatch: false // 是否精准匹配 默认否
      },
      messageList: [],
      listLoading: false,
      // 校验
      rules: {
        ruleName: [
          { required: true, message: '请输入规则名称', trigger: 'blur' }
        ],
        matchValue: [
          { required: true, message: '请输入匹配关键字', trigger: 'blur' }
        ],
        replyContent: [
          { required: true, message: '请输入回复内容', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleEditView(data) {
      this.editFlag = true
      this.addForm = data
      this.dialogAddFormVisible = true
    },
    handleDelete(data) {
      const _that = this
      _that
        .$confirm('此操作将删除选中规则, 是否继续?', '提示', {
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
            datalist.push(data.ruleId)
            obj = datalist
          }
          deleteMsgRule(obj).then((response) => {
            _that.$message({
              type: 'success',
              message: '成功删除该规则'
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
    },
    // 查询所有关键字回复集合
    getList() {
      getResponseMessageList().then(res => {
        this.messageList = res.page.list
      })
    },
    handleSelectionChange(val) {
      this.selectList = []
      val.forEach((infoval) => {
        this.selectList.push(infoval.ruleId)
      })
    },
    // 添加弹框
    addResMessage() {
      this.dialogAddFormVisible = true
    },
    // 关键词自动回复表单提交
    submitForm(addForm) {
      const that = this
      this.$refs[addForm].validate(valid => {
        if (valid) {
          if (that.editFlag) {
            upResponseMessages(that.addForm).then(res => {
              that.$message.success('回复规则修改成功')
              that.getList()
              that.$refs[addForm].resetFields()
              that.dialogAddFormVisible = false
            })
          } else {
            setResponseMessages(that.addForm).then(res => {
              that.$message.success('回复规则添加成功')
              that.getList()
              that.$refs[addForm].resetFields()
              that.dialogAddFormVisible = false
            })
          }
        } else {
          return false
        }
      })
    },
    // 取消
    cancelForm(addForm) {
      this.dialogAddFormVisible = false
      this.$refs[addForm].resetFields()
    }
  }
}
</script>

