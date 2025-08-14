<template>
  <div class="home-page">
    <!-- 搜索组件 -->
    <SearchBar @search="handleSearch" />

    <!-- 分类 Tab 组件 -->
    <CategoryTab @change="handleCategoryChange" />

    <!-- Banner 组件 -->
    <div class="header-banner">
      <van-image fit="cover" class="main-banner" :src="mainBanner" />
      <div class="slogan">带你游 祥符</div>
    </div>

    <!-- 活动地图组件 -->
    <ActivityMap />

    <!-- 活动 Tab 组件 -->
    <ActivityTab @change="handleActivityTabChange" />

    <!-- 活动 Banner 组件 -->
    <ActivityBanner />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import SearchBar from './components/SearchBar.vue';
import CategoryTab from './components/CategoryTab.vue';
import ActivityMap from './components/ActivityMap.vue';
import ActivityTab from './components/ActivityTab.vue';
import ActivityBanner from './components/ActivityBanner.vue';
const mainBanner = ref('https://example.com/main-banner.jpg'); // 替换为实际图片

const handleSearch = (value: string) => {
  console.log('搜索内容：', value);
};

const handleCategoryChange = (index: number) => {
  console.log('分类 Tab 切换：', index);
};

const handleActivityTabChange = (index: number) => {
  console.log('活动 Tab 切换：', index);
};
</script>

<style scoped lang="less">
.home-page {
  background: #f5f5f5;
  min-height: 100vh;

  .header-banner {
    position: relative;
    margin: 0 16px;

    .main-banner {
      width: 100%;
      height: 150px;
      border-radius: 8px;
    }

    .slogan {
      position: absolute;
      bottom: 16px;
      left: 16px;
      font-size: 24px;
      color: #fff;
      font-weight: bold;
      text-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
    }
  }
}
</style>