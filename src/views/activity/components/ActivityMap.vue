<template>
  <div class="activity-map">
    <!-- 地图容器 -->
    <div id="amap-container" class="map-container"></div>
    <!-- 地图标题 -->
    <div class="map-title">
      <span>活动地图</span>
      <van-button size="small" type="info" @click="handleViewMore">查看</van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import AMapLoader from '@amap/amap-jsapi-loader';
// import { VanButton } from 'vant';

let map: AMap.Map | null = null;

onMounted(async () => {
  // 初始化高德地图
  await AMapLoader.load({
    key: '你的高德地图Key', // 替换为实际Key
    version: '2.0',
  });

  // 创建地图实例
  map = new AMap.Map('amap-container', {
    center: [120.15, 30.25], // 杭州坐标（示例）
    zoom: 14,
  });

  // 添加标记点（示例）
  new AMap.Marker({
    position: [120.15, 30.25],
    map,
    title: '祥符街道',
  });
});

onUnmounted(() => {
  // 销毁地图实例
  if (map) {
    map.destroy();
  }
});

const handleViewMore = () => {
  // 查看更多逻辑
  console.log('查看活动地图详情');
};
</script>

<style scoped lang="less">
.activity-map {
  margin: 0 16px;

  .map-container {
    width: 100%;
    height: 200px;
    border-radius: 8px;
    overflow: hidden;
  }

  .map-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 8px 0;

    span {
      font-size: 16px;
      font-weight: bold;
      color: #333;
    }
  }
}
</style>