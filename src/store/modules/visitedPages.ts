import { defineStore } from "pinia";
import { store } from "@/store";

const initVisitedPages = () => {
  // 向后端添加新手访问页面； 每个用户有1个路由字符串，'home' 'mine' 'activity' 'intro' 'intro2' 'activityList' 'couponList'
  const res = 'mine,intro'
  return res.split(',')
}

export const useVisitedPagesStore = defineStore({
  id: "visited-pages",
  state: () => ({
    visitedPages: initVisitedPages()
  }),
  actions: {
    addVisitedPage(page: string) {
      // 向后端添加新手页面
      this.visitedPages.push(page);
    },
    removeVisitedPage(page: string) {
      this.visitedPages = this.visitedPages.filter(p => p !== page);
    }
  }
});

export function useVisitedPagesStoreHook() {
  return useVisitedPagesStore(store);
}
