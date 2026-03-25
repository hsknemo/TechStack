<script setup>
import { NPageHeader, NCard, NTimeline, NTimelineItem, NTag, NSpace, NText, NDivider, NGrid, NGi } from 'naive-ui'

const learningStages = [
  {
    title: '第一阶段：前端基础',
    description: '掌握 HTML、CSS、JavaScript 基础',
    color: '#63e2b7',
    skills: [
      { name: 'HTML5', level: '基础', desc: '语义化标签、表单、多媒体' },
      { name: 'CSS3', level: '基础', desc: '选择器、盒模型、Flexbox、Grid' },
      { name: 'JavaScript', level: '核心', desc: 'ES6+、DOM 操作、事件处理' },
      { name: 'Git', level: '工具', desc: '版本控制、分支管理' }
    ]
  },
  {
    title: '第二阶段：框架入门',
    description: '学习主流前端框架',
    color: '#18a058',
    skills: [
      { name: 'Vue.js', level: '框架', desc: 'Vue 3、Composition API、Vue Router、Pinia' },
      { name: 'React', level: '框架', desc: 'Hooks、状态管理、组件化开发' },
      { name: 'TypeScript', level: '语言', desc: '类型系统、泛型、接口' }
    ]
  },
  {
    title: '第三阶段：工程化',
    description: '掌握前端工程化工具',
    color: '#2080f0',
    skills: [
      { name: 'Vite', level: '构建工具', desc: '快速开发、热更新、打包优化' },
      { name: 'Webpack', level: '构建工具', desc: '模块打包、代码分割、性能优化' },
      { name: 'npm/yarn/pnpm', level: '包管理', desc: '依赖管理、脚本配置' },
      { name: 'ESLint/Prettier', level: '代码规范', desc: '代码检查、格式化' }
    ]
  },
  {
    title: '第四阶段：进阶提升',
    description: '深入理解前端核心概念',
    color: '#f0a020',
    skills: [
      { name: '性能优化', level: '核心', desc: '加载优化、渲染优化、缓存策略' },
      { name: '网络协议', level: '基础', desc: 'HTTP/HTTPS、WebSocket、CDN' },
      { name: '浏览器原理', level: '深入', desc: '渲染机制、事件循环、V8 引擎' },
      { name: '设计模式', level: '架构', desc: '单例、观察者、工厂模式' }
    ]
  },
  {
    title: '第五阶段：全栈能力',
    description: '扩展后端和部署能力',
    color: '#d03050',
    skills: [
      { name: 'Node.js', level: '后端', desc: 'Express/Koa、RESTful API、中间件' },
      { name: '数据库', level: '存储', desc: 'MySQL、MongoDB、Redis' },
      { name: '部署运维', level: '运维', desc: 'Docker、CI/CD、Nginx' },
      { name: '微服务', level: '架构', desc: '服务拆分、API 网关' }
    ]
  },
  {
    title: '第六阶段：专家之路',
    description: '成为前端领域专家',
    color: '#722ed1',
    skills: [
      { name: '架构设计', level: '高级', desc: '微前端、组件库设计、技术选型' },
      { name: '跨端开发', level: '扩展', desc: '小程序、Electron、React Native' },
      { name: '可视化', level: '专业', desc: 'Canvas、WebGL、Three.js' },
      { name: 'AI 集成', level: '前沿', desc: 'LLM 集成、AI 辅助开发' }
    ]
  }
]
</script>

<template>
  <div class="learning-path">
    <NPageHeader title="前端学习及进阶路线" style="margin-bottom: 24px;">
      <template #subtitle>
        <NText depth="3">
          从基础到专家，系统化学习前端技术栈
        </NText>
      </template>
    </NPageHeader>

    <NSpace vertical size="large">
      <NCard title="学习路径说明" style="margin-bottom: 24px;">
        <NText depth="2">
          本路线图涵盖了前端开发的完整学习路径，从基础 HTML/CSS/JavaScript 到框架应用、工程化、性能优化，再到全栈能力和专家领域。
          建议按照阶段循序渐进学习，每个阶段掌握后再进入下一阶段。
        </NText>
      </NCard>

      <NTimeline>
        <NTimelineItem
          v-for="(stage, index) in learningStages"
          :key="index"
          :type="index < 2 ? 'success' : index < 4 ? 'info' : 'warning'"
        >
          <template #header>
            <div class="stage-header">
              <NText strong class="stage-title" :style="{ color: stage.color }">
                {{ stage.title }}
              </NText>
              <NTag size="small" :bordered="false" type="success">
                阶段 {{ index + 1 }}
              </NTag>
            </div>
          </template>

          <NText depth="2" class="stage-description">
            {{ stage.description }}
          </NText>

          <NGrid :x-gap="12" :y-gap="12" :cols="2" responsive="screen" item-responsive>
            <NGi v-for="skill in stage.skills" :key="skill.name" span="2 m:1">
              <NCard size="small" :bordered="true" class="skill-card">
                <template #header>
                  <div class="skill-header">
                    <NText strong>{{ skill.name }}</NText>
                    <NTag size="tiny" :bordered="false" type="info">{{ skill.level }}</NTag>
                  </div>
                </template>
                <NText depth="3">{{ skill.desc }}</NText>
              </NCard>
            </NGi>
          </NGrid>

          <NDivider v-if="index < learningStages.length - 1" class="stage-divider" />
        </NTimelineItem>
      </NTimeline>
    </NSpace>
  </div>
</template>

<style scoped>
.learning-path {
  max-width: 1200px;
  margin: 0 auto;
}

.stage-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.stage-title {
  font-size: 18px;
}

.stage-description {
  display: block;
  margin-bottom: 16px;
}

.skill-card {
  height: 100%;
}

.skill-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stage-divider {
  margin: 24px 0;
}
</style>
