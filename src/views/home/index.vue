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
import { queryHotMerchantCategory, queryMerchatPage } from '@/api/shop'
import to from 'await-to-js';
import { showToast } from "vant";
import iconMapMarker from '@/assets/icons/icon-map-marker.svg';


const searchName = ref('')
const isExpanded = ref(false)
const showPopup = ref(false)
const categoryList = ref([])
const categoryIndex = ref(0)
const merchatList = ref([])
const isFavorited = ref(false)
const markerMap = ref(new Map())
const selectedMerchant = ref(null)
let gaodeAMap: any = null
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

    // 将 marker 添加到地图
    // map.add([marker]);
    // map.setFitView([marker]);

    // 添加插件
    // map.addControl(new AMap.Scale())
    // map.addControl(new AMap.ToolBar())
  }).catch(e => {
    console.error(e)
  })
}

const markerListFn = () => {
      // console.log('markerListFn', markerMap.value.size && map);
      if (markerMap.value.size && map) {
        new Map(markerMap.value).forEach((value, key) => {
          if (merchatList.value.findIndex((item) => item.id === key) === -1) {
            // console.log('merchatList.value.findIndex((item) => item.id === key)', merchatList.value.findIndex((item) => item.id === key), key, value);
            map.remove(value);
            markerMap.value.delete(value);
          }
        });
      }
      // console.log('markerListFn2', merchatList.value.length > 0 && map && gaodeAMap, merchatList.value.length);

      if (merchatList.value.length > 0 && map && gaodeAMap) {
        console.log('markerListFn3',);

        const markerList = [];
        merchatList.value.forEach((item) => {
          if (!markerMap.value.has(item.id)) {
            // 首选视频地址，次选临时聊天地址，最后选场景地址；
                         const position = [item.longitude , item.latitude]
             const title = item.name
             const markerId = `marker-${item.id}`
             const content = `
               <div class="custom-content-marker" id="${markerId}" data-merchant-id="${item.id}">
                 <img src="${iconMapMarker}">
                 <div class="close-btn">${title}</div>
               </div>
             `;
             console.log('markerListFn3', position, content);

            const marker = new gaodeAMap.Marker({
              position,
              content,
              // icon: iconMapMarker,
              label: {
                direction: 'right',
                // content, // 设置文本标注内容
              }
            });

            // 添加点击事件
            marker.on('click', () => {
              showMerchantDetail(item)
            });
            markerList.push(marker);
            markerMap.value.set(item.id, marker);
          }
        });
        if (markerList.length) {
          map.add(markerList);// 添加到地图
        }
        if (markerMap.value.size) {
          const totalMarker = [];
          markerMap.value.forEach((value) => {
            totalMarker.push(value);
          });
          // 上下左右
          map.setFitView(totalMarker, false, [179, 100, 100, 200]);
        }
      }
      if (markerMap.value.size) {
        const totalMarker = [];
        markerMap.value.forEach((value) => {
          totalMarker.push(value);
        });
        map.setFitView(totalMarker, false, [179, 100, 100, 200]);
      }
    }

let mapInstance: any = null;

onMounted(() => {
  // document.body.addEventListener('click', (e) => {
  //   showPopup.value = false
  // })
})

onMounted(async () => {
  mapInstance = await initMap();
  await getCategoryList();
  await getMarchantData();
  markerListFn();
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

const getMarchantData = async () => {
  // 经纬度暂时固定
console.log('pppp');

  const params = {
    queryDTO: JSON.stringify({
      keyword: searchName.value,
      categoryId: categoryIndex.value,
      // categoryId: categoryList.value[categoryIndex.value],
      status: 1,      // latitude: 30.32526,
      // longitude: 120.098838,
      // radius: 5000,
    }),
    size: 9999,
    current: 1,
  }
  const [err, res] = await to<any, any>(queryMerchatPage(params))
  if (err) {
    showToast(err.message)
    return;
  }
  console.log('shoplist', res);
  
  merchatList.value = res.data.records.filter(item => item.id !== 4).map(item => {
    return {
      ...item,
      icon: item.icon,
      text: item.name,
      badge: item.merchantCount,
    }
  });
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
  categoryIndex.value = item.index;
  getMarchantData();
}

const handelFavorite = (flag) => {
  isFavorited.value = flag
}

const showMerchantDetail = (merchant) => {
  selectedMerchant.value = merchant
  showPopup.value = true
}
</script>

<template>
  <div class="home-content">
    <div class="gradient-modal"></div>
    <div id="map-container" class="map-container"></div>
    <!-- 我的收藏 -->
    <button @click.stop="showPopup = !showPopup">展示详情</button>

    <div class="activity-control">
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
    />

  </div>
</template>

<style lang="less" scoped>
.gradient-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 375px;
  height: 179px;
  background: linear-gradient(180deg, rgba(255, 109, 35, 0.5) 12%, rgba(255, 255, 255, 0) 100%);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999999;
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