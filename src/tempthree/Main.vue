<template>
  <div>
    <self-header
      :bg-color="header_color"
      :hd-position="header_position"
      :hover-flag="header_hover"
      :logo-img="companyForm.enterpriseLogoAttachmentUrl"
    />
    <router-view ref="childItem" @headFix="head_fix" />
    <self-footer :com="companyForm" :link-list="linkList" :menu-list="titleList" />
    <div v-show="show_backtop" class="backtop" @click="backTop">
      <i class="el-icon-arrow-up" />
    </div>
    <el-drawer
      :title="'当前使用的轮播图集合名称：' + itemForm.bannerName"
      :before-close="cancelForm"
      :visible.sync="dialog"
      direction="ltr"
      size="770px"
    >
      <div v-if="!bannerEdit" class="demo-drawer__content">
        <el-table :data="itemForm.bannerDetailList" border style="width: 100%">
          <el-table-column label="轮播图片" align="center" width="180">
            <template slot-scope="scope">
              <div class="center-image">
                <el-image
                  style="width: 150px; height: 70px"
                  :src="scope.row.attachmentUrl"
                  fit="contain"
                  :preview-src-list="srcList"
                />
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="title" label="轮播图图片标题" width="180" />
          <el-table-column
            prop="subtitle"
            label="轮播图图片副标题"
            width="180"
          />
          <el-table-column prop="redirectUrl" label="轮播图图片点击跳转链接" />
        </el-table>
        <div class="demo-drawer__footer">
          <el-button @click="cancelForm">取 消</el-button>
          <el-button type="primary" :loading="loading" @click="toEditView()">{{
            loading ? "载入素材库中..." : "去素材库替换"
          }}</el-button>
        </div>
      </div>
      <div v-else class="demo-drawer__content">
        <el-card
          v-for="(item, index) in bannerList"
          :key="index"
          class="box-card"
        >
          <div slot="header" class="clearfix">
            <span>{{ item.bannerName }}</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              @click="subEditBanner(item)"
            >使用该轮播图集合</el-button>
          </div>
          <div class="text item">
            <el-table :data="item.bannerDetailList">
              <el-table-column label="图片" width="150">
                <template slot-scope="scope">
                  <el-image
                    style="width: 100px; height: 65px"
                    :src="scope.row.attachmentUrl"
                    fit="contain"
                    :preview-src-list="srcList"
                  />
                </template>
              </el-table-column>
              <el-table-column
                property="title"
                label="轮播图标题"
                width="200"
              />
              <el-table-column
                property="subtitle"
                label="轮播图副标题"
              />
              <el-table-column
                property="redirectUrl"
                label="轮播图跳转地址"
              />
            </el-table>
          </div>
        </el-card>
        <div class="demo-drawer__footer">
          <pagination
            v-show="total > 0"
            :total="total"
            :page.sync="queryParam.page"
            :limit.sync="queryParam.size"
            @pagination="getBannerList"
          />
        </div>
      </div>
    </el-drawer>

    <el-drawer
      title="模块详情"
      :before-close="cancelForm"
      :visible.sync="dialogArticle"
      direction="rtl"
      size="770px"
    >
      <div class="demo-drawer__content">
        <el-button class="artBtn" @click="saveArticle">新增填充该模块下文章内容</el-button>
        <el-form ref="articleForm" :model="articleForm" label-width="100px">
          <el-form-item label="模块标题">
            <el-input
              v-model="articleForm.title"
              @blur.prevent="toEditName()"
              @keyup.enter="$event.target.blur"
            />
          </el-form-item>
          <el-form-item label="模块副标题">
            <el-input
              v-model="articleForm.subtitle"
              @blur.prevent="toEditName()"
              @keyup.enter="$event.target.blur"
            />
          </el-form-item>
        </el-form>
        <el-table :data="articleForm.children" border style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="文章标题：">
                  <span>{{ props.row.articleTitle }}</span>
                </el-form-item>
                <el-form-item label="文章作者：">
                  <span>{{ props.row.articleAuthor }}</span>
                </el-form-item>
                <el-form-item label="文章描述：">
                  <span>{{ props.row.articleDescription }}</span>
                </el-form-item>
                <el-form-item label="文章内容：">
                  <span>{{ props.row.articleContent }}</span>
                </el-form-item>
                <el-form-item label="文章创建时间：">
                  <span>{{ props.row.createTime }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="文章图片" align="center" width="180">
            <template slot-scope="scope">
              <div class="center-image">
                <el-image
                  style="width: 100px; height: 100px"
                  :src="scope.row.coverAttachmentUrl"
                  fit="contain"
                  :preview-src-list="srcList"
                />
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="articleTitle" label="文章标题" />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="articleEdit(scope.row)"
              >更改填充</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="deleteArticle(scope.row)"
              >删除内容</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-drawer
          title="图文素材"
          :append-to-body="true"
          :visible.sync="innerDrawer"
          size="620px"
        >
          <el-input v-model="aQueryParam.articleTitle" clearable placeholder="请输入文章标题" class="selectInput" @keyup.enter="getArticleList">
            <el-button slot="append" icon="el-icon-search" @click="getArticleList" />
          </el-input>
          <el-table :data="articleList" style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="文章标题">
                    <p>{{ props.row.articleTitle }}</p>
                  </el-form-item>
                  <el-form-item label="文章作者">
                    <p>{{ props.row.articleAuthor }}</p>
                  </el-form-item>
                  <el-form-item label="文章描述">
                    <span>{{ props.row.articleDescription }}</span>
                  </el-form-item>
                  <el-form-item label="文章内容">
                    <span>{{ props.row.articleContent }}</span>
                  </el-form-item>
                  <el-form-item label="文章创建时间">
                    <span>{{ props.row.createTime }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column label="文章图片" align="center" width="180">
              <template slot-scope="scope">
                <div class="center-image">
                  <el-image
                    style="width: 150px; height: 70px"
                    :src="scope.row.coverAttachmentUrl"
                    fit="contain"
                    :preview-src-list="initSrcList"
                  />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="articleTitle" label="文章标题" />
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="subArticleEdit(scope.row)"
                >确定</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="demo-drawer__footer">
            <pagination
              v-show="atotal > 0"
              :total="atotal"
              :page.sync="aQueryParam.page"
              :limit.sync="aQueryParam.size"
              @pagination="getArticleList"
            />
          </div>
        </el-drawer>
      </div>
    </el-drawer>

    <el-drawer
      title="图片素材库"
      :visible.sync="dialogMaterial"
      direction="ttb"
      size="360px"
    >
      <el-input v-model="MqueryParam.title" clearable placeholder="请输入图片标题" class="selectInput" @keyup.enter="getMaterialList">
        <el-button slot="append" icon="el-icon-search" @click="getMaterialList" />
      </el-input>
      <el-row :gutter="15" class="imgForm">
        <el-col
          v-for="(item, index) in MaterialList"
          :key="index"
          :span="4"
          style="margin-bottom: 10px"
        >
          <el-card :body-style="{ padding: '2px' }">
            <div slot="header" class="clearfix">
              <span class="ov1" :title="item.title">图片标题:{{ item.title }}</span>
            </div>
            <el-image
              style="height: 150px"
              :src="item.attachmentUrl"
              fit="contain"
              :title="item.title"
              :preview-src-list="srcList"
            />
            <div class="bottom clearfix">
              <el-button
                style="float: right; padding: 3px 0"
                type="text"
                @click="subMaterialEdit(item)"
              >使用</el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <div class="demo-drawer__footer">
        <pagination
          v-show="mtotal > 0"
          :total="mtotal"
          :page.sync="MqueryParam.page"
          :limit.sync="MqueryParam.size"
          @pagination="getMaterialList"
        />
      </div>
    </el-drawer>
  </div>
</template>
<script>
import './style/animate.css'
import './style/icomoon.css'
import './style/bootstrap.css'
import './style/magnific-popup.css'
import './style/style.css'
import selfHeader from './components/Header'
import selfFooter from './components/Footer'
import {
  deleteRegion,
  getBannerListByPage,
  getArticleListByPage,
  updateBannerModule,
  findByAttachmentType,
  updateArticleModule,
  updateMaterialModule,
  updateModuleTitle,
  saveRegion
} from '@/api/tempApi.js'
import {
  getBasicColumnList,
  getEnterpriseInfo
} from '@/api/website.js'

import Pagination from './components/Pagination'

export default {
  components: {
    selfHeader,
    selfFooter,
    Pagination
  },
  inject: ['reload'],
  data() {
    return {
      total: 0,
      atotal: 0,
      mtotal: 0,
      dialogMaterial: false,
      editWebsiteElementId: '',
      editArticleId: '',
      oldMaterialId: '',
      titleList: [],
      srcList: [],
      initSrcList: [],
      innerDrawer: false,
      bannerList: [],
      MaterialList: [],
      articleList: [],
      itemForm: {},
      articleForm: {},
      dialog: false,
      dialogArticle: false,
      loading: false,
      companyForm: {},
      linkList: [],
      queryParam: {
        page: 1,
        size: 1
      },
      MqueryParam: {
        page: 1,
        size: 6,
        title: null,
        attachmentType: 2
      },
      aQueryParam: {
        page: 1,
        size: 5,
        articleTitle: null,
        articleType: 2
      },
      bannerEdit: false,
      header_color: '', // header背景色
      header_position: '', // header定位
      header_hover: '', // header图标是否显示白光划过效果
      show_backtop: false // 是否显示回到顶部按钮
    }
  },
  mounted() {
    this.getEnterpriseInfo()
    this.getBasicColumnList()
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    deleteArticle(row) {
      deleteRegion(row.websiteElementId).then(res => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.dialogArticle = false
        this.innerDrawer = false
        this.$refs['childItem'].getTree()
      })
    },
    getEnterpriseInfo() {
      getEnterpriseInfo().then(res => {
        this.companyForm = res.data
      })
    },
    getBasicColumnList() {
      const data = {
        page: 1,
        size: 10
      }
      getBasicColumnList(data).then(res => {
        this.linkList = res.data.content
      })
    },
    saveArticle() {
      const data = {
        parentElementId: this.editWebsiteElementId
      }
      saveRegion(data).then(res => {
        this.innerDrawer = true
        this.editArticleId = res.data.eventId
        this.editWebsiteElementId = res.data.websiteElementId
        this.getArticleList()
      })
    },

    toEditName() {
      if (this.articleForm.title === '') {
        this.articleForm.title = null
      }
      if (this.articleForm.subtitle === '') {
        this.articleForm.subtitle = null
      }
      const data = {
        websiteElementId: this.editWebsiteElementId,
        title: this.articleForm.title,
        subtitle: this.articleForm.subtitle
      }

      updateModuleTitle(data).then((res) => {
        if (res.code === 200) {
          this.$message({
            message: '修改标题成功',
            type: 'success'
          })
        }
      })
    },
    getMaterialList() {
      findByAttachmentType(this.MqueryParam).then((res) => {
        this.MaterialList = res.data.content
        this.srcList = res.data.content.map(x => x.attachmentUrl)
        this.mtotal = res.data.total
      })
    },
    getArticleList() {
      if (this.aQueryParam.articleTitle === '') {
        this.aQueryParam.articleTitle = null
      }
      getArticleListByPage(this.aQueryParam).then((res) => {
        this.articleList = res.data.content
        this.initSrcList = res.data.content.map(x => x.coverAttachmentUrl)
        this.atotal = res.data.total
      })
    },
    articleEdit(data) {
      this.innerDrawer = true
      this.editArticleId = data.articleId
      this.editWebsiteElementId = data.websiteElementId
      this.getArticleList()
    },
    toEditView() {
      this.loading = true
      getBannerListByPage(this.queryParam).then((res) => {
        this.loading = false
        this.bannerEdit = true
        this.bannerList = res.data.content
        this.srcList = res.data.content[0].bannerDetailList.map(x => x.attachmentUrl)
        this.total = res.data.total
      })
    },
    getBannerList() {
      getBannerListByPage(this.queryParam).then((res) => {
        this.bannerList = res.data.content
        this.srcList = res.data.content[0].bannerDetailList.map(x => x.attachmentUrl)
        this.total = res.data.total
      })
    },
    subEditBanner(data) {
      const that = this
      updateBannerModule(that.editWebsiteElementId, data.bannerId).then(
        (res) => {
          if (res.code === 200) {
            that.$message({
              message: '轮播图替换成功',
              type: 'success'
            })
            that.dialog = false
            that.$refs['childItem'].getTree()
          }
        }
      )
    },
    subArticleEdit(data) {
      const that = this
      updateArticleModule(
        that.editWebsiteElementId,
        data.articleId,
        that.editArticleId
      ).then((res) => {
        if (res.code === 200) {
          that.$message({
            message: '内容替换成功',
            type: 'success'
          })
          that.dialogArticle = false
          that.innerDrawer = false
          that.$refs['childItem'].getTree()
        }
      })
    },

    subMaterialEdit(data) {
      const that = this
      updateMaterialModule(
        that.editWebsiteElementId,
        data.attachmentMaterialInfoId
      ).then((res) => {
        if (res.code === 200) {
          that.$message({
            message: '图片替换成功',
            type: 'success'
          })
          that.dialogMaterial = false
          that.$refs['childItem'].getTree()
        }
      })
    },
    handleScroll() {
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      if (scrollTop === 0) this.header_color = 'transparent'
      if (scrollTop > 100) this.header_color = 'rgba(3,3,3,.8)'
      if (scrollTop > 200) this.show_backtop = true
      if (scrollTop < 200) this.show_backtop = false
    },
    backTop() {
      // 让回到顶部更加平滑
      let scrollTop
      var time = setInterval(() => {
        scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop
        window.scroll(0, scrollTop - 50)
        if (scrollTop === 0) clearInterval(time)
      }, 50)
    },
    head_fix(val) {
      this.header_position = val[0]
      this.header_hover = val[1]
    },
    cancelForm() {
      this.dialog = false
      this.dialogArticle = false
      this.innerDrawer = false
      this.$refs['childItem'].getTree()
    }
  }
}
</script>
<style lang="scss">
.selectInput{
      width: 400px;
    position: absolute;
    top: 15px;
    left: 120px;
     .el-input__inner {
    height: 30px;
    line-height: 30px;
}
}
span {
  outline-color: #fff;
}
.el-drawer__body {
  overflow: auto;
  padding-bottom: 45px;
}
.editbtn {
  width: 60px;
  height: 60px;
  background-color: rgb(255, 135, 36);
  text-align: center;
  position: fixed;
  z-index: 999;
  right: 0;
  bottom: 50%;
  cursor: pointer;
  transition: transform 0.3s;
  animation: rotateIn 0.8s;
  &:hover {
    transform: scale(1.2);
  }
  i {
    color: #ffffff;
    font-size: 30px;
  }
}
ul {
  list-style: none;
}
.backtop {
  width: 60px;
  height: 45px;
  background-color:#50CB86;
  text-align: center;
  position: fixed;
  z-index: 999;
  right: 5%;
  bottom: 0;
  cursor: pointer;
  transition: transform 0.3s;
  animation: rotateIn 0.8s;
  &:hover {
    transform: scale(1.2);
  }
  i {
    color: #ffffff;
    font-size: 30px;
  }
}
.demo-drawer__footer {
    position: absolute;
    bottom: 0px;
    display: flex;
    justify-content: space-around;
    width: 100%;
    background-color: #fff;

  .el-button {
    width: 30%;
  }
}
.el-card__body {
  padding: 0px 10px;
}
.el-form--inline .el-form-item {
  display: block;
  margin-right: 10px;
  margin-bottom: 5px;
}

.el-row {
  width: 100%;
}
figure {
    margin: 0px;
}
.artBtn{
  position:absolute;
  top: 10px;
  left: 100px;
}
</style>
