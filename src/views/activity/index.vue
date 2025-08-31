<template>
  <div class="home-page">
    <!-- <div class="header">游祥符</div> -->
    <div class="header-top">
      <!-- 搜索组件 -->
      <SearchBar @search="handleSearch" />

      <!-- 分类 Tab 组件 -->
      <CategoryTab :tab-list="tabList" @change="handleCategoryChange" />

    </div>


    <!-- <div class="header-banner">
      <van-image fit="cover" class="main-banner" :src="mainBanner" />
      <div class="slogan">带你游 祥符</div>
    </div> -->


    <div class="home-content" :class="{ 'expanded': isExpanded }">
      <!-- 活动 Tab 组件 - 在展开状态下移到顶部 -->
      <ActivityTab v-if="isExpanded" @change="handleActivityTabChange" class="activity-tab-top" />
      
      <!-- 活动地图组件 -->
      <ActivityMap v-if="!isExpanded" :activity-list="activityList" @marker-click="handleMarkerClick" />

      <!-- 活动 Tab 组件 - 正常位置 -->
      <ActivityTab v-if="!isExpanded" @change="handleActivityTabChange" />

      <div 
        class="activity-list"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
      >
        <div class="activity-list-item" v-for="(item, index) in activityList" :key="index"
          @click="openActivityDetail(item)">
          <!-- 活动 Banner 组件 -->
          <ActivityBanner :banner-image="item.coverImageSrc" :is-recommend="item.isRecommend" :activity-info="item"/>
        </div>

      </div>


      <!-- 活动详情弹窗 -->
      <ActivityDetailPopup :activity-info="activityInfo" v-model:show="showPopup" @close="showPopup = !showPopup"
        @favorite-change="handleFavorite" />
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { queryActivityCategory, queryActivityList, queryActivityDetail } from '@/api/activity';
import { addCollect, delColloect } from '@/api/collect'
import { checkUseFavorite } from '@/api/user'
import SearchBar from './components/SearchBar.vue';
import CategoryTab from './components/CategoryTab.vue';
import ActivityMap from './components/ActivityMap.vue';
import ActivityTab from './components/ActivityTab.vue';
import ActivityBanner from './components/ActivityBanner.vue';
import ActivityDetailPopup from './components/ActivityDetailPopup.vue'
import { EnumCollectTargetType } from '@/enums/collect'
import to from 'await-to-js'
import { showToast } from 'vant';
// 
const userId = JSON.parse(window.localStorage.getItem('userInfo')).id
const showPopup = ref(false)
const tabList = ref([])
const tabIndex = ref(-1)
const searchName = ref('')
const activityTabIndex = ref(0);
const activityTabMap = ref([
  {
    timeFilter: 'upcoming'
  },
  {
    timeFilter: 'ongoing',
  },
  {
    timeFilter: 'past'
  }
])
const activityInfo = ref(null)
const activityList = ref([])

// 触屏手势相关状态
const isExpanded = ref(false) // ActivityTab是否展开到顶部
const touchStartY = ref(0)
const touchCurrentY = ref(0)
const isDragging = ref(false)
const DRAG_THRESHOLD = 50 // 触发切换的拖拽阈值

const handleSearch = (value: string) => {
  console.log('搜索内容：', value);
  searchName.value = value;
  getActivityList()
};

const handleCategoryChange = (index: number) => {
  console.log('分类 Tab 切换：', index);
  tabIndex.value = index;
  getActivityList()
};

const handleActivityTabChange = (index: number) => {
  console.log('活动 Tab 切换：', index);
  activityTabIndex.value = index;
  getActivityList();
};

const handleFavorite = async (flag) => {
  console.log('flag',flag, '测试取消收藏');
  
  const params = {
    userId,
    targetType: EnumCollectTargetType.ACTIVITY,
    targetId: activityInfo.value.id
  }
  const [err, res] = flag ? await to(addCollect(params)) : await to(delColloect(params))
  if (err) {
    showToast(err.message)
    return
  }
  // openActivityDetail(activityInfo.value)
  if (flag) {
    showToast('收藏成功')
    activityInfo.value.isFavorited = true;
  }
  if (!flag) {
    showToast('取消收藏成功')
    activityInfo.value.isFavorited = false;
  }
  console.log('activityInfo---handleFavorite',activityInfo.value)

  
}

onMounted(async () => {
  await getCategory();
  getActivityList();
})
const getCategory = async () => {
  const [err, res] = await to<any, any>(queryActivityCategory())
  if (err) {
    return;
  }
  tabList.value = res.data.map(o => {
    return {
      ...o,
      text: o.name
    }
  });
}
const getActivityList = async () => {
  const params = {
    queryDTO: {
      keyword: searchName.value,
      categoryId: tabIndex.value === -1 ? null : tabList.value[tabIndex.value].id,
      timeFilter: activityTabMap.value[activityTabIndex.value].timeFilter,
      // latitude: 30.32526,
      // longitude: 120.098838,
      // radius: 5000,
    },
    current: 1,
    size: 10,
  }
  const [err, res] = await to<any, any>(queryActivityList(params))
  if (err) {
    return;
  }
  activityList.value = res.data.records.map((item, index) => {
    // 为每个活动添加经纬度信息（基于更新的数据库数据）
    // 如果数据库中没有经纬度，可以使用默认值或随机生成
    const baseLatitude = 30.3068760;
    const baseLongitude = 120.0928410;
    const offset = index * 0.01; // 为每个活动设置不同的偏移量
    
    return {
      ...item,
      coverImageSrc: !item.coverImage.includes('http')?`${window.location.origin}${item.coverImage}` : item.coverImage,
      // 使用数据库中的经纬度，如果没有则使用计算的默认值
      latitude: item.latitude || (baseLatitude + offset),
      longitude: item.longitude || (baseLongitude + offset),
    }
  });
  console.log('activityList',activityList)
}

