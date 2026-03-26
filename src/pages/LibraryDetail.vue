<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { NPageHeader, NCard, NDescriptions, NDescriptionsItem, NTag, NSpace, NButton, NSpin, NEmpty } from 'naive-ui'

const route = useRoute()
const router = useRouter()
const id = route.params.id
const library = ref(null)
const loading = ref(true)

const data = {
  naive: { id: 'naive', name: 'Naive UI', category: '日常组件库', description: 'Vue 3 组件库，TypeScript 编写', docs: 'https://www.naiveui.com', tags: ['Vue 3', 'TypeScript'] },
  'element-plus': { id: 'element-plus', name: 'Element Plus', category: '日常组件库', description: '基于 Vue 3 的组件库', docs: 'https://element-plus.org', tags: ['Vue 3', 'UI'] },
  'ant-design-vue': { id: 'ant-design-vue', name: 'Ant Design Vue', category: '日常组件库', description: 'Ant Design 的 Vue 实现', docs: 'https://antdv.com', tags: ['Vue 3', 'UI'] },
  vuetify: { id: 'vuetify', name: 'Vuetify', category: '日常组件库', description: 'Material Design 组件框架', docs: 'https://vuetifyjs.com', tags: ['Vue 3', 'Material'] },
  'arco-design': { id: 'arco-design', name: 'Arco Design Vue', category: '日常组件库', description: '字节跳动出品的企业级设计系统', docs: 'https://arco.design/vue', tags: ['Vue 3', 'Enterprise'] },
  vant: { id: 'vant', name: 'Vant', category: '日常组件库', description: '轻量级移动端 Vue 组件库', docs: 'https://vant-ui.github.io/vant', tags: ['Vue 3', 'Mobile'] },
  quill: { id: 'quill', name: 'Quill', category: '富文本编辑', description: '功能强大的富文本编辑器', docs: 'https://quilljs.com', tags: ['WYSIWYG'] },
  tiptap: { id: 'tiptap', name: 'TipTap', category: '富文本编辑', description: '可扩展的富文本编辑器', docs: 'https://tiptap.dev', tags: ['ProseMirror'] },
  slate: { id: 'slate', name: 'Slate', category: '富文本编辑', description: '完全可定制的富文本编辑器框架', docs: 'https://www.slatejs.org', tags: ['React'] },
  'wang-editor': { id: 'wang-editor', name: 'WangEditor', category: '富文本编辑', description: '国产开源富文本编辑器', docs: 'https://www.wangeditor.com', tags: ['TypeScript'] },
  lexical: { id: 'lexical', name: 'Lexical', category: '富文本编辑', description: 'Meta 开发的富文本框架', docs: 'https://lexical.dev', tags: ['React'] },
  pdfjs: { id: 'pdfjs', name: 'PDF.js', category: '文档查看', description: 'Mozilla 的 PDF 渲染库', docs: 'https://mozilla.github.io/pdf.js/', tags: ['PDF'] },
  officejs: { id: 'officejs', name: 'Office.js', category: '文档查看', description: 'Office 文档集成 API', docs: 'https://microsoft.github.io/office-js/', tags: ['Office'] },
  exceljs: { id: 'exceljs', name: 'ExcelJS', category: '文档查看', description: 'Excel 读写库', docs: 'https://github.com/exceljs/exceljs', tags: ['Spreadsheet'] },
  docx: { id: 'docx', name: 'docx', category: '文档查看', description: '生成 .docx 文件', docs: 'https://github.com/dolanmiu/docx', tags: ['Word'] },
  pdfmake: { id: 'pdfmake', name: 'PDFMake', category: '文档查看', description: '客户端/服务端 PDF 生成', docs: 'http://pdfmake.org', tags: ['PDF'] },
  lodash: { id: 'lodash', name: 'Lodash', category: '企业/类库', description: '现代化实用工具库', docs: 'https://lodash.com', tags: ['Utility'] },
  dayjs: { id: 'dayjs', name: 'Day.js', category: '企业/类库', description: '轻量级日期处理库', docs: 'https://day.js.org', tags: ['Date'] },
  axios: { id: 'axios', name: 'Axios', category: '企业/类库', description: 'HTTP 请求库', docs: 'https://axios-http.com', tags: ['HTTP'] },
  ramda: { id: 'ramda', name: 'Ramda', category: '企业/类库', description: '函数式编程工具库', docs: 'https://ramdajs.com', tags: ['Functional'] },
  immer: { id: 'immer', name: 'Immer', category: '企业/类库', description: '不可变数据处理', docs: 'https://immerjs.github.io/immer', tags: ['Immutable'] },
  pinia: { id: 'pinia', name: 'Pinia', category: '状态管理', description: 'Vue 官方状态管理库', docs: 'https://pinia.vuejs.org', tags: ['Vue 3'] },
  vuex: { id: 'vuex', name: 'Vuex', category: '状态管理', description: 'Vue 状态管理模式', docs: 'https://vuex.vuejs.org', tags: ['Vue'] },
  redux: { id: 'redux', name: 'Redux', category: '状态管理', description: '可预测的状态容器', docs: 'https://redux.js.org', tags: ['React'] },
  zustand: { id: 'zustand', name: 'Zustand', category: '状态管理', description: '轻量级状态管理', docs: 'https://github.com/pmndrs/zustand', tags: ['React'] },
  mobx: { id: 'mobx', name: 'MobX', category: '状态管理', description: '响应式状态管理', docs: 'https://mobx.js.org', tags: ['Observable'] },
  vite: { id: 'vite', name: 'Vite', category: '构建工具', description: '下一代前端构建工具', docs: 'https://vitejs.dev', tags: ['Build'] },
  webpack: { id: 'webpack', name: 'Webpack', category: '构建工具', description: '模块打包工具', docs: 'https://webpack.js.org', tags: ['Bundler'] },
  rollup: { id: 'rollup', name: 'Rollup', category: '构建工具', description: 'JavaScript 模块打包器', docs: 'https://rollupjs.org', tags: ['Bundler'] },
  esbuild: { id: 'esbuild', name: 'esbuild', category: '构建工具', description: '极速 JavaScript 打包器', docs: 'https://esbuild.github.io', tags: ['Build'] },
  turbo: { id: 'turbo', name: 'Turborepo', category: '构建工具', description: '高性能 monorepo 构建系统', docs: 'https://turbo.build', tags: ['Monorepo'] },
  tailwindcss: { id: 'tailwindcss', name: 'Tailwind CSS', category: 'CSS 框架', description: '实用优先的 CSS 框架', docs: 'https://tailwindcss.com', tags: ['Utility'] },
  unocss: { id: 'unocss', name: 'UnoCSS', category: 'CSS 框架', description: '即时原子化 CSS 引擎', docs: 'https://unocss.dev', tags: ['Atomic'] },
  sass: { id: 'sass', name: 'Sass', category: 'CSS 框架', description: 'CSS 预处理器', docs: 'https://sass-lang.com', tags: ['Preprocessor'] },
  'styled-components': { id: 'styled-components', name: 'Styled Components', category: 'CSS 框架', description: 'React CSS-in-JS 库', docs: 'https://styled-components.com', tags: ['CSS-in-JS'] },
  emotion: { id: 'emotion', name: 'Emotion', category: 'CSS 框架', description: 'CSS-in-JS 库', docs: 'https://emotion.sh', tags: ['CSS-in-JS'] },
  echarts: { id: 'echarts', name: 'ECharts', category: '图表可视化', description: '功能强大的可视化图表库', docs: 'https://echarts.apache.org', tags: ['Charts'] },
  chartjs: { id: 'chartjs', name: 'Chart.js', category: '图表可视化', description: '简单灵活的图表库', docs: 'https://www.chartjs.org', tags: ['Charts'] },
  d3: { id: 'd3', name: 'D3.js', category: '图表可视化', description: '数据驱动的可视化库', docs: 'https://d3js.org', tags: ['Visualization'] },
  antv: { id: 'antv', name: 'AntV', category: '图表可视化', description: '蚂蚁集团可视化解决方案', docs: 'https://antv.antgroup.com', tags: ['Visualization'] },
  threejs: { id: 'threejs', name: 'Three.js', category: '图表可视化', description: '3D 图形库', docs: 'https://threejs.org', tags: ['3D'] },
  openlayers: { id: 'openlayers', name: 'OpenLayers', category: '地图库', description: '开源的 JavaScript 地图库', docs: 'https://openlayers.org', tags: ['Map', 'Open Source'] },
  mapbox: { id: 'mapbox', name: 'Mapbox GL JS', category: '地图库', description: '基于 WebGL 的交互式地图库', docs: 'https://www.mapbox.com/mapbox-gl-js', tags: ['Map', 'WebGL'] },
  leaflet: { id: 'leaflet', name: 'Leaflet', category: '地图库', description: '轻量级开源地图库', docs: 'https://leafletjs.com', tags: ['Map', 'Lightweight'] },
  'google-maps': { id: 'google-maps', name: 'Google Maps JS API', category: '地图库', description: 'Google 地图 JavaScript API', docs: 'https://developers.google.com/maps/documentation/javascript', tags: ['Map', 'Google'] },
  amap: { id: 'amap', name: '高德地图 API', category: '地图库', description: '高德地图 JavaScript API', docs: 'https://lbs.amap.com/api/javascript-api', tags: ['Map', 'China'] },
  'baidu-map': { id: 'baidu-map', name: '百度地图 API', category: '地图库', description: '百度地图 JavaScript API', docs: 'https://lbsyun.baidu.com/index.php?title=jspopular', tags: ['Map', 'China'] },
  express: { id: 'express', name: 'Express', category: 'Node.js 生态', description: 'Node.js Web 应用框架', docs: 'https://expressjs.com', tags: ['Web Framework'] },
  koa: { id: 'koa', name: 'Koa', category: 'Node.js 生态', description: '下一代 Node.js Web 框架', docs: 'https://koajs.com', tags: ['Web Framework'] },
  nest: { id: 'nest', name: 'NestJS', category: 'Node.js 生态', description: '渐进式 Node.js 框架', docs: 'https://nestjs.com', tags: ['Enterprise'] },
  fastify: { id: 'fastify', name: 'Fastify', category: 'Node.js 生态', description: '高性能 Node.js Web 框架', docs: 'https://fastify.io', tags: ['Performance'] },
  egg: { id: 'egg', name: 'Egg.js', category: 'Node.js 生态', description: '阿里出品的 Node.js 企业级框架', docs: 'https://eggjs.org', tags: ['Enterprise'] },
  hapi: { id: 'hapi', name: 'Hapi', category: 'Node.js 生态', description: 'Node.js 应用框架', docs: 'https://hapi.dev', tags: ['Web Framework'] },
  socketio: { id: 'socketio', name: 'Socket.io', category: 'Node.js 生态', description: '实时双向通信库', docs: 'https://socket.io', tags: ['WebSocket'] },
  sequelize: { id: 'sequelize', name: 'Sequelize', category: 'Node.js 生态', description: 'Node.js ORM 框架', docs: 'https://sequelize.org', tags: ['Database'] },
  typeorm: { id: 'typeorm', name: 'TypeORM', category: 'Node.js 生态', description: 'TypeScript ORM 框架', docs: 'https://typeorm.io', tags: ['Database'] },
  prisma: { id: 'prisma', name: 'Prisma', category: 'Node.js 生态', description: '下一代 Node.js ORM', docs: 'https://prisma.io', tags: ['Database'] },
  mongoose: { id: 'mongoose', name: 'Mongoose', category: 'Node.js 生态', description: 'MongoDB ODM 框架', docs: 'https://mongoosejs.com', tags: ['Database'] },
  redis: { id: 'redis', name: 'ioredis', category: 'Node.js 生态', description: 'Redis Node.js 客户端', docs: 'https://github.com/luin/ioredis', tags: ['Database'] },
  mysql: { id: 'mysql', name: 'mysql2', category: 'Node.js 生态', description: 'MySQL Node.js 客户端', docs: 'https://github.com/sidorares/node-mysql2', tags: ['Database'] },
  pg: { id: 'pg', name: 'pg', category: 'Node.js 生态', description: 'PostgreSQL Node.js 客户端', docs: 'https://node-postgres.com', tags: ['Database'] },
  pm2: { id: 'pm2', name: 'PM2', category: 'Node.js 生态', description: 'Node.js 进程管理器', docs: 'https://pm2.keymetrics.io', tags: ['Process Manager'] },
  nodemon: { id: 'nodemon', name: 'Nodemon', category: 'Node.js 生态', description: 'Node.js 自动重启工具', docs: 'https://nodemon.io', tags: ['Dev Tool'] },
  joi: { id: 'joi', name: 'Joi', category: 'Node.js 生态', description: '数据验证库', docs: 'https://joi.dev', tags: ['Validation'] },
  zod: { id: 'zod', name: 'Zod', category: 'Node.js 生态', description: 'TypeScript 优先的模式验证', docs: 'https://zod.dev', tags: ['Validation'] },
  jsonwebtoken: { id: 'jsonwebtoken', name: 'jsonwebtoken', category: 'Node.js 生态', description: 'JWT 令牌生成和验证', docs: 'https://github.com/auth0/node-jsonwebtoken', tags: ['Auth'] },
  bcrypt: { id: 'bcrypt', name: 'bcrypt', category: 'Node.js 生态', description: '密码哈希库', docs: 'https://github.com/kelektiv/node.bcrypt.js', tags: ['Security'] },
  multer: { id: 'multer', name: 'Multer', category: 'Node.js 生态', description: '文件上传中间件', docs: 'https://github.com/expressjs/multer', tags: ['Upload'] },
  sharp: { id: 'sharp', name: 'Sharp', category: 'Node.js 生态', description: '高性能图片处理库', docs: 'https://sharp.pixelplumbing.com', tags: ['Image'] },
  puppeteer: { id: 'puppeteer', name: 'Puppeteer', category: 'Node.js 生态', description: 'Headless Chrome 控制库', docs: 'https://pptr.dev', tags: ['Scraping'] },
  playwright: { id: 'playwright', name: 'Playwright', category: 'Node.js 生态', description: '跨浏览器自动化测试', docs: 'https://playwright.dev', tags: ['Testing'] },
  jest: { id: 'jest', name: 'Jest', category: 'Node.js 生态', description: 'JavaScript 测试框架', docs: 'https://jestjs.io', tags: ['Testing'] },
  mocha: { id: 'mocha', name: 'Mocha', category: 'Node.js 生态', description: 'JavaScript 测试框架', docs: 'https://mochajs.org', tags: ['Testing'] },
  supertest: { id: 'supertest', name: 'Supertest', category: 'Node.js 生态', description: 'HTTP 断言库', docs: 'https://github.com/visionmedia/supertest', tags: ['Testing'] },
  oak: { id: 'oak', name: 'Oak', category: 'Deno 生态', description: 'Deno Web 框架', docs: 'https://oakserver.github.io/oak', tags: ['Web Framework'] },
  fresh: { id: 'fresh', name: 'Fresh', category: 'Deno 生态', description: 'Deno 全栈 Web 框架', docs: 'https://fresh.deno.dev', tags: ['Full Stack'] },
  drash: { id: 'drash', name: 'Drash', category: 'Deno 生态', description: 'Deno REST API 框架', docs: 'https://drash.land', tags: ['Web Framework'] },
  abc: { id: 'abc', name: 'ABC', category: 'Deno 生态', description: 'Deno Web 框架', docs: 'https://deno.land/x/abc', tags: ['Web Framework'] },
  denodb: { id: 'denodb', name: 'DenoDB', category: 'Deno 生态', description: 'Deno ORM 框架', docs: 'https://denodb.deno.dev', tags: ['Database'] },
  'deno-postgres': { id: 'deno-postgres', name: 'postgres', category: 'Deno 生态', description: 'Deno PostgreSQL 客户端', docs: 'https://deno.land/x/postgres', tags: ['Database'] },
  'deno-mysql': { id: 'deno-mysql', name: 'mysql', category: 'Deno 生态', description: 'Deno MySQL 客户端', docs: 'https://deno.land/x/mysql', tags: ['Database'] },
  'deno-redis': { id: 'deno-redis', name: 'redis', category: 'Deno 生态', description: 'Deno Redis 客户端', docs: 'https://deno.land/x/redis', tags: ['Database'] },
  'deno-jwt': { id: 'deno-jwt', name: 'djwt', category: 'Deno 生态', description: 'Deno JWT 令牌库', docs: 'https://deno.land/x/djwt', tags: ['Auth'] },
  'deno-bcrypt': { id: 'deno-bcrypt', name: 'bcrypt', category: 'Deno 生态', description: 'Deno 密码哈希库', docs: 'https://deno.land/x/bcrypt', tags: ['Security'] },
  'deno-validator': { id: 'deno-validator', name: 'validasaur', category: 'Deno 生态', description: 'Deno 数据验证库', docs: 'https://deno.land/x/validasaur', tags: ['Validation'] },
  'deno-upload': { id: 'deno-upload', name: 'formdata', category: 'Deno 生态', description: 'Deno 表单和文件上传', docs: 'https://deno.land/x/formdata', tags: ['Upload'] },
  'deno-image': { id: 'deno-image', name: 'imagetools', category: 'Deno 生态', description: 'Deno 图片处理库', docs: 'https://deno.land/x/imagetools', tags: ['Image'] },
  'deno-http': { id: 'deno-http', name: 'deno_http', category: 'Deno 生态', description: 'Deno HTTP 客户端', docs: 'https://deno.land/x/http', tags: ['HTTP'] },
  'deno-std': { id: 'deno-std', name: 'std', category: 'Deno 生态', description: 'Deno 标准库', docs: 'https://deno.land/std', tags: ['Standard'] },
  'deno-testing': { id: 'deno-testing', name: 'deno test', category: 'Deno 生态', description: 'Deno 内置测试框架', docs: 'https://deno.land/manual/testing', tags: ['Testing'] },
  'deno-oak-testing': { id: 'deno-oak-testing', name: 'oak-testing', category: 'Deno 生态', description: 'Oak 框架测试工具', docs: 'https://deno.land/x/oak_testing', tags: ['Testing'] },
  'lru-cache': { id: 'lru-cache', name: 'lru-cache', category: 'Node.js 缓存库', description: '高效的 LRU 缓存实现', docs: 'https://github.com/isaacs/node-lru-cache', tags: ['Cache', 'LRU'] },
  'memory-cache': { id: 'memory-cache', name: 'memory-cache', category: 'Node.js 缓存库', description: '简单的内存缓存', docs: 'https://github.com/ptarjan/node-cache', tags: ['Cache', 'Memory'] },
  'node-cache': { id: 'node-cache', name: 'node-cache', category: 'Node.js 缓存库', description: 'Node.js 内存缓存', docs: 'https://github.com/node-cache/node-cache', tags: ['Cache', 'Node.js'] },
  'redis': { id: 'redis', name: 'ioredis', category: 'Node.js 缓存库', description: 'Redis 客户端', docs: 'https://github.com/luin/ioredis', tags: ['Cache', 'Redis'] },
  'memcached': { id: 'memcached', name: 'memcached', category: 'Node.js 缓存库', description: 'Memcached 客户端', docs: 'https://github.com/3rd-Eden/memcached', tags: ['Cache', 'Memcached'] },
  'cache-manager': { id: 'cache-manager', name: 'cache-manager', category: 'Node.js 缓存库', description: '灵活的缓存管理器', docs: 'https://github.com/BryanDonovan/node-cache-manager', tags: ['Cache', 'Manager'] },
  'localforage': { id: 'localforage', name: 'localforage', category: '浏览器端缓存库', description: '客户端存储增强库', docs: 'https://github.com/localForage/localForage', tags: ['Cache', 'Client', 'Storage'] },
  'idb-keyval': { id: 'idb-keyval', name: 'idb-keyval', category: '浏览器端缓存库', description: 'IndexedDB 键值存储', docs: 'https://github.com/jakearchibald/idb-keyval', tags: ['Cache', 'IndexedDB'] },
  'workbox': { id: 'workbox', name: 'Workbox', category: '浏览器端缓存库', description: 'Service Worker 缓存库', docs: 'https://workboxjs.org', tags: ['Cache', 'PWA', 'Service Worker'] },
  'sw-toolbox': { id: 'sw-toolbox', name: 'sw-toolbox', category: '浏览器端缓存库', description: 'Service Worker 工具库', docs: 'https://github.com/GoogleChromeLabs/sw-toolbox', tags: ['Cache', 'PWA'] },
  'fast-memoize': { id: 'fast-memoize', name: 'fast-memoize', category: '浏览器端缓存库', description: '快速的函数记忆化', docs: 'https://github.com/caiogondim/fast-memoize.js', tags: ['Cache', 'Memoization'] },
  'memoizee': { id: 'memoizee', name: 'memoizee', category: '浏览器端缓存库', description: '功能强大的记忆化库', docs: 'https://github.com/medikoo/memoizee', tags: ['Cache', 'Memoization'] },
}

