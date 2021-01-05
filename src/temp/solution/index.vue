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

    <!-- team-area -->
    <section v-show="oneView.isDeleted===0" id="teacherlist" class="team-area pt-50 pb-70" @click="toArticle(oneView)">
      <div class="container">
        <div class="">
          <div class="section-title mb-40">
            <h2><span>{{ oneView.title }}</span></h2>
            <p class="ov3">
              {{ oneView.subtitle }}
            </p>
          </div>
        </div>
        <el-row :gutter="20">
          <el-col v-for="(item, index) in oneView.children" :key="index" :span="6">
            <div class="team-box mb-50">
              <div class="team-thumb mb-20">
                <img :src="item.coverAttachmentUrl">
                <ul class="team-social">
                  <li><a @click="toInfo(item)">READ MORE</a></li>
                </ul>
              </div>
              <div class="team-content">
                <h4>
                  <a @click="toInfo(item)">{{ item.articleTitle }}<span>.</span></a>
                </h4>
                <span class="ov3">{{ item.articleDescription }}</span>
              </div>
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
        parentElementId: 26
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
    toInfo(data) {
      const dataval = {
        articleDescription: data.articleDescription,
        articleTitle: data.articleTitle,
        coverAttachmentUrl: data.coverAttachmentUrl,
        title: this.bannerInfo.title,
        attachmentUrl: this.bannerInfo.attachmentUrl
      }
      this.$router.push({
        path: '/teacher/Info',
        query: dataval
      })
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
