import { createApp, h } from 'vue'
import { createRouter, createWebHistory, RouterView } from 'vue-router'
import App from './App.vue'
import RobotLoginPage from './pages/RobotLoginPage.vue'
import './styles.css'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: '首页', component: App },
    { path: '/robot-login', name: '机器人登入页面', component: RobotLoginPage },
  ],
})

createApp({ render: () => h(RouterView) }).use(router).mount('#app')
