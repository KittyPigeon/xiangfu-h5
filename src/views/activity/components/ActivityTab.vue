<template>
  <div class="activity-tab-group">
    <div class="activity-tab">
      <div
        v-for="(item, index) in tabs"
        :key="index"
        class="tab-item"
        :class="{ active: current === index }"
        @click="handleTabClick(index)"
      >
        {{ item }}
      </div>
      <div
        @click="toggleArrowClick"
        class="arrow-icon"
        :style="{ transform: `rotate(${arrowRotate}deg)` }"
        transition="transform 0.3s ease"
      >
        <!-- <img class="icon" :src="IconArrow" /> -->
        <img class="icon" :src="IconArrow" />
      </div>
    </div>

    <!-- <span class="more">更多 <van-icon name="arrow" size="12" color="rgba(0, 0, 0, 0.35)" /></span> -->
    <div />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import IconArrow from "@/assets/images/arrow.png";

const arrowRotate = ref(0); // 箭头旋转角度
const tabs = ref(["即将上线", "进行中", "往期活动"]);
const current = ref(0);
const emit = defineEmits(["change", "toggleArrow"]);
const handleTabClick = (index: number) => {
  current.value = index;
  emit("change", index);
};
const toggleArrowClick = () => {
  console.log('arrowRotate1', arrowRotate.value);
  // 第一次点击后返回true
  
  arrowRotate.value = arrowRotate.value === 0 ? 180 : 0;
  console.log('arrowRotate2', arrowRotate.value);

  emit('toggleArrow', !!arrowRotate.value)
}
</script>

<style scoped lang="less">
.activity-tab-group {
  display: flex;
  align-items: center;
  margin-top: 16px;
}
.activity-tab {
  display: flex;
  flex: 1;
  .tab-item {
    // width: 88px;
    text-align: center;
    padding: 6px 12px;
    font-size: 14px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.3);
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.3s ease;
    position: relative;

    &.active {
      color: #fff;
      background: linear-gradient(270deg, #ff6d23 0%, #ff9560 100%);
      border-radius: 20px;
      // box-shadow: 0 4px 12px rgba(255, 109, 35, 0.3);
      // transform: translateY(-1px);
    }
  }
}
.more {
  font-size: 12px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.35);
}
.up-or-down {
  display: flex;
}
.arrow-icon {
  // margin-left: 10px;
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: 10px;

  .icon {
    display: inline-block;
    width: 16px;
    height: auto;
  }
}
</style>
