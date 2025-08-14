<template>
  <div>
    <button @click="handleGetLocation" :disabled="!isWxReady">
      获取当前位置
    </button>
    
    <div v-if="location">
      <p>纬度: {{ location.latitude }}</p>
      <p>经度: {{ location.longitude }}</p>
    </div>
    
    <div v-if="error" style="color: red;">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useWechatSDK } from '@/utils/wechat'
import axios from 'axios'

const {
  isWxReady,
  location,
  error,
  initWxConfig,
  getCurrentLocation
} = useWechatSDK()

// 从后端获取微信配置
const fetchWxConfig = async () => {
  try {
    // 注意：当前页面URL需要与后端签名时的URL一致
    const currentUrl = encodeURIComponent(window.location.href.split('#')[0])
    const response = await axios.get('/api/wechat/config', {
      params: { url: currentUrl }
    })
    
    await initWxConfig(response.data)
  } catch (err) {
    error.value = `获取微信配置失败: ${err.message}`
  }
}

// 获取位置
const handleGetLocation = async () => {
  try {
    await getCurrentLocation()
  } catch (err) {
    error.value = err.message || '获取位置失败'
  }
}

onMounted(() => {
  fetchWxConfig()
})
</script>