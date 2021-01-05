<template>
  <div class="app-container">
    <div class="user-form">
      <el-form ref="queryParam" :inline="true" :model="queryParam">
        <el-form-item>
          <el-button
            type="primary"
            plain
            size="mini"
            icon="el-icon-plus"
            @click="handleOpenForm"
          >新建</el-button>
          <el-button
            v-if="selectParams.length>0"
            type="danger"
            plain
            size="mini"
            icon="el-icon-delete"
            @click="handleDelete('all')"
          >批量删除</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="50" align="center" />
      <el-table-column type="index" label="ID" width="38" />
      <el-table-column label="标签ID">
        <template slot-scope="scope">
          <span>{{ scope.row.articleLabelId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标签名称">
        <template slot-scope="scope">
          <span>{{ scope.row.articleLabelName }}</span>
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
            type="text"
            style="color: #23b3ff"
            @click="handleEditView(scope.row)"
          >
            修改
          </el-button>
          <el-button
            v-if="!scope.row.isdisable"
            type="text"
            style="color: #ff5050"
            @click="handleDelete(scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParam.page"
      :limit.sync="queryParam.size"
      @pagination="getList"
    />
    <!-- 添加表单 -->
    <el-dialog
      :show-close="false"
      :close-on-click-modal="false"
      :title="editFlag === true ? '编辑标签' : '新增标签'"
      width="650px"
      :visible.sync="dialoglabelFormVisible"
    >
      <el-form
        ref="labelForm"
        :model="labelForm"
        :rules="rules"
        label-width="120px"
      >
        <el-form-item label="标签名" prop="articleLabelName">
          <el-input
            v-model.trim="labelForm.articleLabelName"
            placeholder="请输入标签名"
            autocomplete="off"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelForm('labelForm')">取 消</el-button>
        <el-button
          v-if="!editFlag"
          type="primary"
          @click="handleSubmit('labelForm')"
        >确 定</el-button>
        <el-button
          v-else
          type="primary"
          @click="handleSubmit('labelForm')"
        >确定修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 当前使用接口 其他待删
import {
  getLabelList,
  addLabelInfo,
  editLabelInfo,
  getLabelInfo,
  deleteLabelList
} from '@/api/website.js'
import Pagination from '@/components/Pagination'
export default {
  components: { Pagination },
  data() {
    return {
      // 集合
      list: [],
      selectParams: [],
      total: 0,
      listLoading: true,
      queryParam: {
        page: 1,
        size: 10
      },
      editFlag: false,
      dialoglabelFormVisible: false,
      labelForm: {
        articleLabelName: ''
      },
      rules: {
        articleLabelName: {
          required: true,
          message: '请输入标签名',
          trigger: 'blur'
        }
      }
    }
  },
  created() {
    this.getList() // 账户数据方法初始化
  },
  methods: {
    cancelForm(labelForm) {
      this.$refs[labelForm].resetFields()
      this.dialoglabelFormVisible = false
    },
    handleSelectionChange(val) {
      this.selectParams = val
    },
    // 获取列表
    getList() {
      this.listLoading = true
      getLabelList(this.queryParam).then((response) => {
        this.list = response.data.content
        this.total = response.data.total
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 1000)
      })
    },
    handleSubmit(labelForm) {
      const that = this
      this.$refs[labelForm].validate((valid) => {
        if (valid) {
          if (that.editFlag) {
            editLabelInfo(this.labelForm).then((res) => {
              that.$message.success('标签修改成功')

              that.$refs[labelForm].resetFields()
              that.dialoglabelFormVisible = false
              that.getList()
            })
          } else {
            addLabelInfo(this.labelForm).then((res) => {
              that.$message.success('标签添加成功')

              that.$refs[labelForm].resetFields()
              that.dialoglabelFormVisible = false
              that.getList()
            })
          }
        } else {
          return false
        }
      })
    },
    // 新增表单
    handleOpenForm() {
      this.editFlag = false
      this.dialoglabelFormVisible = true
    },
    // 编辑表单 打开
    handleEditView(data) {
      const that = this
      that.editFlag = true
      getLabelInfo(data.articleLabelId).then((res) => {
        that.labelForm = res.data
        that.dialoglabelFormVisible = true
      })
    },
    handleDelete(data) {
      const _that = this
      _that
        .$confirm('此操作将批量删除选中标签, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          let obj = {}
          if (data === 'all') {
            obj = {
              attachmentMaterialIdList: this.selectParams
            }
          } else {
            const datalist = []
            datalist.push(data.articleLabelId)
            obj = {
              attachmentMaterialIdList: datalist
            }
          }
          deleteLabelList(obj).then((response) => {
            _that.$message({
              type: 'success',
              message: '成功删除该标签'
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

