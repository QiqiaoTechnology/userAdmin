<template>
  <div class="app-container">
    <!-- <div class="user-form">
      <el-form>
        <el-form-item>
          <el-button
            type="primary"
            plain
            size="mini"
            icon="el-icon-plus"
            @click="handleOpenForm('columnEditForm')"
          >新建</el-button>
        </el-form-item>
      </el-form>
    </div> -->
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      row-key="websiteElementId"
      default-expand-all
      :tree-props="{children: 'children'}"
      style="width:100%;"
    >
      <el-table-column label="页面名称">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="70px" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isDeleted"
            :active-value="0"
            :inactive-value="1"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="isActive(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="text" @click="editTitle(scope.row)">
            修改标题
          </el-button>
          <el-button type="text" style="color:#23B3FF" @click="handleView(scope.row)">
            预览页面
          </el-button>
          <el-button type="text" style="color:#e6a23c" @click="handleEdit(scope.row)">
            去填充
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :show-close="false"
      :close-on-click-modal="false"
      title="修改名称"
      width="40%"
      :visible.sync="dialogaddFormVisible"
    >
      <el-form
        ref="addForm"
        :model="addForm"
        :rules="rules"
        label-width="150px"
      >
        <el-form-item label="模块名称" prop="title">
          <el-input
            v-model.trim="addForm.title"
            placeholder="请输入模块名称"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item v-if="parentElementId!==0" label="模块副标题" prop="subtitle">
          <el-input
            v-model.trim="addForm.subtitle"
            placeholder="请输入模块副标题"
            autocomplete="off"
          />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelForm('addForm')">取 消</el-button>
        <el-button
          type="primary"
          @click="handleSubmit('addForm')"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getTreeForManagement,
  updateModuleTitle,
  updateIsDeleted
} from '@/api/tempApi.js'
import { mapGetters } from 'vuex'
export default {

  data() {
    return {
      // 集合
      list: [],
      parentElementId: -1,
      dialogaddFormVisible: false,
      listLoading: true,
      addForm: { websiteElementId: '', title: '', subtitle: null },
      rules: {
        title: { required: true, message: '请输入模块名称!', trigger: 'blur' },
        subtitle: { required: true, message: '请输入模块副标题!', trigger: 'blur' }
      }
    }
  },
  computed: {
    ...mapGetters(['temp'])

  },
  created() {
    // this.getLabelList()
    this.getList() // 账户数据方法初始化
  },
  methods: {
    handleSubmit(addForm) {
      const that = this
      this.$refs[addForm].validate((valid) => {
        if (valid) {
          updateModuleTitle(this.addForm).then((res) => {
            that.$message.success('修改成功')
            that.$refs[addForm].resetFields()
            this.dialogaddFormVisible = false
            that.getList()
          })
        } else {
          return false
        }
      })
    },
    cancelForm(addForm) {
      this.$refs[addForm].resetFields()
      this.dialogaddFormVisible = false
    },
    editTitle(data) {
      this.parentElementId = data.parentElementId
      if (this.parentElementId !== 0) {
        this.addForm.subtitle = data.subtitle
      }
      this.addForm.title = data.title
      this.addForm.websiteElementId = data.websiteElementId
      this.dialogaddFormVisible = true
    },
    // // 获取列表
    getList() {
      this.listLoading = true
      getTreeForManagement(this.temp).then(response => {
        this.list = response.data
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 1000)
      })
    },

    // 是否激活
    isActive(rowData) {
      const name = rowData.title

      updateIsDeleted(rowData.websiteElementId).then(response => {
        if (rowData.isDeleted) {
          this.$message({
            type: 'success',
            message: name + '模块已关闭'
          })
        } else {
          this.$message({
            type: 'success',
            message: name + '模块已激活'
          })
        }
        this.getList()
      }).catch(() => {
        this.getList()
      })
    },
    handleView() {
      window.open('http://81.69.18.147', '_blank')
    },
    handleEdit(data) {
      if (this.temp === 1) {
        const routerJump = this.$router.resolve({ path: '/template_1/menu' })
        window.open(routerJump.href, '_blank')
      } else if (this.temp === 2) {
        const routerJump = this.$router.resolve({ path: '/template_2/menu' })
        window.open(routerJump.href, '_blank')
      } else if (this.temp === 3) {
        const routerJump = this.$router.resolve({ path: '/template_3/menu' })
        window.open(routerJump.href, '_blank')
      }
    }
  }
}
</script>

<style lang="scss" scoped>

  .avatar-uploader-icon {
     font-size: 14px;
    color: #8c939d;
    width: 600px;
    height: 250px;
    line-height:250px;
    text-align: center;
    border: solid 1px;
  }
  .avatar {
      width: 100%;
    height: 250px;
    display: block;
  }

</style>
