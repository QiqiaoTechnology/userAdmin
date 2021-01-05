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
              <el-form-item label="封面图:" prop="coverAttachmentMaterialId">
                <el-button @click="openMedia">点击选择文章封面图</el-button>
                <span
                  v-if="editForm.coverAttachmentMaterialId"
                  style="margin-left: 15px; color: #67c23a; cursor: pointer"
                  title="点击查看图片"
                  @click="showImg(editForm.coverAttachmentMaterialId)"
                >
                  <i class="el-icon-circle-check" /> {{ imgVal }}</span>
                <span
                  v-else
                  style="margin-left: 15px; color: #e6a23c"
                ><i class="el-icon-remove-outline" />暂无封面图</span>
              </el-form-item>
              <el-form-item
                label="文章目录:"
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
                label="文章作者:"
                prop="articleAuthor"
              >
                <el-input
                  v-model.trim="editForm.articleAuthor"
                  clearable
                  placeholder="请输入文章作者"
                  autocomplete="off"
                />
              </el-form-item>
              <el-form-item
                label="文章摘要:"
                prop="articleDescription"
                class="lg_input"
                style="margin-bottom: 0px"
              >
                <el-input
                  v-model.trim="editForm.articleDescription"
                  type="textarea"
                  :rows="2"
                  clearable
                  placeholder="请输入文章摘要"
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
    <el-dialog
      title="选择图片"
      class="imgForm"
      :visible.sync="dialogVisible"
      width="60%"
    >
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="上传图片" name="first">
          <el-upload
            style="margin: auto"
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :http-request="handUpload"
            accept=".jpg, .jpeg, .png, .gif, .bmp"
          >
            <img v-if="source_url" :src="source_url" class="avatar">
            <div v-else class="avatar-uploader-icon">点击上传封面图</div>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="媒体库" name="last">
          <el-row :gutter="15">
            <el-col
              v-for="(item, index) in mediaData"
              :key="index"
              :span="6"
              style="margin-bottom: 10px"
            >
              <el-card
                :class="currentClass(index)"
                :body-style="{ padding: '2px' }"
              >
                <div
                  class="center-image"
                  :style="{
                    backgroundImage: 'url(' + item.attachmentUrl + ')',
                  }"
                  @click="setActive(item, index)"
                />
              </el-card>
            </el-col>
          </el-row>

          <pagination
            v-show="total > 0"
            :total="total"
            :page.sync="queryparameters.page"
            :limit.sync="queryparameters.size"
            @pagination="getMediaCenterByPage"
          />
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          :loading="btnload"
          @click="setcoverAttachmentMaterialId"
        >确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="显示封面图片"
      class="imgForm"
      :visible.sync="dialogImgVisible"
      width="60%"
    >
      <img :src="imgUrl" style="width: 100%; height: 100%">
    </el-dialog>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import Tinymce from '@/components/Tinymce'
