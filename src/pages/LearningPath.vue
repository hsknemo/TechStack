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
  },
  {
    title: '第七阶段：AI 前端职业规划',
    description: 'AI 前端的未来发展路径',
    color: '#13c2c2',
    skills: [
      { name: 'AI 前端工程师', level: '入门', desc: 'AI 模型集成、Prompt 工程、前端 Agent 开发' },
      { name: 'AI 产品工程师', level: '中级', desc: 'AI 产品设计、用户体验优化、模型选择与评估' },
      { name: 'AI 技术专家', level: '高级', desc: 'AI 架构设计、模型微调、性能优化' },
      { name: 'AI 解决方案架构师', level: '专家', desc: '端到端 AI 解决方案设计、技术团队领导' }
    ]
  }
]

const aiCareerPath = {
  title: 'AI 前端职业成长路径',
  description: 'AI 前端工程师的职业发展路线和技能要求',
  levels: [
    {
      level: '初级 AI 前端工程师',
      skills: [
        '前端基础扎实',
        '熟悉至少一种主流框架',
        '了解 LLM 基本概念',
        '能够集成 OpenAI API',
        '掌握基础 Prompt 设计',
        '了解前端 AI 库（如 TensorFlow.js）',
        '能够开发简单的 AI 辅助功能'
      ],
      responsibilities: [
        '实现 AI 功能的前端集成',
        '开发 AI 相关的用户界面',
        '协助后端进行模型调用',
        '优化 AI 功能的用户体验'
      ],
      salary: '15-25K/月'
    },
    {
      level: '中级 AI 前端工程师',
      skills: [
        '深入理解 LLM 工作原理',
        '精通 Prompt Engineering',
        '熟悉多种 AI 服务 API',
        '能够开发前端 Agent',
        '了解模型部署和优化',
        '掌握 AI 产品设计原则',
        '具备数据分析能力'
      ],
      responsibilities: [
        '设计和实现复杂的 AI 功能',
        '优化 AI 模型的前端调用',
        '开发智能助手和对话系统',
        '参与 AI 产品的设计和规划',
        '解决 AI 相关的技术难题'
      ],
      salary: '25-40K/月'
    },
    {
      level: '高级 AI 前端工程师',
      skills: [
        '深入理解 AI 模型架构',
        '精通前端 AI 性能优化',
        '能够设计 AI 系统架构',
        '熟悉模型微调技术',
        '掌握 MLOps 基础',
        '具备团队领导能力',
        '了解前沿 AI 技术趋势'
      ],
      responsibilities: [
        '主导 AI 相关项目的技术架构',
        '优化 AI 系统的性能和可靠性',
        '设计和实现智能 Agent 系统',
        '指导初级工程师',
        '参与技术决策和规划'
      ],
      salary: '40-60K/月'
    },
    {
      level: 'AI 技术专家/架构师',
      skills: [
        '全面掌握 AI 技术栈',
        '深入理解深度学习原理',
        '能够设计端到端 AI 解决方案',
        '具备丰富的项目管理经验',
        '精通技术选型和评估',
        '了解 AI 伦理和安全',
        '具备行业洞察能力'
      ],
      responsibilities: [
        '制定 AI 技术战略和路线图',
        '设计大型 AI 系统架构',
        '评估和选择合适的 AI 模型',
        '领导技术团队',
        '推动 AI 技术创新和应用'
      ],
      salary: '60K+/月'
    }
  ],
  futureTrends: [
    'AI 辅助开发成为标配',
    '智能前端 Agent 广泛应用',
    '多模态 AI 集成需求增长',
    '边缘 AI 计算能力增强',
    'AI 前端工具链日益成熟',
    'AI 产品设计成为专业领域',
    'AI 伦理和安全成为核心考量'
  ]
}
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
          :type="index < 2 ? 'success' : index < 4 ? 'info' : index < 6 ? 'warning' : 'error'"
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

      <NCard title="AI 前端职业成长路径" style="margin-top: 40px;">
        <NText depth="2" style="margin-bottom: 24px;">
          {{ aiCareerPath.description }}
        </NText>

        <NSpace vertical size="large">
          <NCard
            v-for="(level, index) in aiCareerPath.levels"
            :key="index"
            size="small"
            :bordered="true"
            :title="level.level"
          >
            <NSpace vertical size="medium">
              <div>
                <NText strong>技能要求：</NText>
                <NList>
                  <NListItem v-for="(skill, idx) in level.skills" :key="idx">
                    {{ skill }}
                  </NListItem>
                </NList>
              </div>

              <div>
                <NText strong>工作职责：</NText>
                <NList>
                  <NListItem v-for="(resp, idx) in level.responsibilities" :key="idx">
                    {{ resp }}
                  </NListItem>
                </NList>
              </div>

              <div>
                <NText strong>薪资范围：</NText>
                <NTag type="success" :bordered="false">{{ level.salary }}</NTag>
              </div>
            </NSpace>
          </NCard>

          <NCard size="small" :bordered="true" title="未来趋势">
            <NText strong>AI 前端发展趋势：</NText>
            <NList>
              <NListItem v-for="(trend, index) in aiCareerPath.futureTrends" :key="index">
                {{ trend }}
              </NListItem>
            </NList>
          </NCard>
        </NSpace>
      </NCard>
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
