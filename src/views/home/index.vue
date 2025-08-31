<script setup lang="ts" name="Demo">
import { onMounted, reactive, ref, onUnmounted, computed } from "vue";
import DragExpandPanel from './components/drag.vue';
import StartList from './components/starList.vue'
import MyFavorite from './components/MyFavorite.vue';
import SearchBar from './components/SearchBar.vue';
import TeaHouseDetailPopup from './components/TeaHouseDetailPopup.vue'
import CoverImage from '@/assets/images/s.png'
// @ts-ignore
import AMapLoader from '@amap/amap-jsapi-loader';
import { queryHotMerchantCategory, queryMerchantHomeSearch, queryMerchatPage } from '@/api/shop'
import to from 'await-to-js';
import { showToast } from "vant";
import iconMapMarker from '@/assets/icons/icon-map-marker.svg';


const searchName = ref('')
const isExpanded = ref(false)
const showPopup = ref(false)
const categoryList = ref([])
const categoryIndex = ref(-1)
const merchatList = ref([])
const isFavorited = ref(false)
const markerMap = ref(new Map())
const selectedMerchant = ref(null)
let gaodeAMap: any = null
const setFitViewOptions = {
  padding: [109, 200, 100, 200] //上、下、左、右
}
const handleDrag = (t) => {
  isExpanded.value = t;
}
let map: any = null;

const merchantListFilter = computed(() => {
  if (isFavorited.value) {
    return merchatList.value.filter((o) => o.isFavoritedd)
  }
  return merchatList.value
})
// 初始化地图
const initMap = async () => {
  AMapLoader.load({
    key: window.localStorage.getItem('mapKey'),// 申请好的Web端开发者Key
    version: "2.0", // 指定要加载的 JSAPI 的版本
    // plugins: ['AMap.Scale', 'AMap.ToolBar'] // 需要使用的的插件列表
  }).then((AMap) => {
    gaodeAMap = AMap; // 保存AMap实例供markerListFn使用
    map = new AMap.Map("map-container", {
      zoom: 11, // 级别
      center: JSON.parse(window.localStorage.getItem('mylocation') || '{}').locatonArr, // 中心点坐标
      // center: [120.098838, 30.32526], // 中心点坐标
      viewMode: "2D" // 使用2D视图
    })
    // var markerContent = `
    //     <div class="custom-content-marker">
    //       <img src="${iconMapMarker}">
    //       <div class="close-btn">地点</div>
    //     </div>
    //   `;

    // var marker = new AMap.Marker({
    //     position: [120.091257,30.320526],
    //     // 将 html 传给 content
    //     content: markerContent,
    // });

    // 将 marker 添加到地图
    // map.add([marker]);
    // map.setFitView([marker]);

    // 添加插件
    // map.addControl(new AMap.Scale())
    // map.addControl(new AMap.ToolBar())
    map.on('click', (e) => {
      console.log('map-click', e);
      showPopup.value = false
      isExpanded.value = false
    })
    markerListFn();
  }).catch(e => {
    console.error(e)
  })
}

