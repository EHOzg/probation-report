import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/styles/reset.scss'
import '@/styles/index.scss'
import '@/styles/tailwind.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

createApp(App).use(router).mount('#app')
