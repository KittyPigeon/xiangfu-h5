<script setup lang="ts" name="Moment">

import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import SearchBar from '../activity/components/SearchBar.vue';
import Calendar from './components/Calendar.vue';
import ActivityDetailPopup from './components/ActivityDetailPopup.vue'

// import { showDialog } from 'vant';

const router = useRouter();
// 搜索关键词
const searchValue = ref('');

// 日期选择
const showCalendar = ref(false);
const selectedDate = ref('');

// 运动类型tabs
const activeTab = ref(0);
const tabs = reactive([
  { name: 'AA制', type: 'aa' },
  { name: '新手特惠', type: 'newbie' },
  { name: '气氛组织', type: 'atmosphere' }
]);

// 活动列表
const activities = reactive([
  {
    id: 1,
    title: '周二出汗，有你更美点 🏀',
    location: '亚运公园篮球馆',
    time: '07/25日 19:00-21:00',
    price: 55,
    tags: ['AA制', '新手特惠'],
    coverImage: '',
    participants: {
      male: 1,
      female: 3
    },
    maxParticipants: 12
  }
]);
const showPopup = ref(false)
const popRef = ref(null)
const activityInfo = ref({
  id: 1,
  title: '周二出汗，有你更美点 🏀',
  location: '亚运公园篮球馆',
  time: '07/25日 19:00-21:00',
  price: 55,
  tags: ['AA制', '新手特惠'],
  coverImage: '',
  participants: {
    male: 1,
    female: 3
  },
  maxParticipants: 12
})
// 打开活动详情
const showActivityDetail = (activity) => {

};

const handleSearch = (value: string) => {
  console.log('搜索内容：', value);
};

const handleAddActivity = () => {
  console.log('测试')
  router.push({
    path: '/add-activity'
  })
}

const handleSign = () => {
  console.log('pop', popRef.value)
  if (popRef.value) {
    popRef.value?.handleOpen()
  }

}
const submitParticipant = () => {
  popRef.value?.handleOpen()
}
</script>

<template>
  <div class="moment-container">
    <div class="bg"></div>
    <div class="container-content">
      <!-- 搜索组件 -->
      <div class="search-bar-group">
        <!-- 搜索组件 -->
        <SearchBar @search="handleSearch" />

        <div class="search-filter">
          <span class="icon-filter"></span>
          <span class="filter">智能排序</span>
        </div>
      </div>
      <div class="container-content-scroll">
        <!-- 日历组件 -->
        <Calendar></Calendar>
        <!-- 活动卡片列表 -->
        <div class="activity-list">
          <div v-for="activity in activities" :key="activity.id" class="activity-card"
            @click="showActivityDetail(activity)">
            <div class="activity-image">
              <div class="organize-group">
                <div class="organize-title">给力的浙BA加油者</div>
                <div class="organize-count">已组织21场</div>
              </div>
              <van-image fit="cover" class="header-image" :src="activity.coverImage" />
              <div class="price"><span class="unit">¥</span>{{ activity.price }}</div>
            </div>
            <div class="activity-info">
              <h3>{{ activity.title }}</h3>
              <div class="location">
                <div class="icon-location"></div>
                {{ activity.location }}
              </div>
              <div class="time">
                <div class="icon-clock"></div>
                {{ activity.time }}
              </div>
              <div class="tags">
                <van-tag v-for="tag in activity.tags" :key="tag" type="primary" plain round size="small">
                  {{ tag }}
                </van-tag>
              </div>
              <div class="participants">
                <span>报名中… {{ activity.participants.male + activity.participants.female }}/<span class="total">{{
                  activity.maxParticipants
                    }}</span></span>
                <span class="btn-submit" @click="submitParticipant">去报名</span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="icon-add" @click="handleAddActivity"></div>
    <!-- 活动详情弹窗 -->
    <ActivityDetailPopup ref="popRef" :activity-info="activityInfo" @close="showPopup = !showPopup" @add="handleSign" />
  </div>
</template>

<style lang="less" scoped>
@import url('@/styles/mixin.less');

