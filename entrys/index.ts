import { createApp } from 'vue'
import App from '@/modules/index/App.vue'
import { apply as applyAllDirectives } from '@/directives/index'
import '@/styles/main.scss'

const app = createApp(App)

applyAllDirectives(app)

app.mount('#app')
