<template>
  <!-- <footer> -->

  <div class="footerbox">
    <div class="footer clearfloat">
      <div class="fast_nav">
        <div class="fast_tit">
          友情链接
        </div>
        <div class="fast_list">
          <p v-for="(item,index) in linkList" :key="index"><a :href="item.redirectUrl">{{ item.title }}</a></p>
        </div>
      </div>
      <div class="fast_nav">
        <div class="fast_tit">
          快速导航
        </div>
        <div class="fast_list">
          <p v-for="(item,index) in menuList" :key="index"><a :href="item.redirectUrl">{{ item.title }}</a></p>
        </div>
      </div>
      <div class="contus">
        <div class="fast_tit">
          联系我们
        </div>
        <div class="fast_list">
          <p>{{ com.enterpriseName }}</p>
          <p>地址：{{ com.enterpriseAddress }}</p>
          <p>邮箱：{{ com.enterpriseEmail }}</p>
          <p>电话：{{ com.contactPhone }}</p>
        </div>
      </div>
      <div v-if="com.wechatQrAttachmentUrl" class="code">
        <div class="code_pic">
          <img :src="com.wechatQrAttachmentUrl">
        </div>
        <div class="code_text">
          微信公众号
        </div>
      </div>
    </div>
    <div class="copy">
      Copyright © 东莞七巧网络科技有限公司.
    </div>
  </div>
</template>

<script>

export default {
  name: 'Footer',
  props: {
    com: {
      type: Object,
      default: () => {}
    },
    linkList: {
      type: Array,
      default: () => {}
    },
    menuList: {
      type: Array,
      default: () => {}
    }

  },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.footerbox{box-sizing:border-box;padding-top:36px;width:100%;background-color:#35363e;position: relative;}
.footer{margin:auto;max-width:1140px;width:95%;display: flex;justify-content: space-between}
.fast_tit{margin-bottom:19px;height:22px;color:#fff;font-size:16px;line-height:22px}
.fast_list{color:#ccc;font-size:12px;line-height:28px}
.fast_list a{color:#ccc}
.fast_list a:hover{color:#048ef6}
.code{width:130px}
.code img{display:block;width:100%}
.code_text{margin-top:10px;height:22px;font-size:16px;line-height:22px}
.code_text,.copy{color:#fff;text-align:center}
.copy{
    border-top: 1px solid rgba(216,216,216,0.16);
    font-size: 12px;
    padding: 20px;
    text-align: center;
    width: 100%;
    }

</style>
