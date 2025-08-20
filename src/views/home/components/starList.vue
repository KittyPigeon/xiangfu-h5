<template>
    <div class="favorite-filter">
        <!-- 内容区域：两行四列布局 -->
        <div class="filter-content" :class="{ expanded: isExpanded }">
            <div class="filter-item" v-for="(item, index) in filterItems" :key="index"
                :class="{ active: activeIndex === item.index }" @click="handleItemClick(item)">
                <!-- 图标 -->
                <div class="item-icon">
                    <!-- <img :src="item.icon" :alt="item.text" /> -->
                    <div class="icon" :class="[item.class]"></div>
                </div>
                <!-- 徽章数字 -->
                <div class="badge" v-if="item.badge">
                    {{ item.badge }}
                </div>
                <!-- 点击选中 -->
                <div class="label-check" v-if="activeIndex === item.id">
                    <!-- <img src="@/assets/images/label-check.png" alt="选中"> -->
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
import ShoppingIcon from '@/assets/images/icon-shopping.png'
import EntertainmentIcon from '@/assets/images/icon-entertainment.png'
import HotelIcon from '@/assets/images/icon-hotel.png'
import EducationIcon from '@/assets/images/icon-education.png'
import MedicalIcon from '@/assets/images/icon-medical.png'
import FitnessIcon from '@/assets/images/icon-fitness.png'
import SceneIcon from '@/assets/images/icon-scene.png'
// 定义单个筛选项的类型
interface FilterItem {
    text: string;        // 分类文字
    badge: number;       // 徽章数字
    id: number;       // 徽章数字
    index: number;       // 徽章数字
    isActive: boolean;   // 是否选中
    icon: string;        // 图标路径
    class: string;        // 图标路径
}
const emit = defineEmits(['item-click'])
const props = defineProps({
    // 是否显示倒计时（如听力科目设为false）
    isExpanded: {
        type: Boolean,
        default: false
    },
    // filterItemsList: {
    //     type: Array<FilterItem>,
    //     default() {
    //         return []
    //     }
    // }
});

// 响应式数据
// const isExpanded = ref(false); // 控制内容展开/收起状态
const activeIndex = ref(0)

// 模拟筛选数据（与设计稿一致的 8 项）
const filterItems = ref<FilterItem[]>([
    { id: 1, index: 0, text: '餐饮美食', icon: PorkIcon, class:'icon-food', badge: 7, isActive: false },
    { id: 2, index: 1, text: '购物商城', icon: ShoppingIcon, class:'icon-shopping', badge: 2, isActive: true },
    { id: 5, index: 2, text: '景点名胜', icon: SceneIcon,class:'icon-scene', badge: 3, isActive: false },
    { id: 4, index: 3, text: '酒店住宿', icon: HotelIcon,class:'icon-hotel', badge: 5, isActive: false },
    { id: 3, index: 4, text: '休闲娱乐', icon: EntertainmentIcon, class:'icon-entertainment',badge: 11, isActive: false },
    { id: 8, index: 5, text: '教育培训', icon: EducationIcon, class:'icon-education',badge: 1, isActive: false },
    { id: 7, index: 6, text: '医疗健康', icon: MedicalIcon, class:'icon-medical',badge: 3, isActive: false },
    { id: 6, index: 7, text: '运动健身', icon: FitnessIcon, class:'icon-fitness',badge: 9, isActive: false },
]);

// 切换展开/收起
// const toggleExpand = () => {
//     isExpanded.value = !isExpanded.value;
// };

// 点击筛选项事件
const handleItemClick = (item: FilterItem) => {
    // 可在此处 emit 事件给父组件：
    emit('item-click', item);
    // item.isActive = !item.isActive;
    activeIndex.value = item.index;
};
</script>

<style scoped lang="less">
.active {
    .item-text {
        color: #FF6D23 !important;
    }
    .label-check {
        position: absolute;
        bottom: 30px;
        right: 0;
        width: 18px;
        height: 18px;
        background: url('../../../assets/images/label-check.png') no-repeat center;
        background-size: cover;
    }
}

.favorite-filter {
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

                    &.icon-food {
                        background: url('../../../assets/images/icon-food.png') no-repeat center;
                        background-size: cover;
                    }

                    &.icon-shopping {
                        background: url('../../../assets/images/icon-shopping.png') no-repeat center;
                        background-size: cover;
                    }

                    &.icon-entertainment {
                        background: url('../../../assets/images/icon-entertainment.png') no-repeat center;
                        background-size: cover;
                    }

                    &.icon-hotel {
                        background: url('../../../assets/images/icon-hotel.png') no-repeat center;
                        background-size: cover;
                    }

                    &.icon-fitness {
                        background: url('../../../assets/images/icon-fitness.png') no-repeat center;
                        background-size: cover;
                    }

                    &.icon-medical {
                        background: url('../../../assets/images/icon-medical.png') no-repeat center;
                        background-size: cover;
                    }

                    &.icon-scene {
                        background: url('../../../assets/images/icon-scene.png') no-repeat center;
                        background-size: cover;
                    }
                    &.icon-education {
                        background: url('../../../assets/images/icon-education.png') no-repeat center;
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