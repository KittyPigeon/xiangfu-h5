<template>
  <van-tabbar v-model="active" active-color="#000000" inactive-color="#AAA5B5" :placeholder="true" :route="true" fixed>
    <van-tabbar-item v-for="(item, index) in tabbarData" :key="index" :icon="item.icon" :to="item.to">
      <span v-if="item.to.name!=='Post'">{{ item.title }}</span>
      <template #icon="props">
        <img :src="props.active ? item.iconActive : item.icon" />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import HomeIcon from '@/assets/tabbar/home-default.png'
import HomeIconActive from '@/assets/tabbar/home.png'
import ActivityIcon from '@/assets/tabbar/activity-default.png'
import ActivityIconActive from '@/assets/tabbar/activity.png'
import IntroIcon from '@/assets/tabbar/intro-default.png'
import IntroIconActive from '@/assets/tabbar/intro.png'
import Intro2Icon from '@/assets/tabbar/intro2-default.png'
import Intro2IconActive from '@/assets/tabbar/intro2.png'
import MineIcon from '@/assets/tabbar/mine-default.png'
import MineIconActive from '@/assets/tabbar/mine.png'
import MomentIcon from '@/assets/tabbar/moment-default.png'
import MomentIconActive from '@/assets/tabbar/mine.png'
const active = ref(0);
const tabbarData = reactive([
  {
    icon: HomeIcon,
    iconActive: HomeIconActive,
    title: "游祥符",
    to: {
      name: "Home"
    },
    active: true
  },
  {
    icon: ActivityIcon,
    iconActive:ActivityIconActive,
    title: "逛活动",
    to: {
      name: "Activity"
    },
    active: false
  },
  {
    icon: IntroIcon,
    iconActive:IntroIconActive,
    title: "post",
    to: {
      name: "Post"
    },
    active: false
  },
    {
    icon: Intro2Icon,
    iconActive:Intro2IconActive,
    title: "好推荐",
    to: {
      name: "Intro"
    },
    active: false
  },
  {
    icon: MomentIcon,
    iconActive:MineIconActive,
    title: "拼&约",
    to: {
      name: "Moment"
    },
    active: false
  },
  // {
  //   icon: MineIcon,
  //   iconActive:MineIconActive,
  //   title: "我的",
  //   to: {
  //     name: "Mine"
  //   },
  //   active: false
  // }
]);
</script>

<style lang="less" scoped>
  :deep(.van-tabbar > .van-tabbar-item:nth-child(3) img ){
    height: 40px;
  }
</style>
