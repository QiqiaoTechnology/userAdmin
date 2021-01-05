<template>
  <nav class="fh5co-nav" role="navigation">
    <div class="container">
      <div class="row">
        <div class="col-xs-2">
          <div id="fh5co-logo"> <img :src="logoImg"></div>
        </div>
        <div class="col-xs-10 text-right menu-1">
          <ul>
            <li
              v-for="(item, index) in titleList"
              :key="index"
              @click="selected(item.title)"
            > <router-link
              v-if="item.redirectUrl && item.isDeleted === 0"
              :to="item.redirectUrl"
              :class="{ active: active == item.title }"
            >{{ item.title }}</router-link></li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { getMenuList } from '@/api/tempApi.js'
export default {
  name: 'Header',
  props: {
    bgColor: {
      type: String,
      default: 'transparent'
    },
    hdPosition: {
      type: String,
      default: 'fixed'
    },
    logoImg: {
      type: String,
      default: ''
    },
    hoverFlag: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      active: '首页',
      titleList: [
        {
          title: '首页',
          redirectUrl: '/home'
        }
      ]
    }
  },
  created() {
    this.getMenuList()
  },

  mounted() {
    this.active = this.$route.meta.nav
  },
  methods: {
    getMenuList() {
      getMenuList(3).then((res) => {
        debugger
        this.titleList = res.data
        this.$parent.titleList = res.data
      })
    },
    selected(title) {
      this.active = title
    },
    toHome() {
      this.$router.push('/home')
      this.active = '首页'
    }
  }
}
</script>

<style lang="scss" scoped>
$white: #ffffff;
@mixin rim {
  background: transparent none repeat scroll 0 0;
  content: "";
  height: 10px;
  position: absolute;
  width: 25px;
  visibility: hidden;
  transition: 0.3s ease;
  opacity: 0;
}
.fh5co-nav {

    ul {
      font-family: "Arial", "Microsoft YaHei", "黑体", "宋体", sans-serif;
      font-weight: bold;
      display: flex;
      list-style: none;
      li {
        margin-right: 10px;
        box-sizing: border-box;
        position: relative;
        text-align: center;
        line-height: 32px;
        cursor: pointer;
        a {
          display: block;
          line-height: 20px;
          padding: 6px 15px;
          text-decoration: none;
          box-sizing: border-box;
          color: $white;
          position: relative;
          background-color: transparent;
          text-transform: uppercase;
          transition: 0.3s ease;
          &.active {
            color: #50CB86;
            &::before {
              visibility: visible;
              opacity: 1;
              left: 0;
            }
            &::after {
              visibility: visible;
              opacity: 1;
              right: 0;
            }
          }
          &:hover {
            background: none;
            color: #50CB86;
            outline: none;
            &::before {
              visibility: visible;
              opacity: 1;
              left: 0;
            }
            &::after {
              visibility: visible;
              opacity: 1;
              right: 0;
            }
          }
          &::before {
            @include rim;
            border-left: 1px solid #50CB86;
            border-top: 1px solid #50CB86;
            top: 0;
            left: -70px;
          }
          &::after {
            @include rim;
            border-right: 1px solid #50CB86;
            border-bottom: 1px solid #50CB86;
            bottom: 0;
            right: 70px;
          }
        }
      }
    }
  }

// 动画
@keyframes shine {
  from {
    background-position: 130%;
  }
  to {
    background-position: -50%;
  }
}
</style>
