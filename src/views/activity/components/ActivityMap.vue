<template>
  <div class="activity-map">

    <!-- 地图标题 -->
    <div class="map-title">
      <span class="title">活动地图</span>
      <span class="look-group" @click="handleViewMore">
        <span class="look">查看</span>
        <van-icon name="arrow" size="12" color="rgba(0, 0, 0, 0.35)" />
      </span>
    </div>


    <!-- 地图容器 -->
    <div id="amap-container" class="map-container"></div>

  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import AMapLoader from '@amap/amap-jsapi-loader';
// import { VanButton } from 'vant';
import iconMapMarker from '@/assets/icons/icon-map-marker.svg';

//@ts-ignore
let mapInstance: any = null;
// 初始化地图
const initMap = async () => {
  AMapLoader.load({
    key: import.meta.env.VITE_AMAP_KEY, // 申请好的Web端开发者Key
    version: "2.0", // 指定要加载的 JSAPI 的版本
    // plugins: ['AMap.Scale', 'AMap.ToolBar'] // 需要使用的的插件列表
  }).then((AMap) => {
    const map = new AMap.Map("amap-container", {
      zoom: 16, // 级别
      center: [120.091257,30.320526], // 取微信拿到的我的位置
      // viewMode: "2D" // 使用2D视图
    })
    var markerContent = `
        <div class="custom-content-marker">
          <img src="${iconMapMarker}">
          <div class="close-btn">地点</div>
        </div>
      `;

    var marker = new AMap.Marker({
        position: [120.091257,30.320526],
        // 将 html 传给 content
        content: markerContent,
    });

    // 将 markers 添加到地图
    map.add(marker);

    // 添加插件
    // map.addControl(new AMap.Scale())
    // map.addControl(new AMap.ToolBar())
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
  // margin: 0 16px;
  .map-container {
    width: 100%;
    height: 100px;
    border-radius: 12px;
    overflow: hidden;
  }

  .map-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;

    span.title {
      font-size: 18px;
      font-weight: bold;
      color: #000;
    }

    .look-group {
      display: flex;
      align-items: center;

      .look {
        font-size: 12px;
        font-weight: 600;
        margin-right: 2px;
        color: rgba(0, 0, 0, 0.35);
      }

    }
  }
}
</style>