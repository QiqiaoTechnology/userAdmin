<template>
  <div>
    <section
      class="breadcrumb-area breadcrumb-bg"
      :style="'background-image: url(' + bannerInfo.attachmentUrl + ')'"
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

    <section v-show="oneView.isDeleted===0" class="step-content pt-95 pb-70" @click="toArticle(oneView)">
      <div class="container-fluid w90">
        <div class="step-info">
          <div class="step-box">
            <ul class="step-ul clearfix">
              <li class="step-row-point step-row-top clearfix" />
              <div v-for="(item,index) in oneView.children" :key="index">
                <div v-if="index%2 !== 1">
                  <li class="step-row-left clearfix step-row">
                    <el-col :span="18">
                      <h2>{{ item.articleTitle }}</h2>
                      <p>
                        {{ item.articleDescription }}
                      </p>
                    </el-col>
                    <el-col :span="6">
                      <img :src="item.coverAttachmentUrl" alt="">
                    </el-col>
                  </li>
                  <li class="step-row-bottom clearfix" />
                </div>
                <div v-else-if="index%2 !== 0">
                  <li class="step-row-right clearfix step-row">
                    <el-col :span="6">
                      <img :src="item.coverAttachmentUrl" alt="">
                    </el-col>
                    <el-col :span="18">
                      <h2>{{ item.articleTitle }}</h2>
                      <p>
                        {{ item.articleDescription }}
                      </p>
                    </el-col>
                  </li>
                  <li class="step-row-bottom-one clearfix" />
                </div>
              </div>
              <li
                class="step-row-point step-row-top step-row-bot clearfix"
              />
            </ul>
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
        parentElementId: 85
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
