<script setup>
import { NPageHeader, NCard, NCollapse, NCollapseItem, NTag, NSpace, NText, NDivider } from 'naive-ui'

const interviewCategories = [
  {
    title: 'JavaScript 基础',
    questions: [
      { question: '什么是闭包？闭包有什么作用？', answer: '闭包是指有权访问另一个函数作用域中变量的函数。作用：1. 数据私有化 2. 模块化 3. 柯里化 4. 事件处理' },
      { question: '请解释原型链的工作原理', answer: '每个对象都有一个原型对象，原型对象也有自己的原型，一层层向上查找直到 Object.prototype，这就是原型链。' },
      { question: 'let、const、var 的区别是什么？', answer: 'var 是函数作用域，存在变量提升；let 和 const 是块级作用域，不存在变量提升；const 声明的变量不可重新赋值。' },
      { question: '什么是事件循环？', answer: '事件循环是 JavaScript 的执行机制，包含调用栈、任务队列（宏任务和微任务）。执行顺序：同步代码 -> 微任务 -> 宏任务。' },
      { question: 'Promise 和 async/await 的区别？', answer: 'Promise 是链式调用，async/await 是同步写法处理异步，更易读，错误处理用 try-catch。' }
    ]
  },
  {
    title: 'Vue 相关',
    questions: [
      { question: 'Vue 2 和 Vue 3 的主要区别？', answer: '1. 响应式原理：Object.defineProperty vs Proxy 2. Composition API 3. 更好的 TypeScript 支持 4. 性能优化' },
      { question: '什么是虚拟 DOM？', answer: '虚拟 DOM 是真实 DOM 的 JavaScript 对象表示，通过 diff 算法对比差异，最小化 DOM 操作。' },
      { question: 'computed 和 watch 的区别？', answer: 'computed 有缓存，依赖不变不会重新计算；watch 是监听变化执行回调，无缓存。' },
      { question: 'Vue 组件通信方式有哪些？', answer: 'props/emit、provide/inject、$refs、$parent/$children、Vuex/Pinia、EventBus、v-model' },
      { question: 'nextTick 的作用？', answer: '在 DOM 更新完成后执行回调，确保能获取到更新后的 DOM。' }
    ]
  },
  {
    title: 'React 相关',
    questions: [
      { question: 'useState 和 useReducer 的区别？', answer: 'useState 适合简单状态，useReducer 适合复杂状态逻辑，类似 Redux。' },
      { question: 'useEffect 的依赖数组作用？', answer: '控制副作用何时执行，空数组只执行一次，有依赖时依赖变化时执行。' },
      { question: '什么是虚拟 DOM？', answer: '虚拟 DOM 是真实 DOM 的 JavaScript 对象表示，通过 diff 算法对比差异，最小化 DOM 操作。' },
      { question: 'React.memo 的作用？', answer: '纯组件，对 props 进行浅比较，避免不必要的渲染。' },
      { question: 'useCallback 和 useMemo 的区别？', answer: 'useCallback 缓存函数，useMemo 缓存计算结果，都是性能优化手段。' }
    ]
  },
  {
    title: 'CSS 相关',
    questions: [
      { question: 'Flexbox 和 Grid 的区别？', answer: 'Flexbox 是一维布局，适合组件内部；Grid 是二维布局，适合页面整体布局。' },
      { question: 'BFC 是什么？如何触发？', answer: '块级格式化上下文，独立的渲染区域。触发方式：float、overflow、position、display: flex/grid 等。' },
      { question: 'position 的属性值有哪些？', answer: 'static（默认）、relative（相对）、absolute（绝对）、fixed（固定）、sticky（粘性）。' },
      { question: '什么是 CSS 预处理器？', answer: 'Sass、Less、Stylus 等，提供变量、嵌套、混合等特性，提高开发效率。' },
      { question: 'rem、em、px 的区别？', answer: 'px 是固定单位；em 相对于父元素字体大小；rem 相对于根元素字体大小。' }
    ]
  },
  {
    title: '性能优化',
    questions: [
      { question: '前端性能优化有哪些方法？', answer: '1. 代码分割 2. 懒加载 3. 图片优化 4. CDN 5. 缓存策略 6. 减少 HTTP 请求' },
      { question: '什么是防抖和节流？', answer: '防抖：延迟执行，多次触发只执行最后一次；节流：固定时间执行，限制执行频率。' },
      { question: '首屏加载优化方案？', answer: '1. 路由懒加载 2. 组件懒加载 3. 图片懒加载 4. SSR 5. 骨架屏' },
      { question: '浏览器缓存策略？', answer: '强缓存（Cache-Control、Expires）和协商缓存（ETag、Last-Modified）。' },
      { question: '如何减少重排重绘？', answer: '1. 批量操作 DOM 2. 使用文档片段 3. 避免频繁读取布局属性 4. 使用 transform 和 opacity' }
    ]
  },
  {
    title: '网络与浏览器',
    questions: [
      { question: 'HTTP 和 HTTPS 的区别？', answer: 'HTTPS 在 HTTP 基础上加了 SSL/TLS 加密，更安全，需要证书，端口 443。' },
      { question: 'TCP 三次握手和四次挥手？', answer: '三次握手建立连接（SYN、SYN-ACK、ACK），四次挥手断开连接（FIN、ACK、FIN、ACK）。' },
      { question: '什么是跨域？如何解决？', answer: '协议、域名、端口不同即为跨域。解决：CORS、JSONP、代理服务器。' },
      { question: '浏览器渲染过程？', answer: '解析 HTML -> 构建 DOM 树 -> 解析 CSS -> 构建 CSSOM -> 合成渲染树 -> 布局 -> 绘制。' },
      { question: '什么是 Cookie、LocalStorage、SessionStorage？', answer: 'Cookie 每次请求携带，4KB；LocalStorage 永久存储，5MB；SessionStorage 会话存储，5MB。' }
    ]
  },
  {
    title: '工程化与工具',
    questions: [
      { question: 'Webpack 和 Vite 的区别？', answer: 'Webpack 是打包工具，开发时编译；Vite 基于 esbuild，开发时按需编译，速度更快。' },
      { question: '什么是模块化？', answer: '将代码拆分成独立模块，便于维护和复用。CommonJS、ES Module、AMD 等。' },
      { question: 'Git 常用命令？', answer: 'clone、add、commit、push、pull、branch、checkout、merge、rebase。' },
      { question: 'npm 和 yarn/pnpm 的区别？', answer: 'npm 速度较慢；yarn 并行安装；pnpm 使用硬链接，节省磁盘空间。' },
      { question: '什么是 CI/CD？', answer: '持续集成和持续部署，自动化构建、测试、部署流程。' }
    ]
  }
]
</script>

