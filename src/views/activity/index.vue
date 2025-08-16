<template>
  <div class="home-page">
    <div class="header">游祥符</div>
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


    <div class="home-content">
      <!-- 活动地图组件 -->
      <ActivityMap />

      <!-- 活动 Tab 组件 -->
      <ActivityTab @change="handleActivityTabChange" />

      <div class="activity-list">
        <div class="activity-list-item" v-for="(item, index) in activityList" :key="index"
          @click="openActivityDetail(item)">
          <!-- 活动 Banner 组件 -->
          <ActivityBanner :banner-image="item.coverImage" :is-recommend="item.isRecommend" />
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
const showPopup = ref(false)
const tabList = ref([])
const tabIndex = ref(0)
const searchName = ref('')
const activityTabIndex = ref(0);
const activityTabMap = ref([
  {
    timeFilter: 'ongoing'
  },
  {
    timeFilter: 'upcoming',
  },
  {
    timeFilter: 'past'
  }
])
const activityInfo = ref(null)
const activityList = ref([{ coverImage: '', isRecommend: true, id: 22 }])
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
  const params = {
    targetType: EnumCollectTargetType.ACTIVITY,
    targetId: activityInfo.value.id
  }
  const [err, res] = flag ? await to(addCollect(params)) : await to(delColloect(params))
  if (err) {
    showToast(err.message)
    return
  }
  if (flag) {
    showToast('收藏成功')
  }
  if (!flag) {
    showToast('取消收藏成功')
  }
}

onMounted(async () => {
  await getCategory();
  await getActivityList();
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
    queryDTO: JSON.stringify({
      keyword: searchName.value,
      categoryId: tabList.value[tabIndex.value].id,
      timeFilter: activityTabMap.value[activityTabIndex.value].timeFilter,
      latitude: 30.32526,
      longitude: 120.098838,
      radius: 5000,
    }),
    current: 1,
    size: 10,
  }
  const [err, res] = await to<any, any>(queryActivityList(params))
  if (err) {
    return;
  }
  activityList.value = res.data.records;
}

const openActivityDetail = async (data) => {
  // showPopup.value = true
  const [err, res] = await to<any, any>(queryActivityDetail(data.id));
  // if (err) {
  //   showToast(err.message)
  //   return;
  // }
  showPopup.value = true;
  activityInfo.value = {
    "id": 1,
    "title": "春节文化展览",
    "categoryId": 1,
    "categoryName": "文化活动",
    "categoryIcon": "icon-culture",
    "merchantId": 1,
    "merchantName": "文化中心",
    "merchantLogo": "https://example.com/logo.jpg",
    "description": "传统文化展览，了解春节习俗",
    "content": "传统文化展览，了解春节习俗传统文化展览，了解春节习俗传统文化展览，了解春节习俗传统文化展览，了解春节习俗",
    "coverImage": "https://example.com/cover.jpg",
    "images": "",
    "imageList": [],
    "startTime": "",
    "endTime": "",
    "address": "北京市朝阳区文化中心",
    "longitude": 116.397428,
    "latitude": 39.90923,
    "maxParticipants": 100,
    "currentParticipants": 50,
    "tags": "",
    "tagList": [],
    "status": 1,
    "statusDesc": "正常",
    "activityStatusDesc": "进行中",
    "distance": 500,
    "distanceDesc": "500m",
    "remainingParticipants": 50,
    "canSignUp": true,
    "isFavorited": false,
    "createTime": ""
  }
  activityInfo.value = res.data;
}
</script>

<style scoped lang="less">
.home-page {
  position: relative;
  background: linear-gradient(180deg, #FF6D23 11.54%, rgba(255, 109, 35, 0) 100%);
  height: 100%;

  &::after {
    content: '';
    position: absolute;
    top: 90px;
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
    top: 54px;
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
    height: 430px;
    overflow-y: scroll;
    z-index: 99;
  }
}
</style>