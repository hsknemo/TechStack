<script setup>
import { ref } from 'vue'
import { NPageHeader, NCard, NTab, NTabs, NTabPane, NTag, NSpace, NText, NDivider, NBadge, NIcon, NList, NListItem, NTooltip } from 'naive-ui'

const activeTab = ref('client')

const performanceCategories = {
  client: [
    {
      title: '资源优化',
      items: [
        {
          title: '图片优化',
          details: [
            '使用 WebP 格式图片',
            '根据屏幕尺寸提供不同分辨率图片',
            '使用响应式图片（srcset）',
            '图片压缩（TinyPNG、Squoosh）',
            '图片懒加载',
            '使用 CDN 加速图片',
            '使用 SVG 替代图标图片',
            '实现渐进式加载（模糊占位图）'
          ]
        },
        {
          title: 'CSS 优化',
          details: [
            'CSS 压缩和合并',
            '移除未使用的 CSS（PurgeCSS）',
            '使用 CSS Modules 或 CSS-in-JS',
            '避免 CSS 阻塞渲染',
            '使用 Flexbox 和 Grid 布局',
            '减少 CSS 选择器复杂度',
            '避免使用 @import',
            '使用 CSS 变量实现主题切换'
          ]
        },
        {
          title: 'JavaScript 优化',
          details: [
            '代码分割（Code Splitting）',
            'Tree Shaking 移除未使用代码',
            '使用 ES6+ 语法',
            '避免全局变量污染',
            '使用防抖和节流',
            '优化事件监听器（事件委托）',
            '减少 DOM 操作',
            '使用 requestAnimationFrame 优化动画'
          ]
        },
        {
          title: '字体优化',
          details: [
            '使用 Web Font 优化（font-display）',
            '字体子集化（只包含使用的字符）',
            '字体预加载（preload）',
            '使用系统字体作为备选',
            '减少字体变体数量',
            '使用 SVG 字体（图标）',
            '字体压缩',
            '避免 FOIT（Flash of Invisible Text）'
          ]
        }
      ]
    },
    {
      title: '加载优化',
      items: [
        {
          title: '网络优化',
          details: [
            '使用 CDN 加速静态资源',
            '启用 HTTP/2 或 HTTP/3',
            '实现 HTTP 缓存策略',
            '使用 Brotli 或 Gzip 压缩',
            '减少 HTTP 请求数',
            '使用预连接（preconnect）',
            '使用预加载（preload）',
            '使用预读取（prefetch）'
          ]
        },
        {
          title: '首屏优化',
          details: [
            'SSR（服务端渲染）',
            'SSG（静态站点生成）',
            'ISR（增量静态再生）',
            '骨架屏（Skeleton Screen）',
            '首屏关键 CSS 内联',
            '延迟加载非关键资源',
            '使用 App Shell 模式',
            '优化 TTFB（首字节时间）'
          ]
        },
        {
          title: '构建优化',
          details: [
            '使用 Vite 或 Webpack 5',
            '配置合理的构建选项',
            '使用多线程构建（thread-loader）',
            '启用持久化缓存',
            '优化打包体积',
            '分析构建产物（webpack-bundle-analyzer）',
            '使用模块联邦（Module Federation）',
            '集成 CI/CD 自动化构建'
          ]
        }
      ]
    },
    {
      title: '运行时优化',
      items: [
        {
          title: '渲染优化',
          details: [
            '减少重排和重绘',
            '使用 CSS transform 和 opacity 实现动画',
            '避免频繁读取布局属性',
            '使用 documentFragment 批量操作 DOM',
            '合理使用虚拟滚动',
            '减少 DOM 节点数量',
            '使用 CSS will-change 提示浏览器',
            '优化 CSS 选择器性能'
          ]
        },
        {
          title: '状态管理优化',
          details: [
            '合理使用 Pinia 或 Redux',
            '避免不必要的全局状态',
            '使用计算属性缓存结果',
            '批量更新状态',
            '状态持久化策略',
            '避免状态深层嵌套',
            '使用 immer 处理不可变数据',
            '状态分片和按需加载'
          ]
        },
        {
          title: '用户体验优化',
          details: [
            '实现平滑的页面过渡',
            '添加加载状态和反馈',
            '优化表单交互',
            '实现离线访问（PWA）',
            '减少第三方脚本影响',
            '优化移动端体验',
            '添加错误边界',
            '实现优雅降级策略'
          ]
        },
        {
          title: '地图库优化',
          details: [
            '使用适当的地图瓦片层级',
            '减少地图图层数量',
            '优化地图数据源加载',
            '使用 WebGL 渲染（如 Mapbox GL JS）',
            '实现地图视图范围限制',
            '优化标记点和矢量数据',
            '使用地图瓦片缓存',
            '按需加载地图资源'
          ]
        }
      ]
    }
  ],
  server: [
    {
      title: '服务器优化',
      items: [
        {
          title: '服务端配置',
          details: [
            '使用 Node.js 14+ 或 Bun',
            '配置合理的内存限制',
            '启用 gzip/brotli 压缩',
            '配置 HTTPS（Let\'s Encrypt）',
            '设置合理的缓存头',
            '使用 HTTP/2 或 HTTP/3',
            '配置 CORS 策略',
            '优化 TCP 连接参数'
          ]
        },
        {
          title: '数据库优化',
          details: [
            '使用索引优化查询',
            '数据库连接池配置',
            'SQL 语句优化',
            '读写分离',
            '数据库分库分表',
            '缓存热点数据',
            '定期清理无用数据',
            '数据库备份策略'
          ]
        },
        {
          title: 'API 优化',
          details: [
            'RESTful API 设计',
            'GraphQL 减少过度获取',
            'API 版本控制',
            '合理的错误处理',
            'API 缓存策略',
            '批量请求优化',
            '限流和熔断机制',
            'API 文档自动化'
          ]
        }
      ]
    },
    {
      title: '架构优化',
      items: [
        {
          title: '微服务架构',
          details: [
            '服务拆分策略',
            '服务注册与发现',
            'API 网关设计',
            '服务间通信',
            '分布式事务处理',
            '服务监控',
            '容器化部署（Docker）',
            '编排工具（Kubernetes）'
          ]
        },
        {
          title: '缓存策略',
          details: [
            '浏览器缓存',
            'CDN 缓存',
            '应用层缓存（Redis）',
            '数据库缓存',
            '缓存失效策略',
            '缓存预热',
            '缓存一致性',
            '多级缓存架构'
          ]
        },
        {
          title: '监控与日志',
          details: [
            '前端性能监控（LCP、FID、CLS）',
            '后端性能监控',
            '错误监控（Sentry）',
            '日志收集与分析',
            '告警机制',
            '用户行为分析',
            'A/B 测试',
            '性能预算设置'
          ]
        }
      ]
    },
    {
      title: '企业级实践',
      items: [
        {
          title: '代码质量',
          details: [
            'ESLint + Prettier 代码规范',
            'TypeScript 类型检查',
            '单元测试（Jest）',
            '端到端测试（Cypress）',
            '代码覆盖率目标',
            'Git 工作流规范',
            'Code Review 流程',
            '自动化代码扫描'
          ]
        },
        {
          title: '部署策略',
          details: [
            'CI/CD 流水线',
            '蓝绿部署',
            '灰度发布',
            '回滚机制',
            '环境隔离',
            '自动化测试集成',
            '部署前检查',
            '监控集成'
          ]
        },
        {
          title: '安全优化',
          details: [
            'XSS 防护',
            'CSRF 防护',
            'SQL 注入防护',
            '敏感信息保护',
            'HTTPS 配置',
            '依赖包安全检查',
            '安全审计',
            '应急响应预案'
          ]
        }
      ]
    }
  ]
}
</script>

