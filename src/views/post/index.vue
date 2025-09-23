<template>
  <div class="my-page">
    <div class="user-icon-wrapper" @click="gotoUserClick">
      <!-- <van-icon name="contact" color="#ff6d23" class="user-icon" size="32"/> -->
      <img src="@/assets/images/coupon.png" alt="">
      <div class="coupon-text">优惠券</div>
    </div>
    <img src="@/assets/images/post-title.png" alt="" class="post-title">
    <div class="post-content">
      <van-swipe height="200" autoplay="3000">
        <van-swipe-item>
          <img src="@/assets/images/5.jpg" alt=""></img>
        </van-swipe-item>
        <van-swipe-item>
          <!-- <video src="@/assets/videos/basketball.mp4"></video> -->
          <img src="@/assets/images/1.jpg" alt=""></img>
        </van-swipe-item>
        <van-swipe-item>
          <img src="@/assets/images/2.png" alt=""></img>
        </van-swipe-item>
        <van-swipe-item>
          <img src="@/assets/images/3.jpg" alt=""></img>
        </van-swipe-item>
        <van-swipe-item>
          <img src="@/assets/images/4.png" alt=""></img>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter()

onMounted(async () => {
  console.log('window.innerWidth', window.innerWidth, 'window.innerHeight', window.innerHeight);
  
});

const gotoUserClick = () => {
  router.push({ path: "/mine" });
}

</script>

<style scoped lang="less">
.van-hairline--top-bottom:after,
.van-hairline-unset--top-bottom:after {
  border: none;
}
.user-icon-wrapper {
  display: flex;
  align-items: center;
  position: absolute;
  top: 10px;
  right: 10px;
  .coupon-text {
    margin-left: 4px;
    font-size: 12px;
    color: #000000;
    font-weight: bold;
  }
}

.post-title { 
  position: absolute;
  width: 45%;
  top: 5%;
  left: 50%;
  transform: translate(-50%, 0);
  height: auto;
  z-index: 2;
}
@media(min-aspect-ratio: 375/669) {
  .my-page .post-title {
    width: 35%;
    top: 2.5%;
  }
}
.my-page {
  // background: linear-gradient(
  //   180deg,
  //   #ff6d23 11.54%,
  //   rgba(255, 109, 35, 0) 100%
  // );s
  width: 100vw;
  height: 100%;
  background-image: url('@/assets/images/post-bg.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  position: relative;
  .post-content {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 100%;
    height: 240px;
    transform: translate(-50%, 0);
    bottom: 0px;
    left: 50%;
    background-image: linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.8) 100%);
    
    border-radius: 20px 20px 0px 0px;
    .van-swipe {
      width: 90%;
    }
  }

}

</style>