import {
  getLabelSelect,
  addArticleInfo,
  editArticleInfo,
  getArticleInfo,
  getMediaList,
  getMediaSelect,
  uploadMedia,
  setMediaInfo
} from '@/api/website.js'
import { baseurl } from '@/utils/request'
export default {
  components: { Tinymce, Pagination },
  data() {
    return {
      imgVal: '',
      imgUrl: '',
      dialogImgVisible: false,
      // 选中图片高亮
      currentNumber: -1,
      // 媒体库选中图片id
      mediaId: '',
      // 上传新图片时图片id
      uploadId: '',
      // 判断是否新上传图片或媒体库选择图片
      postVal: true,
      // 选择图片弹框进入时显示tab
      activeName: 'first',
      // 查询总数
      questForm: {
        attachmentType: 2
      },
      // 媒体对象分页后集合
      mediaData: [],
      // 总数据
      mediacountData: [],
      // 总数量
      total: 0,
      // 分页查询
      queryparameters: {
        attachmentType: 2,
        size: 8,
        page: 1
      },
      // 图片路径
      addMedisForm: {},
      source_url: '',
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
        articleLabelIdList: null,
        coverAttachmentMaterialId: null
      },
      // 校验规则
      rules: {
        articleTitle: {
          required: true,
          message: '请输入文章标题',
          trigger: 'blur'
        },
        articleDescription: {
          required: true,
          message: '请输入文章摘要',
          trigger: 'blur'
        },
        articleAuthor: {
          required: true,
          message: '请输入文章作者',
          trigger: 'blur'
        },
        articleContent: {
          required: true,
          message: '请输入文章内容',
          trigger: 'blur'
        },
        coverAttachmentMaterialId: {
          required: true,
          message: '请选择封面图片',
          trigger: 'blur'
        }
      }
    }
  },
  created() {
    // 从父页面接收数据并赋值
    const queryParam = this.$route.query
    // 查询分类集合（下拉框使用）
    this.getLabelSelect()

    // 查询媒体对象分页数据
    this.getMediaCenterByPage()

    if (queryParam.editFlag === true || queryParam.editFlag === 'true') {
      // 为修改时

      this.viewId = queryParam.articleId
      this.editFlag = true
      this.viewtitle = '修改文章'
      // 查询媒体总数
      this.getMediaTotal().then((res) => {
        // 修改时查询当前文章详细内容并赋值
        this.getThematicListByid(queryParam.articleId)
      })
    } else {
      this.getMediaTotal()
      this.editFlag = false
    }
  },

  methods: {
    addMedis() {
      const _that = this
      setMediaInfo(this.addMedisForm)
        .then((response) => {
          _that.btnload = false
          _that.listLoading = false
          _that.uploadId = response.data
          _that.$message.success('图片上传成功！')
          _that.getMediaTotal()
          _that.getMediaCenterByPage()
        })
        // eslint-disable-next-line handle-callback-err
        .catch((error) => {
          _that.source_url = ''
          _that.listLoading = false
          _that.btnload = false
          _that.imgVal = ''
        })
    },

    showImg(imgId) {
      this.imgUrl = this.formatMedia(imgId).attachmentUrl
      this.dialogImgVisible = true
    },
    // 高亮图片方法
    currentClass(index) {
      return [this.currentNumber === index ? 'imgActive' : '']
    },
    // 点击选中高亮
    setActive(item, index) {
      this.imgVal = item.attachmentName
      this.mediaId = item.attachmentMaterialInfoId
      this.currentNumber = index
    },
    // 切换选择图片方式（上传或从已有媒体对象中拿取）
    handleClick(tab, event) {
      const _that = this
      if (tab.index === '0') {
        // 上传
        _that.postVal = true
      } else {
        // 拿取媒体库对象
        _that.getMediaCenterByPage()
        _that.postVal = false
      }
    },
    // 提交选中的图片
    setcoverAttachmentMaterialId() {
      if (this.postVal) {
        this.editForm.coverAttachmentMaterialId = this.uploadId
      } else {
        this.editForm.coverAttachmentMaterialId = this.mediaId
      }
      this.dialogVisible = false
      // 初始化
      this.uploadId = 0
      this.mediaId = 0
      this.currentNumber = -1
    },
    // 格式化图片名称
    formatMedia(data) {
      let val = {}
      const that = this
      that.mediacountData.forEach((x) => {
        if (x.attachmentMaterialInfoId === data) {
          val = x
        }
      })
      return val
    },
    // 上传前判断
    beforeUpload(file) {
      const pos = file.name.lastIndexOf('.')
      const lastName = file.name.substring(pos, file.name.length)
      const supportTypes = ['.gif', '.jpeg', '.png', '.bmp', '.jpg'] // gif、 jpeg、 png、 bmp
      if (supportTypes.indexOf(lastName.toLowerCase()) <= -1) {
        this.$message.error(
          '商品图片仅支持 gif、 jpeg、 png、 bmp、jpg 5种格式！'
        )
        return false
      }
      if (file.size / (1024 * 1024) > 5) {
        this.$message.error('上传商品图片大小应小于5Mb')
        return false
      }
      return true
    },
    // 图片上传
    handUpload(e) {
      const type = this.beforeUpload(e.file)
      if (type) {
        this.btnload = true
        this.listLoading = true
        var formdata = new FormData()
        formdata.append('file', e.file)
        uploadMedia(formdata)
          .then((res) => {
            this.addMedisForm.attachmentId = res.data.attachmentInfoId
            this.addMedisForm.title = res.data.attachmentName.slice(0, 60)
            this.source_url = res.data.attachmentUrl
            this.imgVal = res.data.attachmentName.slice(0, 60)
            this.addMedis()
          })
          .catch((e) => {
            this.$message.error('图片上传失败！' + e)
            this.listLoading = false
            this.btnload = false
          })
      }
    },
    // 媒体库图片总数量
    getMediaTotal() {
      const that = this
      return new Promise((resolve, reject) => {
        getMediaSelect(that.questForm).then((response) => {
          that.mediacountData = response.data
          resolve(that.mediacountData)
        })
      })
    },
    // 媒体库图片分页数据
    getMediaCenterByPage() {
      const _that = this
      getMediaList(this.queryparameters).then((response) => {
        _that.mediaData = response.data.content
        _that.total = response.data.total
      })
    },
    // 打开选择图片弹框
    openMedia() {
      this.dialogVisible = true
    },
    // 获取分类集合（下拉框用）
    getLabelSelect() {
      getLabelSelect().then((response) => {
        this.labelData = response.data
      })
    },
    // 获取修改文章详情
    getThematicListByid(id) {
      const that = this
      getArticleInfo(id).then((response) => {
        that.editForm = response.data
        that.imgVal = that.formatMedia(
          response.data.coverAttachmentMaterialId
        ).attachmentName
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
              that.getThematicListByid(this.viewId)
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
                    path: '/teletext'
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
                  // that.editForm.coverAttachmentMaterialId = ''
                  that.$refs[editForm].resetFields()
                })
                .catch(() => {
                  that.$router.push({
                    path: '/teletext'
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

