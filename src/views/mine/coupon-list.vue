<template>
    <nav-bar></nav-bar>
    <div class="container">
        <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="loadingMore">
            <!-- 优惠券列表 -->
            <van-cell-group class="coupon-list">
                <div class="coupon-table">
                    <div class="table-header">
                        <span>商户</span>
                        <span>领取时间</span>
                        <span>面额</span>
                    </div>
                    <div class="table-row" v-for="(item, index) in couponList" :key="index">

                        <span class="table-row-column merchant-row">
                            <div class="qrcode">
                                <van-image class="qrcode" fit="cover" :src="item.couponCode"
                                    @click="showQrcode(item)" />
                            </div>
                            <div class="merchant">{{ item.merchantName }}</div>
                        </span>
                        <span class="table-row-column">{{ item.receiveTime }}</span>
                        <span class="table-row-column">{{ item.discountAmount }}</span>
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
import { queryUserCoupons } from '@/api/user';
import to from 'await-to-js'
import { showToast } from 'vant';
import NavBar from "@/components/NavBar/index.vue";


const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const couponList = ref([])
const qrCodeVisible = ref(false)
const qrcodeUrl = ref('')
const pageSize = ref(20)
const page = ref(1)
onMounted(() => {
    getUserCoupon();
})

const showQrcode = (data) => {
    qrCodeVisible.value = true;
    qrcodeUrl.value = data.couponCode;
}
const getUserCoupon = async () => {
    loading.value = true;
    const [err, res] = await to<any, any>(queryUserCoupons({
        current: page.value,
        size: pageSize.value,
        status: 1
    }));
    loading.value = false;
    if (err) {
        showToast(err.message)
        finished.value = true;
        return
    }
    couponList.value = couponList.value.concat(res.data.records);
    finished.value = res.data.hasNext;
}

const loadingMore = () => {
    // page.value++;
    // getUserCoupon()
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
