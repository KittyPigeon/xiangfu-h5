<template>
  <div class="activity-banner">
    <van-image
      fit="cover"
      class="banner-image"
      :src="bannerImage"
    />
    <div class="banner-tag">推荐</div>
    <div class="banner-title">{{ bannerTitle }}</div>
  </div>
</template>

<script setup lang="ts">
import { VanImage } from 'vant';

const bannerImage = ref('https://example.com/banner.jpg'); // 替换为实际图片
const bannerTitle = ref('书香溢社区，温暖伴同行');
</script>

<style scoped lang="less">
.activity-banner {
  position: relative;
  margin: 10px 16px;

  .banner-image {
    width: 100%;
    height: 120px;
    border-radius: 8px;
  }

  .banner-tag {
    position: absolute;
    top: 8px;
    right: 8px;
    background: #ff6600;
    color: #fff;
    font-size: 12px;
    padding: 4px 8px;
    border-radius: 4px;
  }

  .banner-title {
    position: absolute;
    bottom: 8px;
    left: 12px;
    font-size: 16px;
    color: #fff;
    font-weight: bold;
    text-shadow: 0 0 4px rgba(0,0,0,0.5);
  }
}
</style>