<script setup lang="ts">
import { ref } from "vue";

interface SportType {
  icon: string;
  name: string;
  id: number;
}

// 运动类型列表
const sportTypes = ref<SportType[]>([
  { icon: "basketball", name: "篮球", id: 1 },
  { icon: "badminton", name: "羽毛球", id: 2 },
  { icon: "footerball", name: "足球", id: 3 },
  { icon: "billiards", name: "台球", id: 4 },
  { icon: "pingpong", name: "乒乓球", id: 5 }
]);

// 当前选中的运动类型
const selectedSport = ref<number>(1);

// 日期相关
const today = new Date();
const currentDate = ref<Date>(today);
const weekDays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
const dateList = ref([]);

// 初始化日期数据
const initDates = (startDate = new Date()) => {
  dateList.value = [];
  const start = new Date(startDate);
  // 调整到本周第一天（周日）
  start.setDate(start.getDate() - start.getDay());

  for (let i = 0; i < 7; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    dateList.value.push(date);
  }
};

initDates();

// 切换运动类型
const handleSportSelect = sportId => {
  selectedSport.value = sportId;
};

// 选择日期
const handleDateSelect = date => {
  currentDate.value = new Date(date);
};

// 切换日期范围
const handleDateRangeChange = direction => {
  const firstDate = new Date(dateList.value[0]);

  if (direction === "prev") {
    firstDate.setDate(firstDate.getDate() - 7);
  } else {
    firstDate.setDate(firstDate.getDate() + 7);
  }

  initDates(firstDate);
};

// 判断是否为今天
const isToday = date => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

// 格式化日期显示，去掉前导零
const formatDate = date => {
  return date.getDate();
};
</script>

<template>
  <div class="calendar-container">
    <!-- 运动类型选择 -->
    <div class="sport-types">
      <div
        v-for="sport in sportTypes"
        :key="sport.id"
        class="sport-item"
        :class="{ active: selectedSport === sport.id }"
        @click="handleSportSelect(sport.id)"
      >
        <span class="sport-icon" :class="[sport.icon]"></span>
        <span class="sport-name">{{ sport.name }}</span>
      </div>
    </div>

    <!-- 日期选择 -->
    <div class="date-wrapper">
      <div class="arrow left" @click="handleDateRangeChange('prev')">
        <van-icon name="arrow-left" />
      </div>

      <div class="date-section">
        <div
          v-for="(date, index) in dateList"
          :key="index"
          class="date-item"
          :class="{
            active:
              currentDate.getDate() === date.getDate() &&
              currentDate.getMonth() === date.getMonth() &&
              currentDate.getFullYear() === date.getFullYear()
          }"
          @click="handleDateSelect(date)"
        >
          <div class="weekday">{{ weekDays[date.getDay()] }}</div>
          <div class="date">{{ formatDate(date) }}</div>
        </div>
      </div>

      <div class="arrow right" @click="handleDateRangeChange('next')">
        <van-icon name="arrow" />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import url("@/styles/mixin.less");

.calendar-container {
  background: #fff;
  border-radius: 16px 16px 0 0;
  padding: 16px 16px 0;

  .sport-types {
    display: flex;
    justify-content: space-between;

    &::-webkit-scrollbar {
      display: none;
    }

    .sport-item {
      display: flex;
      align-items: center;
      cursor: pointer;
      white-space: nowrap;
      padding: 2px 4px;
      border:1px solid transparent;
      &.active {
        border: 1px solid #a6a6a6;
        border-radius: 8px;
      }
      .sport-icon {
        width: 18px;
        height: 18px;
        margin-right: 4px;

        // font-size: 24px;
        &.badminton {
          background: url("@/assets/icons/icon-badminton.png") no-repeat center;
          background-size: cover;
        }

        &.basketball {
          background: url("@/assets/icons/icon-basketball.png") no-repeat center;
          background-size: cover;
        }

        &.billiards {
          background: url("@/assets/icons/icon-billiards.png") no-repeat center;
          background-size: cover;
        }

        &.footerball {
          background: url("@/assets/icons/icon-footerball.png") no-repeat center;
          background-size: cover;
        }

        &.pingpong {
          background: url("@/assets/icons/icon-pingpong.png") no-repeat center;
          background-size: cover;
        }
      }

      .sport-name {
        font-size: 12px;
        font-weight: 500;
        color: #000;
      }
    }
  }

  .date-wrapper {
    display: flex;
    align-items: center;
    margin-top: 16px;
    border-top: 1px solid #e3e5eb;
    padding-top: 14px;
    padding-bottom: 24px;
    .arrow {
      cursor: pointer;
      color: #666;
    }
  }

  .date-section {
    flex: 1;
    display: flex;
    // gap: 24px;
    justify-content: space-between;
    margin: 0 4px;
    .date-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 16px;
      cursor: pointer;
      width: 30px;

      &.active {
        .date {
          color: #fff;
          border-radius: 50%;
          background: linear-gradient(
            270deg,
            #ff6d23 0%,
            #ff8b51 74.52%,
            #ff9560 100%
          );
        }
      }

      .weekday {
        font-size: 14px;
        color: #a6a6a6;
      }

      .date {
        width: 30px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        font-size: 16px;
        color: #000;
      }
    }
  }
}
</style>
