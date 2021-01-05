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

    <section v-show="oneView.isDeleted===0" class="step-content pt-95 pb-70" @click="toArticle(oneView)">
      <div id="fh5co-services-section">
        <div class="container">
          <div v-for="(item,index) in oneView.children" :key="index" class="col-md-4 col-sm-4">
            <div class="feature-center">
              <img :src="item.coverAttachmentUrl" alt="">
              <h3>{{ item.articleTitle }}</h3>
              <p>{{ item.articleDescription }}</p>
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
        parentElementId: 1029
      },
      oneView: {}
    }
  },
  created() {
    this.getTree()
  },
  methods: {
    toArticle(data) {
      this.$parent.dialogArticle = true
      this.$parent.articleForm = data

      this.$parent.srcList = data.children.map((x) => x.coverAttachmentUrl)

      this.$parent.editWebsiteElementId = data.id
    },
    toEditMaterial() {
      this.$parent.dialogMaterial = true
      this.$parent.getMaterialList()
      this.$parent.editWebsiteElementId = this.bannerInfo.websiteElementId
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
img {
  max-width: 92%;
  margin: 0px 20px;
}
</style>
