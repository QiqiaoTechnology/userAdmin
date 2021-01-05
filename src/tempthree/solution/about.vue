<template>
  <div>
    <header id="fh5co-header" class="fh5co-cover fh5co-cover-sm" role="banner" :style="'background-image: url('+bannerInfo.attachmentUrl+')'" @click="toEditMaterial">
      <div class="overlay" />
      <div class="container">
        <div class="row">
          <div class="col-md-8 col-md-offset-2 text-center">
            <div class="display-t">
              <div class="display-tc animate-box" data-animate-effect="fadeIn">
                <h1>{{ bannerInfo.title }}</h1>
                <h2>{{ bannerInfo.subtitle }}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    <!-- breadcrumb-area-end -->

    <!-- team-area -->
    <section class="team-area pt-50 pb-70">
      <div id="fh5co-about-section">
        <div class="container">
          <div v-show="oneView.isDeleted===0" class="about-content" @click="toArticle(oneView)">
            <div v-for="(item,index) in oneView.children" :key="index" class="row animate-box">
              <div class="col-md-6">
                <img class="img-responsive" :src="item.coverAttachmentUrl" alt="about">
              </div>
              <div class="col-md-6 col-md-pull-1">
                <div class="desc">
                  <h3>{{ item.articleTitle }}</h3>
                  <p>{{ item.articleDescription }}</p>
                </div>
              </div>
            </div>
          </div>
          <div v-show="twoView.isDeleted===0" @click="toArticle(twoView)">
            <div class="row animate-box">
              <div class="col-md-8 col-md-offset-2 text-center fh5co-heading">
                <h2>{{ twoView.title }}</h2>
                <p>{{ twoView.subtitle }}</p>
              </div>
            </div>
            <div class="row">
              <div v-for="(item,index) in twoView.children" :key="index" class="col-md-4 col-sm-4 animate-box" data-animate-effect="fadeIn">
                <div class="fh5co-staff">
                  <img :src="item.coverAttachmentUrl" alt="">
                  <h3>{{ item.articleTitle }}</h3>
                  <strong class="role">{{ item.articleAuthor }}</strong>
                  <p class="ov3" :title="item.articleDescription">{{ item.articleDescription }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>
<script>
import {
  getTreeInfo,
  getMaterialList,
  getArticlelList
} from '@/api/tempApi.js'
export default {
  data() {
    return {
      bannerInfo: {},

      dataForm: {
        websiteTemplateId: 3,
        parentElementId: 1017
      },
      oneView: {},
      twoView: {}
    }
  },
  mounted() {
    this.getTree()
  },
  methods: {
    toEditMaterial() {
      this.$parent.dialogMaterial = true
      this.$parent.getMaterialList()
      this.$parent.editWebsiteElementId = this.bannerInfo.websiteElementId
    },
    toArticle(data) {
      this.$parent.dialogArticle = true
      this.$parent.articleForm = data
      this.$parent.srcList = data.children.map((x) => x.coverAttachmentUrl)
      this.$parent.editWebsiteElementId = data.id
    },
    getTree() {
      const that = this
      getTreeInfo(that.dataForm).then((res) => {
        const resData = res.data[0]
        debugger
        getMaterialList(resData.children[0].websiteElementId).then((ress) => {
          debugger
          that.bannerInfo = ress.data.children[0]
          that.bannerInfo.id = resData.children[0].websiteElementId
        })
        getArticlelList(resData.children[1].websiteElementId).then((resone) => {
          that.oneView = resone.data
          that.oneView.id = resData.children[1].websiteElementId
        })
        getArticlelList(resData.children[2].websiteElementId).then((restwo) => {
          that.twoView = restwo.data
          that.twoView.id = resData.children[2].websiteElementId
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.el-row {
  width: 100%;
}
</style>