.moment-container {
  // min-height: 100vh;
  position: relative;
  background: linear-gradient(180deg, #FF6D23 11.54%, rgba(255, 109, 35, 0) 100%);
  height: 100%;
  padding-top:152px;
  .bg {
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      width: 100vw;
      height: 298px;
      background: url('../../assets/images/bg-moment.png') no-repeat center;
      background-size: cover;
      backdrop-filter: blur(4px)
    }
  }

  .search-bar-group {
    position: absolute;
    top: -52px;
    left: 20px;
    right: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    // padding: 0 20px 0;
    gap: 8px;
    margin-bottom: 16px;



    .search-bar {
      flex: 1;
    }

    .search-filter {
      width: 98px;
      height: 36px;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #fff;
      border-radius: 22px;
      gap: 6px;
      background: linear-gradient(89.37deg, rgba(255, 148, 95, 0.7) 6.52%, rgba(255, 112, 39, 0.7) 90.88%);

      .icon-filter {
        .svg-mask('@/assets/icons/icon-sort.svg', 16px, #fff);
      }

      .filter {
        font-size: 12px;
        color: #fff;
      }
    }
  }

  .calendar-section {
    margin: 8px 0;
  }

  .container-content {
    position: relative;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, #FFFFFF 8.22%);
    border: 1px solid #FFFFFF;
    border-radius: 16px;
    padding: 18px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 62vh;
    z-index: 99;
    display: flex;
    flex-direction: column;

    .container-content-scroll {
      flex: 1;
      overflow-y: scroll;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

      &::-webkit-scrollbar {
        display: none;
      }
    }
  }

  .activity-list {
    padding: 0 16px;
  }

  .activity-card {

    overflow: hidden;
    margin-bottom: 16px;
    border-radius: 12px;
    background: #FFF6F2;

    .activity-image {
      position: relative;
      height: 194px;
      overflow: hidden;

      .organize-group {
        position: absolute;
        top: 4px;
        left: 4px;
        padding: 4px;
        z-index: 99;
        border-radius: 18px;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;

        .organize-title {
          color: #FFFFFF;
        }

        .organize-count {
          background: #FEB14C;
          border-radius: 20px;
          padding: 2px 3px;
          color: #7B2900;
          font-size: 10px;
        }
      }

      .van-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .price {
        position: absolute;
        right: 0;
        color: #fff;
        padding: 4px 8px;
        border-radius: 4px;
        font-weight: bold;
        font-size: 24px;
        // display: flex;
        color: #FF2020;
        vertical-align: bottom;
        bottom: 0;
        padding: 4px 14px 4px 14px;
        // background: #FFF6F2;
        border-radius: 8px 8px 0 0;

        .unit {
          font-size: 12px;
          font-weight: 400;
          margin-right: 2px;
        }
      }
    }

    .activity-info {
      padding: 11px;

      h3 {
        margin: 0 0 11px;
        font-size: 16px;
        font-weight: bold;
      }

      .location,
      .time {
        color: #666;
        font-size: 12px;
        margin-bottom: 8px;
        display: flex;
        align-items: center;
        gap: 4px;

        .icon-clock {
          .svg-mask('@/assets/icons/icon-clock.svg', 14px, #666);
        }

        .icon-location {
          .svg-mask('@/assets/icons/icon-location.svg', 14px, #666);
        }
      }

      .tags {
        margin: 8px 0;
        display: flex;
        gap: 8px;

        .van-tag {
          border-color: #FF6D23;
          color: #FF6D23;
        }
      }

      .participants {
        display: flex;
        justify-content: space-between;
        color: #FF6D23;
        font-size: 16px;
        font-weight: 600;

        .total {
          color: #000;
        }
      }

      .btn-submit {
        background: linear-gradient(270deg, #FF6D23 0%, #FF8B51 74.52%, #FF9560 100%);
        width: 74px;
        height: 29px;
        border-radius: 20px;
        color: #fff;
        font-size: 14px;
        line-height: 29px;
        text-align: center;
      }
    }
  }

  .icon-add {
    position: fixed;
    bottom: 100px;
    right: 20px;
    width: 70px;
    height: 70px;
    background: url('../../assets/images/add.png') no-repeat center;
    background-size: cover;
    z-index: 222;
  }
}
</style>
