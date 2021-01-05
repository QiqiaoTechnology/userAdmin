<template>
  <div>
    <!-- Header -->
    <header id="home">
      <!-- Background Image -->
      <div class="bg-img" style="background-image: url('../img/background1.jpg');">
        <div class="overlay" />
      </div>
      <!-- /Background Image -->

      <!-- Nav -->
      <nav id="nav" class="navbar nav-transparent">
        <div class="container">

          <div class="navbar-header">
            <!-- Logo -->
            <div class="navbar-brand">
              <a href="index.html">
                <img class="logo" :src="companyForm.enterpriseLogoAttachmentUrl" alt="logo">
                <img class="logo-alt" :src="companyForm.enterpriseLogoAttachmentUrl" alt="logo">
              </a>
            </div>
            <!-- /Logo -->

            <!-- Collapse nav button -->
            <div class="nav-collapse">
              <span />
            </div>
            <!-- /Collapse nav button -->
          </div>

          <!--  Main navigation  -->
          <ul class="main-nav nav navbar-nav navbar-right">
            <li><a href="#">首页</a></li>
            <li v-for="(item,index) in titleList" :key="index"><a v-if="item.isDeleted!==1" :href="'#'+item.websiteElementId">{{ item.title }}</a></li>
          </ul>
          <!-- /Main navigation -->

        </div>
      </nav>
      <!-- /Nav -->
      <section class="home-wrapper" @click="toBannerEdit(bannerInfo)">
        <el-carousel trigger="click" height="100vh">
          <el-carousel-item
            v-for="(item, index) in bannerInfo.bannerDetailList"
            :key="index"
          >

            <img :src="item.attachmentUrl" width="100%">
            <div class="home-content">
              <h1 class="white-text">{{ item.title }}</h1>
              <p class="white-text">{{ item.subtitle }}
              </p>

            </div>
          </el-carousel-item>
        </el-carousel>
      </section>

    </header>
    <!-- /Header -->
    <!-- Why Choose Us -->
    <div v-show="oneView.isDeleted===0" :id="oneView.websiteElementId" class="section md-padding bg-grey" @click="toArticle(oneView)">
      <!-- Container -->
      <div class="container">
        <!-- Row -->
        <div class="row">
          <!-- why choose us content -->
          <div class="col-md-6">
            <div class="section-header">
              <h2 class="title">{{ oneView.title }}</h2>
            </div>
            <h3>{{ oneViewDS.articleTitle }}</h3>
            <p>{{ oneViewDS.articleDescription }}</p>

          </div>
          <!-- /why choose us content -->

          <!-- About slider -->
          <div class="col-md-6">
            <img :src="oneViewDS.coverAttachmentUrl" alt="">
          </div>
          <!-- /About slider -->

        </div>
        <!-- /Row -->

      </div>
      <!-- /Container -->

    </div>
    <!-- /Why Choose Us -->
    <!-- About -->
    <div v-show="twoView.isDeleted===0" :id="twoView.websiteElementId" class="section md-padding" @click="toArticle(twoView)">
      <!-- Container -->
      <div class="container">
        <!-- Row -->
        <div class="row">
          <!-- Section header -->
          <div class="section-header text-center">
            <h2 class="title">{{ twoView.title }}</h2>
          </div>
          <!-- /Section header -->
          <!-- about -->
          <div v-for="(item,index) in twoView.children" :key="index" class="col-md-4">
            <div class="about">
              <img :src="item.coverAttachmentUrl">
              <h3>{{ item.articleTitle }}</h3>
              <p>{{ item.articleDescription }}</p>
            </div>
          </div>
          <!-- /about -->
        </div>
        <!-- /Row -->
      </div>
      <!-- /Container -->
    </div>
    <!-- /About -->
    <!-- Portfolio -->
    <div v-show="threeView.isDeleted===0" :id="threeView.websiteElementId" class="section md-padding bg-grey" @click="toArticle(threeView)">
      <!-- Container -->
      <div class="container">
        <!-- Row -->
        <div class="row">
          <!-- Section header -->
          <div class="section-header text-center">
            <h2 class="title">{{ threeView.title }}</h2>
          </div>
          <!-- /Section header -->
          <!-- Work -->
          <div v-for="(item,index) in threeView.children" :key="index" class="col-md-4 col-xs-6 work">
            <img class="img-responsive" :src="item.coverAttachmentUrl" alt="">
            <div class="overlay" />
            <div class="work-content">
              <span>{{ item.articleTitle }}</span>
              <h3>{{ item.articleDescription }}</h3>
            </div>
          </div>
          <!-- /Work -->
        </div>
        <!-- /Row -->
      </div>
      <!-- /Container -->
    </div>
    <!-- /Portfolio -->
    <!-- Team -->
    <div v-show="fourView.isDeleted===0" :id="fourView.websiteElementId" class="section md-padding" @click="toArticle(fourView)">
      <!-- Container -->
      <div class="container">
        <!-- Row -->
        <div class="row">
          <!-- Section header -->
          <div class="section-header text-center">
            <h2 class="title">{{ fourView.title }}</h2>
          </div>
          <!-- /Section header -->
          <!-- team -->
          <div v-for="(item,index) in fourView.children" :key="index" class="col-sm-4">
            <div class="team">
              <div class="team-img">
                <img class="img-responsive" :src="item.coverAttachmentUrl" alt="">
                <div class="overlay" />
              </div>
              <div class="team-content">
                <h3>{{ item.articleTitle }}</h3>
                <span>{{ item.articleDescription }}</span>
              </div>
            </div>
          </div>
          <!-- /team -->
        </div>
        <!-- /Row -->

      </div>
      <!-- /Container -->

    </div>
    <!-- /Team -->
    <!-- Blog -->
    <div v-show="fiveView.isDeleted===0" :id="fiveView.websiteElementId" class="section md-padding bg-grey" @click="toArticle(fiveView)">

      <!-- Container -->
      <div class="container">

        <!-- Row -->
        <div class="row">

          <!-- Section header -->
          <div class="section-header text-center">
            <h2 class="title">{{ fiveView.title }}</h2>
          </div>
          <!-- /Section header -->

          <!-- blog -->
          <div v-for="(item,index) in fiveView.children" :key="index" class="col-md-4">
            <div class="blog">
              <div class="blog-img">
                <img class="img-responsive" :src="item.coverAttachmentUrl" alt="">
              </div>
              <div class="blog-content">
                <ul class="blog-meta">
                  <li v-if="item.articleAuthor"><i class="el-icon-user-solid" />{{ item.articleAuthor }}</li>
                  <li><i class="el-icon-date" />{{ item.createTime }}</li>
                </ul>
                <h3>{{ item.articleTitle }}</h3>
                <p>{{ item.articleDescription }}</p>
              </div>
            </div>
          </div>
          <!-- /blog -->
        </div>
        <!-- /Row -->

      </div>
      <!-- /Container -->

    </div>
    <!-- /Blog -->
    <!-- Contact -->
    <div id="contact" class="section md-padding">

      <!-- Container -->
      <div class="container">
        <!-- Row -->
        <div class="row">
          <!-- contact -->
          <div class="col-sm-4">
            <div class="contact">
              <i class="el-icon-mobile" />
              <h3>Phone</h3>
              <p>{{ companyForm.contactPhone }}</p>
            </div>
          </div>
          <!-- /contact -->

          <!-- contact -->
          <div class="col-sm-4">
            <div class="contact">
              <i class="el-icon-message" />
              <h3>Email</h3>
              <p>{{ companyForm.enterpriseEmail }}</p>
            </div>
          </div>
          <!-- /contact -->

          <!-- contact -->
          <div class="col-sm-4">
            <div class="contact">
              <i class="el-icon-position" />
              <h3>Address</h3>
              <p>{{ companyForm.enterpriseAddress }}</p>
            </div>
          </div>
          <!-- /contact -->
        </div>
        <!-- /Row -->

      </div>
      <!-- /Container -->

    </div>
    <!-- /Contact -->

    <!-- Footer -->
    <footer id="footer" class="sm-padding bg-dark">

      <!-- Container -->
      <div class="container">

        <!-- Row -->
        <div class="row">

          <div class="col-md-12">

            <!-- footer logo -->
            <div class="footer-logo">
              <a href="#"><img :src="companyForm.enterpriseLogoAttachmentUrl" alt="logo"></a>
            </div>
            <!-- /footer logo -->

            <!-- footer follow -->
            <ul class="footer-follow">
              <li v-for="(item,index) in linkList" :key="index"><a :href="item.redirectUrl">{{ item.title }}</a></li>

            </ul>
            <!-- /footer follow -->

            <!-- footer copyright -->
            <div class="footer-copyright">
              <p>Copyright 东莞七巧网络科技有限公司</p>
            </div>
            <!-- /footer copyright -->

          </div>

        </div>
        <!-- /Row -->

      </div>
      <!-- /Container -->

    </footer>
    <!-- /Footer -->

    <!-- Back to top -->
    <div id="back-to-top" />
    <!-- /Back to top -->

  </div>
