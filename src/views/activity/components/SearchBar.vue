<template>
  <div class="search-bar">
    <van-icon name="search" class="search-icon" />
    <input
      v-model="searchValue"
      class="search-input"
      placeholder="搜索地点、服务、活动"
      @input="handleInput"
    />
  </div>
</template>

<script setup lang="ts">
import { ref,  } from 'vue';

const searchValue = ref('');
const emit = defineEmits(['search'])
// 搜索输入事件
const handleInput = (e: Event) => {
  const value = (e.target as HTMLInputElement).value;
  emit('search', value);
};

</script>

<style scoped lang="less">
.search-bar {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 20px;
  padding: 6px 12px;
  margin: 10px 16px;

  .search-icon {
    color: #999;
    font-size: 16px;
    margin-right: 8px;
  }

  .search-input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 14px;
    color: #333;
  }
}
</style>