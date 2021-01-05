<template>
  <!-- <footer> -->
  <footer id="fh5co-footer" role="contentinfo">
    <div class="container">
      <div class="row row-pb-md">
        <div class="col-md-4 fh5co-widget">
          <h3>{{ com.enterpriseName }}</h3>
          <p>{{ com.enterpriseInstruction }}</p>
        </div>
        <div class="col-md-2 col-sm-4 col-xs-6 col-md-push-1">
          <ul class="fh5co-footer-links">
            <li v-for="(item,index) in menuList" :key="index"><a :href="item.redirectUrl">{{ item.title }}</a></li>

          </ul>
        </div>

        <div class="col-md-2 col-sm-4 col-xs-6 col-md-push-1">
          <ul class="fh5co-footer-links">
            <li v-for="(item,index) in linkList" :key="index"><a :href="item.redirectUrl">{{ item.title }}</a></li>

          </ul>
        </div>

        <div class="col-md-4 col-sm-4 col-xs-6 col-md-push-1">
          <ul class="fh5co-footer-links">
            <li>地址：{{ com.enterpriseAddress }}</li>
            <li>邮箱：{{ com.enterpriseEmail }}</li>
            <li>联系人{{ com.corporateContactName }}</li>
            <li>电话：{{ com.contactPhone }}</li>
          </ul>
        </div>
      </div>

      <div class="row copyright">
        <div class="col-md-12 text-center">
          <p>
            <small class="block">Copyright © 东莞七巧网络科技有限公司.</small>
          </p>
        </div>
      </div>

    </div>
  </footer>

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

</style>
