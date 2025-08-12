<template>
  <div class="search-bar">
    <div class="icon-search"></div>
    <van-field
      v-model="searchValue"
      class="search-input"
      placeholder="搜索位置"
      @input="handleInput"
    />
    <div class="search-button" @click="handleSearch">
      搜索
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { showToast } from 'vant';

const searchValue = ref('');
const emit = defineEmits(['search-input','search'])
// 输入事件（实时监听）
const handleInput = (value: string) => {
  emit('search-input', value); // 向父组件传递输入值
};

// 搜索按钮点击事件
const handleSearch = () => {
  if (!searchValue.value.trim()) {
    showToast('请输入搜索内容');
    return;
  }
  emit('search', searchValue.value); // 触发搜索逻辑
};
</script>

<style scoped lang="less">
:deep(.van-cell:after){
    border:none;
}
:deep(.van-cell){
    padding:0;
}
:deep(.van-cell__value){
    line-height: 1;
}
.search-bar {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 12px;
  padding: 9px 0 9px 20px;
  margin:0 8px 12px;
  .icon-search{
    margin-right: 8px;
    width: 18px;
    height: 18px;
    background: url('../../../assets/icons/icon-search.svg') no-repeat center;
  }
  .search-input {
    flex: 1;
    --placeholder-color: rgba(0, 0, 0, 0.5);
    font-size: 12px;
    // height: 44px;
    border:none;
  }

  .search-button {
    padding:0 20px;
    height: 24px;
    line-height: 24px;
    border-left: 1px solid #FFA375;
    font-size: 12px;
    font-weight: 500;
    color:#FF6D23;
  }
}
</style>