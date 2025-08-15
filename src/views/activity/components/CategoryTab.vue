<template>
    <div class="category-tab">
        <div v-for="(item, index) in tabs" :key="index" class="tab-item" :class="{ active: current === index }"
            @click="handleTabClick(index)">
            <!-- <van-icon :name="item.icon" class="tab-icon" /> -->
            <span class="tab-icon" :class="[item.icon]"></span>
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
@import url('@/styles/mixin.less');

.category-tab {
    display: flex;
    justify-content: space-between;
    margin: 0 20px;

    .tab-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;

        .tab-icon {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.9);
            margin-bottom: 4px;

            &.bike {
                .svg-mask('@/assets/icons/icon-tab-bike.svg', 24px, #fff);

            }

            &.brush {
                .svg-mask('@/assets/icons/icon-tab-brush.svg', 24px, #fff);

            }

            &.shop {
                .svg-mask('@/assets/icons/icon-tab-shop.svg', 24px, #fff);

            }

            &.community {
                .svg-mask('@/assets/icons/icon-tab-community.svg', 24px, #fff);

            }

            &.book {
                .svg-mask('@/assets/icons/icon-tab-book.svg', 24px, #fff);
            }
        }

        .tab-text {
            font-size: 12px;
           color: rgba(255, 255, 255, 0.9);
        }
    }
}
</style>