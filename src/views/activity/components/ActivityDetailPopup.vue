<template>
    <!-- Vant 弹窗组件 -->
    <van-popup v-model:show="showPopup" position="bottom" round :style="{ minHeight: '70%' }">
        <!-- 弹窗内容容器 -->
        <div class="activity-popup">
            <!-- 顶部 Banner（含关闭按钮） -->
            <div class="popup-header">
                <van-image fit="cover" class="header-image" :src="activityInfo.coverImage" />
                <van-icon name="close" class="close-icon" @click.stop="handleClose" />
            </div>

            <!-- 标题与基础信息 -->
            <div class="info-section">
                <div class="icon-star" :class="{ active: activityInfo.isFavorited }" @click="toggleFavorite"></div>
                <h2 class="title">{{ activityInfo.title }}</h2>
                <div class="address-group">
                    <span style="padding-right: 10px;">{{ activityInfo.address }}</span>
                    <span class="icon-location" @click="navigateToGaode(activityInfo.longitude, activityInfo.latitude)"></span>
                    <span class="distance">1km</span>
                </div>
                <div class="activity-tag">{{ activityInfo.categoryName }}</div>
                <div class="date">{{ activityInfo.startTime }}</div>
                <div class="content" v-html="activityInfo.content"></div>
                <div class="activity-image-wrapper">
                    <!-- <img v-for="ele in activityInfo.imagesSrcArr" fit="cover" class="activity-image" :src="ele" /> -->
                    <van-image v-for="ele in activityInfo.imagesSrcArr" fit="cover" class="activity-image" :src="ele">
                        <template #error>
                            <img class="activity-image" src="https://fastly.picsum.photos/id/180/600/400.jpg?hmac=GWOD1KQ7oaGkR7Zpj4QJDXLC2XkaKZjoKZ3i824mdUE" alt="">
                        </template>
                    </van-image>
                </div>
            </div>

            <!-- 正文内容 -->
        </div>
    </van-popup>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Banner from '@/assets/images/Rectangle 34625992.png'
// 外部控制弹窗显示
const showPopup = ref(false);

// 活动数据（可通过 props 传入）
const title = ref('书香溢社区，温暖伴同行');
const bannerImage = ref(Banner); // 替换为实际图片
const author = ref('匿 名');
const time = ref('2025-08-30 10:01:30');
const category = ref('社区活动文化');
const content = ref(`
  <p>袅袅凉风动，泬寥清时秋。在第三个世界读书日到来之际，祥符街道社区组织开展了以“书香溢社区，温暖伴同行”为主题的世界读书日活动。</p>
  <p>这次活动通过设置特色摊位、更暖心便民服务拉近了街道与居民的距离，营造了全民阅读的良好氛围，让知识通过文字与画面，重温暖着这座城市的每一个角落。</p>
`);
const isRecommended = ref(true); // 是否推荐
const isFavorite = ref(false); // 是否收藏

// const activityInfo = ref(null)
// 关闭弹窗
const handleClose = () => {
    showPopup.value = false;
    emit('close', showPopup.value);
};

// 收藏功能
const toggleFavorite = () => {
    emit('favorite-change', !props.activityInfo.isFavorite);
};

// 定义 props 和 emits
const props = defineProps({
    title: { type: String, default: '书香溢社区，温暖伴同行' },
    bannerImage: { type: String, default: '' },
    author: { type: String, default: '匿名' },
    time: { type: String, default: '2025-08-30 10:01:30' },
    category: { type: String, default: '社区活动文化' },
    content: { type: String, default: '' },
    isRecommended: { type: Boolean, default: true },
    activityInfo: {
        type: Object
    }
});

const emit = defineEmits(['close', 'favorite-change']);
const navigateToGaode = (longitude, latitude) => {
    const mylocation = JSON.parse(window.localStorage.getItem('mylocation') || '{}').locatonArr
    
    window.location.href = `https://uri.amap.com/navigation?from=${mylocation.join(',')},startpoint&to=${longitude},${latitude},endpoint&mode=walk&policy=0&src=mypage&callnative=1`
    const hhh = `https://uri.amap.com/navigation?from=${mylocation.join(',')},startpoint&to=${longitude},${latitude},endpoint&mode=walk&policy=0&src=mypage&callnative=1`
    console.log('hhhh', hhh);
    
}

</script>

<style scoped lang="less">
.activity-image-wrapper{
    display: flex;
    flex-wrap: wrap;
    .activity-image{
        width: 100px;
        height: 100px;
        padding: 10px 10px 0 10px;
    }
    // .van-image{
    //     width: 100px;
    //     height: 100px;
    // }
}
:deep(.van-image__error) {
    background-color: transparent !important;
}
.van-popup--bottom.van-popup--round {
    border-radius: 24px 24px 0 0;
}

.activity-popup {
    height: 100%;
    overflow-y: auto;
    padding: 0;

    // 顶部 Banner
    .popup-header {
        position: relative;

        .header-image {
            width: 100%;
            height: 110px;
            border-radius: 24px 24px 0 0;
        }

        .close-icon {
            position: absolute;
            top: 12px;
            right: 12px;
            background: #fff;
            border-radius: 50%;
            padding: 6px;
            font-size: 20px;
            color: #f00;
            box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
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

    // 信息区域
    .info-section {
        padding: 0 24px;
        position: absolute;
        top: 110px;
        bottom: 0;
        left: 0;
        right: 0;
        border: 1px solid #FFFFFF;
        border-radius: 16px 16px 0 0;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.7) 0%, #FFFFFF 8.22%);
        backdrop-filter: blur(15px);

        .title {
            width: 260px;
            height: 36px;
            border-radius: 0 0 16px 16px;
            background: #FF6D2333;
            color: #FF6D23;
            line-height: 36px;
            font-size: 20px;
            font-weight: 500;
            text-align: center;
            margin: 0 auto;
        }

        .address-group {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 18px;

            .icon-location {
                width: 14px;
                height: 14px;
                background: url('@/assets/icons/icon-location.svg') no-repeat center;
                background-size: cover;
            }

            .distance {
                font-size: 12px;
                color: #000000;
                margin-left: 4px;
                font-weight: 500;
            }
        }

        .activity-tag {
            width: 109px;
            height: 20px;
            margin: 13px auto 0;
            font-size: 14px;
            color: #fff;
            border-radius: 4px;
            text-align: center;
            background: linear-gradient(253.43deg, #FF6D23 0%, #FFA375 100%);
        }

        .date {
            color: rgba(17, 17, 17, 0.3);
            text-align: center;
            margin-top: 4px;
            text-align: center;
        }

        .content {
            font-size: 14px;
            line-height: 24px;
            color: rgba(17, 17, 17, 0.6);
        }

        .icon-star {
            position: absolute;
            top: 10px;
            left: 15px;
            display: inline-block;
            width: 20px;
            height: 20px;
            background: url('../../../assets/icons/icon-love.svg') no-repeat center;

            &.active {
                background: url('../../../assets/icons/icon-love-active.svg') no-repeat center;
            }
        }
    }
}
</style>