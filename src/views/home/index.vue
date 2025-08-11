<script setup lang="ts" name="Demo">
import { reactive } from "vue";
import DragExpandPanel from './components/drag.vue';

</script>

<template>
  <div class="home-content">
    <div class="map-container"></div>

    <!-- 收藏弹窗 -->
    <DragExpandPanel class="drag-panel-container" title="分类筛选&收藏筛选">
      <!-- 这里放你原本的收藏内容，比如之前的分类图标等 -->
      <div class="filter-items">
        <div class="filter-item">
          <!-- <img src="/static/images/filter/1.png" alt="餐饮美食" /> -->
          <span>餐饮美食</span>
          <span class="badge">7</span>
        </div>
        <div class="filter-item">
          <!-- <img src="/static/images/filter/2.png" alt="购物商城" /> -->
          <span>购物商城</span>
          <span class="badge">2</span>
        </div>
        <!-- 更多分类项... -->
      </div>
    </DragExpandPanel>
  </div>
</template>

<style lang="less" scoped>
:deep(.van-hairline--top-bottom:after){
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