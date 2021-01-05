<template>
  <div id="mediaCenter" v-loading="listLoading" class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="图片素材" name="first">
        <div class="btnlist">
          <el-input v-model="queryparameters.title" placeholder="请输入图片标题" clearable class="mini-input">
            <el-button slot="append" icon="el-icon-search" @click="getMediaCenterByPage()" />
          </el-input>
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :http-request="handUpload"
            multiple
            accept=".jpg, .jpeg, .png, .gif, .bmp"
          >
            <el-button
              size="mini"
            ><span class="el-icon-plus" />添加图片素材</el-button>
          </el-upload>
          <el-button
            type="danger"
            plain
            size="mini"
            icon="el-icon-delete"
            @click="handleDelete('all')"
          >批量删除</el-button>
        </div>
        <div v-if="mediaData.length > 0" style="width: 100%">
          <el-row :gutter="15" style="display: flex;flex-wrap: wrap;">
            <el-col v-for="(item, index) in mediaData" :key="index" :lg="6" style="padding：7.5px">
              <el-card
                :body-style="{ padding: '0px' }"
                :class="{
                  selected: ~checkSelect(item.attachmentMaterialInfoId),
                }"
                @mouseover.native="showZhe(item)"
                @mouseleave.native="hideZhe(item)"
              >
                <div class="center-image">
                  <el-image :src="item.attachmentUrl" fit="contain" />
                </div>

                <div style="margin: 3px">
                  <input
                    ref="inputFocus"
                    type="text"
                    class="titleText"
                    :value="item.title"
                    disabled="disabled"
                    @blur.prevent="toEditName(item, index)"
                    @keyup.enter="$event.target.blur"
                  >
                </div>
                <div
                  :id="'index' + item.attachmentMaterialInfoId"
                  class="zhezhao"
                  @click="toAcitve(item)"
                >
                  <div class="zzBtn">
                    <el-tooltip class="item" effect="dark" content="编辑图片标题" placement="top">
                      <el-button
                        type="warning"
                        plain
                        size="small"
                        icon="el-icon-edit"
                        round
                        @click.stop="editMedia(index)"
                      />
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="删除图片" placement="top">
                      <el-button
                        type="danger"
                        plain
                        size="small"
                        icon="el-icon-delete"
                        round
                        @click.stop="handleDelete(item)"
                      />
                    </el-tooltip>

                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <el-footer>
            <pagination
              v-show="total > 0"
              :total="total"
              :page.sync="queryparameters.page"
              :limit.sync="queryparameters.size"
              @pagination="getMediaCenterByPage"
            />
          </el-footer>
        </div>
        <div v-else style="width: 100%; text-align: center; padding: 50px">
          <p style="font-size: 20px; font-weight: 600; letter-spacing: 8px">
            暂无数据
          </p>
        </div>
      </el-tab-pane>
      <!-- <el-tab-pane label="音频素材" name="second"></el-tab-pane>
      <el-tab-pane label="视频素材" name="third"></el-tab-pane> -->
    </el-tabs>
    <el-dialog title="修改图片信息" :visible.sync="dialogVisible" width="70%">
      <el-row>
        <el-col :span="10">
          <div class="viewImg">
            <img
              :src="editForm.source_url"
              style="
                max-width: 100%;
                max-height: 100%;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
              "
            >
          </div>
        </el-col>
        <el-col :span="14">
          <el-form
            ref="editForm"
            :model="editForm"
            :rules="rules"
            label-width="58px"
          >
            <el-form-item label="标题" prop="title">
              <el-input
                v-model.trim="editForm.title"
                placeholder="请输入标题"
                autocomplete="off"
              />
            </el-form-item>
            <el-form-item label="描述" prop="caption">
              <el-input
                v-model.trim="editForm.caption"
                type="textarea"
                :rows="3"
                placeholder="请输入"
                autocomplete="off"
              />
            </el-form-item>
            <el-form-item label="网址" prop="link">
              <el-input
                v-model.trim="editForm.link"
                disabled
                placeholder="请输入网址"
                autocomplete="off"
              >
                <el-button
                  slot="append"
                  :title="editForm.link"
                  @click="handleCopy(editForm, $event)"
                >复制</el-button>
              </el-input>
            </el-form-item>
            <div class="viewDetails">
              <p>
                <span class="viewTitle">文件名称</span>{{ media_details.sizes.full.file }}
              </p>
              <p>
                <span class="viewTitle">外型尺寸</span>{{ media_details.sizes.full.width }}X{{
                  media_details.sizes.full.height
                }}<span
                  class="viewTitle"
                  style="margin-left: 20px"
                >文件类型</span>{{ media_details.sizes.full.mime_type }}
              </p>
              <p>
                <span class="viewTitle">上传日期</span>{{ editForm.dateval }}
              </p>
            </div>
          </el-form>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="submitForm('editForm')"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { baseurl } from '@/utils/request'
