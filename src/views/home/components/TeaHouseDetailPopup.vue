<template>
    <!-- Vant 弹窗组件 -->
    <van-popup v-model:show="showPopup" position="bottom" round @click.stop>
        <div class="close-icon-wrapper" @click.stop="handleClose" >
            <van-icon name="clear" class="close-icon" />
        </div>
        <div class="detail-popup" @click.stop>
            <!-- 茶馆图片 -->
            <van-image fit="cover" class="cover-image" :src="props.coverImage" @click.stop />
            <!-- <van-icon name="close" class="close-icon" @click.stop="handleClose" /> -->
            <!-- 基础信息 -->
            <div class="info-section" @click.stop>
                <div class="title-row">
                    <span :class="[props.isFavorited?'active-favoriteIcon':'favoriteIcon']" @click.stop="handleFavoriteClick"></span>
                    <span class="name">{{ props.name }}</span>
                    <span class="location" @click.stop="navigateToGaode(props.longitude, props.latitude)">
                        <span class="icon-location"></span>
                        <span class="distance">1km</span>
                    </span>
                    <div class="rating">
                        <!-- <van-rate v-model="rating" allow-half readonly size="14" color="#ffd100" /> -->
                        <span class="score-group">
                            <span class="score">{{ props.rating }}</span>
                            <span class="unit">分</span>
                        </span>
                        <!-- <span class="category">{{ props.category }}</span> -->
                    </div>
                </div>
                <div class="desc">{{ props.desc }}</div>
                <div class="meta-info">
                    <div class="meta-info-item"><span class="label address-label">地址：</span>{{ props.address }}</div>
                    <div class="meta-info-item"><span class="label">营业时间：</span>{{ props.businessHours }}</div>
                    <div class="meta-info-item rating"><span class="label">{{ props.commentCount }}条评论</span>{{ props.checkinCount
                    }}次打卡</div>
                </div>
            </div>

            <!-- 补贴信息 -->
            <div v-if="couponData.subsidyExpire" class="subsidy-section" @click.stop>
                <div class="subsidy-card">
                    <div class="subsidy-desc">
                        <!-- 本店补贴【吃喝玩乐】神券 -->
                        <div class="subsidy-title">【吃喝玩乐】神券{{ couponData.name }}</div>
                        <div class="subsidy-expire">有效期至：{{ couponData.subsidyExpire }}</div>
                        <div v-if="!couponData.isReceived" class="claim-btn" @click.stop="handleClaim">
                            去领取
                        </div>
                        <div v-else class="claimed-btn">
                            已领取
                        </div>
                    </div>
                    <div class="subsidy-amount">
                        <span class="unit">¥</span>
                        <span class="amount"> {{ couponData.subsidyAmount }}
                        </span>
                    </div>

                </div>
            </div>
            <div v-if="couponData.subsidyExpire" class="subsidy-tip" @click.stop>
                领取后请至本店消费核销
            </div>
        </div>

    </van-popup>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import CoverImage from '@/assets/images/s.png'
import { getMerchantCouponData } from '@/api/COUPON'
import { showToast } from "vant";
import to from 'await-to-js';
import { addCollect , delColloect } from '@/api/collect'
import { checkUserCoupon, userReceiveCoupon } from '@/api/user'
import { log } from 'console';

const couponData = ref({
    name: '',
    subsidyExpire: '',
    subsidyAmount: 0,
    id: 0,
    isReceived: true,

})

// 使用 defineModel 来处理 v-model:show
const showPopup = defineModel('show', { 
  type: Boolean,
  default: false 
});

// 定义 props
const props = defineProps({
  name: {
    type: String,
    default: '祥符茶馆'
  },
  coverImage: {
    type: String,
    default: CoverImage
  },
  rating: {
    type: Number,
    default: 4.8
  },
  longitude: {
    type: Number,
    default: 0
  },
  latitude: {
    type: Number,
    default: 30.320526
  },
  merchantId: {
    type: Number,
    default: 1
  },
  category: {
    type: String,
    default: '娱乐'
  },
  desc: {
    type: String,
    default: '传统茶馆，可欣赏杭州评话表演'
  },
  address: {
    type: String,
    default: '杭州市拱墅区符祥街道332号'
  },
  businessHours: {
    type: String,
    default: '09:00 - 12:00'
  },
  commentCount: {
    type: Number,
    default: 128
  },
  isFavorited: {
    type: Boolean,
    default: false,
  },
  checkinCount: {
    type: Number,
    default: 256
  },
  subsidyExpire: {
    type: String,
    default: '2025.08.02'
  },
  subsidyAmount: {
    type: Number,
    default: 50
  }
});

const emit = defineEmits(['refreshList'])
const userId = JSON.parse(window.localStorage.getItem('userInfo')).id

