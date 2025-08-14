<template>
  <!-- Vant 弹窗组件 -->
  <van-popup
    v-model:show="showPopup"
    position="bottom"
    round
    :style="{ height: '80%' }"
    @close="handleClose"
  >
    <!-- 弹窗内容容器 -->
    <div class="activity-popup">
      <!-- 顶部 Banner（含关闭按钮） -->
      <div class="popup-header">
        <van-image
          fit="cover"
          class="header-image"
          :src="bannerImage"
        />
        <van-icon
          name="close"
          class="close-icon"
          @click="handleClose"
        />
        <div class="activity-tag" v-if="isRecommended">推荐</div>
      </div>

      <!-- 标题与基础信息 -->
      <div class="info-section">
        <h2 class="title">{{ title }}</h2>
        <div class="meta">
          <span class="author">发布者：{{ author }}</span>
          <span class="time">{{ time }}</span>
          <van-icon
            name="heart"
            class="favorite-icon"
            :class="{ active: isFavorite }"
            @click="toggleFavorite"
          />
        </div>
      </div>

      <!-- 活动分类标签 -->
      <van-tag class="category-tag" :text="category" />

      <!-- 正文内容 -->
      <div class="content" v-html="content"></div>
    </div>
  </van-popup>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { VanPopup, VanImage, VanIcon, VanTag } from 'vant';

// 外部控制弹窗显示
const showPopup = ref(false);

// 活动数据（可通过 props 传入）
const title = ref('书香溢社区，温暖伴同行');
const bannerImage = ref('https://example.com/activity-banner.jpg'); // 替换为实际图片
const author = ref('匿 名');
const time = ref('2025-08-30 10:01:30');
const category = ref('社区活动文化');
const content = ref(`
  <p>袅袅凉风动，泬寥清时秋。在第三个世界读书日到来之际，祥符街道社区组织开展了以“书香溢社区，温暖伴同行”为主题的世界读书日活动。</p>
  <p>这次活动通过设置特色摊位、更暖心便民服务拉近了街道与居民的距离，营造了全民阅读的良好氛围，让知识通过文字与画面，重温暖着这座城市的每一个角落。</p>
`);
const isRecommended = ref(true); // 是否推荐
const isFavorite = ref(false); // 是否收藏

// 关闭弹窗
const handleClose = () => {
  showPopup.value = false;
  emit('close');
};

// 收藏功能
const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value;
  emit('favorite-change', isFavorite.value);
};

// 定义 props 和 emits
const props = defineProps({
  title: { type: String, default: '书香溢社区，温暖伴同行' },
  bannerImage: { type: String, default: '' },
  author: { type: String, default: '匿名' },
  time: { type: String, default: '2025-08-30 10:01:30' },
  category: { type: String, default: '社区活动文化' },
  content: { type: String, default: '' },
  isRecommended: { type: Boolean, default: true },
});

const emit = defineEmits(['close', 'favorite-change']);
</script>

<style scoped lang="less">
.activity-popup {
  height: 100%;
  overflow-y: auto;
  padding: 0;

  // 顶部 Banner
  .popup-header {
    position: relative;

    .header-image {
      width: 100%;
      height: 200px;
      border-radius: 12px 12px 0 0;
    }

    .close-icon {
      position: absolute;
      top: 12px;
      right: 12px;
      background: #fff;
      border-radius: 50%;
      padding: 6px;
      font-size: 20px;
      color: #f00;
      box-shadow: 0 0 8px rgba(0,0,0,0.2);
    }

    .activity-tag {
      position: absolute;
      bottom: 12px;
      left: 12px;
      background: #ff6600;
      color: #fff;
      font-size: 14px;
      padding: 4px 8px;
      border-radius: 4px;
    }
  }

  // 信息区域
  .info-section {
    padding: 16px;

    .title {
      font-size: 18px;
      font-weight: bold;
      color: #333;
      margin-bottom: 8px;
    }

    .meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #666;
      font-size: 14px;

      .favorite-icon {
        font-size: 20px;
        cursor: pointer;

        &.active {
          color: #ff4d4f;
        }
      }
    }
  }

  // 分类标签
  .category-tag {
    margin: 0 16px 12px;
  }

  // 正文内容
  .content {
    padding: 0 16px 16px;
    font-size: 14px;
    line-height: 1.8;
    color: #333;
  }
}
</style>