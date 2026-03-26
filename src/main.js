/*
 * @Author: qinkai 937817514@qq.com
 * @Date: 2026-03-25 07:29:46
 * @LastEditors: qinkai 937817514@qq.com
 * @LastEditTime: 2026-03-25 08:02:23
 * @FilePath: /tech/src/main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import Home from "./pages/Home.vue";
import Libraries from "./pages/Libraries.vue";
import LibraryDetail from "./pages/LibraryDetail.vue";
import LearningPath from "./pages/LearningPath.vue";
import Performance from "./pages/Performance.vue";
import AI from "./pages/AI.vue";
import Git from "./pages/Git.vue";
import Linux from "./pages/Linux.vue";
import NaiveUI from "naive-ui";

const routes = [
    { path: "/", component: Home },
    { path: "/interview", component: Libraries },
    { path: "/learning-path", component: LearningPath },
    { path: "/performance", component: Performance },
    { path: "/ai", component: AI },
    { path: "/git", component: Git },
    { path: "/linux", component: Linux },
    { path: "/library/:id", component: LibraryDetail, props: true },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const app = createApp(App);
app.use(router);
app.use(NaiveUI);
app.mount("#app");