onMounted(async () => {
    // await getMerchantCouponDataFn();
});

// 监听 showPopup 的变化，当为 true 时刷新数据
watch(showPopup, (newValue) => {
    if (newValue) {
        getMerchantCouponDataFn();
    }
});
const getMerchantCouponDataFn = async () => {

  const [err, res] = await to<any, any>(getMerchantCouponData(props.merchantId))
  if (err) {
    showToast(err.message)
    return;
  }
  if (res.data.length > 0) {
    const resData = res.data[0]


    const checkUserCouponParams = {
        userId: userId,
        couponId: res.data[0].id,
    }

    const [err2, res2] = await to<any, any>(checkUserCoupon(checkUserCouponParams))
        console.log('checkUserCoupon', res, res2, 123, err2);

    if (err2) {
        showToast(err2.message)
        return;
    }
    console.log('checkUserCoupon', res, res, 2555, resData);
    if (res2.data.result) {
        couponData.value = {
            subsidyExpire: resData.endTime,
            subsidyAmount: resData.discountAmount,
            id: resData.id,
            isReceived: res2.data.result,
            name: resData.name,
        } 
    } else {
        couponData.value = {
            subsidyExpire: resData.endTime,
            subsidyAmount: resData.discountAmount,
            id: resData.id,
            isReceived: res2.data.result,
            name: resData.name,
        }
    }
  }
    // 确保在下一个 tick 中执行标记
}
// 关闭弹窗
const handleClose = () => {
    console.log('点击关闭');
    
    showPopup.value = false;
};

const handleFavoriteClick = async () => {
    console.log('点击收藏', props.isFavorited);
    if (!props.isFavorited) {
        const [err, res] = await to<any, any>(addCollect({
            userId: JSON.parse(window.localStorage.getItem('userInfo')).id,
            targetType: 1,
            targetId: props.merchantId,
        }))
        console.log('handleFavoriteClick', res, 123);
        
        if (err) {
            showToast(err.message)
            return;
        }
    }else{
        const [err, res] = await to<any, any>(delColloect({
            userId: JSON.parse(window.localStorage.getItem('userInfo')).id,
            targetType: 1,
            targetId: props.merchantId,
        }))
        console.log('handleFavoriteClick', res, 456);

        if (err) {
            showToast(err.message)
            return;
        }
    }

    emit('refreshList')
};

const navigateToGaode = (longitude, latitude) => {
    const mylocation = JSON.parse(window.localStorage.getItem('mylocation') || '{}').locatonArr
    
    window.location.href = `https://uri.amap.com/navigation?from=${mylocation.join(',')},startpoint&to=${longitude},${latitude},endpoint&mode=walk&policy=0&src=mypage&callnative=1`
    const hhh = `https://uri.amap.com/navigation?from=${mylocation.join(',')},startpoint&to=${longitude},${latitude},endpoint&mode=walk&policy=0&src=mypage&callnative=1`
    console.log('hhhh', hhh);
    
}

// 领取补贴逻辑
const handleClaim = async () => {
    // 示例：调用领取接口或显示提示
    console.log('点击领取补贴');
    const params = {
        userId,
        merchantId: props.merchantId,
        couponId: couponData.value.id,
    }
    const [err, res] = await to<any, any>(userReceiveCoupon(params))
    console.log('getMerchantCouponData', res);
    // emit('refreshList')

    couponData.value = {
        ...couponData.value,
        isReceived: true,
    }
    // 可扩展：emit('claim', { amount: subsidyAmount.value });
};
</script>

<style scoped lang="less">
.van-popup{
    position: absolute;
    left:8px;
    right:8px;
    width:auto;
    height: 525px;
    z-index: 10000;
    pointer-events: auto;
}

.close-icon-wrapper {
    position: absolute;
    top: 6px;
    right: 6px;
    z-index: 999999;
    
    .close-icon {
        color: #666;
        font-size: 20px;
    }
}

