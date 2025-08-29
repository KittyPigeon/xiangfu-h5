# ImageGallery 图片画廊组件

一个全局注册的图片画廊组件，支持图片预览、错误处理和横向滚动布局。

## 功能特性

- ✅ 图片点击预览放大（使用Vant的showImagePreview，单图显示）
- ✅ 图片加载失败时显示默认图片
- ✅ 支持自定义错误图片
- ✅ 横向滚动布局（固定尺寸100x100px）
- ✅ 悬停效果和点击反馈
- ✅ 支持字符串数组或对象数组
- ✅ 可自定义间距

## 基本用法

```vue
<template>
  <!-- 基础用法 -->
  <ImageGallery :images="imageList" />
  
  <!-- 自定义配置 -->
  <ImageGallery 
    :images="imageList"
    gap="12px"
    :show-mask="false"
    error-image="https://example.com/error.jpg"
  />
</template>

<script setup>
// 字符串数组
const imageList = [
  'https://example.com/image1.jpg',
  'https://example.com/image2.jpg',
  'https://example.com/image3.jpg'
]

// 对象数组
const imageListWithAlt = [
  { src: 'https://example.com/image1.jpg', alt: '图片1' },
  { src: 'https://example.com/image2.jpg', alt: '图片2' },
  { src: 'https://example.com/image3.jpg', alt: '图片3' }
]
</script>
```

## Props

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| images | `(string \| ImageItem)[]` | `[]` | 图片数组，可以是字符串或包含src和alt的对象 |
| gap | `string` | `'8px'` | 图片间距 |
| showMask | `boolean` | `true` | 是否显示悬停遮罩层（已禁用） |
| errorImage | `string` | - | 自定义错误图片URL |
| itemClass | `string` | - | 自定义图片项样式类 |
| galleryClass | `string` | - | 自定义画廊容器样式类 |
| loadingIcon | `string` | `'photo'` | 加载图标 |
| errorIcon | `string` | `'warning-o'` | 错误图标 |

## ImageItem 接口

```typescript
interface ImageItem {
  src: string    // 图片URL
  alt?: string   // 图片描述
}
```

## 默认错误图片

当图片加载失败时，会显示默认错误图片：
`https://fastly.picsum.photos/id/180/600/400.jpg?hmac=GWOD1KQ7oaGkR7Zpj4QJDXLC2XkaKZjoKZ3i824mdUE`

## 布局设计

- 横向滚动布局
- 固定图片尺寸：100px × 100px
- 支持移动端平滑滚动

## 注意事项

1. 组件已全局注册，可直接在任何Vue文件中使用
2. 图片预览功能依赖Vant的ImagePreview组件，点击时只显示当前图片
3. 图片尺寸已固定为100x100px，适合横向滚动展示
4. 建议为图片设置合适的alt属性以提升可访问性