<template>
  <div class="performance-page">
    <NPageHeader title="前端性能优化" style="margin-bottom: 24px;">
      <template #subtitle>
        <NText depth="3">
          企业级项目的性能优化实践，涵盖客户端和服务端的实打实用技巧
        </NText>
      </template>
    </NPageHeader>

    <NTabs v-model:value="activeTab" type="line" animated>
      <NTabPane name="client" tab="客户端优化">
        <NSpace vertical size="large">
          <NCard v-for="category in performanceCategories.client" :key="category.title" :title="category.title">
            <NSpace vertical size="medium">
              <NCard
                v-for="item in category.items"
                :key="item.title"
                size="small"
                :bordered="true"
              >
                <div class="performance-item">
                  <NText strong>{{ item.title }}</NText>
                  <NDivider style="margin: 8px 0;" />
                  <NList>
                    <NListItem v-for="(detail, index) in item.details" :key="index">
                      <NTooltip placement="right">
                        <template #trigger>
                          <NText depth="2">{{ detail }}</NText>
                        </template>
                        <span>企业级项目推荐实践</span>
                      </NTooltip>
                    </NListItem>
                  </NList>
                </div>
              </NCard>
            </NSpace>
          </NCard>
        </NSpace>
      </NTabPane>
      <NTabPane name="server" tab="服务端与架构优化">
        <NSpace vertical size="large">
          <NCard v-for="category in performanceCategories.server" :key="category.title" :title="category.title">
            <NSpace vertical size="medium">
              <NCard
                v-for="item in category.items"
                :key="item.title"
                size="small"
                :bordered="true"
              >
                <div class="performance-item">
                  <NText strong>{{ item.title }}</NText>
                  <NDivider style="margin: 8px 0;" />
                  <NList>
                    <NListItem v-for="(detail, index) in item.details" :key="index">
                      <NTooltip placement="right">
                        <template #trigger>
                          <NText depth="2">{{ detail }}</NText>
                        </template>
                        <span>企业级项目推荐实践</span>
                      </NTooltip>
                    </NListItem>
                  </NList>
                </div>
              </NCard>
            </NSpace>
          </NCard>
        </NSpace>
      </NTabPane>
    </NTabs>
  </div>
</template>

<style scoped>
.performance-page {
  max-width: 1200px;
  margin: 0 auto;
}

.performance-item {
  padding: 8px 0;
}

.performance-item .n-text {
  display: block;
  margin-bottom: 4px;
}
</style>
