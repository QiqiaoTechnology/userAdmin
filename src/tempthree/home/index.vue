<template>
  <div>
    <div id="page">
      <section @click="toBannerEdit(bannerInfo)">
        <el-carousel trigger="click" height="500px" @change="loadAnimate">
          <el-carousel-item
            v-for="(item, index) in bannerInfo.bannerDetailList"
            :key="index"
          >
            <figure>
              <img :src="item.attachmentUrl" width="100%">
              <figcaption>
                <h1
                  :class="{ bounceInDown: slider_index == index }"
                  style="text-align:center;font-size:45px;color:#fff;letter-spacing:5px"
                >
                  {{ item.title }}
                </h1>
                <br>
                <p :class="{ fadeInUp: slider_index == index }" style="text-align:center;color:#fff">
                  {{ item.subtitle }}
                </p>
                <br>
              </figcaption>
            </figure>
          </el-carousel-item>
        </el-carousel>
      </section>
      <section
        v-show="oneView.isDeleted === 0"
        class="academic-area pt-80 pb-80"
        @click="toArticle(oneView)"
      >
        <div class="container">
          <div class="row">
            <div id="fh5co-section">
              <div class="col-nineth">
                <div class="row">
                  <div
                    v-for="(item, index1) in oneView.children"
                    :key="index1"
                    class="col-third"
                  >
                    <div class="col-md-12">
                      <img
                        :src="item.coverAttachmentUrl"
                        alt=""
                      >
                      <div class="desc">
                        <h3>{{ item.articleTitle }}</h3>
                        <p>
                          {{ item.articleDescription }}
                        </p>

                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- category-area -->
      <section
        v-show="twoView.isDeleted === 0"
        @click="toArticle(twoView)"
      >
        <div class="fh5co-bg-section">
          <div class="container">
            <div class="row">
              <div id="fh5co-features-2">
                <div class="col-feature-9">
                  <div class="row">
                    <div class="col-md-12 fh5co-heading animate-box">
                      <h2>{{ twoView.title }}</h2>
                      <p>
                        {{ twoView.subtitle }}
                      </p>
                    </div>
                  </div>
                  <div v-for="(item,index) in twoView.children" :key="index" class="row">
                    <div
                      class="col-md-7 col-sm-7 col-md-pull-2 col-sm-pull-2 animate-box"
                      data-animate-effect="fadeInRight"
                    >
                      <div class="feature-image">
                        <img :src="item.coverAttachmentUrl" alt="work">
                      </div>
                    </div>
                    <div class="col-md-5 col-sm-5">
                      <div
                        class="feature-left animate-box"
                        data-animate-effect="fadeInLeft"
                        v-html="item.articleContent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        v-show="threeView.isDeleted === 0"
        class="category-area category-bg pt-110 pb-100"
        @click="toArticle(threeView)"
      >
        <div id="fh5co-portfolio">
          <div class="container">
            <div class="row animate-box">
              <div class="col-md-8 col-md-offset-2 text-center fh5co-heading">
                <h2>{{ threeView.title }}</h2>
                <p>
                  {{ threeView.subtitle }}
                </p>
              </div>
            </div>
            <div class="row">
              <div
                v-for="(item, index1) in threeView.children"
                :key="index1"
                class="project"
              >
                <div v-if="index1%2 !== 1">
                  <div
                    class="col-md-8 col-md-pull-1 animate-box"
                    data-animate-effect="fadeInLeft"
                  >
                    <img
                      class="img-responsive"
                      :src="item.coverAttachmentUrl"
                      alt="work"
                    >
                  </div>
                  <div
                    class="col-md-4 animate-box"
                    data-animate-effect="fadeInRight"
                  >
                    <div class="mt" v-html="item.articleContent" />
                  </div>
                </div>
                <div v-else>
                  <div
                    class="col-md-8 col-md-push-5 animate-box"
                    data-animate-effect="fadeInLeft"
                  >
                    <img
                      class="img-responsive"
                      :src="item.coverAttachmentUrl"
                      alt="work"
                    >
                  </div>
                  <div
                    class="col-md-4 col-md-pull-8 animate-box"
                    data-animate-effect="fadeInRight"
                  >
                    <div class="mt" v-html="item.articleContent" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
      <!-- category-area-end -->
      <section
        v-show="fourView.isDeleted === 0"
        @click="toArticle(fourView)"
      ><div id="fh5co-testimonial">
        <div class="container">
          <div class="row animate-box">
            <div class="col-md-8 col-md-offset-2 text-center fh5co-heading">
              <h2>{{ fourView.title }}</h2>
              <p>
                {{ fourView.subtitle }}
              </p>
            </div>
          </div>
          <div class="row">
            <div v-for="(item,index) in fourView.children" :key="index" class="col-md-4 animate-box">
              <div class="testimony">
                <blockquote>
                  {{ item.articleDescription }}
                </blockquote>
                <p class="author"><cite>{{ item.articleAuthor }}</cite></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </section>

      <!-- cta-area-end -->
    </div>
  </div>
