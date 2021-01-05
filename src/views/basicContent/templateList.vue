<template>
  <div id="themeCenter" v-loading="listLoading" class="app-container">
    <div v-if="themeData.length>0" style="width:100%">
      <el-row :gutter="5">
        <el-col v-for="(item, index) in themeData" :key="index" :xs="8" :sm="8" :md="6" :lg="5">
          <el-card
            :body-style="{ padding: '0px' }"
            :class="temp===item.websiteTemplateId?'selected':''"
            @mouseover.native="showZhe(item)"
            @mouseleave.native="hideZhe(item)"
          >
            <div>
              <el-image
                style="width:100%;height:400px"
                :src="item.coverAttachmentUrl"
                fit="cover"
              />
              <!-- <div class="center-image" :style="'background-image: url('+item.coverAttachmentUrl+')'" /> -->
            </div>
            <div style="padding-left: 15px;">
              <p class="lj_title_p" :title="item.templateTitle">{{ item.templateTitle }}</p>
            </div>
            <div
              :id="'index' + item.websiteTemplateId"
              class="zhezhao"
              @click="toAcitve(item)"
            >
              <div class="zzBtn">
                <el-tooltip class="item" effect="dark" content="预览模板" placement="top">
                  <el-button
                    type="warning"
                    plain
                    size="small"
                    icon="el-icon-view"
                    round
                    @click.stop="viewTemp(item.websiteTemplateId)"
                  />
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="使用模板" placement="top">
                  <el-button
                    type="success"
                    plain
                    size="small"
                    icon="el-icon-thumb"
                    round
                    @click.stop="toEditTemp(item)"
                  />
                </el-tooltip>

              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div v-else style="width:100%;text-align:center;padding:50px">
      <p style="font-size:20px;font-weight:600;letter-spacing:8px">暂无数据</p>
    </div>

  </div>
</template>

<script>

import { getTemplateList, edit_theme } from '@/api/website'
import { mapGetters } from 'vuex'
import store from '../../store'
export default {

  data() {
    return {
      listLoading: false,
      themeData: [] // 视频集合
    }
  },
  computed: {
    ...mapGetters([
      'temp'
    ])
  },
  mounted() {
    this.getthemeCenter()
  },
  methods: {
    showZhe(item) {
      document.getElementById(
        'index' + item.websiteTemplateId
      ).style.display = 'block'
    },
    hideZhe(item) {
      document.getElementById(
        'index' + item.websiteTemplateId
      ).style.display = 'none'
    },
    getthemeCenter() {
      const _that = this
      _that.listLoading = true
      getTemplateList().then(
        response => {
          _that.themeData = response.data
          this.listLoading = false
        }
      )
    },
    viewTemp(data) {
      if (data === 1) {
        window.open('http://81.69.18.147/template_1/menu', '_blank')
      } else if (data === 2) {
        window.open('http://81.69.18.147/template_2/menu', '_blank')
      } else if (data === 3) {
        window.open('http://81.69.18.147/template_3/menu', '_blank')
      }
    },
    toEditTemp(data) {
      edit_theme(data.websiteTemplateId).then(res => {
        this.$message({
          type: 'success',
          message: '切换成功'
        })
        store.dispatch('user/getTempInfo')
        this.reload()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
#themeCenter{
.selected {
  border: 5px solid #49cdd0;
  position: relative;
  top: -5px;
}
.selected:before {
  content: "";
  position: absolute;
  right: 0;
  bottom: 0;
  border: 20px solid #49cdd0;
  border-top-color: transparent;
  border-left-color: transparent;
}
.selected:after {
  content: "";
  width: 5px;
  height: 12px;
  position: absolute;
  right: 6px;
  bottom: 6px;
  border: 2px solid #fff;
  border-top-color: transparent;
  border-left-color: transparent;
  transform: rotate(45deg);
}
.el-col-lg-5 {
    width: 20%;
}
.lj_title_p{
      text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 20px;
}

.el-card {
  margin-top: 10px;
  position: relative;
}
 .el-card:hover{
  box-shadow:0 0 15px #7c8288;
  cursor:pointer ;
}

.center-image{
      width: 100%;
    height: 100%;
    background: no-repeat;
     background-size: 100% 100%;
     min-height: 300px;
     border-bottom: 1px solid #ccc;
}

.zhezhao {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  background: rgba(48, 49, 51, 0.5);
  text-align: center;
  display: none;
  .zzBtn {
    position: absolute;
    display: flex;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    .is-round{
      margin: 20px;
      padding: 15px;
      border-radius: 50%;
      font-size: 18px;
    }
  }
}
}

</style>

