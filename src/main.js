import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
// import locale from 'element-ui/lib/locale/lang/en'
Vue.use(ElementUI)

import axios from 'axios'
Vue.prototype.$http = axios
Vue.prototype.$http.all = axios.all
Vue.config.productionTip = false



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
