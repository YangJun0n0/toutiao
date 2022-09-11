import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/fonts/iconfont.css'
import Vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'

Vue.use(Vant)
Vue.config.productionTip = false
// console.log(store.state.tokenObj.token)
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
