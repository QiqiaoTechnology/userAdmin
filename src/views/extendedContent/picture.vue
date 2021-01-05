<template>
  <div class="app-container minitab">
    <div class="btnlist">
      <el-button
        type="primary"
        size="mini"
        plain
        @click="dialogaddFormVisible=true"
      >新建轮播集合</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      style="width: 100%"
    >
      <el-table-column
        label="轮播图集合名称"
        align="center"
        width="200"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.bannerName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="发布时间"
        align="center"
        width="200"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="轮播图片"
        align="center"
      >
        <template slot-scope="scope">
          <div
            v-for="(item, index) in scope.row.bannerDetailList"
            :key="index"
            class="center-image"
          >
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              circle
              class="bannerBtn"
              @click="deleteBannerItem(item)"
            />
            <el-image
              style="width:100px;height:100px"
              :src="item.attachmentUrl"
              fit="contain"
            />
          </div>
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
      title="新增轮播图集合"
      width="40%"
      :visible.sync="dialogaddFormVisible"
    >
      <el-form
        ref="addForm"
        :model="addForm"
        :rules="rules"
        label-width="150px"
      >
        <el-form-item label="轮播图集合名称" prop="title">
          <el-input
            v-model.trim="addForm.title"
            placeholder="请输入轮播图集合名称"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input
            v-model.trim="addForm.remarks"
            placeholder="备注"
            autocomplete="off"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelForm('addForm')">取 消</el-button>
        <el-button
          type="primary"
          @click="handleOpenForm('addForm')"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 当前使用接口 其他待删
import {
  deleteBanner,
  getBannerList,
  deleteBannerItem
} from '@/api/website.js'
import Pagination from '@/components/Pagination'
export default {
  components: { Pagination },
  data() {
    return {
      // 集合
      list: [],
      total: 0,
      dialogaddFormVisible: false,
      listLoading: true,
      queryParam: {
        page: 1,
        size: 10
      },
      addForm: {
        title: '',
        remarks: ''
      },
      rules: {
        title: { required: true, message: '请输入轮播图集合名称', trigger: 'blur' },
        remarks: { required: true, message: '请输入备注', trigger: 'blur' }
      }
    }
  },
  created() {
    this.getList() // 账户数据方法初始化
  },
  methods: {
    cancelForm(addForm) {
      this.$refs[addForm].resetFields()
      this.dialogaddFormVisible = false
    },
    // 获取列表
    getList() {
      this.listLoading = true
      getBannerList(this.queryParam).then(response => {
        this.list = response.data
        // this.total = response.data.total
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 1000)
      })
    },
    // 新增表单
    handleOpenForm(addForm) {
      this.$refs[addForm].validate(valid => {
        if (valid) {
          this.$router.push({
            path: '/pictureAdd',
            query: this.addForm
          })
        } else {
          return false
        }
      })
    },
    // 查看账户详情
    handleDetails(data) {
      this.$router.push({
        path: '/pictureView',
        query: data
      })
    },

    // 编辑表单 打开
    handleEditView(data) {
      this.$router.push({
        path: '/pictureEdit',
        query: data
      })
    },
    // 删除
    handleDelete(data) {
      const _that = this
      _that
        .$confirm('此操作将永久删除该轮播图, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          const obj = []
          obj.push(data.bannerId)
          const dataval = {
            bannerIdList: obj
          }
          deleteBanner(dataval).then(res => {
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
    deleteBannerItem(data) {
      const _that = this
      _that
        .$confirm('此操作将永久删除该轮播图下图片素材, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          deleteBannerItem(data.bannerDetailId).then(res => {
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
    }
  }
}
</script>
<style lang="scss" scopde>

.minitab{
.center-image {
  float: left;
  margin: 15px 10px 15px 0;
  position: relative;
  background-color: #ccc;
}
.el-table__expanded-cell[class*="cell"] {
  padding: 0px;
}

.el-table td {
  padding: 0px;
}
.bannerBtn {
  position: absolute;
  z-index: 999;
  right: -10px;
  top: -10px;
}
}

</style>
