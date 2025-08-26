<template>
  <div class="my-page">
    <!-- 头部区域 -->
    <div class="header">
      <!-- 头像 -->
      <van-image round fit="cover" class="avatar" :src="avatarUrl" />
      <!-- <van-image round fit="cover" class="avatar" src="../../assets/images/avator1.png" />
      <van-image round fit="cover" class="avatar" src="http://120.27.151.154:8071/xfjd/avator1.png" /> -->
      <!-- 昵称 & ID -->
      <div class="user-info">
        <span class="nickname">{{ nickname }}</span>
        <span class="user-id"><span class="icon-id"></span> {{ userId }}</span>
      </div>
      <!-- <div class="icon-arrow"></div> -->
      <div class="div-holder"></div>
    </div>

    <!-- 优惠券列表 -->
    <van-cell-group class="coupon-list">
      <van-cell title="我的优惠券" is-link :value="couponList.length" class="title" @click="goToCouponsList" />
      <div class="coupon-table">
        <div class="table-header">
          <span>商户</span>
          <span>领取时间</span>
          <span>面额</span>
        </div>
        <div class="table-row" v-for="(item, index) in couponList" :key="index">

          <span class="table-row-column merchant-row">
            <div class="qrcode">
              <!-- 二维码占位（可替换为实际图片） -->
              <van-image class="qrcode" fit="cover" src="http://120.27.151.154:8071/xfjd/qrcode.png" @click="showQrcode(item)" />
            </div>
            <div class="merchant">{{ item.merchantName }}</div>
          </span>
          <span class="table-row-column">{{ item.receiveTime }}</span>
          <span class="table-row-column">{{ item.discountAmount || 20}}</span>
        </div>
      </div>
    </van-cell-group>

    <!-- 我参加的活动 -->
    <van-cell-group class="activity-list">
      <van-cell title="我参加的活动" is-link :value="activityList.length" @click="goToActivityList" />
      <div class="activity-table">
        <div class="table-header">
          <span>活动名称</span>
          <span>活动时间</span>
          <span>面额</span>
        </div>
        <div class="table-row" v-for="(item, index) in activityList" :key="index">
          <!-- 活动图标 -->

          <span class="table-row-column merchant-row">
            <van-image class="activity-icon" fit="cover" :src="item.coverImage" />
            <span class="name-group">
              <span class="name">{{ item.title }}</span>
              <span class="hot" v-if="item.isHot">热门</span></span>
          </span>


          <span class="table-row-column">{{ item.startTime }}</span>
          <span class="table-row-column">{{ item.amount }}</span>
        </div>
      </div>
    </van-cell-group>

    <van-overlay :show="qrCodeVisible" @click="qrCodeVisible = false">
      <div class="wrapper">
        <van-image class="activity-qrcode-url" fit="cover" :src="qrcodeUrl" @click.stop /> >
      </div>
    </van-overlay>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { showToast } from 'vant';
import { getUserData, queryUserCoupons } from '@/api/user';
import { queryCollectList } from '@/api/collect'
import { EnumCollectTargetType } from '@/enums/collect'
import dayjs from 'dayjs';
import to from 'await-to-js';
import { useRouter } from 'vue-router';

onMounted(async () => {
  await getUserInfo();
  await getUserCoupon();
  await getUserActivity();
})

// hooks
const router = useRouter();

// 响应式数据
const avatarUrl = ref(''); // 实际头像地址
const nickname = ref('');
const userId = ref('');
const qrCodeVisible = ref(false)
const qrcodeUrl = ref('')

// 优惠券列表（模拟数据）
const couponList = ref([
  { merchantName: '祥符茶馆', receiveTime: '2025.08.02', discountAmount: 18, couponCode: 'https://example.com/activity1.png' },
  { merchantName: '祥符茶馆', receiveTime: '2025.08.02', discountAmount: 18, couponCode: 'https://example.com/activity1.png' },
  { merchantName: '祥符茶馆', receiveTime: '2025.08.02', discountAmount: 18, couponCode: 'https://example.com/activity1.png' },
  { merchantName: '祥符茶馆', receiveTime: '2025.08.02', discountAmount: 18, couponCode: 'https://example.com/activity1.png' },
]);

// 活动列表（模拟数据）
const activityList = ref([
  { title: '跑行天下', startTime: '2025.08.02', amount: 7, isHot: true, coverImage: 'https://example.com/activity1.png' },
  { title: '跑行天下', startTime: '2025.08.02', amount: 7, isHot: false, coverImage: 'https://example.com/activity2.png' },
  { title: '跑行天下', startTime: '2025.08.02', amount: 5, isHot: false, coverImage: 'https://example.com/activity3.png' },
]);

