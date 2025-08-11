<script setup lang="ts">
import { useDarkMode, useToggleDarkMode } from "@/hooks/useToggleDarkMode";
import { computed } from "vue";
import { useRoute } from "vue-router";
const onClickRight = (event: TouchEvent | MouseEvent) => {
  useToggleDarkMode(event);
};
const route = useRoute()
const title:any = computed(() => {
  return route.meta.title
})
</script>

<template>
  <van-nav-bar fixed placeholder @click-right="onClickRight" :title="title" :safe-area-inset-top="true">
    <!-- <template #right>
      <svg-icon class="text-[18px]" :name="useDarkMode() ? 'light' : 'dark'" />
    </template> -->
  </van-nav-bar>
</template>

<style scoped></style>
