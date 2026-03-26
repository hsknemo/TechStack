<script setup>
import { NPageHeader, NGrid, NGi, NSpace, NText, NH3, NDivider } from 'naive-ui'
import CategoryList from '../components/CategoryList.vue'
import StackCard from '../components/StackCard.vue'

const categories = [
  { id: 'ui', name: '日常组件库' },
  { id: 'rich', name: '富文本编辑' },
  { id: 'docs', name: '文档查看' },
  { id: 'enterprise', name: '企业/类库' },
  { id: 'state', name: '状态管理' },
  { id: 'build', name: '构建工具' },
  { id: 'css', name: 'CSS 框架' },
  { id: 'chart', name: '图表可视化' },
  { id: 'map', name: '地图库' },
  { id: 'browser-cache', name: '浏览器端缓存库' },
  { id: 'node-cache', name: 'Node.js 缓存库' },
  { id: 'nodejs', name: 'Node.js 生态' },
  { id: 'deno', name: 'Deno 生态' }
]

const libraries = [
  { id: 'naive', name: 'Naive UI', category: '日常组件库', description: 'Vue 3 组件库，TypeScript 编写', tags: ['Vue 3', 'TypeScript'], repo: 'https://www.naiveui.com' },
  { id: 'element-plus', name: 'Element Plus', category: '日常组件库', description: '基于 Vue 3 的组件库', tags: ['Vue 3', 'UI'], repo: 'https://element-plus.org' },
  { id: 'ant-design-vue', name: 'Ant Design Vue', category: '日常组件库', description: 'Ant Design 的 Vue 实现', tags: ['Vue 3', 'UI'], repo: 'https://antdv.com' },
  { id: 'vuetify', name: 'Vuetify', category: '日常组件库', description: 'Material Design 组件框架', tags: ['Vue 3', 'Material'], repo: 'https://vuetifyjs.com' },
  { id: 'arco-design', name: 'Arco Design Vue', category: '日常组件库', description: '字节跳动出品的企业级设计系统', tags: ['Vue 3', 'Enterprise'], repo: 'https://arco.design/vue' },
  { id: 'vant', name: 'Vant', category: '日常组件库', description: '轻量级移动端 Vue 组件库', tags: ['Vue 3', 'Mobile'], repo: 'https://vant-ui.github.io/vant' },

  { id: 'quill', name: 'Quill', category: '富文本编辑', description: '功能强大的富文本编辑器', tags: ['WYSIWYG'], repo: 'https://quilljs.com' },
  { id: 'tiptap', name: 'TipTap', category: '富文本编辑', description: '可扩展的富文本编辑器', tags: ['ProseMirror'], repo: 'https://tiptap.dev' },
  { id: 'slate', name: 'Slate', category: '富文本编辑', description: '完全可定制的富文本编辑器框架', tags: ['React'], repo: 'https://www.slatejs.org' },
  { id: 'wang-editor', name: 'WangEditor', category: '富文本编辑', description: '国产开源富文本编辑器', tags: ['TypeScript'], repo: 'https://www.wangeditor.com' },
  { id: 'lexical', name: 'Lexical', category: '富文本编辑', description: 'Meta 开发的富文本框架', tags: ['React'], repo: 'https://lexical.dev' },

  { id: 'pdfjs', name: 'PDF.js', category: '文档查看', description: 'Mozilla 的 PDF 渲染库', tags: ['PDF'], repo: 'https://mozilla.github.io/pdf.js/' },
  { id: 'officejs', name: 'Office.js', category: '文档查看', description: 'Office 文档集成 API', tags: ['Office'], repo: 'https://microsoft.github.io/office-js/' },
  { id: 'exceljs', name: 'ExcelJS', category: '文档查看', description: 'Excel 读写库', tags: ['Spreadsheet'], repo: 'https://github.com/exceljs/exceljs' },
  { id: 'docx', name: 'docx', category: '文档查看', description: '生成 .docx 文件', tags: ['Word'], repo: 'https://github.com/dolanmiu/docx' },
  { id: 'pdfmake', name: 'PDFMake', category: '文档查看', description: '客户端/服务端 PDF 生成', tags: ['PDF'], repo: 'http://pdfmake.org' },

  { id: 'lodash', name: 'Lodash', category: '企业/类库', description: '现代化实用工具库', tags: ['Utility'], repo: 'https://lodash.com' },
  { id: 'dayjs', name: 'Day.js', category: '企业/类库', description: '轻量级日期处理库', tags: ['Date'], repo: 'https://day.js.org' },
  { id: 'axios', name: 'Axios', category: '企业/类库', description: 'HTTP 请求库', tags: ['HTTP'], repo: 'https://axios-http.com' },
  { id: 'ramda', name: 'Ramda', category: '企业/类库', description: '函数式编程工具库', tags: ['Functional'], repo: 'https://ramdajs.com' },
  { id: 'immer', name: 'Immer', category: '企业/类库', description: '不可变数据处理', tags: ['Immutable'], repo: 'https://immerjs.github.io/immer' },

  { id: 'pinia', name: 'Pinia', category: '状态管理', description: 'Vue 官方状态管理库', tags: ['Vue 3'], repo: 'https://pinia.vuejs.org' },
  { id: 'vuex', name: 'Vuex', category: '状态管理', description: 'Vue 状态管理模式', tags: ['Vue'], repo: 'https://vuex.vuejs.org' },
  { id: 'redux', name: 'Redux', category: '状态管理', description: '可预测的状态容器', tags: ['React'], repo: 'https://redux.js.org' },
  { id: 'zustand', name: 'Zustand', category: '状态管理', description: '轻量级状态管理', tags: ['React'], repo: 'https://github.com/pmndrs/zustand' },
  { id: 'mobx', name: 'MobX', category: '状态管理', description: '响应式状态管理', tags: ['Observable'], repo: 'https://mobx.js.org' },

  { id: 'vite', name: 'Vite', category: '构建工具', description: '下一代前端构建工具', tags: ['Build'], repo: 'https://vitejs.dev' },
  { id: 'webpack', name: 'Webpack', category: '构建工具', description: '模块打包工具', tags: ['Bundler'], repo: 'https://webpack.js.org' },
  { id: 'rollup', name: 'Rollup', category: '构建工具', description: 'JavaScript 模块打包器', tags: ['Bundler'], repo: 'https://rollupjs.org' },
  { id: 'esbuild', name: 'esbuild', category: '构建工具', description: '极速 JavaScript 打包器', tags: ['Build'], repo: 'https://esbuild.github.io' },
  { id: 'turbo', name: 'Turborepo', category: '构建工具', description: '高性能 monorepo 构建系统', tags: ['Monorepo'], repo: 'https://turbo.build' },

  { id: 'tailwindcss', name: 'Tailwind CSS', category: 'CSS 框架', description: '实用优先的 CSS 框架', tags: ['Utility'], repo: 'https://tailwindcss.com' },
  { id: 'unocss', name: 'UnoCSS', category: 'CSS 框架', description: '即时原子化 CSS 引擎', tags: ['Atomic'], repo: 'https://unocss.dev' },
  { id: 'sass', name: 'Sass', category: 'CSS 框架', description: 'CSS 预处理器', tags: ['Preprocessor'], repo: 'https://sass-lang.com' },
  { id: 'styled-components', name: 'Styled Components', category: 'CSS 框架', description: 'React CSS-in-JS 库', tags: ['CSS-in-JS'], repo: 'https://styled-components.com' },
  { id: 'emotion', name: 'Emotion', category: 'CSS 框架', description: 'CSS-in-JS 库', tags: ['CSS-in-JS'], repo: 'https://emotion.sh' },

  { id: 'echarts', name: 'ECharts', category: '图表可视化', description: '功能强大的可视化图表库', tags: ['Charts'], repo: 'https://echarts.apache.org' },
  { id: 'chartjs', name: 'Chart.js', category: '图表可视化', description: '简单灵活的图表库', tags: ['Charts'], repo: 'https://www.chartjs.org' },
  { id: 'd3', name: 'D3.js', category: '图表可视化', description: '数据驱动的可视化库', tags: ['Visualization'], repo: 'https://d3js.org' },
  { id: 'antv', name: 'AntV', category: '图表可视化', description: '蚂蚁集团可视化解决方案', tags: ['Visualization'], repo: 'https://antv.antgroup.com' },
  { id: 'threejs', name: 'Three.js', category: '图表可视化', description: '3D 图形库', tags: ['3D'], repo: 'https://threejs.org' },

  // 地图库
  { id: 'openlayers', name: 'OpenLayers', category: '地图库', description: '开源的 JavaScript 地图库', tags: ['Map', 'Open Source'], repo: 'https://openlayers.org' },
  { id: 'mapbox', name: 'Mapbox GL JS', category: '地图库', description: '基于 WebGL 的交互式地图库', tags: ['Map', 'WebGL'], repo: 'https://www.mapbox.com/mapbox-gl-js' },
  { id: 'leaflet', name: 'Leaflet', category: '地图库', description: '轻量级开源地图库', tags: ['Map', 'Lightweight'], repo: 'https://leafletjs.com' },
  { id: 'google-maps', name: 'Google Maps JS API', category: '地图库', description: 'Google 地图 JavaScript API', tags: ['Map', 'Google'], repo: 'https://developers.google.com/maps/documentation/javascript' },
  { id: 'amap', name: '高德地图 API', category: '地图库', description: '高德地图 JavaScript API', tags: ['Map', 'China'], repo: 'https://lbs.amap.com/api/javascript-api' },
  { id: 'baidu-map', name: '百度地图 API', category: '地图库', description: '百度地图 JavaScript API', tags: ['Map', 'China'], repo: 'https://lbsyun.baidu.com/index.php?title=jspopular' },

  // 浏览器端缓存库
  { id: 'localforage', name: 'localforage', category: '浏览器端缓存库', description: '客户端存储增强库', tags: ['Cache', 'Client', 'Storage'], repo: 'https://github.com/localForage/localForage' },
  { id: 'idb-keyval', name: 'idb-keyval', category: '浏览器端缓存库', description: 'IndexedDB 键值存储', tags: ['Cache', 'IndexedDB'], repo: 'https://github.com/jakearchibald/idb-keyval' },
  { id: 'workbox', name: 'Workbox', category: '浏览器端缓存库', description: 'Service Worker 缓存库', tags: ['Cache', 'PWA', 'Service Worker'], repo: 'https://workboxjs.org' },
  { id: 'sw-toolbox', name: 'sw-toolbox', category: '浏览器端缓存库', description: 'Service Worker 工具库', tags: ['Cache', 'PWA'], repo: 'https://github.com/GoogleChromeLabs/sw-toolbox' },
  { id: 'fast-memoize', name: 'fast-memoize', category: '浏览器端缓存库', description: '快速的函数记忆化', tags: ['Cache', 'Memoization'], repo: 'https://github.com/caiogondim/fast-memoize.js' },
  { id: 'memoizee', name: 'memoizee', category: '浏览器端缓存库', description: '功能强大的记忆化库', tags: ['Cache', 'Memoization'], repo: 'https://github.com/medikoo/memoizee' },

  // Node.js 缓存库
  { id: 'lru-cache', name: 'lru-cache', category: 'Node.js 缓存库', description: '高效的 LRU 缓存实现', tags: ['Cache', 'LRU'], repo: 'https://github.com/isaacs/node-lru-cache' },
  { id: 'memory-cache', name: 'memory-cache', category: 'Node.js 缓存库', description: '简单的内存缓存', tags: ['Cache', 'Memory'], repo: 'https://github.com/ptarjan/node-cache' },
  { id: 'node-cache', name: 'node-cache', category: 'Node.js 缓存库', description: 'Node.js 内存缓存', tags: ['Cache', 'Node.js'], repo: 'https://github.com/node-cache/node-cache' },
  { id: 'redis', name: 'ioredis', category: 'Node.js 缓存库', description: 'Redis 客户端', tags: ['Cache', 'Redis'], repo: 'https://github.com/luin/ioredis' },
  { id: 'memcached', name: 'memcached', category: 'Node.js 缓存库', description: 'Memcached 客户端', tags: ['Cache', 'Memcached'], repo: 'https://github.com/3rd-Eden/memcached' },
  { id: 'cache-manager', name: 'cache-manager', category: 'Node.js 缓存库', description: '灵活的缓存管理器', tags: ['Cache', 'Manager'], repo: 'https://github.com/BryanDonovan/node-cache-manager' },

  { id: 'express', name: 'Express', category: 'Node.js 生态', description: 'Node.js Web 应用框架', tags: ['Web Framework'], repo: 'https://expressjs.com' },
  { id: 'koa', name: 'Koa', category: 'Node.js 生态', description: '下一代 Node.js Web 框架', tags: ['Web Framework'], repo: 'https://koajs.com' },
  { id: 'nest', name: 'NestJS', category: 'Node.js 生态', description: '渐进式 Node.js 框架', tags: ['Enterprise'], repo: 'https://nestjs.com' },
  { id: 'fastify', name: 'Fastify', category: 'Node.js 生态', description: '高性能 Node.js Web 框架', tags: ['Performance'], repo: 'https://fastify.io' },
  { id: 'egg', name: 'Egg.js', category: 'Node.js 生态', description: '阿里出品的 Node.js 企业级框架', tags: ['Enterprise'], repo: 'https://eggjs.org' },
  { id: 'hapi', name: 'Hapi', category: 'Node.js 生态', description: 'Node.js 应用框架', tags: ['Web Framework'], repo: 'https://hapi.dev' },
  { id: 'socketio', name: 'Socket.io', category: 'Node.js 生态', description: '实时双向通信库', tags: ['WebSocket'], repo: 'https://socket.io' },
  { id: 'sequelize', name: 'Sequelize', category: 'Node.js 生态', description: 'Node.js ORM 框架', tags: ['Database'], repo: 'https://sequelize.org' },
  { id: 'typeorm', name: 'TypeORM', category: 'Node.js 生态', description: 'TypeScript ORM 框架', tags: ['Database'], repo: 'https://typeorm.io' },
  { id: 'prisma', name: 'Prisma', category: 'Node.js 生态', description: '下一代 Node.js ORM', tags: ['Database'], repo: 'https://prisma.io' },
  { id: 'mongoose', name: 'Mongoose', category: 'Node.js 生态', description: 'MongoDB ODM 框架', tags: ['Database'], repo: 'https://mongoosejs.com' },
  { id: 'redis', name: 'ioredis', category: 'Node.js 生态', description: 'Redis Node.js 客户端', tags: ['Database'], repo: 'https://github.com/luin/ioredis' },
  { id: 'mysql', name: 'mysql2', category: 'Node.js 生态', description: 'MySQL Node.js 客户端', tags: ['Database'], repo: 'https://github.com/sidorares/node-mysql2' },
  { id: 'pg', name: 'pg', category: 'Node.js 生态', description: 'PostgreSQL Node.js 客户端', tags: ['Database'], repo: 'https://node-postgres.com' },
  { id: 'pm2', name: 'PM2', category: 'Node.js 生态', description: 'Node.js 进程管理器', tags: ['Process Manager'], repo: 'https://pm2.keymetrics.io' },
  { id: 'nodemon', name: 'Nodemon', category: 'Node.js 生态', description: 'Node.js 自动重启工具', tags: ['Dev Tool'], repo: 'https://nodemon.io' },
  { id: 'joi', name: 'Joi', category: 'Node.js 生态', description: '数据验证库', tags: ['Validation'], repo: 'https://joi.dev' },
  { id: 'zod', name: 'Zod', category: 'Node.js 生态', description: 'TypeScript 优先的模式验证', tags: ['Validation'], repo: 'https://zod.dev' },
  { id: 'jsonwebtoken', name: 'jsonwebtoken', category: 'Node.js 生态', description: 'JWT 令牌生成和验证', tags: ['Auth'], repo: 'https://github.com/auth0/node-jsonwebtoken' },
  { id: 'bcrypt', name: 'bcrypt', category: 'Node.js 生态', description: '密码哈希库', tags: ['Security'], repo: 'https://github.com/kelektiv/node.bcrypt.js' },
  { id: 'multer', name: 'Multer', category: 'Node.js 生态', description: '文件上传中间件', tags: ['Upload'], repo: 'https://github.com/expressjs/multer' },
  { id: 'sharp', name: 'Sharp', category: 'Node.js 生态', description: '高性能图片处理库', tags: ['Image'], repo: 'https://sharp.pixelplumbing.com' },
  { id: 'puppeteer', name: 'Puppeteer', category: 'Node.js 生态', description: 'Headless Chrome 控制库', tags: ['Scraping'], repo: 'https://pptr.dev' },
  { id: 'playwright', name: 'Playwright', category: 'Node.js 生态', description: '跨浏览器自动化测试', tags: ['Testing'], repo: 'https://playwright.dev' },
  { id: 'jest', name: 'Jest', category: 'Node.js 生态', description: 'JavaScript 测试框架', tags: ['Testing'], repo: 'https://jestjs.io' },
  { id: 'mocha', name: 'Mocha', category: 'Node.js 生态', description: 'JavaScript 测试框架', tags: ['Testing'], repo: 'https://mochajs.org' },
  { id: 'supertest', name: 'Supertest', category: 'Node.js 生态', description: 'HTTP 断言库', tags: ['Testing'], repo: 'https://github.com/visionmedia/supertest' },

  { id: 'oak', name: 'Oak', category: 'Deno 生态', description: 'Deno Web 框架', tags: ['Web Framework'], repo: 'https://oakserver.github.io/oak' },
  { id: 'fresh', name: 'Fresh', category: 'Deno 生态', description: 'Deno 全栈 Web 框架', tags: ['Full Stack'], repo: 'https://fresh.deno.dev' },
  { id: 'drash', name: 'Drash', category: 'Deno 生态', description: 'Deno REST API 框架', tags: ['Web Framework'], repo: 'https://drash.land' },
  { id: 'abc', name: 'ABC', category: 'Deno 生态', description: 'Deno Web 框架', tags: ['Web Framework'], repo: 'https://deno.land/x/abc' },
  { id: 'denodb', name: 'DenoDB', category: 'Deno 生态', description: 'Deno ORM 框架', tags: ['Database'], repo: 'https://denodb.deno.dev' },
  { id: 'deno-postgres', name: 'postgres', category: 'Deno 生态', description: 'Deno PostgreSQL 客户端', tags: ['Database'], repo: 'https://deno.land/x/postgres' },
  { id: 'deno-mysql', name: 'mysql', category: 'Deno 生态', description: 'Deno MySQL 客户端', tags: ['Database'], repo: 'https://deno.land/x/mysql' },
  { id: 'deno-redis', name: 'redis', category: 'Deno 生态', description: 'Deno Redis 客户端', tags: ['Database'], repo: 'https://deno.land/x/redis' },
  { id: 'deno-jwt', name: 'djwt', category: 'Deno 生态', description: 'Deno JWT 令牌库', tags: ['Auth'], repo: 'https://deno.land/x/djwt' },
  { id: 'deno-bcrypt', name: 'bcrypt', category: 'Deno 生态', description: 'Deno 密码哈希库', tags: ['Security'], repo: 'https://deno.land/x/bcrypt' },
  { id: 'deno-validator', name: 'validasaur', category: 'Deno 生态', description: 'Deno 数据验证库', tags: ['Validation'], repo: 'https://deno.land/x/validasaur' },
  { id: 'deno-upload', name: 'formdata', category: 'Deno 生态', description: 'Deno 表单和文件上传', tags: ['Upload'], repo: 'https://deno.land/x/formdata' },
  { id: 'deno-image', name: 'imagetools', category: 'Deno 生态', description: 'Deno 图片处理库', tags: ['Image'], repo: 'https://deno.land/x/imagetools' },
  { id: 'deno-http', name: 'deno_http', category: 'Deno 生态', description: 'Deno HTTP 客户端', tags: ['HTTP'], repo: 'https://deno.land/x/http' },
  { id: 'deno-std', name: 'std', category: 'Deno 生态', description: 'Deno 标准库', tags: ['Standard'], repo: 'https://deno.land/std' },
  { id: 'deno-testing', name: 'deno test', category: 'Deno 生态', description: 'Deno 内置测试框架', tags: ['Testing'], repo: 'https://deno.land/manual/testing' },
  { id: 'deno-oak-testing', name: 'oak-testing', category: 'Deno 生态', description: 'Oak 框架测试工具', tags: ['Testing'], repo: 'https://deno.land/x/oak_testing' },
]

const groupedLibraries = {}
categories.forEach(cat => {
  groupedLibraries[cat.id] = libraries.filter(lib => lib.category === cat.name)
})
</script>

<template>
  <div class="home-page">
    <NPageHeader title="前端组件库" style="margin-bottom: 24px;">
      <template #subtitle>
        <NText depth="3">
          基于 Vue 3 + Vite + Naive UI，用于整理日常组件、富文本、文档查看、Node.js 和 Deno 生态的参考与归类
        </NText>
      </template>
    </NPageHeader>

    <NSpace vertical size="large">
      <div v-for="category in categories" :key="category.id">
        <NH3 style="margin-bottom: 16px; color: #63e2b7;">
          {{ category.name }}
        </NH3>
        <NGrid :x-gap="16" :y-gap="16" :cols="4" responsive="screen" item-responsive>
          <NGi v-for="lib in groupedLibraries[category.id]" :key="lib.id" span="4 m:2 l:1">
            <StackCard :item="lib" />
          </NGi>
        </NGrid>
        <NDivider style="margin: 24px 0;" />
      </div>
    </NSpace>
  </div>
</template>

<style scoped>
.home-page {
  max-width: 1400px;
  margin: 0 auto;
}
</style>
