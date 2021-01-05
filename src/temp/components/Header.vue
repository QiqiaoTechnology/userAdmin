<template>
  <header :style="{ backgroundColor: bgColor, position: hdPosition }">
    <div>
      <div :class="{ img_hover: hoverFlag }" class="web_icon">
        <img :src="logoImg" @click="toHome">
      </div>
      <ul>
        <li
          v-for="(item, index) in titleList"
          :key="index"
          @click="selected(item.title)"
        >
          <router-link
            v-if="item.redirectUrl && item.isDeleted === 0"
            :to="item.redirectUrl"
            :class="{ active: active == item.title }"
          >{{ item.title }}</router-link>
          <el-dropdown
            v-else-if="item.isDeleted === 0"
            trigger="click"
            :class="{ active: active == item.title }"
          >
            <span class="el-dropdown-link">
              {{ item.title
              }}<i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="(i, sindex) in item.children"
                v-show="i.isDeleted === 0"
                :key="sindex"
              >
                <router-link :to="i.redirectUrl + '/'">{{
                  i.title
                }}</router-link>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </ul>
    </div>
  </header>
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
      getMenuList(1).then((res) => {
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
header {
  color: $white;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  padding: 2% 0;
  transition: background-color 1.5s;
  & > div {
    display: flex;
    justify-content: space-between;
    margin: 0 10%;
    .img_hover:hover {
      &::before {
        content: "";
        height: 555px;
        width: 100%;
        position: absolute;
        left: 0%;
        top: 0;
        background-color: transparent;
        background-image: -webkit-linear-gradient(
          -30deg,
          transparent 30%,
          #fff 50%,
          transparent 70%
        ); /*设置渐变的背景，按对角线渐变*/
        background-blend-mode: hard-light; /*设置背景为混合模式下的强光模式*/
        background-size: 200%;
        animation: shine 5s forwards; /*给背景添加动画改变位置*/
      }
    }
    .web_icon {
      img {
        top: 20px;
        width: 160px;
        height: 50px;
        position: absolute;
        z-index: inherit;
        cursor: pointer;
      }
    }
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
        a,
        .el-dropdown {
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
            color: #ff8724;
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
            color: #ff8724;
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
            border-left: 1px solid #ff8724;
            border-top: 1px solid #ff8724;
            top: 0;
            left: -70px;
          }
          &::after {
            @include rim;
            border-right: 1px solid #ff8724;
            border-bottom: 1px solid #ff8724;
            bottom: 0;
            right: 70px;
          }
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
