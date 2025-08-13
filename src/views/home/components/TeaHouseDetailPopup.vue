<template>
    <!-- Vant 弹窗组件 -->
    <van-popup v-model:show="showPopup" position="bottom" round @close="handleClose">
        <div class="detail-popup">
            <!-- 茶馆图片 -->
            <van-image fit="cover" class="cover-image" :src="coverImage" />
            <!-- 基础信息 -->
            <div class="info-section">
                <div class="title-row">
                    <span class="name">{{ name }}</span>
                    <span class="location">
                        <span class="icon-location"></span>
                        <span class="distance">距离1km</span>
                    </span>
                    <div class="rating">
                        <!-- <van-rate v-model="rating" allow-half readonly size="14" color="#ffd100" /> -->
                        <span class="score-group">
                            <span class="score">{{ rating }}</span>
                            <span class="unit">分</span>
                        </span>
                        <span class="category">{{ category }}</span>
                    </div>
                </div>
                <div class="desc">{{ desc }}</div>
                <div class="meta-info">
                    <div class="meta-info-item"><span class="label">地址：</span>{{ address }}</div>
                    <div class="meta-info-item"><span class="label">营业时间：</span>{{ businessHours }}</div>
                    <div class="meta-info-item rating"><span class="label">{{ commentCount }}条评论</span>{{ checkinCount
                    }}次打卡</div>
                </div>
            </div>

            <!-- 补贴信息 -->
            <div class="subsidy-section">
                <div class="subsidy-card">
                    <div class="subsidy-desc">
                        <div class="subsidy-title">本店补贴【吃喝玩乐】神券</div>
                        <div class="subsidy-expire">有效期至：{{ subsidyExpire }}</div>
                        <div class="claim-btn" @click="handleClaim">
                            去领取
                        </div>
                    </div>
                    <div class="subsidy-amount">
                        <span class="unit">¥</span>
                        <span class="amount"> {{ subsidyAmount }}
                        </span>
                    </div>

                </div>
            </div>
            <div class="subsidy-tip">
                领取后请至本店消费核销
            </div>
        </div>

    </van-popup>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CoverImage from '@/assets/images/s.png'

// 外部控制弹窗显示
const showPopup = ref(false);

// 茶馆数据（可通过 props 传入）
const name = ref('祥符茶馆');
const coverImage = ref(CoverImage); // 替换为实际图片
const rating = ref(3.7);
const category = ref('娱乐');
const desc = ref('传统茶馆，可欣赏杭州评话表演');
const address = ref('杭州市拱墅区符祥街道332号');
const businessHours = ref('09:00 - 12:00');
const commentCount = ref(128);
const checkinCount = ref(256);
const subsidyExpire = ref('2025.08.02');
const subsidyAmount = ref(50);

// 关闭弹窗
const handleClose = () => {
    showPopup.value = false;
    // 可触发父组件事件：emit('close');
};

// 领取补贴逻辑
const handleClaim = () => {
    // 示例：调用领取接口或显示提示
    console.log('点击领取补贴');
    // 可扩展：emit('claim', { amount: subsidyAmount.value });
};
</script>

<style scoped lang="less">
.van-popup{
    position: absolute;
    left:8px;
    right:8px;
    width:auto;
}
.van-overlay{
    display: none;
}
.van-image img{
    border-radius: 12px;
}
.detail-popup {
    height: 100%;
    padding-bottom: 12px;
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
                    width: 60px;
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
</style>