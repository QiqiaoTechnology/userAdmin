<template>
  <div>
    <section
      class="breadcrumb-area breadcrumb-bg"
      :style="'background-image: url(' + viewVal.attachmentUrl + ')'"
    >
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="breadcrumb-content text-center">
              <h2>{{ viewVal.title }}</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- breadcrumb-area-end -->

    <!-- team-area -->
    <section id="teacherlist" class="pt-30 pb-120">
      <div class="faculty-and-staff_area-2">
        <div class="container" style="text-align: left">
          <div class="row">
            <div class="col-lg-12">
              <h3 class="heading">
                <span>{{ viewVal.articleTitle }}</span>
              </h3>
              <div class="profile-skill_area">
                <div class="profile-avatar">
                  <img
                    :src="viewVal.coverAttachmentUrl"
                    :title="viewVal.articleTitle"
                  >
                </div>
                <div class="profile-skill">
                  <div class="profile-intro">
                    <p class="short-desc mb-0">
                      {{ viewVal.articleDescription }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      viewVal: {}
    }
  },
  created() {
    const queryParam = this.$route.query

    this.viewVal = queryParam
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.el-row {
  width: 100%;
}
</style>