const openActivityDetail = async (data) => {
  // showPopup.value = true
  const [err, res] = await to<any, any>(queryActivityDetail(data.id));
  if (err) {
    showToast(err.message)
    return;
  }
  const [err2, res2] = await to<any, any>(checkUseFavorite({
    userId,
    targetType: EnumCollectTargetType.ACTIVITY,
    targetId: data.id
  }))
  if (err) {
    showToast(err.message)
    return;
  }
  console.log('res2',res2, 567, res, res.data.images);
  res.data.imagesSrcArr = (res.data.imageList?res.data.imageList: []).map(o => {
    return  !o.includes('http')?`${window.location.origin}${o}` : o
  })
  console.log('res.data.imagesSrcArr',res.data.imagesSrcArr);
  showPopup.value = true;
  res.data.isFavorited = res2 && res2.data && res2.data.checkResult ? res2.data.checkResult : false;
  console.log('res.data.isFavorited',res.data);
  activityInfo.value = res.data;
}

// 处理地图marker点击事件
const handleMarkerClick = async (activity) => {
  console.log('地图marker被点击:', activity);
  await openActivityDetail(activity);
}

// 触屏手势处理函数
const handleTouchStart = (event: TouchEvent) => {
  if (event.touches.length === 1) {
    touchStartY.value = event.touches[0].clientY
    isDragging.value = true
  }
}

const handleTouchMove = (event: TouchEvent) => {
  if (!isDragging.value || event.touches.length !== 1) return
  
  touchCurrentY.value = event.touches[0].clientY
  const deltaY = touchStartY.value - touchCurrentY.value
  const activityListElement = event.currentTarget as HTMLElement
  const scrollTop = activityListElement.scrollTop
  
  // 只有在满足特定条件时才阻止默认行为和触发手势
  const shouldPreventDefault = 
    (deltaY > 0 && !isExpanded.value && scrollTop === 0) || // 向上拉且在顶部且未展开
    (deltaY < 0 && isExpanded.value && scrollTop === 0)     // 向下拉且在顶部且已展开
  
  if (shouldPreventDefault) {
    event.preventDefault()
  }
}

const handleTouchEnd = (event: TouchEvent) => {
  if (!isDragging.value) return
  
  const deltaY = touchStartY.value - touchCurrentY.value
  const activityListElement = event.currentTarget as HTMLElement
  const scrollTop = activityListElement.scrollTop
  
  // 只有在列表顶部时才允许切换状态
  if (scrollTop === 0) {
    // 上拉超过阈值且当前未展开，则展开
    if (deltaY > DRAG_THRESHOLD && !isExpanded.value) {
      isExpanded.value = true
    }
    // 下拉超过阈值且当前已展开，则收起
    else if (deltaY < -DRAG_THRESHOLD && isExpanded.value) {
      isExpanded.value = false
    }
  }
  
  // 重置状态
  isDragging.value = false
  touchStartY.value = 0
  touchCurrentY.value = 0
}
</script>

<style scoped lang="less">
.home-page {
  position: relative;
  background: linear-gradient(180deg, #FF6D23 11.54%, rgba(255, 109, 35, 0) 100%);
  height: 100%;

  .search-bar {
    width: 343px;
    margin: 24px auto 24px; // 和54有关 54-24=30
  }

  &::after {
    content: '';
    position: absolute;
    top: 60px; // 原90-30
    left: 0;
    z-index: 1;
    display: block;
    width: 100vw;
    height: 298px;
    background: url('../../assets/images/bg.jpg') no-repeat center;
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

  .header-top {
    position: absolute;
    top: 0px; // 54
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
    height: 50vh;
    z-index: 99;
    display: flex;
    flex-direction: column;
    transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
  }
  .activity-list{
    flex: 1;
    overflow-y: auto;
    margin-top: 16px;
    -webkit-overflow-scrolling: touch; // iOS 平滑滚动
    
    .activity-list-item{
      &+.activity-list-item{
        margin-top: 12px;
      }
    }
  }
  
  // ActivityTab在顶部时的样式
  .activity-tab-top {
    margin-bottom: 12px;
  }
  
  // 展开状态下的特殊样式
  .home-content.expanded {
    .activity-list {
      margin-top: 8px; // 减少顶部间距，因为ActivityTab已经在顶部了
      padding-bottom: 20px;
    }
  }
}
</style>