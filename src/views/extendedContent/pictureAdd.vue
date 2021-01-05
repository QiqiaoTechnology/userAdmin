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
          label-width="160px"
        >
          <div class="userInfo_main dpyflex">
            <div class="formContent">
              <el-form-item label="封面图:" prop="attachmentMaterialId">
                <el-button @click="openMedia">点击选择轮播图图片封面图</el-button>
                <span
                  v-if="editForm.attachmentMaterialId"
                  style="margin-left: 15px; color: #67c23a; cursor: pointer"
                  title="点击查看图片"
                  @click="showImg(editForm.attachmentMaterialId)"
                >
                  <i class="el-icon-circle-check" /> {{ imgVal }}</span>
                <span
                  v-else
                  style="margin-left: 15px; color: #e6a23c"
                ><i class="el-icon-remove-outline" />暂无封面图</span>
              </el-form-item>
              <el-form-item
                label="轮播图图片标题:"
                prop="title"
                class="lg_input"
              >
                <el-input
                  v-model.trim="editForm.title"
                  clearable
                  placeholder="请输入轮播图图片标题"
                  autocomplete="off"
                />
              </el-form-item>
              <el-form-item
                label="轮播图图片副标题:"
                prop="subtitle"
                class="lg_input"
              >
                <el-input
                  v-model.trim="editForm.subtitle"
                  clearable
                  placeholder="请输入轮播图图片副标题"
                  autocomplete="off"
                />
              </el-form-item>
              <el-form-item
                label="轮播图图片跳转链接:"
                prop="redirectUrl"
                class="lg_input"
                style="margin-bottom: 0px"
              >
                <el-input
                  v-model.trim="editForm.redirectUrl"
                  clearable
                  placeholder="请输入轮播图图片跳转链接"
                  autocomplete="off"
                />
              </el-form-item>
            </div>
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
          @click="setattachmentMaterialId"
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
import {
  setbannerDetail,
  getMediaList,
  getMediaSelect,
  uploadMedia,
  setMediaInfo,
  setBanner
} from '@/api/website.js'
export default {
  components: { Pagination },
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
      // 是否显示弹框
      dialogVisible: false,
      // 弹框标题
      viewtitle: '',
      // 按钮加载中动画
      btnload: false,
      // 表格加载动画
      listLoading: false,
      // 轮播图id
      viewId: '',
      bannerName: '',
      remarks: null,
      // 新增修改表单
      editForm: {
        title: null,
        subtitle: null,
        redirectUrl: null,
        attachmentMaterialId: null
      },
      // 校验规则
      rules: {
        title: {
          required: true,
          message: '请输入轮播图图片标题',
          trigger: 'blur'
        },
        subtitle: {
          required: true,
          message: '请输入轮播图图片副标题',
          trigger: 'blur'
        },
        redirectUrl: {
          required: true,
          message: '请输入轮播图图片跳转链接',
          trigger: 'blur'
        },
        attachmentMaterialId: {
          required: true,
          message: '请选择轮播图图片',
          trigger: 'blur'
        }
      }
    }
  },
  created() {
    // 从父页面接收数据并赋值
    const queryParam = this.$route.query
    // 查询分类集合（下拉框使用）
    if (queryParam.title) {
      this.viewtitle = '新增【' + queryParam.title + '】中的的轮播图图片信息'
      this.bannerName = queryParam.title
      this.remarks = queryParam.remarks
      if (queryParam.bannerId) {
        this.viewId = queryParam.bannerId
      }
    }
    // 查询媒体对象分页数据
    this.getMediaCenterByPage()

    this.getMediaTotal()
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
    setattachmentMaterialId() {
      if (this.postVal) {
        this.editForm.attachmentMaterialId = this.uploadId
      } else {
        this.editForm.attachmentMaterialId = this.mediaId
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

    // 修改或表单提交
    handleSubmit(editForm) {
      const that = this
      this.$refs[editForm].validate((valid) => {
        if (valid) {
          that.btnload = true
          that.listLoading = true
          if (that.viewId) {
            that.editForm.bannerId = that.viewId
            setbannerDetail(that.editForm).then((res) => {
              that.$message.success('轮播图图片添加成功')
              that
                .$confirm('轮播图图片添加成功, 是否继续添加?', '提示', {
                  confirmButtonText: '继续添加该轮播图集合下轮播图片',
                  cancelButtonText: '返回轮播图集合列表页',
                  type: 'warning'
                })
                .then(() => {
                  that.listLoading = false
                  that.btnload = false
                  that.$refs[editForm].resetFields()
                })
                .catch(() => {
                  that.$router.push({
                    path: '/picture'
                  })
                })
            }).catch(() => {
              that.listLoading = false
            })
          } else {
            const bannerDetailList = []
            bannerDetailList.push(that.editForm)
            const dataVal = {
              bannerName: that.bannerName,
              remarks: that.remarks,
              bannerDetailList: bannerDetailList
            }
            setBanner(dataVal).then((res) => {
              that.$message.success('轮播图图片添加成功')
              that
                .$confirm('轮播图图片添加成功, 是否继续添加?', '提示', {
                  confirmButtonText: '继续添加该轮播图集合下轮播图片',
                  cancelButtonText: '返回轮播图集合列表页',
                  type: 'warning'
                })
                .then(() => {
                  that.listLoading = false
                  that.btnload = false
                  that.$refs[editForm].resetFields()
                  that.viewId = res.data
                })
                .catch(() => {
                  that.$router.push({
                    path: '/picture'
                  })
                })
            }).catch(() => {
              that.listLoading = false
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

