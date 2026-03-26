
<script setup>
import { NConfigProvider, NLayout, NLayoutHeader, NLayoutContent, NLayoutFooter, NMenu, NButton, NSpace, darkTheme } from 'naive-ui'
import { useRouter } from 'vue-router'
import { h } from 'vue'

const router = useRouter()

const menuOptions = [
  { label: '前端组件库', key: 'home' },
  { label: '前端的面试题', key: 'interview' },
  { label: '前端学习及进阶路线', key: 'learning-path' },
  { label: '前端性能优化', key: 'performance' },
  { label: 'AI 相关知识', key: 'ai' },
  { label: 'Git 命令', key: 'git' },
  { label: 'Linux 命令', key: 'linux' }
]

function handleMenuUpdate(key) {
  if (key === 'home') router.push('/')
  if (key === 'interview') router.push('/interview')
  if (key === 'learning-path') router.push('/learning-path')
  if (key === 'performance') router.push('/performance')
  if (key === 'ai') router.push('/ai')
  if (key === 'git') router.push('/git')
  if (key === 'linux') router.push('/linux')
}
</script>

<template>
  <NConfigProvider :theme="darkTheme">
    <NLayout style="min-height: 100vh;">
      <NLayoutHeader bordered class="glass-header" style="padding: 12px 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;">
        <div style="font-size: 18px; font-weight: 600; color: #63e2b7; white-space: nowrap;">Tech Stack</div>
        <NMenu mode="horizontal" :options="menuOptions" @update:value="handleMenuUpdate" inverted style="flex: 1; justify-content: flex-end;" />
      </NLayoutHeader>
      <NLayoutContent style="padding: 24px;">
        <router-view></router-view>
      </NLayoutContent>
      <NLayoutFooter bordered style="padding: 16px; text-align: center; color: #888;">
        <div>
          Built with Vue 3 + Naive UI | 基于AI创建
        </div>
        <div style="margin-top: 8px;">
          <a href="https://github.com/hsknemo" target="_blank" style="color: #63e2b7; text-decoration: none;">
            GitHub: @hsknemo
          </a>
        </div>
      </NLayoutFooter>
    </NLayout>
  </NConfigProvider>
</template>

<style>
@import './styles/global.css';

/* 毛玻璃效果和吸顶功能 */
.n-layout-header.glass-header {
  position: sticky !important;
  top: 0 !important;
  z-index: 1000 !important;
  background: rgba(17, 17, 17, 0.8) !important;
  backdrop-filter: blur(12px) !important;
  -webkit-backdrop-filter: blur(12px) !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3) !important;
}

/* 确保内容区域可以滚动 */
.n-layout-content {
  overflow-y: auto;
}
</style>
