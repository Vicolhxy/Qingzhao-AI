import { createSSRApp } from 'vue'
import App from './App.vue'
import uviewPlus from 'uview-plus'

export function createApp() {
  const app = createSSRApp(App)
  
  // 使用uview-plus
  app.use(uviewPlus)
  
  return {
    app
  }
}