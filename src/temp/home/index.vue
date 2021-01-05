<template>
  <div>
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
                style="color: #fe5a2c"
              >
                {{ item.title }}
              </h1>
              <br>
              <p :class="{ fadeInUp: slider_index == index }">
                {{ item.subtitle }}
              </p>
              <br>
            </figcaption>
          </figure>
        </el-carousel-item>
      </el-carousel>
    </section>
    <section v-show="twoView.isDeleted===0" class="academic-area pt-80 pb-80" @click="toArticle(twoView)">
      <div class="featured-courses-shape" />
      <div class="container">
        <el-row :gutter="20">
          <el-col
            :span="24"
          ><div class="section-title text-center mb-40">
            <h2>
              <span>{{ twoView.title }}</span>
            </h2>
            <p>{{ twoView.subtitle }}</p>
          </div>
          </el-col>
        </el-row>
        <div class="academic-list">
          <el-row :gutter="20">
            <el-col
              v-for="(item, index) in twoView.children"
              :key="index"
              :span="6"
              ontouchstart="this.classList.toggle('hover');"
            >
              <div class="academic-container">
                <div
                  class="front"
                  :style="
                    'background-image: url(' + item.coverAttachmentUrl + ')'
                  "
                >
                  <div class="inner">
                    <p class="ov3">{{ item.articleTitle }}</p>
                    <!-- <span>{{item.articleTitle}}</span> -->
                  </div>
                </div>
                <div class="back">
                  <div class="inner">
                    <p class="ov13">
                      {{ item.articleDescription }}
                    </p>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="courses-shape">
        <img src="../img/courses/courses_shape01.png" alt="">
      </div>
      <div class="courses-shape courses-shape-2">
        <img src="../img/courses/courses_shape02.png" alt="">
      </div>
    </section>
    <section
      v-show="fiveView.isDeleted===0"
      class="cta-area cta-bg"
      :style="'background-image: url(' + oneViewDs.coverAttachmentUrl + ')'"
      @click="toArticle(oneView)"
    >
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-10">
            <div class="section-title white-title text-center mb-15 web-font">
              <h2 class="web-font mb-20">
                <span>{{ oneViewDs.articleTitle }}</span>
              </h2>
              <p>
                {{ oneViewDs.articleDescription }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- cta-area-end -->

    <!-- top-courses -->
    <section v-show="threeView.isDeleted===0" class="top-courses pt-110 pb-70" @click="toArticle(threeView)">
      <div class="courses-overlay-text">News</div>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-7 col-lg-9">
            <div class="section-title text-center mb-70">
              <h2>
                <span>{{ threeView.title }}</span>
              </h2>
              <p>{{ threeView.subtitle }}</p>
            </div>
          </div>
        </div>

        <el-row :gutter="20">
          <el-col
            v-for="(item, index1) in threeView.children"
            :key="index1"
            :span="8"
            class="grid-item grid-sizer cat-three cat-four"
          >
            <div class="top-courses-item top-courses-two mb-50">
              <div class="top-courses-thumb">
                <a
                  target="_blank"
                ><img
                  :src="item.coverAttachmentUrl"
                  alt=""
                ></a>
                <!-- <div class="bestseller">燕英资讯</div> -->
              </div>
              <div class="top-courses-content">
                <div class="top-courses-tag">
                  <span>{{ item.articleTitle }}</span>
                </div>
                <p>
                  {{ item.articleDescription }}
                </p>
                <div class="top-courses-bottom">
                  <ul>
                    <li class="courses-avatar">
                      <i class="far fa-user-circle" />{{ item.articleAuthor }}
                    </li>
                    <li class="courses-price">{{ item.createTime }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </section>
    <!-- top-courses-end -->

    <!-- category-area -->
    <section
      v-show="fourView.isDeleted===0"
      class="category-area category-bg pt-110 pb-100"
      @click="toArticle(fourView)"
    >
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-7 col-lg-9">
            <div class="section-title text-center mb-70">
              <h2>
                <span>{{ fourView.title }}</span>
              </h2>
              <p>{{ fourView.subtitle }}</p>
            </div>
          </div>
        </div>
        <el-row :gutter="10">
          <el-col
            v-for="(item, index2) in fourView.children"
            :key="index2"
            :span="4"
          >
            <div class="category-item">
              <a>
                <img :src="item.coverAttachmentUrl">
                <span>{{ item.articleTitle }}<br></span>
              </a>
            </div>
          </el-col>
        </el-row>
      </div>
    </section>
    <!-- category-area-end -->

    <!-- Blog-area -->
    <section
      v-show="fiveView.isDeleted===0"
      class="blog-area position-relative pt-110 pb-90"
      style="position: relative"
      @click="toArticle(fiveView)"
    >
      <div class="blog-bg" />
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-7 col-lg-9">
            <div class="section-title full-white-title text-center mb-70">
              <h2>{{ fiveView.title }}</h2>
              <p>{{ fiveView.subtitle }}</p>
            </div>
          </div>
        </div>
        <el-row :gutter="20">
          <el-col
            v-for="(item, index3) in fiveView.children"
            :key="index3"
            :span="8"
          >
            <div class="blog-post-item mb-30">
              <div class="blog-post-thumb position-relative">
                <a
                  target="_blank"
                ><img
                  :src="item.coverAttachmentUrl"
                  alt=""
                ></a>
              </div>
              <div class="blog-post-content">
                <div class="blog-post-meta">
                  <ul>
                    <li><i class="far fa-user" />{{ item.articleAuthor }}</li>
                    <li>
                      <i class="far fa-calendar-alt" />{{ item.createTime }}
                    </li>
                  </ul>
                </div>
                <h4>
                  <a target="_blank">{{ item.articleTitle }}</a>
                </h4>
                <p>
                  {{ item.articleDescription }}
                </p>
                <a class="arrow-btn" target="_blank">Read More <span /></a>
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
  getBannerList,
  getArticlelList
} from '@/api/tempApi.js'

export default {
  name: 'Home',
  data() {
    return {
      slider_index: 0,
      bannerInfo: [],
      oneViewDs: {},
      dataForm: {
        websiteTemplateId: 1,
        parentElementId: 1
      },
      oneView: {},
      twoView: {},
      threeView: {},
      fourView: {},
      fiveView: {}
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
        const resData = res.data[0]
        getBannerList(resData.children[0].websiteElementId).then((resone) => {
          that.bannerInfo = resone.data.children
          that.bannerInfo.id = resData.children[0].websiteElementId
        })
        getArticlelList(resData.children[1].websiteElementId).then((restwo) => {
          that.twoView = restwo.data
          that.twoView.id = resData.children[1].websiteElementId
        })
        getArticlelList(resData.children[2].websiteElementId).then((ress) => {
          that.oneView = ress.data
          that.oneViewDs = ress.data.children[0]
          that.oneView.id = resData.children[2].websiteElementId
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
        getArticlelList(resData.children[5].websiteElementId).then(
          (resfive) => {
            that.fiveView = resfive.data
            that.fiveView.id = resData.children[5].websiteElementId
          }
        )
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