const markerListFn = () => {
      console.log('markerListFn - 开始执行', { 
        merchantListLength: merchatList.value.length, 
        markerMapSize: markerMap.value.size,
        hasMap: !!map,
        hasGaodeAMap: !!gaodeAMap
      });

      // 如果没有地图实例，直接返回
      if (!map || !gaodeAMap) {
        console.log('markerListFn - 地图实例不存在，跳过');
        return;
      }

      // 清理不存在于当前商户列表中的标记
      if (markerMap.value.size > 0) {
        const markersToRemove = [];
        markerMap.value.forEach((marker, merchantId) => {
          const exists = merchatList.value.some(item => item.id === merchantId);
          if (!exists) {
            markersToRemove.push({ marker, merchantId });
          }
        });
        
        markersToRemove.forEach(({ marker, merchantId }) => {
          map.remove(marker);
          markerMap.value.delete(merchantId);
        });
        
        console.log('markerListFn - 清理了不存在的标记:', markersToRemove.length);
      }

      // 如果商户列表为空，清空所有标记
      if (merchatList.value.length === 0) {
        console.log('markerListFn - 商户列表为空，清空所有标记');
        map.remove(Array.from(markerMap.value.values()));
        markerMap.value.clear();
        return;
      }

      // 添加新的标记
      const markerList = [];
      merchatList.value.forEach((item) => {
        if (!markerMap.value.has(item.id)) {
          const position = [item.longitude, item.latitude];
          const title = item.name;
          const markerId = `marker-${item.id}`;
          const content = `
            <div class="custom-content-marker" id="${markerId}" data-merchant-id="${item.id}">
              <img src="${iconMapMarker}">
              <div class="close-btn">${title}</div>
            </div>
          `;
          
          console.log('markerListFn - 创建新标记:', { id: item.id, position, title });

          const marker = new gaodeAMap.Marker({
            position,
            content,
            label: {
              direction: 'right',
            }
          });

          // 添加点击事件
          marker.on('click', () => {
            showMerchantDetail(item);
          });
          
          markerList.push(marker);
          markerMap.value.set(item.id, marker);
        }
      });

      // 如果有新标记，添加到地图
      if (markerList.length > 0) {
        console.log('markerListFn - 添加新标记到地图:', markerList.length);
        map.add(markerList);
      }

      // 设置地图视野以包含所有标记
      if (markerMap.value.size > 0) {
        const allMarkers = Array.from(markerMap.value.values());
        console.log('markerListFn - 设置地图视野，标记数量:', allMarkers.length);
        map.setFitView(allMarkers, false, setFitViewOptions.padding);
      }
      
      console.log('markerListFn - 执行完成，当前标记数量:', markerMap.value.size);
    }

let mapInstance: any = null;

onMounted(() => {
  // document.body.addEventListener('click', (e) => {
  //   showPopup.value = false
  // })
})

onMounted(async () => {
  await getMarchantData();
  mapInstance = await initMap();
  await getCategoryList();

  
});
onUnmounted(() => {
  if (mapInstance) {
    mapInstance.destroy(); // 销毁地图实例，释放资源
  }
});

const getCategoryList = async () => {
  // const [err, res] = await to<any, any>(queryHotMerchantCategory())
  // if (err) {
  //   showToast(err.message)
  //   return;
  // }
  // categoryList.value = res.data.map(item => {
  //   return {
  //     ...item,
  //     icon: item.icon,
  //     text: item.name,
  //     badge: item.merchantCount,
  //   }
  // });
}

const getMarchantData = async () => {
  // 经纬度暂时固定
console.log('pppp');

  const params = {
    // queryDTO: JSON.stringify({
    //   categoryId: categoryIndex.value !== -1 ? categoryList.value[categoryIndex.value].id : null,
    //   status: 1,
    //   nameKey: searchName.value,
    //   favorite: isFavorited.value ? 1 : 0,
    //   targetType: 1,
    //   userId: JSON.parse(window.localStorage.getItem('userInfo')).id,
    // }),
    favorite: isFavorited.value ? 1 : 0,
    userId: JSON.parse(window.localStorage.getItem('userInfo')).id,
    nameKey: searchName.value,
    category: categoryIndex.value,
    size: 9999,
    current: 1,
  }
  if (categoryIndex.value === -1) {
    delete params.category;
  }

  // const [errcp, rescp] = await to<any, any>(queryMerchatPage(params))
  // console.log('errcp', errcp, 'rescp', rescp);
  
  // if (errcp) {
  //   showToast(errcp.message)
  //   return;
  // }
  // console.log('getMarchantData - 获取到数据:', rescp.data.records.length);
  
  // merchatList.value = rescp.data.records.map(item => {
  //   return {
  //     ...item,
  //     icon: item.icon,
  //     text: item.name,
  //     badge: item.merchantCount,
  //     isFavorited: isFavorited.value,
  //     rating: Number(item.rating),
  //     longitude: Number(item.longitude),
  //     latitude: Number(item.latitude),
  //     id: Number(item.id),
  //     commentCount: Number(item.commentCount),
  //     checkinCount: Number(item.checkinCount),
  //     subsidyAmount: Number(item.subsidyAmount),
  //   }
  // });
  
  // console.log('getMarchantData - 处理后的商户列表:', merchatList.value.length);
  

  const [err, res] = await to<any, any>(queryMerchantHomeSearch(params))
  if (err) {
    showToast(err.message)
    return;
  }
  console.log('shoplist', res);
  
  merchatList.value = res.data.map(item => {
    return {
      ...item,
      icon: item.icon,
      text: item.name,
      badge: item.merchantCount,
      isFavorited: item.isFavorited,
      rating: Number(item.rating),
      longitude: Number(item.longitude),
      latitude: Number(item.latitude),
      id: Number(item.id),
      commentCount: Number(item.commentCount),
      checkinCount: Number(item.checkinCount),
      subsidyAmount: Number(item.subsidyAmount),
    }
  });
    // 确保在下一个 tick 中执行标记更新
    setTimeout(() => {
    markerListFn();
  }, 0);
}
const handleSearchInput = () => { }
const handleSearch = (val) => {
  searchName.value = val;
  getMarchantData();
}

