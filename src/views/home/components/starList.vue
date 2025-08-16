<template>
    <div class="favorite-filter">
        <!-- 内容区域：两行四列布局 -->
        <div class="filter-content" :class="{ expanded: isExpanded }">
            <div class="filter-item" v-for="(item, index) in filterItemsList" :key="index"
                :class="{ active: item.isActive }" @click="handleItemClick(item)">
                <!-- 图标 -->
                <div class="item-icon">
                    <!-- <img :src="item.icon" :alt="item.text" /> -->
                     <div class="icon" :class="[item.icon]"></div>
                </div>
                <!-- 徽章数字 -->
                <div class="badge" v-if="item.badge">
                    {{ item.badge }}
                </div>
                <!-- 文字描述 -->
                <div class="item-text">
                    {{ item.text }}
                </div>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import PorkIcon from '@/assets/images/icon-food.png'
// 定义单个筛选项的类型
interface FilterItem {
    text: string;        // 分类文字
    icon: string;        // 图标路径
    badge: number;       // 徽章数字
    isActive: boolean;   // 是否选中
}
const props = defineProps({
    // 是否显示倒计时（如听力科目设为false）
    isExpanded: {
        type: Boolean,
        default: false
    },
    filterItemsList: {
        type: Array<FilterItem>,
        default() {
            return []
        }
    }
});

// 响应式数据
// const isExpanded = ref(false); // 控制内容展开/收起状态

// 模拟筛选数据（与设计稿一致的 8 项）
const filterItems = ref<FilterItem[]>([
    { text: '餐饮美食', icon: PorkIcon, badge: 7, isActive: false },
    { text: '购物商城', icon: PorkIcon, badge: 2, isActive: true },
    { text: '景点名胜', icon: PorkIcon, badge: 3, isActive: false },
    { text: '酒店住宿', icon: PorkIcon, badge: 5, isActive: false },
    { text: '休闲娱乐', icon: PorkIcon, badge: 11, isActive: false },
    { text: '教育培训', icon: PorkIcon, badge: 1, isActive: false },
    { text: '医疗健康', icon: PorkIcon, badge: 3, isActive: false },
    { text: '运动健身', icon: PorkIcon, badge: 9, isActive: false },
]);

// 切换展开/收起
// const toggleExpand = () => {
//     isExpanded.value = !isExpanded.value;
// };

// 点击筛选项事件
const handleItemClick = (item: FilterItem) => {
    // 这里可根据需求修改选中态逻辑（如单选/多选）
    item.isActive = !item.isActive;
    // 可在此处 emit 事件给父组件：
    // emit('item-click', item);
};
</script>

<style scoped lang="less">
.favorite-filter {

    // height: 200px;
    // 内容区域：默认收起，点击箭头展开

    .filter-content {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px 16px;
        height: 0;

        // 展开时的样式
        &.expanded {
            height: auto;
            // max-height: 300px; // 可根据实际内容调整
        }

        // 单个筛选项
        .filter-item {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            cursor: pointer;
            border-radius: 8px;
            transition: background 0.2s;

            // 图标容器
            .item-icon {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 68px;
                height: 44px;
                margin-bottom: 4px;
                border: 1px solid #FF6D23;
                border-radius: 12px 0 12px 0;

                .icon {
                    width: 44px;
                    height: 44px;
                    &.icon-food{
                        background: url('../../../assets/images/icon-food.png') no-repeat center;
                        background-size: cover;
                    }
                    &.icon-shopping{
                        background: url('../../../assets/images/icon-food.png') no-repeat center;
                        background-size: cover;
                    }
                    &.icon-entertainment{
                        background: url('../../../assets/images/icon-food.png') no-repeat center;
                        background-size: cover;
                    }
                    &.icon-hotel{
                        background: url('../../../assets/images/icon-food.png') no-repeat center;
                        background-size: cover;
                    }
                }
            }

            // 徽章数字
            .badge {
                position: absolute;
                top: -12px;
                right: -12px;
                background: #FF2020;
                color: #fff;
                font-size: 14px;
                font-weight: 500;
                padding: 2px 8px;
                border-radius: 12px;
                z-index: 1;
                min-width: 24px;
            }

            // 文字描述
            .item-text {
                font-size: 12px;
                color: rgba(0, 0, 0, 0.5);
                margin-top: 8px;
            }

            // 点击反馈
            &:hover {
                background: #f8f9fa;
            }
        }
    }
}

// 结合之前的拖拽逻辑时，可修改 max-height 为动态计算，这里简化为点击展开</style>