<script setup lang="ts">
import tabbar from "@/components/Tabbar/index.vue";
import NavBar from "@/components/NavBar/index.vue";
import { useCachedViewStoreHook } from "@/store/modules/cachedView";
import { useDarkMode } from "@/hooks/useToggleDarkMode";
import { querymapIplocation } from '@/api/map'
import { computed,ref } from "vue";
import { useWechatSDK } from "@/utils/wechat";

const cachedViews = computed(() => {
  return useCachedViewStoreHook().cachedViewList;
});
// // 获取用户信息
  const codeMatch2 = window.location.href.match(/code=([^&]*)(?:&|$)/);
  const code = codeMatch2 ? codeMatch2[1] : null;
  const userInfo = window.localStorage.getItem('userInfo');
  console.log('打印doe', code);
  if (userInfo) {
    // 全局保存userInfo
  } else if (!code) {
    // 后端返回跳转链接
    // const { result: jumpUrl } = await weComGetUrlRequest();
    // window.location.href = jumpUrl;
  } else if (code && !userInfo) {
    // 通过code获取用户信息
    // const { result: userInfo } = await weComGetUserInfoRequest({ code });
    // window.localStorage.getItem('userInfo', userInfo);
    // console.log('获取用户信息', userInfo);
  } else {  
    console.error('获取用户信息失败');
  }

// // 获取地理位置
const location2 = ref({ longitude: 1, latitude: 2})
const paramsUrl = window.location.href.split('#')[0]
console.log('layout', paramsUrl);
const { isWxReady,
        error,
        initWxConfig,
        getCurrentLocation } = useWechatSDK();

querymapIplocation({ip: paramsUrl }).then(async (res: { data: any }) => {
  console.log(res, 'querymapIplocation', res.data.appid);
  const appId = res.data.appid; // Replace with your actual appId
  delete res.data.appid;
  const params = {
    ...res.data,
    appId
  };
  await initWxConfig(params);
  console.log('WeChat SDK initialized and location fetched', isWxReady.value, 123, error.value);

  if (isWxReady.value) {
    const resLoc = await getCurrentLocation();
    console.log(resLoc, 456);
    
  } else {
    console.error(isWxReady.value, 'WeChat SDK is not ready');
  }
})
</script>

<template>
  <div class="app-wrapper">
    <!-- <nav-bar /> -->
    <div class="router-view">
      <router-view v-slot="{ Component }">
        <keep-alive :include="cachedViews">
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>

    <tabbar />
  </div>
</template>

<style lang="less" scoped>
@import "@/styles/mixin.less";

.app-wrapper {
  .clearfix();
  position: relative;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  .router-view{
    flex:1;
  }
}
</style>
