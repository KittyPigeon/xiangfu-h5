<template>
    <!-- Vant 弹窗组件 -->
    <van-popup v-model:show="showPopup" position="bottom" round>
        <!-- 弹窗内容容器 -->
        <div class="activity-popup">
            <van-icon name="close" class="close-icon" @click.stop="handleClose" />

            <!-- 顶部 Banner（含关闭按钮） -->
            <div class="popup-header">
                <van-image fit="cover" class="header-image" :src="activityInfo.coverImage" />
            </div>
            <div class="popup-content">
                <!-- 活动信息 -->
                <div class="activity-info">
                    <div class="price-group">
                        <div class="price"><span class="unit">¥</span><span>{{ activityInfo.price }}</span></div>
                        <div class="tags">
                            <van-tag v-for="tag in activityInfo.tags" :key="tag" type="primary" plain round>
                                {{ tag }}
                            </van-tag>
                        </div>
                    </div>
                    <h3>{{ activityInfo.title }}</h3>
                    <div class="location">
                        <div class="icon-location"></div>
                        {{ activityInfo.location }}
                    </div>
                    <div class="time">
                        <div class="icon-clock"></div>
                        {{ activityInfo.time }}
                    </div>
                </div>
                <!-- 人数 -->
                <div class="participants">
                    <div class="p1">已报名(<span>{{ activityInfo.currentParticipants }}</span>/{{
                        activityInfo.maxParticipants }})</div>
                    <div class="p2">
                        <span class="male"><span class="icon-male"></span> {{ activityInfo.participants.male }}人</span>
                        <span class="female"><span class="icon-female"></span>{{ activityInfo.participants.female
                        }}人</span>
                    </div>
                    <van-icon name="arrow" class="arrow" />
                </div>
                <!-- 正文内容 -->
                <div class="activity-content">
                    <h3 class="title">活动描述</h3>
                    <div class="content">
                        {{ activityInfo.description }}
                    </div>
                </div>
                <!-- 报名 -->
                <van-button block @click="signUpActivity" :disabled="activityInfo.signupStatus != '可报名'">{{
                    activityInfo.signupButtonText }}</van-button>
            </div>


        </div>
    </van-popup>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import P1 from '@/assets/images/p1.png'
// 外部控制弹窗显示
const showPopup = ref(false);

// 关闭弹窗
const handleClose = () => {
    showPopup.value = false;
    emit('close', showPopup.value);
};


const handleOpen = () => {
    showPopup.value = true;
}
// 定义 props 和 emits
const props = defineProps({
    activityInfo: {
        type: Object
    }
});

const emit = defineEmits(['close', 'sign']);
const signUpActivity = () => {
    emit('sign', props.activityInfo)
}
defineExpose({
    handleOpen
})
</script>

<style scoped lang="less">
@import url('@/styles/mixin.less');

.van-popup--bottom.van-popup--round {
    border-radius: 24px 24px 0 0;
}

.van-popup {
    overflow-y: visible;
}

.activity-popup {
    height: 80vh; /* 设置固定高度 */
    max-height: 80vh;
    padding: 0;
    border-radius: 24px 24px 0 0;
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .close-icon {
        position: absolute;
        top: 12px;
        right: 12px;
        background: #fff;
        border-radius: 50%;
        padding: 6px;
        font-size: 20px;
        color: #f00;
        z-index: 9;
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
    }

    // 顶部 Banner
    .popup-header {
        position: relative;


        .header-image {
            width: 100%;
            height: 577px;
            border-radius: 24px 24px 0 0;
        }


        // .activity-tag {
        //     position: absolute;
        //     bottom: 12px;
        //     left: 12px;
        //     background: #ff6600;
        //     color: #fff;
        //     font-size: 14px;
        //     padding: 4px 8px;
        //     border-radius: 4px;
        // }
    }
}

.popup-content {
    flex: 1;
    border: 1px solid #FFFFFF;
    backdrop-filter: blur(4px);
    border-radius: 16px 16px 0 0;
    margin-top: -460px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.7) 0.25%, #FFFFFF 9.7%, #FFFFFF 100%);
    padding: 16px;
    overflow-y: auto;
    max-height: calc(80vh - 177px); /* 基于容器高度减去header高度 */
    min-height: 0; /* 允许flex子元素收缩 */
    -webkit-overflow-scrolling: touch; /* iOS平滑滚动 */
    
    /* 隐藏滚动条但保持滚动功能 */
    &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.activity-info {
    background: #FEF5F1;
    border-radius: 8px;
    padding: 9px 14px;

    .price-group {
        display: flex;
        align-items: center;
        font-size: 24px;
        gap: 14px;
        vertical-align: bottom;

        .price {
            font-weight: 600;
            color: #FF6D23;
        }

        .unit {
            font-weight: 400;
            font-size: 12px;
            margin-right: 2px;
        }

        .tags {
            margin: 8px 0;
            display: flex;
            gap: 8px;

            .van-tag {
                border-color: #FF6D23;
                color: #FF6D23;
            }
        }
    }

    h3 {
        margin: 0 0 11px;
        font-size: 16px;
        font-weight: bold;
    }

    .location,
    .time {
        color: #666;
        font-size: 12px;
        margin-bottom: 8px;
        display: flex;
        align-items: center;
        gap: 4px;

        .icon-clock {

            .svg-mask('@/assets/icons/icon-clock.svg', 14px, #666);
        }

        .icon-location {
            .svg-mask('@/assets/icons/icon-location.svg', 14px, #666);
        }
    }

    .time {
        margin-bottom: 0;
    }

}

.participants {
    // display: flex;
    // justify-content: space-between;

    margin-top: 18px;
    border: 1px solid rgba(255, 123, 56, 1);
    border-radius: 8px;
    padding: 11px 16px;
    background: linear-gradient(180deg, rgba(255, 187, 154, 0.15) 0%, rgba(255, 187, 154, 0) 100%);
    position: relative;

    .arrow {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 8px;
    }

    .p1 {

        font-size: 16px;
        font-weight: 600;

        span {
            color: #FF6D23;
        }
    }

    .p2 {
        margin-top: 8px;
        display: flex;
        align-items: center;

        .male,
        .female {
            padding: 2px 10px;
            background: #F3E3FF;
            border-radius: 20px;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .male {
            color: #892CCE;
            background: #F3E3FF;

            .icon-male {
                display: inline-block;
                .svg-mask('@/assets/icons/icon-male.svg', 10px, #892CCE);
            }
        }

        .female {
            margin-left: 14px;
            color: #FF6D23;
            background: #FFDDCC;

            .icon-female {
                display: inline-block;
                .svg-mask('@/assets/icons/icon-female.svg', 10px, #FF6D23);
            }

        }
    }

    .total {
        color: #000;
    }
}

.activity-content {
    margin-top: 18px;

    h3 {
        font-size: 16px;
        font-weight: 600;
        color: #111;
    }

    .content {
        color: rgba(17, 17, 17, 0.6);
        line-height: 24px;
    }
}

.van-button {
    background: linear-gradient(270deg, #FF6D23 0%, #FF8B51 74.52%, #FF9560 100%);
    height: 44px;
    border-radius: 20px;
    color: #fff;
    font-weight: 18px;
    font-size: 18px;
    text-align: center;
    outline: none;
    border: none;
    border-radius: 8px;
    margin-top: 8px;
}
</style>