.van-overlay{
    display: none;
}
.van-image img{
    border-radius: 12px;
}
.detail-popup {
    position: relative;
    height: 100%;
    height: 525px;
    padding-bottom: 12px;
    overflow-y: scroll;
    overflow-x: hidden;
    
    /* 隐藏滚动条，保留滚动功能 */
    &::-webkit-scrollbar {
        display: none;
    }
    
    /* 兼容Firefox */
    scrollbar-width: none;
    // 封面图片
    .cover-image {
        width: 100%;
        height: 209px;
        border-radius: 12px;
        margin-bottom: 12px;
        border: 2px solid #fff;
        overflow: hidden;
    }

    // 基础信息
    .info-section {
        margin-bottom: 20px;
        padding:0 20px;
        // padding:0 20px;
        .title-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 4px;

            .name {
                font-size: 20px;
                font-weight: bold;
                color: #111111;
                margin-right: 12px;
            }

            .location {
                flex: 1;
                display: flex;
                align-items: center;

                .icon-location {
                    width: 14px;
                    height: 14px;
                    background: url('@/assets/icons/icon-location.svg') no-repeat center;
                    background-size: cover;
                    margin-right: 4px;
                }

                .distance {
                    font-size: 12px;
                    color: #000;
                }
            }


            .rating {
                display: flex;
                align-items: center;

                .score-group {
                    display: flex;
                    align-items: center;
                    background: #FDE7DE;
                    font-size: 12px;
                    color: #FF6D23;
                    border-radius: 4px;
                    padding: 0 4px 0 0;
                    margin-right: 8px;

                    .score {
                        padding: 0 8px;
                        font-size: 14px;
                        color: #FFFFFF;
                        font-weight: 600;
                        background: linear-gradient(253.43deg, #FF6D23 0%, #FFA375 100%);
                        border-radius: 4px;
                        margin-right: 4px;
                    }
                }

                // .score {
                //     font-size: 14px;
                //     color: #ff9900;
                //     margin: 0 8px;
                // }

                .category {
                    font-size: 12px;
                    color: #111111;
                    font-weight: 500;
                }
            }
        }

        .desc {
            font-size: 14px;
            color: rgba(17, 17, 17, 0.3);
            margin-bottom: 16px;
        }

        .meta-info {
            font-size: 12px;
            color: #999;
            line-height: 1.6;
            background: #E3E5EB;
            border-radius: 12px;
            padding: 11px 16px;
            color: rgba(17, 17, 17, 0.6);

            .meta-info-item {
                display: flex;
                align-items: center;

                .label {
                    min-width: 60px;
                }
                .address-label {
                    align-self: flex-start;
                }
            }

            .rating {
                color: rgba(17, 17, 17, 0.3);
            }
        }
    }

    // 补贴信息
    .subsidy-section {
        background-color: #BA322E;
        box-shadow: 0px 10px 15px 0px #FF392380;
        // background: url('../../../assets/images/coupon.png') no-repeat center;
        background-size: cover;
        height: 100px;
        margin: 0 20px 12px;
        border-radius: 12px;
        box-sizing: border-box;
        position: relative;

        .subsidy-card {
            position: absolute;
            left: 4px;
            top: 4px;
            right: 4px;
            bottom: 4px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: linear-gradient(90deg, #F94929 0%, #FFFFFF 100%);
            border-radius: 12px;

            // height: 80px;
            .subsidy-desc {
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                width: 218px;
                background: url('../../../assets/images/Subtract.png') no-repeat center;
                // background-size: cover;
                padding:16px 20px;
                &::after{
                    content:'';
                    display: block;
                    position: absolute;
                    right:20px;
                    top:10px;
                    width: 91px;
                    height: 75px;
                    background: url('../../../assets/images/Vector.png') no-repeat center;
                    background-size: contain;
                }
                .subsidy-title {
                    font-size: 10px;
                    color: #FFD8A6;
                    margin-bottom: 4px;
                }

                .subsidy-expire {
                    font-size: 10px;
                    color: #FFD8A6;
                }
                .claim-btn{
                    width:56px;
                    height: 21px;
                    line-height: 21px;
                    border-radius: 100px;
                    color:#F2402C;
                    font-size: 12px;
                    text-align: center;
                    background: #FFE397;
                    margin-top: 9px;
                }
                .claimed-btn{
                    width:56px;
                    height: 21px;
                    line-height: 21px;
                    border-radius: 100px;
                    color: rgba(17, 17, 17, 1);
                    font-size: 12px;
                    text-align: center;
                    background: #E3E5EB;
                    margin-top: 9px;
                }
            }

            .subsidy-amount {
                position: absolute;
                top: 50%;
                right: 20px;
                transform: translateY(-50%);
                font-size: 36px;
                // line-height: 100px;
                line-height: 1;
                font-weight: bold;
                color: #FF2020;
                display: flex;

                .unit {
                    font-size: 14px;
                    align-self: flex-end;
                    margin-bottom: 6px;
                    margin-right: 2px;
                }
            }

            
        }
    }

    .subsidy-tip {
        font-size: 12px;
        color: rgba(0, 0, 0, 0.3);
        text-align: center;
    }
}
.title-row {
  .active-favoriteIcon {
    display: inline-block;
    margin-right: 8px;
    width: 20px;
    height: 20px;
    background: url('../../../assets/icons/icon-love-active.svg') no-repeat center;
  }

  .favoriteIcon{
    display: inline-block;
    margin-right: 8px;
    width: 20px;
    height: 20px;
    background: url('../../../assets/icons/icon-love.svg') no-repeat center;
  }
}
</style>