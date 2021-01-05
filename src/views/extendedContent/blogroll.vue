<template>
  <div class="app-container">
    <div class="user-form">
      <el-form ref="queryParam" :inline="true" :model="queryParam">
        <el-form-item>
          <el-button
            type="primary"
            size="mini"
            plain
            @click="handleOpenForm"
          >新建</el-button>
          <el-button
            v-if="selectParams.length > 0"
            type="primary"
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
      <el-table-column type="index" label="ID" width="38" align="center" />
      <el-table-column label="关联公司名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="链接地址" width="400" align="center">
        <template slot="header">
          链接地址
          <el-tooltip
            class="item"
            effect="dark"
            content="点击链接即可复制该链接地址"
            placement="top"
          >
            <i class="el-icon-info" />
          </el-tooltip>
        </template>
        <template slot-scope="scope">
          <el-button type="text" @click="handleCopy(scope.row, $event)">{{
            scope.row.redirectUrl
          }}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="发布时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template></el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="200"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            style="color: #38ce3c"
            @click="handleDetails(scope.row)"
          >
            详情
          </el-button>
          <el-button
            type="text"
            style="color: #23b3ff"
            @click="handleEditView(scope.row)"
          >
            修改
          </el-button>
          <el-button
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
    <el-dialog
      :show-close="false"
      :close-on-click-modal="false"
      title="友链详情"
      width="500px"
      :visible.sync="dialogViewFormDetailsVisible"
    >
      <el-form ref="form" label-width="150px">
        <el-form-item label="关联公司">
          {{ voiceView.title }}
        </el-form-item>
        <el-form-item label="公司链接">
          {{ voiceView.redirectUrl }}
        </el-form-item>
        <el-form-item label="创建时间">
          {{ voiceView.createTime }}
        </el-form-item>
        <el-form-item label="修改时间">
          {{ voiceView.updateTime }}
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="dialogViewFormDetailsVisible = false"
        >取 消</el-button>
      </div>
    </el-dialog>
    <!-- 添加表单 -->
    <el-dialog
      :show-close="false"
      :close-on-click-modal="false"
      :title="editFlag === true ? '编辑友链信息' : '新增友链信息'"
      width="40%"
      :visible.sync="dialogaddFormVisible"
    >
      <el-form
        ref="addForm"
        :model="addForm"
        :rules="rules"
        label-width="150px"
      >
        <el-form-item label="关联公司名称" prop="title">
          <el-input
            v-model.trim="addForm.title"
            placeholder="请输入关联公司名称"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="链接地址" prop="redirectUrl">
          <el-input
            v-model.trim="addForm.redirectUrl"
            placeholder="请输入链接地址"
            autocomplete="off"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelForm('addForm')">取 消</el-button>
        <el-button
          v-if="!editFlag"
          type="primary"
          @click="handleSubmit('addForm')"
        >确 定</el-button>
        <el-button
          v-else
          type="primary"
          @click="handleSubmit('addForm')"
        >确定修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { Yearformat } from '@/utils/index'
import clip from '@/utils/clipboard' // 复制工具
import {
  getBasicColumnList,
  getBasicColumnInfo,
  setBasicColumnInfo,
  deleteBasicColumn,
  editBasicColumnInfo
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
      voiceView: {},
      addForm: { title: '', redirectUrl: '', friendshipLinkId: null },
      dialogViewFormDetailsVisible: false,
      dialogaddFormVisible: false,
      rules: {
        title: {
          required: true,
          message: '请输入关联公司名！!',
          trigger: 'blur'
        },
        redirectUrl: {
          required: true,
          message: '请输入链接名！!',
          trigger: 'blur'
        }
      }
    }
  },
  created() {
    this.getList() // 账户数据方法初始化
  },
  methods: {
    handleSelectionChange(val) {
      this.selectParams = val
    },
    getCountsInfo(id) {
      getBasicColumnInfo(id).then((res) => {
        this.addForm = res.data
        this.addForm.friendshipLinkId = id
      })
    },
    // 获取列表
    getList() {
      this.listLoading = true
      getBasicColumnList(this.queryParam).then((response) => {
        this.list = response.data.content
        this.total = response.data.total
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 1000)
      })
    },
    // 新增表单
    handleOpenForm() {
      this.dialogaddFormVisible = true
      this.editFlag = false
    },
    // 查看账户详情
    handleDetails(data) {
      this.dialogViewFormDetailsVisible = true
      this.voiceView = data
    },

    // 编辑表单 打开
    handleEditView(data) {
      this.dialogaddFormVisible = true
      this.editFlag = true

      this.getCountsInfo(data.friendshipLinkId)
    },

    // 删除
    handleDelete(data) {
      const _that = this
      _that
        .$confirm('此操作将永久删除该友链, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          let obj = {}
          if (data === 'all') {
            obj = {
              friendshipLinkIdList: this.selectParams
            }
          } else {
            const datalist = []
            datalist.push(data.friendshipLinkId)
            obj = {
              friendshipLinkIdList: datalist
            }
          }
          deleteBasicColumn(obj).then((res) => {
            _that.$message({
              type: 'success',
              message: '已删除'
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
    handleCopy(text, event) {
      const val = text.redirectUrl
      const info = text.title + '的链接地址'
      clip(val, info, event)
    },
    cancelForm(addForm) {
      this.$refs[addForm].resetFields()
      this.dialogaddFormVisible = false
    },
    handleSubmit(addForm) {
      const that = this
      this.$refs[addForm].validate((valid) => {
        if (valid) {
          if (that.editFlag) {
            editBasicColumnInfo(this.addForm).then((res) => {
              that.$message.success('友链修改成功')
              that.$refs[addForm].resetFields()
              this.dialogaddFormVisible = false
              that.getList()
            })
          } else {
            setBasicColumnInfo(this.addForm).then((res) => {
              that.$message.success('友链新增成功')
              that.$refs[addForm].resetFields()
              this.dialogaddFormVisible = false
              that.getList()
            })
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>

