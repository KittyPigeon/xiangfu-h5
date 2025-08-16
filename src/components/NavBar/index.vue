<script setup lang="ts">
import { useDarkMode, useToggleDarkMode } from "@/hooks/useToggleDarkMode";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
const onClickRight = (event: TouchEvent | MouseEvent) => {
  useToggleDarkMode(event);
};
const route = useRoute()
const router = useRouter();
const title: any = computed(() => {
  return route.meta.title
})

const onClickLeft = () => {
  router.back();
}
</script>

<template>
  <van-nav-bar fixed placeholder left-arrow @click-right="onClickRight" @click-left="onClickLeft" :title="title"
    :safe-area-inset-top="true">
    <!-- <template #right>
      <svg-icon class="text-[18px]" :name="useDarkMode() ? 'light' : 'dark'" />
    </template> -->
  </van-nav-bar>
</template>

<style scoped lang="less">
:deep(.van-nav-bar .van-icon) {
  color: #000;
}
</style>
