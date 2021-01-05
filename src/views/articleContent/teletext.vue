<template>
  <div class="app-container">
    <div class="user-form">
      <el-form ref="queryParam" :inline="true" :model="queryParam">

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

        <el-form-item label="文章标题" prop="articleTitle">
          <el-input v-model="queryParam.articleTitle" clearable placeholder="请输入文章标题" />
        </el-form-item>
        <el-form-item
          label="操作时间"
          prop="startCreateTime"
        >
          <el-date-picker
            v-model="queryParam.startCreateTime"
            size="small"
            type="date"
            :picker-options="startTime"
            placeholder="选择开始日期"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </el-form-item>
        <el-form-item
          label="至"
          prop="endCreateTime"
        >
          <el-date-picker
            v-model="queryParam.endCreateTime"
            size="small"
            type="date"
            :picker-options="endTime"
            placeholder="选择结束时间"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
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
      <el-table-column type="selection" width="50" align="center" :selectable="checkBoxDisable" />
      <el-table-column label="缩略图" width="130" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 50px; height: 50px"
            :src="scope.row.coverAttachmentUrl"
            :preview-src-list="srcList"
          />
        </template>
      </el-table-column>
      <el-table-column label="文章标签">
        <template slot-scope="scope">
          <div v-if="scope.row.articleLabelList.length>0">
            <el-tag v-for="(item,index) in scope.row.articleLabelList" :key="index" size="mini" class="labelItem" type="success" style="margin-right:10px">{{ item }}</el-tag></div>
          <div v-else>空</div>
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="numberOfUse" :formatter="formatNumberOfUse" />
      <el-table-column label="内容标题">
        <template slot-scope="scope">
          <span>{{ scope.row.articleTitle }}</span>
        </template>
      </el-table-column>
      <el-table-column label="文章描述" width="450">
        <template slot-scope="scope">
          <span class="ov3" :title="scope.row.articleDescription">{{ scope.row.articleDescription }}</span>
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
        articleType: 2,
        articleTitle: '',
        articleLabelId: '',
        startCreateTime: '',
        endCreateTime: ''
      },
      srcList: [],
      // 开始时间校验
      startTime: {
        disabledDate: time => {
          return time.getTime() > Date.now()
        }
      },
      // 结束时间校验
      endTime: {
        disabledDate: time => {
          if (this.queryParam.startCreateTime) {
            return (
              time.getTime() < new Date(this.queryParam.startCreateTime).getTime()
            )
          } else {
            return time.getTime() > Date.now()
          }
        }
      }
    }
  },
  created() {
    this.getLabelList()
    this.getList() // 账户数据方法初始化
  },
  methods: {
    checkBoxDisable(row) {
      if (row.numberOfUse > 0) {
        return false
      } else {
        return true
      }
    },
    formatNumberOfUse(row, column) {
      if (row.numberOfUse > 0) {
        return '使用中'
      } else {
        return '未使用'
      }
    },
    handleSelectionChange(val) {
      this.idVal = []
      this.selectParams = val
      val.forEach((infoval) => {
        this.idVal.push(infoval.articleId)
      })
    },

    // 获取列表
    getList() {
      this.listLoading = true
      if (this.queryParam.articleTitle === '') {
        this.queryParam.articleTitle = null
      }
      getArticleList(this.queryParam).then((response) => {
        this.list = response.data.content
        this.srcList = response.data.content.map((x) => x.coverAttachmentUrl)
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
        path: '/addThematic',
        query: obj
      })
    },
    // 编辑表单 打开
    handleEditView(data) {
      data.editFlag = true
      this.$router.push({
        path: '/editThematic',
        query: data
      })
    },
    // 删除
    handleDelete(data) {
      const _that = this
      if (data === 'all') {
        if (_that.selectParams.length > 1) {
          _that
            .$confirm('此操作将批量删除选中素材, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            })
            .then(() => {
              const obj = { articleIdList: _that.idVal }
              deleteByArticleIdList(obj).then((response) => {
                _that.$message({
                  type: 'success',
                  message: '成功删除该图文素材'
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
            .$confirm('此操作将永久删除该图文素材, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            })
            .then(() => {
              deleteArticleByid(_that.selectParams[0].articleId).then(
                (response) => {
                  _that.$message({
                    type: 'success',
                    message: '成功删除该图文素材'
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
            message: '请选择需要删除的图文素材'
          })
        }
      } else {
        if (data.numberOfUse > 0) {
          _that.$message({
            type: 'info',
            message: '此文章正在使用中，无法删除'
          })
        } else {
          _that
            .$confirm('此操作将永久删除该图文素材, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            })
            .then(() => {
              deleteArticleByid(data.articleId).then((response) => {
                _that.$message({
                  type: 'success',
                  message: '成功删除该图文素材'
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
}
</script>
<style scopde lang='scss'>
.avatarimg {
  width: 50px;
  height: 50px;
}
.ov3{
	display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 3;
overflow: hidden;
}
.user-form{
  .el-form--inline .el-form-item {

    margin-bottom: 10px;

}
}
</style>
