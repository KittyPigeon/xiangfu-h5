<template>
    <div class="activity-tab-group">
        <div class="activity-tab">
            <div v-for="(item, index) in tabs" :key="index" class="tab-item" :class="{ active: current === index }"
                @click="handleTabClick(index)">
                {{ item }}
            </div>
        </div>

        <span class="more">更多 <van-icon name="arrow" size="12" color="rgba(0, 0, 0, 0.35)" /></span>
    </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';

const tabs = ref(['即将上线', '进行中', '往期活动']);
const current = ref(0);
const emit = defineEmits(['change'])
const handleTabClick = (index: number) => {
    current.value = index;
    emit('change', index);
};

</script>

<style scoped lang="less">
.activity-tab-group{
    display: flex;
    align-items: center;
    margin-top: 16px;
}
.activity-tab {
    display: flex;
    flex: 1;
    .tab-item {
        // width: 88px;
        text-align: center;
        padding: 8px 16px;
        font-size: 14px;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.3);
        cursor: pointer;
        white-space: nowrap;

        &.active {
            color: #fff;
            background: linear-gradient(270deg, #FF6D23 0%, #FF9560 100%);
            border-radius: 20px;
        }
    }
}
.more{
    font-size: 12px;
    font-weight: 600;
    color:rgba(0, 0, 0, 0.35);
}
</style>