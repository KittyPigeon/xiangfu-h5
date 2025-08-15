<template>
  <div class="home-page">
    <div class="header">游祥符</div>
    <div class="header-top">
      <!-- 搜索组件 -->
      <SearchBar @search="handleSearch" />

      <!-- 分类 Tab 组件 -->
      <CategoryTab @change="handleCategoryChange" />

    </div>


    <!-- <div class="header-banner">
      <van-image fit="cover" class="main-banner" :src="mainBanner" />
      <div class="slogan">带你游 祥符</div>
    </div> -->


    <div class="home-content">
      <!-- 活动地图组件 -->
      <ActivityMap />

      <!-- 活动 Tab 组件 -->
      <ActivityTab @change="handleActivityTabChange" />

      <!-- 活动 Banner 组件 -->
      <ActivityBanner />

      <!-- 活动详情弹窗 -->
      <ActivityDetailPopup v-model:show="showPopup" @close="showPopup = !showPopup" @favorite-change="handleFavorite" />
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import SearchBar from './components/SearchBar.vue';
import CategoryTab from './components/CategoryTab.vue';
import ActivityMap from './components/ActivityMap.vue';
import ActivityTab from './components/ActivityTab.vue';
import ActivityBanner from './components/ActivityBanner.vue';
import ActivityDetailPopup from './components/ActivityDetailPopup.vue'
const mainBanner = ref('https://example.com/main-banner.jpg'); // 替换为实际图片

// 
const showPopup = ref(false)
const handleSearch = (value: string) => {
  console.log('搜索内容：', value);
};

const handleCategoryChange = (index: number) => {
  console.log('分类 Tab 切换：', index);
};

const handleActivityTabChange = (index: number) => {
  console.log('活动 Tab 切换：', index);
};

const handleFavorite = () => {

}
</script>

<style scoped lang="less">
.home-page {
  position: relative;
  background: linear-gradient(180deg, #FF6D23 11.54%, rgba(255, 109, 35, 0) 100%);
  height: 100%;

  &::after {
    content: '';
    position: absolute;
    top: 90px;
    left: 0;
    z-index: 1;
    display: block;
    width: 100vw;
    height: 298px;
    background: url('../../assets/images/bg.png') no-repeat center;
    background-size: cover;
  }

  .header {
    height: 54px;
    line-height: 54px;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    z-index: 2;
  }
  .header-top{
    position: absolute;
    top:54px;
    left: 0;
    right: 0;
    z-index: 99;
  }
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

  .home-content {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, #FFFFFF 8.22%);
    border: 1px solid #FFFFFF;
    border-radius: 16px;
    padding: 12px 14px;
    position: absolute;
    bottom: 0;
    left: 8px;
    right: 8px;
    height: 430px;
    overflow-y: scroll;
    z-index: 99;
  }
}
</style>