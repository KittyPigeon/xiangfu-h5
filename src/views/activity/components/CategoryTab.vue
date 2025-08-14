<template>
    <div class="category-tab">
        <div v-for="(item, index) in tabs" :key="index" class="tab-item" :class="{ active: current === index }"
            @click="handleTabClick(index)">
            <van-icon :name="item.icon" class="tab-icon" />
            <span class="tab-text">{{ item.text }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface TabItem {
    text: string;
    icon: string;
}

const tabs = ref<TabItem[]>([
    { text: '运动健身', icon: 'bike' },
    { text: '艺术积累', icon: 'brush' },
    { text: '便利生活', icon: 'shop' },
    { text: '社区活动', icon: 'community' },
    { text: '教育教学', icon: 'book' },
]);

const current = ref(0);
const emit = defineEmits(['change'])
const handleTabClick = (index: number) => {
    current.value = index;
    emit('change', index);
};

</script>

<style scoped lang="less">
.category-tab {
    display: flex;
    justify-content: space-around;
    background: #fff;
    padding: 10px 0;
    margin: 0 16px;
    border-radius: 8px;

    .tab-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;

        .tab-icon {
            font-size: 20px;
            color: #666;
            margin-bottom: 4px;
        }

        .tab-text {
            font-size: 12px;
            color: #666;
        }

        &.active {

            .tab-icon,
            .tab-text {
                color: #ff6600;
            }
        }
    }
}
</style>