</template>
<script>
import { getTreeInfo, getBannerList, getArticlelList } from '@/api/tempApi.js'

export default {
  name: 'Home',
  data() {
    return {
      slider_index: 0,
      bannerInfo: [],
      oneViewDs: {},
      dataForm: {
        websiteTemplateId: 3,
        parentElementId: 1001
      },
      oneView: {},
      twoView: {},
      threeView: {},
      fourView: {}
    }
  },
  created() {
    this.$emit('headFix', ['fixed', false])
    this.getTree()
  },
  methods: {
    toBannerEdit(data) {
      this.$parent.dialog = true
      this.$parent.itemForm = this.bannerInfo
      this.$parent.bannerEdit = false
      this.$parent.srcList = this.bannerInfo.bannerDetailList.map(
        (x) => x.attachmentUrl
      )
      this.$parent.editWebsiteElementId = this.bannerInfo.id
    },
    toArticle(data) {
      this.$parent.dialogArticle = true
      this.$parent.articleForm = data
      this.$parent.srcList = data.children.map((x) => x.coverAttachmentUrl)
      this.$parent.editWebsiteElementId = data.id
    },

    loadAnimate(index) {
      this.slider_index = index
    },
    getTree() {
      const that = this
      getTreeInfo(that.dataForm).then((res) => {
        debugger
        const resData = res.data[0]
        getBannerList(resData.children[0].websiteElementId).then((resone) => {
          that.bannerInfo = resone.data.children
          that.bannerInfo.id = resData.children[0].websiteElementId
        })
        getArticlelList(resData.children[1].websiteElementId).then((restwo) => {
          that.oneView = restwo.data
          that.oneView.id = resData.children[1].websiteElementId
        })
        getArticlelList(resData.children[2].websiteElementId).then((ress) => {
          that.twoView = ress.data
          that.twoView.id = resData.children[2].websiteElementId
        })
        getArticlelList(resData.children[3].websiteElementId).then(
          (resthree) => {
            that.threeView = resthree.data
            that.threeView.id = resData.children[3].websiteElementId
          }
        )
        getArticlelList(resData.children[4].websiteElementId).then(
          (resfour) => {
            that.fourView = resfour.data
            that.fourView.id = resData.children[4].websiteElementId
          }
        )
        // getArticlelList(resData.children[5].websiteElementId).then(
        //   (resfive) => {
        //     that.fiveView = resfive.data
        //     that.fiveView.id = resData.children[5].websiteElementId
        //   }
        // )
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.el-row {
  width: 100%;
}

figure {
  color: #ffffff;
  text-align: left;
  &::before {
    background: rgba(0, 0, 0, 0.4) none repeat scroll 0 0;
    content: "";
    height: 100%;
    position: absolute;
    width: 100%;
  }
  figcaption {
    bottom: 0;
    left: 6%;
    margin: 0 auto;
    position: absolute;
    right: 6%;
    top: 40%;
    width: 1170px;
    padding: 0 15px;
    h1 {
      font-size: 46px;
    }
    p {
      font-size: 18px;
      font-weight: 400;
    }
    .slider-button {
      background-color: #fe8724;
      border-color: #fe8724;
      color: #ffffff;
      width: 180px;
      height: 40px;
      font-size: 18px;
      transition: transform 2s;
      &:hover {
        transform: translateY(10px);
      }
    }
  }
}

// 动画类
.bounceInDown {
  animation: bounceInDown 1s linear;
}
.fadeInUp {
  animation: fadeInUp 1s linear;
}
</style>
