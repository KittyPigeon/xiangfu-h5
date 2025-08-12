<template>
  <div class="my-favorite" :class="{active:isActive}" @click="handleFavoriteClick">
    <!-- Vant 图标（需提前注册或按需引入） -->
    <span class="favorite-icon"></span>
    <span class="favorite-text">我的收藏</span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { showToast } from 'vant';
const isActive = ref(false)

// 点击事件（可扩展：弹出收藏列表弹窗）
const handleFavoriteClick = () => {
  // 实际逻辑：打开收藏列表弹窗/跳转收藏页等
};
</script>

<style scoped lang="less">
.my-favorite {
  display: flex;
  align-items: center;
  padding: 0 18px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, #FFFFFF 8.22%);
  width: 112px;
  height: 36px;
  box-sizing: border-box;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.2s;
  margin-bottom: 12px;
  margin-left: 8px;
  &.active {
    .favorite-icon {
      background: url('../../../assets/icons/icon-love-active.svg') no-repeat center;

    }

    .favorite-text {
      color: #FF6D23;
    }
  }

  .favorite-icon {
    display: inline-block;
    margin-right: 8px;
    width: 20px;
    height: 20px;
    background: url('../../../assets/icons/icon-love.svg') no-repeat center;
  }

  .favorite-text {
    font-size: 12px;
    color: #666666;
  }
}
</style>