onMounted(() => {
  setTimeout(() => {
    library.value = data[id] || null
    loading.value = false
  }, 300)
})

function goBack() {
  router.back()
}

function openDocs() {
  if (library.value?.docs) {
    window.open(library.value.docs, '_blank')
  }
}
</script>

<template>
  <div class="library-detail">
    <NPageHeader :title="library?.name || '库详情'" @back="goBack" style="margin-bottom: 24px;">
      <template #subtitle>
        <span v-if="library">{{ library.category }}</span>
      </template>
      <template #extra>
        <NSpace>
          <NButton v-if="library?.docs" type="primary" @click="openDocs">
            打开文档
          </NButton>
        </NSpace>
      </template>
    </NPageHeader>

    <NSpin :show="loading">
      <NEmpty v-if="!loading && !library" description="未找到该库" />
      <template v-else-if="library">
        <NCard title="基本信息" style="margin-bottom: 16px;">
          <NDescriptions label-placement="left" :column="1">
            <NDescriptionsItem label="名称">{{ library.name }}</NDescriptionsItem>
            <NDescriptionsItem label="类别">{{ library.category }}</NDescriptionsItem>
            <NDescriptionsItem label="描述">{{ library.description }}</NDescriptionsItem>
            <NDescriptionsItem label="标签">
              <NSpace>
                <NTag v-for="t in library.tags" :key="t" type="info" size="small">{{ t }}</NTag>
              </NSpace>
            </NDescriptionsItem>
          </NDescriptions>
        </NCard>

        <NCard title="文档预览">
          <iframe
            v-if="library.docs"
            :src="library.docs"
            style="width: 100%; height: 600px; border: none; border-radius: 8px;"
          ></iframe>
        </NCard>
      </template>
    </NSpin>
  </div>
</template>

<style scoped>
.library-detail {
  max-width: 1000px;
  margin: 0 auto;
}
</style>
