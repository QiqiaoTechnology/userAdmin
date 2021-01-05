<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <div class="minlogo">
          <img src="~@/assets/logo.png">
        </div>
        <!-- <div class="sidebar-title">{{ server }} </div> -->
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img src="~@/assets/logo.png" class="sidebar-logo">
        <div class="sidebar-title">后台管理系统 </div>
      </router-link>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  computed: {
  }

}
</script>

<style lang="scss" scoped>
.minlogo{
      width: 32px;
    height: 35px;
    overflow: hidden;
        position: relative;
    left: 8px;
    img{
     height: 24px;
    vertical-align: middle;
    }

}
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #181824;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
        height: 24px;
    vertical-align: middle;
    position: absolute;
    left: 12px;
    top: 15px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
    font-size: 12px;
    font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
    vertical-align: middle;
    color: #11b95c;
    position: absolute;
    top: 5px;
    letter-spacing: 1px;
    font-weight: 500;
    margin-left: -5px;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
