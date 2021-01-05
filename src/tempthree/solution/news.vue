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

    <!-- blog-area -->
    <section v-show="oneView.isDeleted===0" id="newlist" class="blog-area gray-bg pt-60 pb-60" @click.prevent="toArticle(oneView)">
      <!-- Newsletter -->
      <div class="newsletter">
        <div class="container">
          <div class="event_items">
            <!-- Event Item -->
            <div v-for="(item,index) in oneView.children" :key="index" class="row event_item">
              <div class="col">
                <div class="row d-flex flex-row align-items-between">
                  <div class="col-lg-2 col-xs-12">
                    <div
                      class="event_date d-flex flex-column align-items-center justify-content-center"
                    >
                      <div class="event_day" :title="item.createTime">{{ item.createTime }}</div>
                    </div>
                  </div>
                  <div class="col-lg-6 col-xs-12">
                    <div class="event_content">
                      <div class="event_name"><a class="trans_200" href="#">{{ item.articleTitle }}</a></div>
                      <div class="event_location">来源：{{ item.articleAuthor||'空' }}</div>
                      <p>{{ item.articleDescription }}
                      </p>
                    </div>
                  </div>
                  <div class="col-lg-4 col-xs-12">
                    <div class="event_image">
                      <a href="#"><img :src="item.coverAttachmentUrl" alt=""></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- blog-area-end -->

  </div>
</template>
<script>
import {
  getTreeInfo,
  getMaterialList,
  getArticlelList

} from '@/api/tempApi.js'
export default {
  inject: ['reload'],
  data() {
    return {
      bannerInfo: {},

      dataForm: {
        websiteTemplateId: 3,
        parentElementId: 1045
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
/*********************************
10. Newsletter
*********************************/
.event_name a {
    font-size: 22px;
    font-weight: 500;
    color: #1a1a1a;
}
.event_item {
    margin-bottom: 56px;
}
.event_location {
    font-size: 14px;
    font-weight: 500;
    color: #1a1a1a;
    margin-top: 2px;
}
.event_content p {
    font-weight: 500;
    color: #a5a5a5;
    margin-top: 21px;
    margin-bottom: 13px;
}
.flex-row {
    -ms-flex-direction: row!important;
     flex-direction: row!important;
}
.d-flex {
    display: -ms-flexbox!important;
    display: flex!important;
}
.align-items-center{
 align-items: center!important;
}
.justify-content-center{
 justify-content: center!important;
}
.newsletter
{
	width: 100%;
	background: #FFFFFF;
	padding: 7em 0;
    clear: both;
  z-index: 2;

}
 .event_date {
    width: 100%;
    height: 131px;
    border: solid 2px #009688;
    margin-bottom: 18px;
    margin-top: 5px;
}
  .event_day {
    width: 135px;
    white-space: nowrap;
    word-break: keep-all;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 40px;
    font-weight: 700;
    color: #009688;
    margin-bottom: 1px;
    line-height: 1;
}

.newsletter_border
{
	width: 100%;
	border-top: solid 2px #e3e3e3;
}
.newsletter_content
{
	padding-top: 88px;
}
.newsletter_title
{
	font-size: 30px;
	font-weight: 500;
	color: #1b1b1b;
}
.newsletter_text
{
	margin-top: 8px;
}
.newsletter_form_container
{
	width: 100%;
	margin-top: 46px;
}
.newsletter_form
{
	width: 100%;
}
.newsletter_input
{
	width: 100%;
	height: 40px;
	border: none;
	border-bottom: solid 2px #787878;
	outline: none;
	text-align: center;
}
.newsletter_button
{
	position: relative;
	width: 178px;
	height: 61px;
	border: solid 2px #1b1b1b;
	background: #FFFFFF;
	cursor: pointer;
	/* margin-top: 55px; */
	overflow: hidden;
}
.newsletter_button span
{
	display: block;
	position: relative;
	z-index: 10;
	font-size: 16px;
	font-weight: 600;
	color: #1b1b1b;
	background: none;
	-webkit-transition: all 200ms ease;
	-moz-transition: all 200ms ease;
	-ms-transition: all 200ms ease;
	-o-transition: all 200ms ease;
	transition: all 200ms ease;
}
.newsletter_button::after
{
	content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 150%;
    height: 100%;
    background: #1b1b1b;
    z-index: 0;
    opacity: 0;
    -webkit-transform: rotate3d(0, 0, 1, -45deg) translate3d(0, -3em, 0);
    transform: rotate3d(0, 0, 1, -45deg) translate3d(0, -3em, 0);
    -webkit-transform-origin: 0% 100%;
    transform-origin: 0% 100%;
    -webkit-transition: -webkit-transform 0.3s, opacity 0.3s, background-color 0.3s;
    transition: transform 0.3s, opacity 0.3s, background-color 0.3s;
}
.newsletter_button:hover::after
{
	opacity: 1;
    -webkit-transform: rotate3d(0, 0, 1, 0deg);
    transform: rotate3d(0, 0, 1, 0deg);
    -webkit-transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
    transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
}
.newsletter_button:hover span
{
	color: #FFFFFF;
}

</style>
