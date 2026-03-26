<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'
import { NPageHeader, NCard, NTabs, NTabPane, NTag, NSpace, NText, NDivider } from 'naive-ui'
import { codeToHtml } from 'shiki'

const interviewCategories = [
  {
    title: 'JavaScript 基础',
    questions: [
      { question: '什么是闭包？闭包有什么作用？', answer: '闭包是指有权访问另一个函数作用域中变量的函数。作用：1. 数据私有化 2. 模块化 3. 柯里化 4. 事件处理' },
      { question: '请解释原型链的工作原理', answer: '每个对象都有一个原型对象，原型对象也有自己的原型，一层层向上查找直到 Object.prototype，这就是原型链。' },
      { question: 'let、const、var 的区别是什么？', answer: 'var 是函数作用域，存在变量提升；let 和 const 是块级作用域，不存在变量提升；const 声明的变量不可重新赋值。' },
      { question: '什么是事件循环？', answer: '事件循环是 JavaScript 的执行机制，包含调用栈、任务队列（宏任务和微任务）。执行顺序：同步代码 -> 微任务 -> 宏任务。' },
      { question: 'Promise 和 async/await 的区别？', answer: 'Promise 是链式调用，async/await 是同步写法处理异步，更易读，错误处理用 try-catch。' },
      { question: '深拷贝和浅拷贝的区别？', answer: '浅拷贝只复制引用，修改会影响原对象；深拷贝复制所有层级，互不影响。实现方式：JSON.parse(JSON.stringify())、递归等。' },
      { question: 'this 指向问题？', answer: '普通函数指向调用者，箭头函数继承外层作用域的 this，call/apply/bind 可以改变 this 指向。' },
      { question: '什么是防抖和节流？', answer: '防抖：延迟执行，多次触发只执行最后一次；节流：固定时间执行，限制执行频率。' }
    ]
  },
  {
    title: 'Vue 相关',
    questions: [
      { question: 'Vue 2 和 Vue 3 的主要区别？', answer: '1. 响应式原理：Object.defineProperty vs Proxy 2. Composition API 3. 更好的 TypeScript 支持 4. 性能优化' },
      { question: '什么是虚拟 DOM？', answer: '虚拟 DOM 是真实 DOM 的 JavaScript 对象表示，通过 diff 算法对比差异，最小化 DOM 操作。' },
      { question: 'computed 和 watch 的区别？', answer: 'computed 有缓存，依赖不变不会重新计算；watch 是监听变化执行回调，无缓存。' },
      { question: 'Vue 组件通信方式有哪些？', answer: 'props/emit、provide/inject、$refs、$parent/$children、Vuex/Pinia、EventBus、v-model' },
      { question: 'nextTick 的作用？', answer: '在 DOM 更新完成后执行回调，确保能获取到更新后的 DOM。' },
      { question: 'Vue 的生命周期？', answer: '创建：beforeCreate、created；挂载：beforeMount、mounted；更新：beforeUpdate、updated；销毁：beforeUnmount、unmounted。' },
      { question: 'v-if 和 v-show 的区别？', answer: 'v-if 是真正的条件渲染，销毁和重建；v-show 只是切换 display，不销毁元素。频繁切换用 v-show。' },
      { question: 'key 的作用？', answer: 'key 是 Vue 的唯一标识，用于 diff 算法优化，提高渲染性能，避免不必要的重新渲染。' }
    ]
  },
  {
    title: 'React 相关',
    questions: [
      { question: 'useState 和 useReducer 的区别？', answer: 'useState 适合简单状态，useReducer 适合复杂状态逻辑，类似 Redux。' },
      { question: 'useEffect 的依赖数组作用？', answer: '控制副作用何时执行，空数组只执行一次，有依赖时依赖变化时执行。' },
      { question: '什么是虚拟 DOM？', answer: '虚拟 DOM 是真实 DOM 的 JavaScript 对象表示，通过 diff 算法对比差异，最小化 DOM 操作。' },
      { question: 'React.memo 的作用？', answer: '纯组件，对 props 进行浅比较，避免不必要的渲染。' },
      { question: 'useCallback 和 useMemo 的区别？', answer: 'useCallback 缓存函数，useMemo 缓存计算结果，都是性能优化手段。' },
      { question: 'React 组件生命周期？', answer: '挂载：constructor、componentDidMount；更新：componentDidUpdate；卸载：componentWillUnmount。Hooks 中用 useEffect 代替。' },
      { question: '受控组件和非受控组件？', answer: '受控组件：值由 state 控制，通过 onChange 更新；非受控组件：值由 DOM 自己维护，通过 ref 获取。' },
      { question: 'Context API 的作用？', answer: '跨组件传递数据，避免 props 层层传递，适合主题、用户信息等全局数据。' }
    ]
  },
  {
    title: 'TypeScript 相关',
    questions: [
      { question: 'any 和 unknown 的区别？', answer: 'any 任何类型都可以赋值，不安全；unknown 是类型安全的 any，使用前必须进行类型检查。' },
      { question: 'interface 和 type 的区别？', answer: 'interface 可以扩展、合并；type 可以联合、交叉、元组。接口适合对象，类型适合联合类型。' },
      { question: '泛型的作用？', answer: '提高代码复用性，让函数、接口、类支持多种类型，同时保持类型安全。' },
      { question: 'readonly 和 const 的区别？', answer: 'const 用于变量，readonly 用于属性，const 是变量引用不变，readonly 是属性不可修改。' },
      { question: '什么是类型断言？', answer: '手动指定值的类型，方式：as 语法、<> 语法。用于类型推断不准确时。' },
      { question: 'Pick、Omit、Partial 的作用？', answer: 'Pick：选取部分属性；Omit：排除部分属性；Partial：所有属性变为可选。都是工具类型。' },
      { question: 'never 类型的作用？', answer: '表示永远不会出现的类型，用于类型检查、错误处理、联合类型收窄。' },
      { question: 'infer 关键字的作用？', answer: '在条件类型中推断类型，常用于 ReturnType、Parameters 等工具类型。' }
    ]
  },
  {
    title: 'CSS 相关',
    questions: [
      { question: 'Flexbox 和 Grid 的区别？', answer: 'Flexbox 是一维布局，适合组件内部；Grid 是二维布局，适合页面整体布局。' },
      { question: 'BFC 是什么？如何触发？', answer: '块级格式化上下文，独立的渲染区域。触发方式：float、overflow、position、display: flex/grid 等。' },
      { question: 'position 的属性值有哪些？', answer: 'static（默认）、relative（相对）、absolute（绝对）、fixed（固定）、sticky（粘性）。' },
      { question: '什么是 CSS 预处理器？', answer: 'Sass、Less、Stylus 等，提供变量、嵌套、混合等特性，提高开发效率。' },
      { question: 'rem、em、px 的区别？', answer: 'px 是固定单位；em 相对于父元素字体大小；rem 相对于根元素字体大小。' },
      { question: '盒模型有哪些？', answer: '标准盒模型：width 包含 content；IE 盒模型：width 包含 content+padding+border。box-sizing 控制。' },
      { question: 'CSS 选择器优先级？', answer: '!important > 内联样式 > ID > 类/属性/伪类 > 标签/伪元素。相同优先级后写覆盖前写。' },
      { question: '什么是响应式设计？', answer: '根据设备屏幕大小调整布局，使用媒体查询、弹性单位、百分比等实现。' }
    ]
  },
  {
    title: '性能优化',
    questions: [
      { question: '前端性能优化有哪些方法？', answer: '1. 代码分割 2. 懒加载 3. 图片优化 4. CDN 5. 缓存策略 6. 减少 HTTP 请求' },
      { question: '什么是防抖和节流？', answer: '防抖：延迟执行，多次触发只执行最后一次；节流：固定时间执行，限制执行频率。' },
      { question: '首屏加载优化方案？', answer: '1. 路由懒加载 2. 组件懒加载 3. 图片懒加载 4. SSR 5. 骨架屏' },
      { question: '浏览器缓存策略？', answer: '强缓存（Cache-Control、Expires）和协商缓存（ETag、Last-Modified）。' },
      { question: '如何减少重排重绘？', answer: '1. 批量操作 DOM 2. 使用文档片段 3. 避免频繁读取布局属性 4. 使用 transform 和 opacity' },
      { question: '什么是代码分割？', answer: '将代码拆分成多个包，按需加载，减少初始加载体积。Webpack 的 splitChunks、动态 import。' },
      { question: '图片优化方案？', answer: '1. 压缩图片 2. 使用 WebP 格式 3. 响应式图片 4. 懒加载 5. CDN 加速' },
      { question: '什么是 Service Worker？', answer: '浏览器后台线程，可以拦截网络请求、缓存资源、实现离线访问。' }
    ]
  },
  {
    title: '网络与浏览器',
    questions: [
      { question: 'HTTP 和 HTTPS 的区别？', answer: 'HTTPS 在 HTTP 基础上加了 SSL/TLS 加密，更安全，需要证书，端口 443。' },
      { question: 'TCP 三次握手和四次挥手？', answer: '三次握手建立连接（SYN、SYN-ACK、ACK），四次挥手断开连接（FIN、ACK、FIN、ACK）。' },
      { question: '什么是跨域？如何解决？', answer: '协议、域名、端口不同即为跨域。解决：CORS、JSONP、代理服务器。' },
      { question: '浏览器渲染过程？', answer: '解析 HTML -> 构建 DOM 树 -> 解析 CSS -> 构建 CSSOM -> 合成渲染树 -> 布局 -> 绘制。' },
      { question: '什么是 Cookie、LocalStorage、SessionStorage？', answer: 'Cookie 每次请求携带，4KB；LocalStorage 永久存储，5MB；SessionStorage 会话存储，5MB。' },
      { question: 'HTTP 状态码有哪些？', answer: '2xx 成功（200、201）、3xx 重定向（301、302）、4xx 客户端错误（404、403）、5xx 服务器错误（500、502）。' },
      { question: 'GET 和 POST 的区别？', answer: 'GET 获取数据，参数在 URL，有长度限制；POST 提交数据，参数在 body，无长度限制。' },
      { question: '什么是同源策略？', answer: '浏览器安全策略，限制来自不同源的文档或脚本交互。协议、域名、端口都相同才同源。' }
    ]
  },
  {
    title: '工程化与工具',
    questions: [
      { question: 'Webpack 和 Vite 的区别？', answer: 'Webpack 是打包工具，开发时编译；Vite 基于 esbuild，开发时按需编译，速度更快。' },
      { question: '什么是模块化？', answer: '将代码拆分成独立模块，便于维护和复用。CommonJS、ES Module、AMD 等。' },
      { question: 'Git 常用命令？', answer: 'clone、add、commit、push、pull、branch、checkout、merge、rebase。' },
      { question: 'npm 和 yarn/pnpm 的区别？', answer: 'npm 速度较慢；yarn 并行安装；pnpm 使用硬链接，节省磁盘空间。' },
      { question: '什么是 CI/CD？', answer: '持续集成和持续部署，自动化构建、测试、部署流程。' },
      { question: '什么是 Monorepo？', answer: '单个仓库管理多个项目，共享代码和配置，统一版本管理。工具：pnpm workspace、TurboRepo。' },
      { question: '什么是 Tree Shaking？', answer: '移除未使用的代码，减小打包体积。基于 ES Module 的静态分析。' },
      { question: '什么是 Hot Module Replacement？', answer: '模块热替换，开发时更新代码不刷新页面，保持应用状态。' }
    ]
  },
  {
    title: '数据结构与算法',
    questions: [
      { question: '数组和链表的区别？', answer: '数组连续内存，随机访问快；链表非连续内存，插入删除快。' },
      { question: '栈和队列的区别？', answer: '栈：后进先出（LIFO），函数调用、撤销操作；队列：先进先出（FIFO），任务队列。' },
      { question: '什么是哈希表？', answer: '键值对存储，通过哈希函数计算索引，查找时间复杂度 O(1)。' },
      { question: '二叉树遍历方式？', answer: '前序：根-左-右；中序：左-根-右；后序：左-右-根；层序：逐层遍历。' },
      { question: '快速排序的原理？', answer: '选择基准值，分区，递归排序。时间复杂度 O(nlogn)，空间复杂度 O(logn)。' },
      { question: '什么是动态规划？', answer: '将问题分解为子问题，保存子问题结果，避免重复计算。典型问题：背包、最长公共子序列。' },
      { question: '贪心算法和动态规划的区别？', answer: '贪心每步选择最优解，不一定全局最优；动态规划考虑所有情况，保证全局最优。' },
      { question: '什么是时间复杂度和空间复杂度？', answer: '时间复杂度：算法执行时间随数据规模增长；空间复杂度：算法占用内存随数据规模增长。' }
    ]
  },
  {
    title: '设计模式',
    questions: [
      { question: '单例模式的应用场景？', answer: '只需要一个实例：数据库连接池、配置管理、日志系统。' },
      { question: '观察者模式的实现？', answer: '一对多依赖，主题变化通知所有观察者。Vue 的响应式、EventEmitter。' },
      { question: '工厂模式的作用？', answer: '创建对象时隐藏创建逻辑，通过工厂方法返回实例。适合创建复杂对象。' },
      { question: '什么是发布订阅模式？', answer: '事件驱动，发布者发布事件，订阅者监听事件。解耦组件通信。' },
      { question: '适配器模式的应用？', answer: '接口不兼容时，通过适配器转换。Vue 的 props、React 的 HOC。' },
      { question: '装饰器模式的作用？', answer: '动态添加功能，不修改原对象。装饰器语法、高阶组件。' },
      { question: '策略模式的应用场景？', answer: '多种算法可以互换时。表单验证、支付方式、排序算法。' },
      { question: '代理模式的应用？', answer: '控制对象访问，添加额外功能。Vue 3 的 Proxy、图片懒加载。' }
    ]
  },
  {
    title: 'Node.js 相关',
    questions: [
      { question: 'Event Loop 机制？', answer: 'Node.js 事件循环：timers -> pending callbacks -> idle, prepare -> poll -> check -> close callbacks。' },
      { question: 'Buffer 的作用？', answer: '处理二进制数据，用于文件操作、网络传输。Node.js 特有类型。' },
      { question: 'Stream 的应用场景？', answer: '流式处理大数据，节省内存。文件读写、HTTP 请求、管道操作。' },
      { question: 'Cluster 模块的作用？', answer: '多进程利用多核 CPU，提高性能和稳定性。主进程和工作进程。' },
      { question: '什么是中间件？', answer: '处理请求的函数链。Express 的 app.use、Koa 的洋葱模型。' },
      { question: 'CommonJS 和 ES Module 的区别？', answer: 'CommonJS 是 Node.js 默认，运行时加载；ES Module 是标准，编译时加载，支持 tree shaking。' },
      { question: 'process 和 global 的区别？', answer: 'process 是当前进程信息，global 是全局对象。process.env 获取环境变量。' },
      { question: '什么是 REPL？', answer: '交互式命令行环境，Node.js 的调试工具。输入命令立即执行。' }
    ]
  },
  {
    title: '地图库相关',
    questions: [
      { question: 'OpenLayers 和 Mapbox GL JS 的区别？', answer: 'OpenLayers 是开源的、功能全面的地图库，支持多种地图源；Mapbox GL JS 基于 WebGL，性能更好，视觉效果更丰富，但部分功能需要付费。' },
      { question: '如何在 OpenLayers 中添加图层？', answer: '使用 ol.layer.Tile 或 ol.layer.Vector 添加图层，配合对应的数据源 ol.source.XYZ 或 ol.source.Vector。' },
      { question: 'Mapbox GL JS 中的样式如何定义？', answer: '使用 Mapbox 样式规范，通过 JSON 格式定义图层、数据源、样式等，支持表达式和数据驱动样式。' },
      { question: '如何实现地图的缩放和平移控制？', answer: 'OpenLayers 使用 ol.control.Zoom 和 ol.control.MousePosition；Mapbox GL JS 使用内置的导航控件和事件监听。' },
      { question: '如何在地图上添加标记点？', answer: 'OpenLayers 使用 ol.layer.Vector 和 ol.Feature；Mapbox GL JS 使用 addLayer 方法添加点图层或使用 Marker 类。' },
      { question: '如何处理地图事件？', answer: 'OpenLayers 使用 on 方法监听地图事件（如 click、moveend）；Mapbox GL JS 使用 on 方法监听地图事件。' },
      { question: '如何实现地图的离线缓存？', answer: 'OpenLayers 可以使用 TileCache 或 PBF 缓存；Mapbox GL JS 可以使用 Mapbox Tilequery API 或 Service Worker 缓存。' },
      { question: '如何优化地图性能？', answer: '1. 使用适当的瓦片层级 2. 减少图层数量 3. 优化数据源 4. 使用 WebGL 渲染 5. 实现视图范围限制' }
    ]
  },
  {
    title: '前端算法题',
    questions: [
      {
        question: '两数之和',
        answer: '给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出和为目标值 target 的那两个整数，并返回它们的数组下标。',
        code: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`
      },
      {
        question: '反转链表',
        answer: '给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。',
        code: `function reverseList(head) {
  let prev = null;
  let curr = head;
  while (curr !== null) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}`
      },
      {
        question: '有效的括号',
        answer: '给定一个只包括 "("，")"，"{"，"}"，"["，"]" 的字符串 s ，判断字符串是否有效。',
        code: `function isValid(s) {
  const stack = [];
  const map = {
    ')': '(',
    '}': '{',
    ']': '['
  };
  for (let char of s) {
    if (char in map) {
      if (stack.pop() !== map[char]) return false;
    } else {
      stack.push(char);
    }
  }
  return stack.length === 0;
}`
      },
      {
        question: '二叉树的最大深度',
        answer: '给定一个二叉树，找出其最大深度。二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。',
        code: `function maxDepth(root) {
  if (root === null) return 0;
  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);
  return Math.max(leftDepth, rightDepth) + 1;
}`
      },
      {
        question: '斐波那契数列',
        answer: '斐波那契数列由 0 和 1 开始，之后的斐波那契数就是由之前的两数相加而得出。',
        code: `function fibonacci(n) {
  if (n <= 1) return n;
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
}`
      },
      {
        question: '快速排序',
        answer: '快速排序是一种高效的排序算法，采用分治法策略。',
        code: `function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const middle = arr.filter(x => x === pivot);
  const right = arr.filter(x => x > pivot);
  return [...quickSort(left), ...middle, ...quickSort(right)];
}`
      },
      {
        question: '数组去重',
        answer: '给定一个数组，返回去重后的数组。',
        code: `function unique(arr) {
  return [...new Set(arr)];
}

// 或者使用 filter
function uniqueFilter(arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}`
      },
      {
        question: '实现 Promise.all',
        answer: 'Promise.all 接收一个 Promise 数组，当所有 Promise 都成功时返回结果数组，任一失败则返回失败原因。',
        code: `function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completed = 0;
    
    promises.forEach((promise, index) => {
      Promise.resolve(promise).then(value => {
        results[index] = value;
        completed++;
        if (completed === promises.length) {
          resolve(results);
        }
      }).catch(reject);
    });
  });
}`
      },
      {
        question: '实现防抖函数',
        answer: '防抖函数：在事件触发 n 秒后才执行，如果在这 n 秒内又触发，则重新计时。',
        code: `function debounce(fn, delay) {
  let timer = null;
  return function(...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}`
      },
      {
        question: '实现节流函数',
        answer: '节流函数：在指定时间内只执行一次，限制函数执行频率。',
        code: `function throttle(fn, limit) {
  let inThrottle = false;
  return function(...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}`
      },
      {
        question: '深拷贝实现',
        answer: '实现一个深拷贝函数，处理对象、数组、循环引用等情况。',
        code: `function deepClone(obj, map = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  
  if (map.has(obj)) return map.get(obj);
  
  const clone = Array.isArray(obj) ? [] : {};
  map.set(obj, clone);
  
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key], map);
    }
  }
  return clone;
}`
      },
      {
        question: '实现 bind 方法',
        answer: '实现 Function.prototype.bind 方法，返回一个新函数，this 指向绑定的对象。',
        code: `Function.prototype.myBind = function(context, ...args) {
  const fn = this;
  return function(...newArgs) {
    return fn.apply(context, [...args, ...newArgs]);
  };
};`
      }
    ]
  }
]

const activeTab = ref('JavaScript 基础')
const highlightedCode = ref({})

const highlightCode = async () => {
  const currentCategory = interviewCategories.find(c => c.title === activeTab.value)
  if (!currentCategory || !currentCategory.questions) return

  for (let i = 0; i < currentCategory.questions.length; i++) {
    const question = currentCategory.questions[i]
    if (question.code) {
      const key = `${activeTab.value}-${i}`
      if (!highlightedCode.value[key]) {
        highlightedCode.value[key] = await codeToHtml(question.code, {
          lang: 'javascript',
          theme: 'github-dark'
        })
      }
    }
  }
}

watch(activeTab, () => {
  nextTick(() => {
    highlightCode()
  })
})

onMounted(() => {
  highlightCode()
})
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

      <NTabs v-model:value="activeTab" type="line" animated>
        <NTabPane
          v-for="category in interviewCategories"
          :key="category.title"
          :name="category.title"
          :tab="category.title"
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
                <div v-if="item.code" class="code-block" v-html="highlightedCode[`${category.title}-${qIndex}`]"></div>
              </div>
            </NCard>
          </NSpace>
        </NTabPane>
      </NTabs>
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
  margin-bottom: 12px;
}

.code-block {
  margin-top: 12px;
  border-radius: 8px;
  overflow: hidden;
}

.code-block :deep(pre) {
  margin: 0;
  padding: 16px;
  overflow-x: auto;
  font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
  font-size: 14px;
  line-height: 1.6;
}
</style>
