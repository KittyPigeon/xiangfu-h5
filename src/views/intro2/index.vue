<template>
  <div class="invitation-page">
    <div class="search-bar">
      <div class="icon-search"></div>
      <van-field
        v-model="searchValue"
        class="search-input"
        placeholder="搜索位置"
        @input="handleInput"
      />
      <van-button class="btn-intro">
        <template #icon>
          <span class="icon-good"></span>
        </template>
        <span>推荐一下</span>
      </van-button>
    </div>

    <div class="section-group">
      <!-- 潮玩推荐的活动 -->
      <div class="section">
        <h2 class="section-title">潮玩推荐的活动</h2>

        <div class="activity-card">
          <h3 class="activity-title" @click="handleClickActivity">
            劳逸结合的周末下午<span class="icon-title"></span>
          </h3>
          <div class="activity-content">
            <div
              class="activity-step"
              v-for="(step, index) in activitySteps"
              :key="index"
            >
              <div class="step-number" :class="[`step${index + 1}`]"></div>
              <div class="step-info">
                <div class="time-group">
                  <div class="step">{{ step.name }}</div>
                  <div class="step-time">{{ step.time }} {{ step.desc }}</div>
                </div>
                <div class="step-desc">{{ step.place }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 自由选择 - 社区活动 -->
      <div class="section">
        <h2 class="section-title">自由选择</h2>
        <div class="community-card">
          <h3 class="community-title">
            社区活动<span class="icon-title"></span>
          </h3>

          <div class="community-list">
            <div
              class="community-list-item"
              v-for="(item, index) in communityActivities"
              :key="index"
            >
              <div class="community-name">{{ item.title }}</div>
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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineComponent } from "vue";
import communityImage from "@/assets/images/community.png";
import IntroData from "@/data/data.json";
import { shuffleArray } from "@/utils/utils";
// 搜索框数据
const searchValue = ref("");

// 活动步骤数据
const activitySteps = ref([
  {
    time: "12:00~13:00",
    name: "第一站",
    desc: "填饱肚子",
    place: IntroData.step1.slice(0, 2).join("、")
  },
  {
    time: "13:00~14:00",
    name: "第二站",
    desc: "消食散步",
    place: IntroData.step2.slice(0, 2).join("、")
  },
  {
    time: "14:30~15:30",
    name: "第三站",
    desc: "商务洽谈",
    place: IntroData.step3.slice(0, 2).join("、")
  },
  {
    time: "16:30~17:30",
    name: "第四站",
    desc: "来一场运动",
    place: IntroData.step4.slice(0, 2).join("、")
  }
]);
const stepColor = "#ff9933"; // 步骤数字背景色

// 社区活动数据
const communityActivities = ref([
  {
    title: "书香溢社区 温暖伴同行",
    tag: "社区活动文化",
    desc: "在第三十个世界读书日到来之际，祥符街道祥庆社区书苑举办了以“书香溢社区，温暖伴同行为主题的世界读书日活动",
    images: [communityImage, communityImage, communityImage]
  },
  {
    title: "书香溢社区 温暖伴同行",
    tag: "社区活动文化",
    desc: "在第三十个世界读书日到来之际，祥符街道祥庆社区书苑举办了以“书香溢社区，温暖伴同行为主题的世界读书日活动",
    images: [communityImage, communityImage, communityImage]
  }
]);

const handleClickActivity = () => {
  activitySteps.value = activitySteps.value.map((o, index) => {
    return {
      ...o,
      place: shuffleArray(IntroData[`step${index + 1}`])
        .slice(0, 2)
        .join("、")
    };
  });
};
</script>

<style scoped lang="less">
@import url("@/styles/mixin.less");

.invitation-page {
  background: url("@/assets/images/bg2.png") no-repeat top;
  background-size: contain;
  font-size: 14px;
  color: #333;
  padding-top: 296px;
  padding-bottom: 60px;
}