// 接口
const getUserInfo = async () => {
  // const [err, res] = await to<any, any>(getUserData());
  // if (err) {
  //   showToast(err.message)
  //   return
  // }
  const res = {
    data: {
      nickname: '张三',
      avatar: '/xfjd/avator1.png',
      userId: '1'
    }
  }
  nickname.value = res.data.nickname;
  avatarUrl.value = `${window.location.origin}${res.data.avatar}`;
  userId.value = res.data.userId;
  localStorage.setItem('user', JSON.stringify(res.data))
}

const getUserCoupon = async () => {
  const [err, res] = await to<any, any>(queryUserCoupons({
    userId: userId.value,
    current: 1,
    size: 9999,
    status: 1
  }));
  if (err) {
    showToast(err.message)
    return
  }
  couponList.value = res.data.records.slice(0, 4);
}
const getUserActivity = async () => {
  const [err, res] = await to<any, any>(queryCollectList({
    current: 1,
    size: 9999,
    userId: userId.value,
    targetType: EnumCollectTargetType.ACTIVITY
  }));
  if (err) {
    showToast(err.message)
    return
  }
  activityList.value = res.data.records.map((o) => {
    return {
      ...o,
      startTime: dayjs(o.activityStartTime).format('YYYY.MM.DD'),
      amount: 8,
      isHot: true,
      title: o.targetName,
      coverImage: o.targetImage
    }
  }).slice(0, 3);
}

const showQrcode = (data) => {
  qrCodeVisible.value = true;
  qrcodeUrl.value = 'http://120.27.151.154:8071/xfjd/qrcode.png';
}

const goToActivityList = () => {
  // router.push('/activityList')
}
const goToCouponsList = () => {
  // router.push('/couponList')
}
</script>

<style scoped lang="less">
.van-hairline--top-bottom:after,
.van-hairline-unset--top-bottom:after {
  border: none;
}

.my-page {
  background: linear-gradient(180deg, #FF6D23 11.54%, rgba(255, 109, 35, 0) 100%);
  position: relative;

  // background: url('../../assets/images/carton2.png') no-repeat top right;
  // background-size: contain;
  &::before {
    content: '';
    width: 291px;
    height: 231px;
    background: url('../../assets/images/carton2.png') no-repeat top right;
    background-size: cover;
    display: block;
    // z-index: -1;
    position: absolute;
    top: -20px;
    right: 0;
  }

  min-height: 100vh;
  padding: 68px 16px 48px;

  // 头部区域
  .header {
    display: flex;
    align-items: center;
    margin-bottom: 14px;

    .avatar {
      width: 62px;
      height: 62px;
      border: 2px solid #fff;
      // margin-right: 14px;
    }

    .user-info {
      display: flex;
      flex-direction: column;
      flex: 1;
      margin-left: 14px;

      .nickname {
        font-size: 16px;
        font-weight: 500;
        color: #111111;
      }

      .user-id {
        display: flex;
        align-items: center;
        font-size: 12px;
        // color: #FF5600;
        color: #fff;
        margin-top: 4px;

        .icon-id {
          display: inline-block;
          width: 24px;
          height: 16px;
          margin-right: 3px;
          background: url('../../assets/icons/icon-id.svg') no-repeat center;
        }
      }
    }

    .icon-arrow {
      display: inline-block;
      width: 16px;
      height: 16px;
      background: url('../../assets/icons/icon-arrow.svg') no-repeat center;
    }
  }

  // 优惠券列表
  .coupon-list,
  .activity-list {
    background-color: #fff;
    border-radius: 16px;
    margin-bottom: 12px;
    padding: 10px 12px;

    .van-cell {
      border-radius: 16px;
      padding: 0;
      margin-bottom: 8px;
    }

    :deep(.van-cell:after) {
      border: none;
    }

    :deep(.van-cell__title) {
      font-size: 16px;
      font-weight: 500;
      color: #000;
    }

    .coupon-table,
    .activity-table {
      background-color: #fff;

      .table-header {
        display: flex;
        justify-content: space-between;
        background-color: #FFE2D3;
        padding: 5px 0;
        font-weight: bold;
        font-size: 12px;
        color: #D44700;
        border-radius: 8px;
        margin-bottom: 10px;

        span {
          flex: 1;
          text-align: center;
        }
      }

      .table-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 0;
        border-bottom: 1px solid #eee;
        font-size: 12px;
        font-weight: 500;

        .table-row-column {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .merchant-row {
          font-size: 12px;
          color: #111111;
          display: flex;
          align-items: center;
          .merchant{
            flex:1;
          }
        }

        &:last-child {
          border-bottom: none;
        }

        .name-group {
          flex:1;
          display: flex;
          flex-direction: column;
          justify-content: center;

          .hot {
            // width: 32px;
            height: 17px;
            border-radius: 4px;
            line-height: 17px;
            text-align: center;
            color: #fff;
            padding: 0 4px;
            font-size: 12px;
            display: inline-block;
            background: #FF6D23;
          }


        }

        .qrcode,
        .activity-icon {
          width: 40px;
          height: 40px;
          margin-right: 8px;
          border-radius: 4px;
        }
      }
    }

  }
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
</style>