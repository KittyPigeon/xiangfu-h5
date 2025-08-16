<script setup lang="ts" name="Demo">
import { onMounted, reactive, ref, onUnmounted } from "vue";
import DragExpandPanel from './components/drag.vue';
import StartList from './components/starList.vue'
import MyFavorite from './components/MyFavorite.vue';
import SearchBar from './components/SearchBar.vue';
import TeaHouseDetailPopup from './components/TeaHouseDetailPopup.vue'
import CoverImage from '@/assets/images/s.png'
// @ts-ignore
import AMapLoader from '@amap/amap-jsapi-loader';
import { queryHotMerchantCategory } from '@/api/shop'
import to from 'await-to-js';
import { showToast } from "vant";


const isExpanded = ref(false)
const showPopup = ref(false)
const categoryList = ref([])
const handleDrag = (t) => {
  isExpanded.value = t;
}
// 初始化地图
const initMap = async () => {
  AMapLoader.load({
    key: import.meta.env.VITE_AMAP_KEY, // 申请好的Web端开发者Key
    version: "2.0", // 指定要加载的 JSAPI 的版本
    plugins: ['AMap.Scale', 'AMap.ToolBar'] // 需要使用的的插件列表
  }).then((AMap) => {
    const map = new AMap.Map("map-container", {
      zoom: 11, // 级别
      center: [120.098838, 30.32526], // 中心点坐标
      viewMode: "2D" // 使用2D视图
    })

    // 添加插件
    map.addControl(new AMap.Scale())
    map.addControl(new AMap.ToolBar())
  }).catch(e => {
    console.error(e)
  })
}


let mapInstance: any = null;

onMounted(() => {
  document.body.addEventListener('click', (e) => {
    showPopup.value = false
  })
})

onMounted(async () => {
  mapInstance = await initMap();
  await getCategoryList();
});
onUnmounted(() => {
  if (mapInstance) {
    mapInstance.destroy(); // 销毁地图实例，释放资源
  }
});

const getCategoryList = async () => {
  const [err, res] = await to<any, any>(queryHotMerchantCategory())
  if (err) {
    showToast(err.message)
    return;
  }
  categoryList.value = res.data.map(item => {
    return {
      ...item,
      icon: item.icon,
      text: item.name,
      badge: item.merchantCount,

    }
  });
}
</script>

<template>
  <div class="home-content">
    <div id="map-container" class="map-container"></div>
    <!-- 我的收藏 -->
    <button @click.stop="showPopup = !showPopup">展示详情</button>

    <div class="activity-control">
      <!-- 我的收藏 -->
      <MyFavorite />
      <!-- 搜索栏 -->
      <SearchBar @search-input="handleSearchInput" @search="handleSearch" />
      <!-- 收藏弹窗 -->
      <DragExpandPanel class="drag-panel-container" title="分类筛选&收藏筛选" @drag="handleDrag">
        <StartList :is-expanded="isExpanded" :filter-items-list="categoryList"></StartList>
      </DragExpandPanel>
    </div>

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
  // background: #f2f2f2;

  .map-container {
    // flex: 1;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    z-index: 1;
  }

  .activity-control {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99;
  }

  .drag-panel-container {
    // margin:0 8px;
  }
}

.drag-handle {}
</style>