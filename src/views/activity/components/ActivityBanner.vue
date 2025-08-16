<template>
  <div class="activity-banner">
    <van-image fit="cover" class="banner-image" :src="bannerImage" />
    <div class="banner-tag" v-if="isRecommend"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const bannerImage = ref('https://example.com/banner.jpg'); // 替换为实际图片

const props = defineProps({
  bannerImage: {
    type: String,
    default() {
      return ''
    }
  },
  isRecommend: {
    type: Boolean,
    default() {
      return false;
    }
  }
});

</script>

<style scoped lang="less">
.van-image img,
.van-image .van-image__error {
  border-radius: 8px;
}

.activity-banner {
  position: relative;
  margin-top: 16px;

  .banner-image {
    width: 100%;
    height: 188px;
    border-radius: 8px;

    img {
      border-radius: 8px;
    }
  }

  .banner-tag {
    position: absolute;
    top: -8px;
    right: 10px;
    width: 50px;
    height: 45px;
    background: url('../../../assets/images/recommend.png') no-repeat center;
    background-size: cover;
  }
}
</style>