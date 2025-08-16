<template>
    <div class="category-tab">
        <div v-for="(item, index) in tabList" :key="index" class="tab-item" :class="{ active: current === index }"
            @click="handleTabClick(index)">
            <!-- <van-icon :name="item.icon" class="tab-icon" /> -->
            <span class="tab-icon" :class="[item.icon]"></span>
            <span class="tab-text">{{ item.text }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { queryActivityCategory } from '@/api/activity'
interface TabItem {
    text: string;
    icon: string;
}
const props = defineProps({
    tabList: {
        type: Array<TabItem>,
        default() {
            return []
        }
    }
});

const current = ref(0);
const emit = defineEmits(['change'])
const handleTabClick = (index: number) => {
    current.value = index;
    emit('change', index);
};

onMounted(() => {
    getCategory();
})
const getCategory = async () => {
    const res = await queryActivityCategory()
    console.log('res', res)
}
</script>

<style scoped lang="less">
@import url('@/styles/mixin.less');

.category-tab {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 20px;
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

            &.icon-sports {
                .svg-mask('@/assets/icons/icon-tab-bike.svg', 24px, #fff);

            }

            &.icon-festival {
                .svg-mask('@/assets/icons/icon-tab-brush.svg', 24px, #fff);

            }

            &.icon-exhibition {
                .svg-mask('@/assets/icons/icon-tab-shop.svg', 24px, #fff);

            }

            &.icon-music {
                .svg-mask('@/assets/icons/icon-tab-community.svg', 24px, #fff);

            }

            &.icon-culture {
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