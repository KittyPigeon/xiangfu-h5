<script setup lang="ts">
import { useRoute } from "vue-router";
import tabbar from "@/components/Tabbar/index.vue";
import NavBar from "@/components/NavBar/index.vue";
import { useCachedViewStoreHook } from "@/store/modules/cachedView";
import { useDarkMode } from "@/hooks/useToggleDarkMode";
import { querymapIplocation, querymapMiniprogramKey } from '@/api/map'
import { querywechatWebAuthUrl, wechatWebLogin } from '@/api/common'
import { computed,ref } from "vue";
import { useWechatSDK } from "@/utils/wechat";
import { eventBus } from "@/utils/eventBus";


const userInfoShow = ref('no')

window._AMapSecurityConfig = {
  securityJsCode: '213cecf42ad852bd09511d75b0af3bae'
}
const isInWXServiceAccount = () =>{
  const ua = navigator.userAgent.toLowerCase();
  const isWechat = ua.indexOf('micromessenger') !== -1;
  const isServiceAccount = ua.indexOf('servicewechat') !== -1; // 服务号的标识
  return isWechat && isServiceAccount;
  // console.log('isWechat', navigator.userAgent);
  
  // return true;
}

// 获取当前路由信息
const route = useRoute();

// 控制 tabbar 是否显示：根据路由 meta 中的 showTabBar 标识
const isTabBarVisible = computed(() => {
  return route.meta.showTabBar === true; 
});

const cachedViews = computed(() => {
  return useCachedViewStoreHook().cachedViewList;
});
// 
//  获取地图/key
querymapMiniprogramKey({}).then(async (res: { data: any }) => {
  console.log('获取地图key', res);
  const keyRes = res.data;
  if (keyRes) {
    // 全局保存地图key
    // window.localStorage.setItem('mapKey', keyRes);
  } else {
    console.error('获取地图key失败');
  }
  window.localStorage.setItem('mapKey', 'ae92292293e92a658bf875da9dad6f59')
})
console.log('isInWXServiceAccount', isInWXServiceAccount());

window.localStorage.setItem('userInfo', JSON.stringify({
  "id": 1,
  "username": "wx_o-gkj7b4",
  "nickname": "12",
  "avatar": "/xfjd/avator1.png",
  "gender": 1,
  "genderDesc": "男",}));
window.localStorage.setItem('mylocation', JSON.stringify({ longitude: 120.098838, latitude: 30.32526 , locatonArr: [120.098838, 30.32526] }));

// if (!isInWXServiceAccount()) {
//   window.localStorage.setItem('userInfo', JSON.stringify({
//     "id": 1,
//     "username": "wx_o-gkj7b4",
//     "nickname": "12",
//     "avatar": "1",
//     "gender": 1,
//     "genderDesc": "男",}));
//   window.localStorage.setItem('mylocation', JSON.stringify({ longitude: 120.098838, latitude: 30.32526 , locatonArr: [120.098838, 30.32526] }));
// } else {
//   const paramsUrl = window.location.href.split('#')[0]
//   const codeMatch2 = window.location.href.match(/code=([^&]*)(?:&|$)/);
//   const code = codeMatch2 ? codeMatch2[1] : null;
//   const userInfo = window.localStorage.getItem('userInfo');
//   console.log('打印doe', code, paramsUrl, window.location.href);
//   if (userInfo) {
//     // 全局保存userInfo
//   } else if (!code) {
//     // 后端返回跳转链接
//     querywechatWebAuthUrl({scope:'snsapi_userinfo',state:'login', ip: paramsUrl }).then(async (jumpUrlRes: { data: any }) => {
//       console.log('获取微信JS-SDK签名参数', jumpUrlRes, 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb8c05525bff19a75&redirect_uri=https%3A%2F%2Fyourdomain.com%2Fapi%2Fauth%2Fwechat%2Fcallback&response_type=code&scope=snsapi_userinfo&state=login#wechat_redirect');
//       // 检查 jumpUrlRes 是否为对象且包含 data 字段
//       let redirectUri = '';
//       window.location.href = jumpUrlRes.data;

