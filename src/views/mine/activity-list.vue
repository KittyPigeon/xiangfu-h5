<template>
    <!-- <nav-bar></nav-bar> -->
    <div class="container">
        <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="loadingMore">
            <!-- 我参加的活动 -->
            <van-cell-group class="activity-list">
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
        </van-list>
        <van-overlay :show="qrCodeVisible" @click="qrCodeVisible = false">
            <div class="wrapper">
                <van-image class="activity-qrcode-url" fit="cover" :src="qrcodeUrl" @click.stop /> >
            </div>
        </van-overlay>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { queryCollectList } from '@/api/collect'
import { EnumCollectTargetType } from '@/enums/collect'
import to from 'await-to-js'
import { showToast } from 'vant';
import NavBar from "@/components/NavBar/index.vue";
import dayjs from 'dayjs';


const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const activityList = ref([])
const qrCodeVisible = ref(false)
const qrcodeUrl = ref('')
const pageSize = ref(20)
const page = ref(1)
onMounted(() => {
    getUserActivity();
})

const getUserActivity = async () => {
    const [err, res] = await to<any, any>(queryCollectList({
        current: 1,
        size: 9999,
        targetType: EnumCollectTargetType.ACTIVITY
    }));
    if (err) {
        showToast(err.message)
        finished.value = true;
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
    });
     finished.value = !res.data.hasNext;
}

const loadingMore = () => {
    if (!finished.value) {
        // page.value++;
        // getUserActivity()
    }
}
</script>
<style scoped lang='less'>
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

            }

            &:last-child {
                border-bottom: none;
            }

            .name-group {
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
