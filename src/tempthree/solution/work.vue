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

    <section v-show="oneView.isDeleted===0" id="jobData" class="join-area pt-70 pb-40" @click="toArticle(oneView)">
      <div id="fh5co-portfolio">
        <div class="container">
          <div class="row animate-box">
            <div class="col-md-8 col-md-offset-2 text-center fh5co-heading">
              <h2>{{ oneView.title }}</h2>
              <p>{{ oneView.subtitle }}</p>
            </div>
          </div>
          <div class="row">
            <div v-for="(item,index) in oneView.children" :key="index" class="col-md-4 col-sm-4 text-center animate-box">
              <div class="work-grid" :style="'background-image: url('+item.coverAttachmentUrl+')'">
                <div class="desc">
                  <h3><a href="#">{{ item.articleTitle }}</a></h3>
                  <span class="cat">{{ item.articleAuthor }}</span>
                  <p>
                    {{ item.articleDescription }}
                  </p>
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
        parentElementId: 1037
      },
      oneView: {}
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

        getMaterialList(resData.children[0].websiteElementId).then((ress) => {
          that.bannerInfo = ress.data.children[0]
          that.bannerInfo.id = resData.children[0].websiteElementId
        })

        getArticlelList(resData.children[1].websiteElementId).then((resone) => {
          that.oneView = resone.data
          that.oneView.id = resData.children[1].websiteElementId
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
