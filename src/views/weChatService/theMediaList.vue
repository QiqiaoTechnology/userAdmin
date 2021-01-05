<template>
  <div v-loading="listLoading" class="app-container">
    <div class="tab-w">
      <div class="btnlist">
        <el-upload
          class="avatar-uploader"
          action="#"
          :show-file-list="false"
          :http-request="handUpload"
          accept=".jpg, .jpeg, .png, .gif, .bmp"
        >
          <el-button size="mini"><span class="el-icon-plus" />添加素材</el-button>
        </el-upload>
      </div>
      <el-tabs>
        <el-tab-pane label="图片素材">
          <div v-if="mediaData.length > 0" style="width:100%">
            <el-row :gutter="15">
              <el-col v-for="(item, index) in mediaData" :key="index" :lg="5">
                <el-card
                  :body-style="{ padding: '0px' }"
                  :class="item.status"
                >
                  <div
                    class="center-image"
                    :style="{
                      backgroundImage: 'url(' + item.url + ')'
                    }"
                  />
                  <div style="padding-left: 15px;">
                    <p class="lj_title_p" :title="item.name">
                      {{ item.name }}
                    </p>
                  </div>
                </el-card>
              </el-col>
            </el-row>
            <el-footer>
              <pagination
                v-show="total > 0"
                :total="total"
                :page.sync="queryparameters.offset"
                :limit.sync="queryparameters.count"
                @pagination="getMediaList"
              />
            </el-footer>
          </div>
          <div v-else style="width:100%;text-align:center;padding:50px">
            <p style="font-size:20px;font-weight:600;letter-spacing:8px">暂无数据</p>
          </div>
        </el-tab-pane>
        <el-tab-pane label="视频素材">视频</el-tab-pane>
        <el-tab-pane label="音频素材">音频</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>

import Pagination from '@/components/Pagination'

import {
  getPermanentMediaList,
  uploadPermanentMedia

} from '@/api/wechat'
export default {
  components: { Pagination },
  inject: ['reload'],
  data() {
    return {
      total: 0,
      baseurl: '',
      listLoading: false,
      mediaData: [], // 集合
      dataForm: {
        mediaId: '',
        file: '',
        fileName: '',
        mediaType: 'image'
      },
      queryparameters: {
        // type: ''
      }
    }
  },
  mounted() {
    this.getMediaList()
  },
  methods: {

    getMediaList() {
      const _that = this
      getPermanentMediaList(this.queryparameters).then(response => {
        _that.mediaData = response.data.items
        this.listLoading = false
      })
    },
    // 上传前判断,如果返回false就是取消上传行为
    beforeUpload(file) {
      const pos = file.name.lastIndexOf('.')
      const lastName = file.name.substring(pos, file.name.length)
      const supportTypes = ['.gif', '.jpeg', '.png', '.bmp', '.jpg'] // gif、 jpeg、 png、 bmp

      var str = file.name.split('.')[0]
      var re = /[\u0391-\uFFE5]+/g
      if (str.match(re) != null) {
        this.$message.error('文件名不能包含汉字！')
        return false
      }
      if (supportTypes.indexOf(lastName.toLowerCase()) <= -1) {
        this.$message.error('商品图片仅支持 gif、 jpeg、 png、 bmp、jpg 5种格式！')
        return false
      }
      if (file.size / (1024 * 1024) > 3) {
        this.$message.error('上传商品图片大小应小于3Mb')
        return false
      }
      return true
    },
    handUpload(e) {
      const type = this.beforeUpload(e.file)
      if (type) {
        this.loading = true
        var formdata = new FormData()
        formdata.append('mediaId', this.dataForm.mediaId || '')
        formdata.append('file', this.dataForm.file)
        formdata.append('fileName', this.dataForm.fileName)
        formdata.append('mediaType', this.dataForm.mediaType)
        // formdata.append('file', e.file)
        // formdata.append('type', 'image')
        uploadPermanentMedia(formdata)
          .then(res => {
            setTimeout(() => {
              this.loading = false
            }, 2 * 1000)
            this.$message.success('图片上传成功！')
            this.reload()
          })
          .catch(e => {
            this.$message.error('图片上传失败！' + e)
            this.loading = false
          })
      }
    }

  }
}
</script>
<style>

</style>
<style lang="scss" scoped>
.el-col-lg-5 {
  width: 20%;
  margin-bottom: 10px;
}
.el-card__body {
  position: relative;
}
.lj_title_p {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 14px;
  margin: 0px;
  padding: 10px;
}
.viewDetails {
  text-align: left;
  padding-left: 18px;
}
.viewTitle {
  text-align: right;
  vertical-align: middle;
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-weight: 700;
}

.center-image {
  width: 100%;
  height: 100%;
  padding-top: 100%;
  background: no-repeat;
  background-size: 100% 100%;
  max-height: 220px;
  border-bottom: 1px solid #ccc;
}

// .zhezhao {
//   width: 100%;
//   height: 100%;
//   position: absolute;
//   top: 0px;
//   left: 0px;
//   background: rgba(48, 49, 51, 0.8);
//   text-align: center;
//   display: none;
//   .is-plain {
//     margin-top: 50%;
//   }
// }
.viewImg {
  height: 380px;
  background: #f6f7f7;
  border: 1px solid #c3c4c7;
}
</style>
