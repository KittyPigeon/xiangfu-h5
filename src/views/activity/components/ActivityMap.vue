<template>
  <div class="activity-map">
    <!-- 地图容器 -->
    <div id="amap-container" class="map-container"></div>
    <!-- 地图标题 -->
    <div class="map-title">
      <span>活动地图</span>
      <!-- <van-button size="small" type="info" @click="handleViewMore">查看</van-button> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import AMapLoader from '@amap/amap-jsapi-loader';
// import { VanButton } from 'vant';

//@ts-ignore
let mapInstance: any = null;
// 初始化地图
const initMap = async () => {
  AMapLoader.load({
    key: import.meta.env.VITE_AMAP_KEY, // 申请好的Web端开发者Key
    version: "2.0", // 指定要加载的 JSAPI 的版本
    plugins: ['AMap.Scale', 'AMap.ToolBar'] // 需要使用的的插件列表
  }).then((AMap) => {
    const map = new AMap.Map("map-container", {
      zoom: 11, // 级别
      center: [116.397428, 39.90923], // 中心点坐标
      viewMode: "2D" // 使用2D视图
    })

    // 添加插件
    map.addControl(new AMap.Scale())
    map.addControl(new AMap.ToolBar())
  }).catch(e => {
    console.error(e)
  })

}

onMounted(async () => {
  mapInstance = await initMap();
});
onUnmounted(() => {
  if (mapInstance) {
    mapInstance.destroy(); // 销毁地图实例，释放资源
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