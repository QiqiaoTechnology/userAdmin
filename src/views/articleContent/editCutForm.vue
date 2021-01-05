<template>
  <div class="app-container userview">
    <!-- 基本信息 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div>
          {{ viewtitle }}
        </div>
        <el-button
          type="primary"
          class="cardBtn"
          :disabled="btnload"
          @click="handleSubmit('editForm')"
        >立即提交</el-button>
      </div>
      <div class="user-message">
        <el-form
          ref="editForm"
          v-loading="listLoading"
          :model="editForm"
          :rules="rules"
          label-width="100px"
        >
          <div class="userInfo_main dpyflex">
            <div class="formContent">
              <el-form-item
                label="文章标签:"
                prop="articleLabelIdList"
                class="lg_select"
              >
                <el-select
                  v-model="editForm.articleLabelIdList"
                  filterable
                  multiple
                  placeholder="请选择文章标签"
                >
                  <el-option
                    v-for="item in labelData"
                    :key="item.articleLabelId"
                    :label="item.articleLabelName"
                    :value="item.articleLabelId"
                  />
                </el-select>
              </el-form-item>

              <el-form-item
                label="文章标题:"
                prop="articleTitle"
                class="lg_input"
              >
                <el-input
                  v-model.trim="editForm.articleTitle"
                  clearable
                  placeholder="请输入文章标题"
                  autocomplete="off"
                />
              </el-form-item>
              <el-form-item
                label="文章摘要:"
                prop="articleDescription"
                class="lg_input"
              >
                <el-input
                  v-model.trim="editForm.articleDescription"
                  clearable
                  placeholder="请输入文章摘要"
                  autocomplete="off"
                />
              </el-form-item>
              <el-form-item
                label="文章作者:"
                prop="articleAuthor"
                class="lg_input"
                style="margin-bottom: 0px"
              >
                <el-input
                  v-model.trim="editForm.articleAuthor"
                  clearable
                  placeholder="请输入文章作者"
                  autocomplete="off"
                />
              </el-form-item>
            </div>
          </div>
          <el-divider content-position="left">文章主体</el-divider>
          <div class="userInfo_main">
            <el-row :gutter="20">
              <el-col :span="24" class="el_col">
                <el-form-item
                  style="margin-left: -100px"
                  class="lg_tinymce"
                  prop="articleContent"
                >
                  <tinymce
                    ref="tinymceContent"
                    v-model="editForm.articleContent"
                    :height="heightval"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-form></div></el-card>
  </div>
</template>
<script>
import Tinymce from '@/components/Tinymce'
import {
  getLabelSelect,
  addArticleInfo,
  editArticleInfo,
  getArticleInfo
} from '@/api/website.js'
import { baseurl } from '@/utils/request'
export default {
  components: { Tinymce },
  data() {
    return {
      imgVal: '',
      imgUrl: '',
      dialogImgVisible: false,
      // 总数量
      total: 0,
      // 服务器地址
      baseurl: baseurl,
      // 是否显示弹框
      dialogVisible: false,
      // 弹框标题
      viewtitle: '新增文章',
      // 按钮加载中动画
      btnload: false,
      // 编辑器高度
      heightval: window.innerHeight / 2,
      // 表格加载动画
      listLoading: false,
      // 是否为编辑
      editFlag: false,
      // 修改文章id
      viewId: '',
      // 分类集合
      labelData: [],
      // 新增修改表单
      editForm: {
        articleType: 2,
        articleTitle: null,
        articleAuthor: null,
        articleDescription: null,
        articleContent: null,
        articleLabelIdList: null
      },
      // 校验规则
      rules: {
        articleTitle: {
          required: true,
          message: '请输入文章标题',
          trigger: 'blur'
        },
        articleAuthor: {
          required: true,
          message: '请输入文章作者',
          trigger: 'blur'
        },
        articleDescription: {
          required: true,
          message: '请输入文章摘要',
          trigger: 'blur'
        },
        articleContent: {
          required: true,
          message: '请输入文章内容',
          trigger: 'blur'
        }
      }
    }
  },
  created() {
    // 从父页面接收数据并赋值
    const queryParam = this.$route.query
    // 查询分类集合（下拉框使用）
    this.getCategoriesList()
    if (queryParam.editFlag === true || queryParam.editFlag === 'true') {
      // 为修改时
      this.viewId = queryParam.articleId
      this.editFlag = true
      this.viewtitle = '修改文章'
      // 查询媒体总数
      // 修改时查询当前文章详细内容并赋值
      this.getArticleInfo(queryParam.articleId)
    } else {
      this.editFlag = false
    }
  },

  methods: {
    // 获取分类集合（下拉框用）
    getCategoriesList() {
      getLabelSelect().then((response) => {
        this.labelData = response.data
      })
    },
    // 获取修改文章详情
    getArticleInfo(id) {
      const that = this
      getArticleInfo(id).then((response) => {
        that.editForm = response.data
      })
    },
    // 修改或表单提交
    handleSubmit(editForm) {
      const that = this
      this.$refs[editForm].validate((valid) => {
        if (valid) {
          if (that.editForm.articleAuthor === '') {
            that.editForm.articleAuthor = null
          }
          that.btnload = true
          that.listLoading = true
          if (that.editFlag) {
            editArticleInfo(that.editForm).then((res) => {
              that.getArticleInfo(this.viewId)
              that.$message.success('文章修改成功')
              that
                .$confirm('文章修改成功, 是否继续操作?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '返回文章列表页',
                  type: 'warning'
                })
                .then(() => {
                  that.listLoading = false
                  that.btnload = false
                })
                .catch(() => {
                  that.$router.push({
                    path: '/thematic'
                  })
                })
            })
          } else {
            addArticleInfo(that.editForm).then((res) => {
              that.$message.success('文章添加成功')
              that
                .$confirm('文章添加成功, 是否继续添加?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '返回文章列表页',
                  type: 'warning'
                })
                .then(() => {
                  that.listLoading = false
                  that.btnload = false
                  that.$refs.tinymceContent.setContent('')
                  // that.editForm.featured_media = ''
                  that.$refs[editForm].resetFields()
                })
                .catch(() => {
                  that.$router.push({
                    path: '/thematic'
                  })
                })
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

