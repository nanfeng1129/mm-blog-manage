import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import * as Icons from '@element-plus/icons'
import 'element-plus/dist/index.css'
import './styles/index.less'
/* eslint-disable */
createApp(App).use(store).use(ElementPlus).use(router).mount('#app');
  
