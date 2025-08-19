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
          title: "主页",
          showTabBar: true // 需要显示tabBar
        }
      },
      {
        path: "mine",
        name: "Mine",
        component: () => import("@/views/mine/index.vue"),
        meta: {
          title: "我的",
          showTabBar: true // 需要显示tabBar
        }
      },
      {
        path: "/activityList",
        name: "ActivityList",
        component: () => import("@/views/mine/activity-list.vue"),
        meta: {
          title: "我的活动",
          showTabBar: false // 需要显示tabBar
        }
      },
      {
        path: "couponList",
        name: "CouponList",
        component: () => import("@/views/mine/coupon-list.vue"),
        meta: {
          title: "我的优惠券"
        }
      },
      {
        path: "intro",
        name: "Intro",
        component: () => import("@/views/intro/index.vue"),
        meta: {
          title: "好推荐",
          showTabBar: true // 需要显示tabBar
        }
      },
      {
        path: "activity",
        name: "Activity",
        component: () => import("@/views/activity/index.vue"),
        meta: {
          title: "逛活动",
          showTabBar: true // 需要显示tabBar
        }
      },
      {
        path: "moment",
        name: "Moment",
        component: () => import("@/views/moment/index.vue"),
        meta: {
          title: "拼&约",
          showTabBar: true // 需要显示tabBar
        }
      },
      {
        path: "add-activity",
        name: "AddActivity",
        component: () => import("@/views/moment/addActivity.vue"),
        meta: {
          title: "添加活动"
        }
      }
    ]
  }
];

export default routes;
