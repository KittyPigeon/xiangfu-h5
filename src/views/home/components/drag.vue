<template>
    <div class="drag-expand-panel" @click.stop>
        <!-- 拖拽手柄区域（标题 + 箭头） -->
        <div class="drag-handle" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd"
            @mousedown="onTouchStart" @mousemove="onTouchMove" @mouseup="onTouchEnd" @click.stop>
            <span class="panel-title">{{ title }}</span>
            <!-- 箭头图标，通过旋转控制展开/收起状态 -->
            <div class="arrow-icon" :style="{ transform: `rotate(${arrowRotate}deg)` }"
                transition="transform 0.3s ease">
                <img class="icon" :src="IconArrow" />
                <img class="icon" :src="IconArrow" />
            </div>
        </div>
        <!-- 收藏详情内容区域，利用过渡动画控制显示/隐藏和位移 -->
        <transition name="expand-collapse">
            <div v-show="isPanelExpanded" class="content" :style="{
                transform: `translateY(${contentTranslateY}px)`,
                opacity: contentOpacity,
            }" @click.stop>
                <slot></slot>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import IconArrow from '@/icons/svg/arrow.png'
// 组件接收的属性
const props = defineProps({
    title: {
        type: String,
        default: '分类筛选&收藏筛选',
    },
    // 内容收起时的高度（用于计算拖拽阈值等）
    collapsedHeight: {
        type: Number,
        default: 44,
    },
    // 内容展开时的高度（可根据实际内容动态调整，这里先写固定值示例）
    expandedHeight: {
        type: Number,
        default: 300,
    },
});

// 响应式数据
const startY = ref(0); // 记录触摸/鼠标起始位置
const contentTranslateY = ref(0); // 内容区域的 translateY 值，用于拖拽位移和动画
const arrowRotate = ref(0); // 箭头旋转角度
const contentOpacity = ref(0); // 内容区域的透明度，用于过渡动画
const isDragging = ref(false); // 是否正在拖拽
const isPanelExpanded = ref(false); // 内容是否展开
const emit = defineEmits(['drag'])
// 触摸/鼠标按下事件（兼容移动端和 PC 端）
const onTouchStart = (e: TouchEvent | MouseEvent) => {
    const event = e as TouchEvent;
    startY.value = 'touches' in e
        ? event.touches[0].clientY
        : (e as MouseEvent).clientY;
    isDragging.value = true;
    // 初始化箭头旋转角度（根据当前展开状态）
    arrowRotate.value = isPanelExpanded.value ? 180 : 0;
};

// 触摸/鼠标移动事件
const onTouchMove = (e: TouchEvent | MouseEvent) => {
    if (!isDragging.value) return;
    const event = e as TouchEvent;
    const currentY = 'touches' in e
        ? event.touches[0].clientY
        : (e as MouseEvent).clientY;
    const deltaY = currentY - startY.value;
    startY.value = currentY;

    // 根据拖拽方向处理位移和箭头旋转
    if (deltaY < 0) { // 向上拖拽
        contentTranslateY.value = Math.min(
            contentTranslateY.value + deltaY,
            0
        );
        // 根据拖拽进度改变箭头旋转角度
        const progress = Math.abs(contentTranslateY.value) / props.expandedHeight;
        arrowRotate.value = 180 * progress;
    } else { // 向下拖拽
        contentTranslateY.value = Math.max(
            contentTranslateY.value + deltaY,
            -props.expandedHeight
        );
        const progress = Math.abs(contentTranslateY.value) / props.expandedHeight;
        arrowRotate.value = 180 * (1 - progress);
    }
};

// 触摸/鼠标松开事件
const onTouchEnd = () => {
    isDragging.value = false;
    const threshold = props.expandedHeight * 0.3; // 定义拖拽阈值

    if (isPanelExpanded.value) {
        isPanelExpanded.value = false;
        contentTranslateY.value = -props.expandedHeight;
        arrowRotate.value = 0;
        contentOpacity.value = 0;
        emit('drag', isPanelExpanded.value)
        // // 当前是展开状态，判断是否向下拖拽超过阈值，执行收起
        // if (contentTranslateY.value > threshold) {

        // } else {
        //     // 未超过阈值，恢复展开状态
        //     contentTranslateY.value = 0;
        //     arrowRotate.value = 180;
        //     contentOpacity.value = 1;
        // }
    } else {
        // 当前是收起状态，判断是否向上拖拽超过阈值，执行展开

        if (Math.abs(contentTranslateY.value) > threshold) {
            
            isPanelExpanded.value = true;
            contentTranslateY.value = 0;
            arrowRotate.value = 180;
            contentOpacity.value = 1;
            emit('drag', isPanelExpanded.value)
        } else {
             emit('drag', false)
            // 未超过阈值，恢复收起状态
            contentTranslateY.value = -props.expandedHeight;
            arrowRotate.value = 0;
            contentOpacity.value = 0;
        }
    }
};

onMounted(() => {
    // 初始化内容区域状态（收起时的位置和透明度）
    contentTranslateY.value = -props.expandedHeight;
    contentOpacity.value = 0;
});
</script>

<style scoped lang="less">
.drag-expand-panel {
    background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 100%);

    border-radius: 8px 8px 0 0;
    overflow: hidden;
    margin: 0 8px;

}

.drag-handle {
    height: 50px;
    /* 与设计稿中收起高度匹配 */
    cursor: pointer;
    text-align: center;
    padding-top: 12px;
}

.panel-title {
    font-size: 12px;
    color: rgba(0, 0, 0, 0.3);
    margin-bottom: 10px;
    text-align: center;
}

.arrow-icon {
    // margin-left: 10px;
    transition: transform 0.3s ease;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .icon {
        display: inline-block;
        width: 8px;
        height: auto;
    }
}

.content {
    padding: 20px;
    transition: transform 0.3s ease, opacity 0.3s ease;
}

/* 过渡动画样式 */
.expand-collapse-enter-active,
.expand-collapse-leave-active {
    transition: all 0.3s ease;
}

.expand-collapse-enter-from,
.expand-collapse-leave-to {
    opacity: 0;
    transform: translateY(20px);
}

.expand-collapse-enter-to,
.expand-collapse-leave-from {
    opacity: 1;
    transform: translateY(0);
}
</style>