<template>
  <div class="invitation-page">
    <!-- 顶部 Banner 区域 -->
    <div class="banner">
      <img
        src="https://via.placeholder.com/375x200?text=Banner+Image"
        alt="banner"
        class="banner-img"
      />
      <!-- 搜索框 -->
      <div class="search-bar">
        <van-icon name="search" class="search-icon" />
        <input
          v-model="searchValue"
          type="text"
          placeholder="请输入您的需求"
          class="search-input"
        />
        <van-button size="mini" type="primary" class="search-btn">推荐一下</van-button>
      </div>
    </div>

    <!-- 潮玩推荐的活动 -->
    <div class="section">
      <h2 class="section-title">潮玩推荐的活动</h2>
      <div class="activity-card">
        <h3 class="activity-title">劳逸结合的周末下午</h3>
        <div
          class="activity-step"
          v-for="(step, index) in activitySteps"
          :key="index"
        >
          <div class="step-number" :style="{ background: stepColor }">
            {{ index + 1 }}
          </div>
          <div class="step-info">
            <div class="step-time">{{ step.time }}</div>
            <div class="step-desc">{{ step.desc }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 自由选择 - 社区活动 -->
    <div class="section">
      <h2 class="section-title">自由选择</h2>
      <div
        class="community-card"
        v-for="(item, index) in communityActivities"
        :key="index"
      >
        <h3 class="community-title">{{ item.title }}</h3>
        <div class="community-tag">{{ item.tag }}</div>
        <p class="community-desc">{{ item.desc }}</p>
        <div class="image-list">
          <img
            v-for="(img, imgIndex) in item.images"
            :key="imgIndex"
            :src="img"
            alt="activity"
            class="community-img"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineComponent } from 'vue';
import { VanIcon, VanButton } from 'vant';

// 搜索框数据
const searchValue = ref('');

// 活动步骤数据
const activitySteps = ref([
  { time: '12:00~13:00', desc: '填饱肚子', place: '社区大食堂' },
  { time: '13:00~14:00', desc: '消食散步', place: '运河边风情游步道' },
  { time: '14:30~15:30', desc: '商务洽谈', place: '怡情小筑coffee' },
  { time: '16:30~17:30', desc: '来一场运动', place: '亚运拱苑篮球馆有约' },
]);
const stepColor = '#ff9933'; // 步骤数字背景色

// 社区活动数据
const communityActivities = ref([
  {
    title: '书香溢社区 温暖伴同行',
    tag: '社区活动文化',
    desc: '在第三十个世界读书日到来之际，祥符街道祥庆社区书苑举办了以“书香溢社区，温暖伴同行为主题的世界读书日活动',
    images: [
      'https://via.placeholder.com/100?text=Image1',
      'https://via.placeholder.com/100?text=Image2',
      'https://via.placeholder.com/100?text=Image3',
    ],
  },
  {
    title: '书香溢社区 温暖伴同行',
    tag: '社区活动文化',
    desc: '在第三十个世界读书日到来之际，祥符街道祥庆社区书苑举办了以“书香溢社区，温暖伴同行为主题的世界读书日活动',
    images: [
      'https://via.placeholder.com/100?text=Image1',
      'https://via.placeholder.com/100?text=Image2',
      'https://via.placeholder.com/100?text=Image3',
    ],
  },
]);
</script>

<style scoped>
.invitation-page {
  background-color: #fff;
  font-size: 14px;
  color: #333;
}

/* Banner 样式 */
.banner {
  position: relative;
}
.banner-img {
  width: 100%;
  height: auto;
  display: block;
}
.search-bar {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 6px 10px;
  border-radius: 20px;
  width: 90%;
  box-sizing: border-box;
}
.search-icon {
  font-size: 16px;
  margin-right: 6px;
}
.search-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 12px;
}
.search-btn {
  font-size: 12px;
  padding: 4px 10px;
}

/* 通用区块标题 */
.section-title {
  font-size: 16px;
  font-weight: bold;
  margin: 16px 0 10px;
  color: #333;
  padding-left: 10px;
  border-left: 4px solid #ff9933;
}

/* 活动卡片 */
.activity-card {
  background-color: #fff9f0;
  padding: 12px;
  border-radius: 8px;
  margin: 0 10px;
}
.activity-title {
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}
.activity-step {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.step-number {
  width: 28px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  color: #fff;
  border-radius: 50%;
  margin-right: 8px;
  font-size: 13px;
}
.step-info {
  display: flex;
  flex-direction: column;
}
.step-time {
  font-size: 13px;
  color: #ff9933;
  font-weight: bold;
  margin-bottom: 2px;
}
.step-desc {
  font-size: 12px;
  color: #666;
}

/* 社区活动卡片 */
.community-card {
  background-color: #fff;
  border: 1px solid #f5f5f5;
  border-radius: 8px;
  padding: 12px;
  margin: 10px;
}
.community-title {
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 4px;
  color: #333;
}
.community-tag {
  font-size: 12px;
  color: #ff9933;
  background-color: #fff3e6;
  display: inline-block;
  padding: 2px 6px;
  border-radius: 4px;
  margin-bottom: 6px;
}
.community-desc {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
  line-height: 1.4;
}
.image-list {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  gap: 6px;
}
.community-img {
  width: 80px;
  height: 60px;
  flex-shrink: 0;
  border-radius: 4px;
}
</style>