</template>
<script>
import {
  getTreeInfo,
  getBannerList,
  getArticlelList
} from '@/api/tempApi.js'
import {
  getBasicColumnList,
  getEnterpriseInfo
} from '@/api/website.js'
export default {
  name: 'Home',
  data() {
    return {
      companyForm: {},
      linkList: [],
      titleList: [],
      bannerInfo: [],
      oneViewDS: {},
      dataForm: {
        websiteTemplateId: 2,
        parentElementId: 501
      },
      oneView: {},
      twoView: {},
      threeView: {},
      fourView: {},
      fiveView: {}

    }
  },
  created() {
    this.getEnterpriseInfo()
    this.getBasicColumnList()
    this.getTree()
  },
  methods: {
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
    getTree() {
      const that = this
      getTreeInfo(that.dataForm).then((res) => {
        const resData = res.data[0]
        that.titleList = []
        for (let i = 1; i < resData.children.length; i++) {
          const titleData = {
            websiteElementId: resData.children[i].websiteElementId,
            title: resData.children[i].title,
            isDeleted: resData.children[i].isDeleted
          }
          that.titleList.push(titleData)
        }
        getBannerList(resData.children[0].websiteElementId).then((resone) => {
          that.bannerInfo = resone.data.children
          that.bannerInfo.id = resData.children[0].websiteElementId
        })
        // 公司
        getArticlelList(resData.children[1].websiteElementId).then((restwo) => {
          that.oneView = restwo.data
          that.oneViewDS = restwo.data.children[0]
          that.oneView.id = resData.children[1].websiteElementId
        })
        getArticlelList(resData.children[2].websiteElementId).then((ress) => {
          that.twoView = ress.data
          that.twoView.id = resData.children[2].websiteElementId
        })
        getArticlelList(resData.children[3].websiteElementId).then((resthree) => {
          that.threeView = resthree.data
          that.threeView.id = resData.children[3].websiteElementId
        })

        getArticlelList(resData.children[4].websiteElementId).then((resfour) => {
          that.fourView = resfour.data
          that.fourView.id = resData.children[4].websiteElementId
        })
        getArticlelList(resData.children[5].websiteElementId).then((resfive) => {
          that.fiveView = resfive.data
          that.fiveView.id = resData.children[5].websiteElementId
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