const handleCategoryClick = (item) => {
  // categoryList.value.forEach(o => {
  //   o.isActive = false;
  // })
  // categoryIndex.value = categoryList.value.findIndex((o) => o.id == item.id);
  // categoryList.value[categoryIndex.value].isActive = true;
  categoryIndex.value = item.id;
  // setFitViewOptions.padding = [179, 350, 100, 200]
  getMarchantData();
}

const handelFavorite = (flag) => {
  isFavorited.value = flag
  getMarchantData()
}

const showMerchantDetail = (merchant) => {
  selectedMerchant.value = merchant
  showPopup.value = true
}

const clickGradientModal = () => {
  console.log('clickGradientModal');
  showPopup.value = false
  isExpanded.value = false
}

const changeFavorite = () => {
  selectedMerchant.value.isFavorited = !selectedMerchant.value.isFavorited
}
</script>

<template>
  <div class="home-content">
    <div class="gradient-modal" @click.stop="clickGradientModal"></div>
    <div id="map-container" class="map-container"></div>
    <!-- 我的收藏 -->
    <!-- <button @click.stop="showPopup = !showPopup">展示详情</button> -->

    <div class="activity-control" @click.stop>
      <!-- 我的收藏 -->
      <MyFavorite @favorite="handelFavorite" />
      <!-- 搜索栏 -->
      <SearchBar @search-input="handleSearchInput" @search="handleSearch" />
      <!-- 收藏弹窗 -->
      <DragExpandPanel class="drag-panel-container" title="分类筛选&收藏筛选" @drag="handleDrag">
        <StartList :is-expanded="isExpanded" :filter-items-list="categoryList" @item-click="handleCategoryClick">
        </StartList>
      </DragExpandPanel>
    </div>

    <TeaHouseDetailPopup 
      v-model:show="showPopup" 
      :name="selectedMerchant?.name || '祥符茶馆'" 
      :rating="selectedMerchant?.rating || 3.7"
      :longitude="selectedMerchant?.longitude || 120.091257"
      :latitude="selectedMerchant?.latitude || 30.320526"
      :merchantId="selectedMerchant?.id || 1"
      :cover-image="selectedMerchant?.icon || CoverImage"
      :category="selectedMerchant?.categoryName || '娱乐'"
      :desc="selectedMerchant?.description || '传统茶馆，可欣赏杭州评话表演'"
      :address="selectedMerchant?.address || '杭州市拱墅区符祥街道332号'"
      :business-hours="selectedMerchant?.businessHours || '09:00 - 12:00'"
      :comment-count="selectedMerchant?.commentCount || 128"
      :checkin-count="selectedMerchant?.checkinCount || 256"
      :subsidy-expire="selectedMerchant?.subsidyExpire || '2025.08.02'"
      :subsidy-amount="selectedMerchant?.subsidyAmount || 50"
      :isFavorited="selectedMerchant?.isFavorited"
      @refreshList="changeFavorite"
    />

  </div>
</template>

<style lang="less" scoped>
.gradient-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 179px;
  background: linear-gradient(180deg, rgba(255, 109, 35, 0.5) 12%, rgba(255, 255, 255, 0) 100%);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
}
:deep(.van-hairline--top-bottom:after) {
  border-color: rgba(0, 0, 0, 0.1);
}
:deep(.custom-content-marker) {
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
  
  .close-btn {
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