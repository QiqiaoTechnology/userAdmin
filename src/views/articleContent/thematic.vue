<template>
  <div class="app-container">
    <div class="user-form">
      <el-form ref="queryParam" :inline="true" :model="queryParam">
        <el-col :span="6">
          <el-form-item label="所属标签" prop="articleLabelId">
            <el-select
              v-model="queryParam.articleLabelId"
              placeholder="请选择所属标签"
              filterable
              clearable
            >
              <el-option
                v-for="item in labelList"
                :key="item.articleLabelId"
                :label="item.articleLabelName"
                :value="item.articleLabelId"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-form-item label="文章标题" prop="articleTitle">
          <el-input v-model="queryParam.articleTitle" clearable placeholder="请输入文章标题" />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            plain
            size="mini"
            icon="el-icon-search"
            @click="getList"
          >查询</el-button>
          <el-button
            type="primary"
            plain
            size="mini"
            icon="el-icon-plus"
            @click="handleOpenForm"
          >新建</el-button>
          <el-button
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
      <!-- <el-table-column type="index" label="ID" width="38" /> -->
      <el-table-column
        label="文章类型"
        width="100px"
        prop="cate_id"
        :formatter="formatterName"
      />
      <el-table-column label="文章标签">
        <template slot-scope="scope">
          <div v-if="scope.row.articleLabelList.length>0">
            <el-tag v-for="(item,index) in scope.row.articleLabelList" :key="index" size="mini" class="labelItem" type="success" style="margin-right:10px">{{ item }}</el-tag></div>
          <div v-else>空</div>
        </template>
      </el-table-column>
      <el-table-column label="内容标题">
        <template slot-scope="scope">
          <span>{{ scope.row.articleTitle }}</span>
        </template>
      </el-table-column>
      <el-table-column label="文章描述">
        <template slot-scope="scope">
          <span>{{ scope.row.articleDescription }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="作者" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.articleAuthor }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="发布时间" align="center" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
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
            style="color: #38ce3c"
            @click="handleDetails(scope.row)"
          >
            查看
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
  </div>
</template>

<script>
// import { Yearformat } from '@/utils/index'
// 当前使用接口 其他待删

import {
  getArticleList,
  getLabelSelect,
  deleteByArticleIdList,
  deleteArticleByid
} from '@/api/website.js'

import Pagination from '@/components/Pagination'
export default {
  components: { Pagination },
  data() {
    return {
      // 集合
      dialogVisible: false,
      list: [],
      idVal: '',
      columnType: '',
      selectParams: [],
      labelList: [],
      total: 0,
      listLoading: true,
      queryParam: {
        page: 1,
        size: 10,
        articleType: 1,
        articleTitle: '',
        articleLabelId: ''
      }
    }
  },
  created() {
    this.getLabelList()
    this.getList() // 账户数据方法初始化
  },
  methods: {
    handleSelectionChange(val) {
      this.idVal = []
      this.selectParams = val
      val.forEach((infoval) => {
        this.idVal.push(infoval.articleId)
      })
    },
    formatterName(row) {
      return row.articleType === 1 ? '文章列表' : '图文列表'
    },
    // 获取列表
    getList() {
      this.listLoading = true
      if (this.queryParam.articleTitle === '') {
        this.queryParam.articleTitle = null
      }
      getArticleList(this.queryParam).then((response) => {
        this.list = response.data.content
        this.total = response.data.total
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 1000)
      })
    },
    getLabelList() {
      getLabelSelect().then((response) => {
        this.labelList = response.data
      })
    },
    handleDetails(data) {
      this.$router.push({
        path: '/viewThematic',
        query: data
      })
    },

    handleOpenForm() {
      const obj = {}
      obj.editFlag = false
      this.$router.push({
        path: '/addCutForm',
        query: obj
      })
      // }
    },
    // 编辑表单 打开
    handleEditView(data) {
      data.editFlag = true
      this.$router.push({
        path: '/editCutForm',
        query: data
      })
    },
    // 删除
    handleDelete(data) {
      const _that = this
      if (data === 'all') {
        if (_that.selectParams.length > 1) {
          _that
            .$confirm('此操作将批量删除选中文章, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            })
            .then(() => {
              const obj = { articleIdList: _that.idVal }
              deleteByArticleIdList(obj).then((response) => {
                _that.$message({
                  type: 'success',
                  message: '成功删除该文章'
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
        } else if (_that.selectParams.length === 1) {
          _that
            .$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            })
            .then(() => {
              deleteArticleByid(_that.selectParams[0].articleId).then(
                (response) => {
                  _that.$message({
                    type: 'success',
                    message: '成功删除该文章'
                  })
                  _that.getList()
                }
              )
            })
            .catch(() => {
              _that.$message({
                type: 'info',
                message: '已取消删除'
              })
            })
        } else {
          _that.$message({
            type: 'info',
            message: '请选择需要删除的文章'
          })
        }
      } else {
        _that
          .$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(() => {
            deleteArticleByid(data.articleId).then((response) => {
              _that.$message({
                type: 'success',
                message: '成功删除该文章'
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
}
</script>

