<script setup lang="ts" name="Demo">
import { onMounted, reactive, ref } from "vue";
import DragExpandPanel from './components/drag.vue';
import StartList from './components/starList.vue'
import MyFavorite from './components/MyFavorite.vue';
import SearchBar from './components/SearchBar.vue';
import TeaHouseDetailPopup from './components/TeaHouseDetailPopup.vue'
import CoverImage from '@/assets/images/s.png'
const isExpanded = ref(false)
const showPopup = ref(false)
const handleDrag = (t) => {
  isExpanded.value = t;
}
onMounted(() => {
  document.body.addEventListener('click', (e) => {
    showPopup.value = false
  })
})
</script>

<template>
  <div class="home-content">
    <div class="map-container"></div>
    <!-- 我的收藏 -->
    <button @click.stop="showPopup = !showPopup">展示详情</button>
    <!-- 我的收藏 -->
    <MyFavorite />
    <!-- 搜索栏 -->
    <SearchBar @search-input="handleSearchInput" @search="handleSearch" />
    <!-- 收藏弹窗 -->
    <DragExpandPanel class="drag-panel-container" title="分类筛选&收藏筛选" @drag="handleDrag">
      <StartList :is-expanded="isExpanded"></StartList>
    </DragExpandPanel>
    <TeaHouseDetailPopup v-model:show="showPopup" :name="'祥符茶馆'" :rating="3.7" :cover-image="CoverImage" />

  </div>
</template>

<style lang="less" scoped>
:deep(.van-hairline--top-bottom:after) {
  border-color: rgba(0, 0, 0, 0.1);
}

.home-content {
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  background: #f2f2f2;

  .map-container {
    flex: 1;
  }

  .drag-panel-container {
    // margin:0 8px;
  }
}

.drag-handle {}
</style>