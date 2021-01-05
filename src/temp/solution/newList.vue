<template>
  <div>
    <section
      class="breadcrumb-area breadcrumb-bg"
      :style="'background-image: url('+bannerInfo.attachmentUrl+')'"
      @click="toEditMaterial"
    >
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="breadcrumb-content text-center">
              <h2>{{ bannerInfo.title }}</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- breadcrumb-area-end -->

    <!-- blog-area -->
    <section id="newlist" class="blog-area gray-bg pt-60 pb-60" @click.prevent="toArticle(oneView.websiteElementId)">
      <div class="container">
        <el-row :gutter="10">
          <el-col :span="6">
            <aside class="blog-sidebar">
              <div class="widget mb-30">
                <div class="single-sidebar white-bg">
                  <div class="sidebar-title mb-25">
                    <el-button @click.stop="saveModels">点击增加分类模块</el-button>
                  </div>
                  <div class="cat-list">
                    <ul>
                      <div v-for="(item,indexs) in titleList" :key="indexs">
                        <li v-if="item.isDeleted!==1" @click.stop="toArticle(item.id)">
                          <a
                            :class="item.id===oneView.websiteElementId?'isactive':''"
                            @click.stop="toArticle(item.id)"
                          ><i class="fas fa-caret-right" /> {{ item.title }}</a>

                        </li>
                      </div>
                    </ul>
                  </div>
                </div>
              </div>
            </aside>
          </el-col>
          <el-col :span="18">
            <div v-for="(item, index) in oneView.children" :key="index">
              <div v-show="oneView.isDeleted===0" class="classic-blog-post mb-20">
                <div class="blog-thumb">
                  <a
                    href="#"
                    target="_blank"
                  ><img
                    :src="item.coverAttachmentUrl"
                    alt="img"
                  ></a>
                </div>
                <el-col :span="24" class="blog-content">
                  <div class="classic-blog-tag mb-10">
                    <ul>
                      <li><i class="el-icon-user-solid" /></li>
                      <li class="avatar">{{ item.articleAuthor }}</li>
                    </ul>
                  </div>
                  <h4>
                    <a href="#" target="_blank">{{ item.articleTitle }}</a>
                  </h4>
                  <p>{{ item.articleDescription }}</p>
                  <div class="classic-blog-meta">
                    <ul>
                      <li class="blog-post-date">
                        <i class="far fa-clock" />{{ item.createTime }}
                      </li>
                      <li class="blog-more-read">
                        <a href="#" target="_blank">READ MORE</a>
                      </li>
                    </ul>
                  </div>
                </el-col>
              </div>
            </div>

          </el-col>
        </el-row>
      </div>
    </section>
    <!-- blog-area-end -->

  </div>
</template>
<script>
import {
  getTreeInfo,
  getMaterialList,
  getArticlelList,
  saveModule
} from '@/api/tempApi.js'
export default {
  inject: ['reload'],
  data() {
    return {
      bannerInfo: {},
      titleList: [],
      dataForm: {
        websiteTemplateId: 1,
        parentElementId: 70
      },
      websiteElementIdVal: '',
      oneView: {},
      listData: []

    }
  },
  mounted() {
    this.getTree()
  },
  methods: {

    saveModels() {
      const dataval = {
        parentElementId: this.dataForm.parentElementId
      }
      saveModule(dataval).then((res) => {
        this.$message.success('新增成功，快去点击标签名添加内容吧！')
        this.getTree()
      })
    },

    toEditMaterial() {
      this.$parent.dialogMaterial = true
      this.$parent.getMaterialList()
      this.$parent.editWebsiteElementId = this.bannerInfo.websiteElementId
    },

    toArticle(websiteElementId) {
      this.websiteElementIdVal = websiteElementId
      getArticlelList(websiteElementId).then((resone) => {
        this.oneView = resone.data
        this.$parent.dialogArticle = true
        this.$parent.articleForm = resone.data
        this.$parent.srcList = resone.data.children.map((x) => x.coverAttachmentUrl)
        this.$parent.editWebsiteElementId = resone.data.websiteElementId
      })
    },
    getTree() {
      const that = this
      getTreeInfo(that.dataForm).then((res) => {
        const resData = res.data[0]
        getMaterialList(resData.children[0].websiteElementId).then((ress) => {
          that.bannerInfo = ress.data.children[0]
          that.bannerInfo.id = resData.children[0].websiteElementId
        })
        that.titleList = []
        for (let i = 1; i < resData.children.length; i++) {
          const titleData = {
            id: resData.children[i].websiteElementId,
            title: resData.children[i].title,
            isDeleted: resData.children[i].isDeleted
          }
          that.titleList.push(titleData)
        }
        if (this.websiteElementIdVal) {
          this.getList(this.websiteElementIdVal)
        } else {
          const data = resData.children.slice(1).find(res => res.isDeleted !== 1)
          this.getList(data.websiteElementId)
        }
      })
    },
    getList(webId) {
      getArticlelList(webId).then((resone) => {
        this.oneView = resone.data
      })
    }

  }
}

</script>
<style lang="scss" scoped>
.el-row {
  width: 100%;
}
.blog-thumb{
	max-width: 30%;
	margin-right: 20px;
}
.isactive{
  color: #fe5a2c;
}
</style>
