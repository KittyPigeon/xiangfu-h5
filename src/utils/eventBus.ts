import { ref, watch } from 'vue'

// 创建全局事件总线
export const eventBus = {
  // 图片点击事件
  imageClick: ref<{ imageUrl: string; index: number } | null>(null),
  
  // 触发图片点击事件
  emitImageClick(imageUrl: string, index: number) {
    this.imageClick.value = { imageUrl, index }
  },
  
  // 监听图片点击事件
  onImageClick(callback: (data: { imageUrl: string; index: number }) => void) {
    const unwatch = watch(this.imageClick, (newValue) => {
      if (newValue) {
        callback(newValue)
        // 重置事件
        this.imageClick.value = null
      }
    })
    return unwatch
  }
}