//       // if (jumpUrlRes && typeof jumpUrlRes === 'object' && 'data' in jumpUrlRes && typeof jumpUrlRes.data === 'string') {
//       //   const match = jumpUrlRes.data.match(/redirect_uri=([^&]*)/);
//       //   if (match && match[1]) {
//       //     redirectUri = decodeURIComponent(match[1]);
//       //     // window.location.href = redirectUri;
//       //   } else {
//       //     console.error('未能从返回数据中解析出 redirect_uri', jumpUrlRes.data);
//       //   }
//       // } else {
//       //   console.error('jumpUrlRes.data 不存在或格式不正确', jumpUrlRes);
//       // }
//     })
//   } else if (code && !userInfo) {
//     // 通过code获取用户信息
//     wechatWebLogin({ code }).then(userInfoRes =>{
//       console.log('获取用户信息2', userInfoRes);
//       userInfoShow.value = JSON.stringify(userInfoRes);
//         // 假设 userInfoRes 结构为 { result: { ...用户信息... } }
//       const userInfoData = userInfoRes && typeof userInfoRes === 'object' && 'result' in userInfoRes ? userInfoRes.result : userInfoRes;
//       if (userInfoData) {
//         // window.localStorage.setItem('userInfo', JSON.stringify(userInfoData));
//         console.log('获取用户信息1', userInfoData);
//       } else {
//         console.error('获取用户信息失败', userInfoRes);
//       }
//     });
//   } else {  
//     console.error('获取用户信息失败');
//   }


//   // // 获取地理位置
//   console.log('layout', paramsUrl);
//   const { isWxReady,
//           error,
//           initWxConfig,
//           getCurrentLocation } = useWechatSDK();

//   querymapIplocation({ip: paramsUrl }).then(async (res: { data: any }) => {
//     console.log(res, 'querymapIplocation', res.data.appid);
//     const appId = res.data.appid; // Replace with your actual appId
//     delete res.data.appid;
//     const params = {
//       ...res.data,
//       appId, // Replace with your actual appId
//     };
//     await initWxConfig(params);
//     console.log('WeChat SDK initialized and location fetched', isWxReady.value, 123, error.value);

//     if (isWxReady.value) {
//       const resLoc = await getCurrentLocation();
//       if (resLoc.longitude) {
//         window.localStorage.setItem('mylocation', JSON.stringify(resLoc));
//         console.log(resLoc, 456);
//       }    
//     } else {
//       console.error(isWxReady.value, 'WeChat SDK is not ready');
//     }
//   })

// }
const qrCodeVisible = ref(false);
const qrcodeUrl = ref('');

// 监听图片点击事件
eventBus.onImageClick((data) => {
  qrcodeUrl.value = data.imageUrl;
  qrCodeVisible.value = true;
});
</script>

<template>
  <div class="app-wrapper">
  <!-- {{ userInfoShow }} -->
    <!-- <nav-bar /> -->
    <div class="router-view">
      <router-view v-slot="{ Component }">
        <!-- <keep-alive :include="cachedViews"> -->
          <component :is="Component" />
        <!-- </keep-alive> -->
      </router-view>
    </div>

    <!-- 根据路由 meta 中的 showTabBar 决定是否显示 tabbar -->
    <tabbar v-if="isTabBarVisible" /> 
    <div class="qrcode-wrapper" v-if="qrCodeVisible" @click="qrCodeVisible = false">
      <div class="wrapper">
        <van-image
          class="activity-qrcode-url"
          fit="cover"
          :src="qrcodeUrl"
          @click.stop
        />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import "@/styles/mixin.less";
.qrcode-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1000;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.activity-qrcode-url {
  width: 360px;
  height: auto;
  margin: 0 auto;
}
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
