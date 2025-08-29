<template>
  <div class="image-gallery" :class="galleryClass">
    <div 
      v-for="(image, index) in images" 
      :key="index" 
      class="image-item"
      :class="itemClass"
      @click="handleImageClick(index)"
    >
      <van-image 
        :src="typeof image === 'object' ? image.src : image" 
        :alt="typeof image === 'object' ? image.alt || `图片${index + 1}` : `图片${index + 1}`"
        fit="cover"
        class="gallery-image"
        :loading-icon="loadingIcon"
        :error-icon="errorIcon"
      >
        <template #error>
          <img 
            :src="errorImage || defaultErrorImage" 
            :alt="typeof image === 'object' ? image.alt || `图片${index + 1}` : `图片${index + 1}`"
            class="gallery-image error-image"
          />
        </template>
        <template #loading>
          <van-icon name="photo" size="24" color="#c8c9cc" />
        </template>
      </van-image>
      
      <!-- 图片遮罩层 -->
      <!-- <div v-if="showMask" class="image-mask">
        <van-icon name="eye-o" size="20" color="#fff" />
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts" >
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { showImagePreview } from 'vant'
import { eventBus } from '@/utils/eventBus'

// 默认错误图片
const defaultErrorImage = 'https://fastly.picsum.photos/id/180/600/400.jpg?hmac=GWOD1KQ7oaGkR7Zpj4QJDXLC2XkaKZjoKZ3i824mdUE'

// 定义接口
interface ImageItem {
  src: string
  alt?: string
}

// Props定义
interface Props {
  images: (string | ImageItem)[]  // 图片数组，可以是字符串或对象
  columns?: number               // 列数，默认为3
  gap?: string                   // 间距，默认为8px
  aspectRatio?: string           // 宽高比，默认为1:1
  showMask?: boolean             // 是否显示遮罩层
  errorImage?: string            // 自定义错误图片
  itemClass?: string             // 自定义item样式类
  galleryClass?: string          // 自定义gallery样式类
  loadingIcon?: string           // 加载图标
  errorIcon?: string             // 错误图标
}



const props = withDefaults(defineProps<Props>(), {
  columns: 3,
  gap: '8px',
  aspectRatio: '1',
  showMask: true,
  loadingIcon: 'photo',
  errorIcon: 'warning-o'
})

// 计算样式
const gridStyle = computed(() => ({
  '--columns': props.columns,
  '--gap': props.gap,
  '--aspect-ratio': props.aspectRatio
}))

// 处理图片点击
const handleImageClick = (index: number) => {
  const currentImage = props.images[index]
  const imageUrl = typeof currentImage === 'string' ? currentImage : currentImage.src
  
  // 通过事件总线发送事件
  eventBus.emitImageClick(imageUrl, index)
  
  // showImagePreview({
  //   images: [imageUrl],
  //   // startPosition: 0,
  //   // showIndicators: false,
  //   // swipeDuration: 300,
  //   // closeable: true
  // })
}
onMounted(() => {
  console.log('props', props);
  // gridStyle.value = {
  //   '--columns': props.columns,
  //   '--gap': props.gap,
  //   '--aspect-ratio': props.aspectRatio
  // }
})
onUnmounted(() => {
})
</script>

<style scoped lang="less">

.image-gallery {
  display: flex;
  flex-wrap: wrap;
  gap: var(--gap);
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  
  .image-item {
    position: relative;
    flex: 0 0 auto;
    width: 74px;
    height: 74px;
    margin: 8px;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.2s ease;
    
    &:hover {
      transform: scale(1.02);
    }
    
    &:active {
      transform: scale(0.98);
    }
    
    .gallery-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      
      &.error-image {
        object-fit: cover;
        opacity: 0.7;
      }
    }
    
    .image-mask {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.2s ease;
    }
    
    &:hover .image-mask {
      opacity: 1;
    }
  }
}
</style>
