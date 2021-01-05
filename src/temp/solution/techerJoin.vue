<template>
  <div>
    <section
      class="breadcrumb-area breadcrumb-bg"
      :style="'background-image: url('+bannerInfo.attachmentUrl+')'"
      @click="toEditMaterial"
    >
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="breadcrumb-content text-center">
              <h2>{{ bannerInfo.title }}</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- breadcrumb-area-end -->

    <section v-show="oneView.isDeleted===0" id="jobData" class="join-area pt-70 pb-40" @click="toArticle(oneView)">
      <div class="container">
        <div class="col-xl-12 col-lg-12">
          <div class="section-title mb-40">
            <h2><span>{{ oneView.title }}</span></h2>
            <p>{{ oneView.subtitle }}</p>
          </div>
        </div>
        <div class="join-count">
          <div class="tabs-vertical">
            <div class="tabs-content-placeholder">
              <div class="tab-content-active tab-box">
                <div v-for="(item,index) in oneView.children" :key="index" class="infoBox">
                  <div v-html="item.articleContent" />

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
        websiteTemplateId: 1,
        parentElementId: 27
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