<template>
  <div class="interview-page">
    <NPageHeader title="前端的面试题" style="margin-bottom: 24px;">
      <template #subtitle>
        <NText depth="3">
          精选前端高频面试题，涵盖 JavaScript、Vue、React、CSS、性能优化等核心知识点
        </NText>
      </template>
    </NPageHeader>

    <NSpace vertical size="large">
      <NCard title="面试准备建议" style="margin-bottom: 24px;">
        <NSpace vertical>
          <NText depth="2">1. 掌握基础：JavaScript、CSS、HTML 是前端的基础，必须扎实</NText>
          <NText depth="2">2. 深入框架：至少精通一个主流框架（Vue 或 React）</NText>
          <NText depth="2">3. 理解原理：不要只会用，要理解背后的原理</NText>
          <NText depth="2">4. 项目经验：准备 2-3 个有亮点的项目，能讲清楚技术难点和解决方案</NText>
          <NText depth="2">5. 持续学习：前端技术更新快，保持学习热情</NText>
        </NSpace>
      </NCard>

      <NCollapse accordion>
        <NCollapseItem
          v-for="(category, index) in interviewCategories"
          :key="index"
          :title="category.title"
        >
          <NSpace vertical size="large">
            <NCard
              v-for="(item, qIndex) in category.questions"
              :key="qIndex"
              size="small"
              :bordered="true"
            >
              <div class="question-item">
                <div class="question-header">
                  <NTag size="small" type="info">Q{{ qIndex + 1 }}</NTag>
                </div>
                <NText strong class="question-text">{{ item.question }}</NText>
                <NDivider style="margin: 12px 0;" />
                <NText depth="2" class="answer-text">
                  <NTag size="small" type="success">A</NTag>
                  {{ item.answer }}
                </NText>
              </div>
            </NCard>
          </NSpace>
        </NCollapseItem>
      </NCollapse>
    </NSpace>
  </div>
</template>

<style scoped>
.interview-page {
  max-width: 1200px;
  margin: 0 auto;
}

.question-item {
  padding: 8px 0;
}

.question-header {
  margin-bottom: 8px;
}

.question-text {
  display: block;
  margin-bottom: 8px;
  font-size: 15px;
}

.answer-text {
  display: block;
  line-height: 1.6;
}
</style>
