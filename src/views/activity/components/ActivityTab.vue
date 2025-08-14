<template>
    <div class="activity-tab">
        <div v-for="(item, index) in tabs" :key="index" class="tab-item" :class="{ active: current === index }"
            @click="handleTabClick(index)">
            {{ item }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const tabs = ref(['即将上线', '进行中', '往期活动', '更多']);
const current = ref(0);
const emit = defineEmits(['change'])
const handleTabClick = (index: number) => {
    current.value = index;
    emit('change', index);
};

</script>

<style scoped lang="less">
.activity-tab {
    display: flex;
    margin: 10px 16px;

    .tab-item {
        flex: 1;
        text-align: center;
        padding: 6px 0;
        font-size: 14px;
        color: #666;
        border-bottom: 2px solid transparent;
        cursor: pointer;

        &.active {
            color: #ff6600;
            border-bottom-color: #ff6600;
        }
    }
}
</style>