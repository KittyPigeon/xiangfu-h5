import Layout from "@/layout/index.vue";
import type { RouteRecordRaw } from "vue-router";
import Demo from "@/views/demo/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "root",
    component: Layout,
    redirect: { name: "Home" },
    children: [
      {
        path: "home",
        name: "Home",
        component: () => import("@/views/home/index.vue"),
        meta: {
          title: "主页"
        }
      },
      {
        path: "mine",
        name: "Mine",
        component: () => import("@/views/mine/index.vue"),
        meta: {
          title: "我的"
        }
      },
      {
        path: "intro",
        name: "Intro",
        component: () => import("@/views/intro/index.vue"),
        meta: {
          title: "好推荐"
        }
      },
      {
        path: "activity",
        name: "Activity",
        component: () => import("@/views/activity/index.vue"),
        meta: {
          title: "逛活动"
        }
      },
      {
        path: "moment",
        name: "Moment",
        component: () => import("@/views/moment/index.vue"),
        meta: {
          title: "拼&约"
        }
      }
    ]
  }
];

export default routes;
