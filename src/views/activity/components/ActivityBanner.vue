<template>
  <div class="activity-banner">
    <div class="title">
      <span class="title-text">{{ activityInfo.title }}</span>
    </div>
    <div class="tag">
      <span class="tag-text">{{ activityInfo.tagList && activityInfo.tagList.join(' ') }}</span>
    </div>
    <van-image fit="cover" class="banner-image" :src="bannerImage" />
    <div class="banner-tag" v-if="isRecommend"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
// const bannerImage = ref('https://example.com/banner.jpg'); // 替换为实际图片

const props = defineProps({
  bannerImage: {
    type: String,
    default() {
      return "";
    }
  },
  isRecommend: {
    type: Boolean,
    default() {
      return false;
    }
  },
  activityInfo: {
    type: Object,
    default() {
      return {};
    }
  }
});
</script>

<style scoped lang="less">
:deep(.van-image img){
  border-radius: 8px;
}
:deep(.van-image .van-image__error){
  border-radius: 8px;
}
:deep(.van-image .van-image__loading){
  border-radius: 8px;
}
.activity-banner {
  position: relative;
  border-radius: 8px;
  .banner-image {
    width: 100%;
    height: 188px;

    img {
      border-radius: 8px;
    }
  }
  .title{
    position: absolute;
    bottom: 20px;
    left: 10px;
    font-size: 16px;
    color: #fff;
    font-weight: bold;
    letter-spacing: 3px;
    z-index: 1;
    font-family: 'PingFang SC';

  }
  .tag{
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 12px;
    font-family: 'PingFang SC';

    color: #fff;
    height: 22px;
    line-height: 22px;
    text-align: center;
    border-radius: 8px;
    padding-right: 10px;
    padding-left: 10px;
    letter-spacing: 2px;
    background:rgba(0, 115, 255, 0.7);
    z-index: 1;
  }

  .banner-tag {
    position: absolute;
    top: -8px;
    right: 10px;
    width: 50px;
    height: 45px;
    background: url("../../../assets/images/recommend.png") no-repeat center;
    background-size: cover;
  }
}
</style>
