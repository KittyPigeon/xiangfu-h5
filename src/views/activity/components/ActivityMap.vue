<template>
  <div class="activity-map">

    <!-- 地图标题 -->
    <div class="map-title">
      <span class="title">活动地图</span>
      <span class="look-group" @click="handleViewMore">
        <!-- <span class="look">查看</span>
        <van-icon name="arrow" size="12" color="rgba(0, 0, 0, 0.35)" /> -->
      </span>
    </div>


    <!-- 地图容器 -->
    <div id="amap-container" class="map-container"></div>

  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import AMapLoader from '@amap/amap-jsapi-loader';
// import { VanButton } from 'vant';
import iconMapMarker from '@/assets/icons/icon-map-marker.svg';

//@ts-ignore
let mapInstance: any = null;
let gaodeAMap: any = null;
const markerMap = ref(new Map());

// 接收props
const props = defineProps({
  activityList: {
    type: Array,
    default: () => []
  }
});

// 定义emits
const emit = defineEmits(['marker-click']);
// 初始化地图
const initMap = async () => {
  AMapLoader.load({
    key: window.localStorage.getItem('mapKey'), // 申请好的Web端开发者Key
    version: "2.0", // 指定要加载的 JSAPI 的版本
    // plugins: ['AMap.Scale', 'AMap.ToolBar'] // 需要使用的的插件列表
  }).then((AMap) => {
    gaodeAMap = AMap; // 保存AMap实例
    mapInstance = new AMap.Map("amap-container", {
      zoom: 16, // 级别
      // center: [120.091257,30.320526], // 取微信拿到的我的位置
      center: JSON.parse(window.localStorage.getItem('mylocation') || '{}').locatonArr, // 中心点坐标
      // viewMode: "2D" // 使用2D视图
    })

    // 初始化时生成marker
    generateMarkers();

    // 添加插件
    // mapInstance.addControl(new AMap.Scale())
    // mapInstance.addControl(new AMap.ToolBar())
  }).catch(e => {
    console.error(e)
  })
}

// 生成活动marker
const generateMarkers = () => {
  if (!mapInstance || !gaodeAMap || !props.activityList.length) {
    return;
  }

  // 清除现有marker
  if (markerMap.value.size > 0) {
    mapInstance.remove(Array.from(markerMap.value.values()));
    markerMap.value.clear();
  }

  const markerList = [];
  
  (props.activityList as Array<{
    id: string | number;
    longitude: number;
    latitude: number;
    title: string;
    [key: string]: any;
  }>).forEach((activity) => {
    // 如果活动有经纬度信息
    if (activity.longitude && activity.latitude) {
      const position = [activity.longitude, activity.latitude];
      const title = activity.title;
      const markerId = `activity-marker-${activity.id}`;
      
      const markerContent = `
        <div class="custom-activity-marker" id="${markerId}" data-activity-id="${activity.id}">
          <img src="${iconMapMarker}">
          <div class="activity-marker-title">${title}</div>
        </div>
      `;

      const marker = new gaodeAMap.Marker({
        position,
        content: markerContent,
        label: {
          direction: 'right',
        }
      });

      // 添加点击事件
      marker.on('click', () => {
        emit('marker-click', activity);
      });

      markerList.push(marker);
      markerMap.value.set(activity.id, marker);
    }
  });

  // 如果有新marker，添加到地图
  if (markerList.length > 0) {
    mapInstance.add(markerList);
    // 设置地图视野以包含所有marker
    mapInstance.setFitView(markerList, false, [10, 50, 20, 20]);
  }
}

// 监听activityList变化
watch(() => props.activityList, () => {
  if (mapInstance && gaodeAMap) {
    generateMarkers();
  }
}, { deep: true });

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

:deep(.custom-activity-marker) {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 120px;
  height: 80px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
  }
  
  .activity-marker-title {
    font-size: 14px;
    color: #000;
    font-weight: 500;
    background: rgba(255, 255, 255, 0.9);
    padding: 0px 4px;
    border-radius: 4px;
    // margin-top: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
}
</style>