<template>
  <div>
    <section
      class="breadcrumb-area breadcrumb-bg"
      :style="'background-image: url(' + bannerInfo.attachmentUrl + ')'"
      @click="toEditMaterial(bannerInfo)"
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

    <section v-show="oneView.isDeleted===0" class="campus-area pt-70" @click="toArticle(oneView)">
      <div class="container">
        <div class="col-xl-12 col-lg-12">
          <div class="section-title text-center mb-40">
            <h2>
              <span>{{ oneView.title }}</span>
            </h2>
            <p>{{ oneView.subtitle }}</p>
          </div>
        </div>
        <div
          v-for="(item, index) in oneView.children"
          :key="index"
          class="campus-box"
        >
          <img :src="item.coverAttachmentUrl">
          <div class="campus-box-content">
            <h3 class="title">{{ item.articleTitle }}</h3>
            <span class="post">{{ item.articleDescription }}</span>
          </div>
          <p>{{ item.articleTitle }}</p>
        </div>
      </div>
    </section>
    <!-- category-area -->
    <section class="category-area pt-20 pb-20">
      <div class="container">
        <el-row
          :gutter="20"
          type="flex"
          justify="space-between"
          class="category-gutters"
        >
          <el-col v-for="(item, indexs) in twoView" :key="indexs" :span="4">
            <div class="category-item">
              <a @click="toEditMaterial(item)">
                <img :src="item.attachmentUrl">
                <span>{{ item.title }}</span>
              </a>
            </div>
          </el-col>
        </el-row>
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
        parentElementId: 53
      },
      oneView: {},
      twoView: {}
    }
  },
  mounted() {
    this.getTree()
  },
  methods: {
    toEditMaterial(data) {
      this.$parent.dialogMaterial = true
      this.$parent.getMaterialList()
      this.$parent.editWebsiteElementId = data.websiteElementId
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
        getMaterialList(resData.children[2].websiteElementId).then((restwo) => {
          that.twoView = restwo.data.children
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