.search-bar {
  background: #fff;
  // background: linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, #FFFFFF 8.22%);

  border-radius: 12px;
  padding: 10px 12px;
  display: flex;
  align-items: center;
  margin: -30px 7px 0;

  .icon-search {
    margin-right: 4px;
    .svg-mask("@/assets/icons/icon-write.svg", 24px, #808080);
  }

  .search-input {
    flex: 1;
    --placeholder-color: rgba(0, 0, 0, 0.5);
    font-size: 12px;
    // height: 44px;
    border: none;

    &::after {
      border: none;
    }
  }

  .btn-intro {
    background: linear-gradient(253.43deg, #ff6d23 0%, #ffa375 100%);
    border-radius: 4px;
    color: #fff;
    font-weight: 600;
    font-size: 12px;
    height: 28px;
    border: none;

    .icon-good {
      display: inline-block;
      .svg-mask("@/assets/icons/icon-good.svg", 14px, #fff);
    }
  }
}

.section-group {
  background: linear-gradient(180deg, #c7efff 0%, #ffffff 13.85%);
  border-radius: 16px 16px 0 0;
  padding: 22px 18px;
}

/* 通用区块标题 */
.section-title {
  font-size: 16px;
  font-weight: bold;
  margin: 0 0 16px;
  color: #111111;
}

/* 活动卡片 */
.activity-card {
  background-color: #fff5f0;
  border-radius: 16px;
}

.activity-title {
  position: relative;
  font-size: 16px;
  font-weight: bold;
  height: 44px;
  display: flex;
  align-items: center;
  color: #fff;
  padding: 0 14px;
  border-radius: 16px 16px 0 0;
  background: linear-gradient(270deg, #ff6d23 0%, #ff8b51 74.52%, #ff9560 100%);
}

.activity-content {
  position: relative;

  &::after {
    content: "";
    height: 213px;
    width: 0;
    border-left: 2px dashed #ffbfa6;
    position: absolute;
    z-index: 0;
    left: 30px;
    top: 50%;
    transform: translateY(-50%);
  }
}

.activity-step {
  position: relative;
  display: flex;
  align-items: flex-start;
  z-index: 1;

  & + .activity-step {
    margin-top: 16px;
  }
}

.activity-content {
  padding: 24px 14px;
}

.step-number {
  width: 32px;
  height: 38px;

  &.step1 {
    background: url("../../assets/images/icon-no1.png") no-repeat center;
    background-size: cover;
  }

  &.step2 {
    background: url("../../assets/images/icon-no2.png") no-repeat center;
    background-size: cover;
  }

  &.step3 {
    background: url("../../assets/images/icon-no3.png") no-repeat center;
    background-size: cover;
  }

  &.step4 {
    background: url("../../assets/images/icon-no4.png") no-repeat center;
    background-size: cover;
  }
}

.step-info {
  flex: 1;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
}

.time-group {
  display: flex;
  align-items: center;
  background: #fde7de;
  border-radius: 4px;

  .step {
    background: linear-gradient(253.43deg, #ff6d23 0%, #ffa375 100%);
    border-radius: 4px;
    padding: 4px 8px;
    font-weight: 600;
    font-size: 14px;
    color: #fff;
  }
}

.step-time {
  font-size: 14px;
  color: #ff6d23;
  font-weight: 500;
  margin-left: 8px;
}

.step-desc {
  margin-top: 4px;
  font-size: 12px;
  color: #656668;
}

.section + .section {
  margin-top: 16px;
}

/* 社区活动卡片 */
.community-card {
  background-color: #fff5f0;
  border-radius: 16px;
}

.community-title .icon-title,
.activity-title .icon-title {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 33px;
  height: 33px;
  background: url("../../assets/images/icon-star.png") no-repeat;
  background-size: cover;
}

.community-title {
  position: relative;
  font-size: 16px;
  font-weight: bold;
  height: 44px;
  display: flex;
  align-items: center;
  color: #fff;
  padding: 0 14px;
  border-radius: 16px 16px 0 0;
  background: linear-gradient(270deg, #ff6d23 0%, #ff8b51 74.52%, #ff9560 100%);
}

.community-list {
  padding: 17px 14px;
}

.community-list-item + .community-list-item {
  margin-top: 18px;
}

.community-name {
  font-size: 16px;
  font-weight: 600;
  color: #000000;
}

.community-tag {
  font-size: 14px;

  color: #d44700;
  background-color: #ffe2d3;
  display: inline-block;
  padding: 2px 6px;
  border-radius: 4px;
  margin-top: 9px;
  margin-bottom: 6px;
}

.community-desc {
  font-size: 12px;
  color: #000000;
  margin-bottom: 10px;
  line-height: 1.4;
}

.image-list {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  gap: 6px;
}

.community-img {
  width: 74px;
  height: 74px;
  flex-shrink: 0;
  border-radius: 4px;
}
</style>