import Pagination from '@/components/Pagination'
import {
  getMediaList,
  uploadMedia,
  editMediaInfo,
  deleteMediaByid,
  deleteMediaList,
  setMediaInfo
} from '@/api/website'
export default {
  components: { Pagination },
  data() {
    return {
      isdisabled: true,
      total: 0,
      baseurl: '',
      activeName: 'first',
      dialogVisible: false,
      listLoading: true,
      mediaData: [], // 集合
      queryparameters: {
        attachmentType: 2,
        size: 8,
        page: 1,
        title: null
      },
      addMedisForm: {
        attachmentId: '',
        title: ''
      },

      editForm: {
        title: '',
        caption: '',
        dateval: ''
      },
      media_details: {
        sizes: {
          full: {}
        }
      },
      rules: {
        title: { required: true, message: '请输入图片标题', trigger: 'blur' },
        caption: {
          required: true,
          message: '请输入图片素材描述',
          trigger: 'blur'
        }
      },
      fileTitle: '',
      selectList: []
    }
  },
  mounted() {
    this.getMediaCenterByPage()
    this.baseurl = baseurl
  },
  methods: {
    toAcitve(item) {
      var _index = this.checkSelect(item.attachmentMaterialInfoId)
      if (~_index) {
        this.selectList.splice(_index, 1)
      } else {
        this.selectList.push(item.attachmentMaterialInfoId)
      }
    },
    checkSelect(attachmentMaterialInfoId) {
      return this.selectList.indexOf(attachmentMaterialInfoId)
    },

    handleClick(tab, event) {
      console.log(tab, event)
    },
    addMedis() {
      const _that = this
      setMediaInfo(this.addMedisForm)
        .then((response) => {
          _that.getMediaCenterByPage()
          _that.$message.success('素材新增成功！')
        })
        // eslint-disable-next-line handle-callback-err
        .catch((error) => {
          _that.listLoading = false
        })
    },
    getMediaCenterByPage() {
      const _that = this
      this.listLoading = true
      if (_that.queryparameters.title === '') {
        _that.queryparameters.title = null
      }
      getMediaList(this.queryparameters).then((response) => {
        _that.total = response.data.total
        _that.mediaData = response.data.content
        this.listLoading = false
      })
    },
    // 上传前判断,如果返回false就是取消上传行为
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
    handUpload(e) {
      const type = this.beforeUpload(e.file)
      if (type) {
        this.listLoading = true
        var formdata = new FormData()
        formdata.append('file', e.file)
        uploadMedia(formdata)
          .then((res) => {
            this.addMedisForm.attachmentId = res.data.attachmentInfoId
            const title = res.data.attachmentName.split('.')[0]
            this.addMedisForm.title = title.slice(0, 60)
            this.addMedis()
          })
          .catch((e) => {
            this.$message.error('图片上传失败！' + e)
            this.listLoading = false
          })
      }
    },
    showZhe(item) {
      document.getElementById(
        'index' + item.attachmentMaterialInfoId
      ).style.display = 'block'
    },
    hideZhe(item) {
      document.getElementById(
        'index' + item.attachmentMaterialInfoId
      ).style.display = 'none'
    },
    editMedia(index) {
      this.$refs.inputFocus[index].disabled = false
      this.$refs.inputFocus[index].focus()
    },
    toEditName(textdata, index) {
      const data = {
        attachmentMaterialId: textdata.attachmentMaterialInfoId,
        attachmentId: textdata.attachmentId,
        title: this.$refs.inputFocus[index].value
      }
      editMediaInfo(data).then((res) => {
        this.$message.success('图片名修改成功')
        this.$refs.inputFocus[index].disabled = true
        this.getMediaCenterByPage()
      })
    },
    handleDelete(data) {
      const _that = this
      if (data === 'all') {
        if (_that.selectList.length > 1) {
          _that
            .$confirm('此操作将批量删除选中图片素材, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            })
            .then(() => {
              const obj = { attachmentMaterialIdList: _that.selectList }
              deleteMediaList(obj).then((response) => {
                _that.$message({
                  type: 'success',
                  message: '成功删除该图片素材'
                })
                _that.getMediaCenterByPage()
              })
            })
            .catch(() => {
              _that.$message({
                type: 'info',
                message: '已取消删除'
              })
            })
        } else if (_that.selectList.length === 1) {
          _that
            .$confirm('此操作将永久删除该图片素材, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            })
            .then(() => {
              deleteMediaByid(_that.selectList[0]).then((response) => {
                _that.$message({
                  type: 'success',
                  message: '成功删除该图片素材'
                })
                _that.getMediaCenterByPage()
              })
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
            message: '请选择需要删除的图片素材'
          })
        }
      } else {
        _that
          .$confirm('此操作将永久删除该图片素材, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(() => {
            deleteMediaByid(data.attachmentMaterialInfoId).then((response) => {
              _that.$message({
                type: 'success',
                message: '成功删除该图片素材'
              })
              _that.getMediaCenterByPage()
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
<style>
#mediaCenter .el-card__body {
  position: relative;
}
</style>
<style lang="scss" scoped>

.el-col-lg-6 {
  padding-bottom: 10px;
}
.el-card__body {
  position: relative;
      border: 1px solid #ccc;
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
#mediaCenter .el-card:hover {
  box-shadow: 0 0 15px #7c8288;
  cursor: pointer;
}

.center-image {
  height: 300px;
  width: 100%;
  text-align: center;
  background-color:rgba(204,204, 204,0.3);
  border-bottom: 1px solid #ccc;
  position: relative;
  .el-image {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.zhezhao {
  width: 100%;
  height: calc(100% - 35px);
  position: absolute;
  top: 0px;
  left: 0px;
  background: rgba(48, 49, 51, 0.5);
  text-align: center;
  display: none;
  .zzBtn {
    position: absolute;
    display: flex;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    .is-round{
      margin: 20px;
      padding: 15px;
      border-radius: 50%;
      font-size: 18px;
    }
  }
}
.viewImg {
  position: relative;
  height: 380px;
  background: #f6f7f7;
  border: 1px solid #c3c4c7;
}
.selected {
  border: 5px solid #49cdd0;
  position: relative;
}
.selected:before {
  content: "";
  position: absolute;
  right: 0;
  bottom: 0;
  border: 20px solid #49cdd0;
  border-top-color: transparent;
  border-left-color: transparent;
}
.selected:after {
  content: "";
  width: 5px;
  height: 12px;
  position: absolute;
  right: 6px;
  bottom: 6px;
  border: 2px solid #fff;
  border-top-color: transparent;
  border-left-color: transparent;
  transform: rotate(45deg);
}
.titleText {
  border: 0;
  padding: 8px;
  width: 100%;
}
.titleText:focus {
  outline: 3px solid #11b95c;
}
</style>
