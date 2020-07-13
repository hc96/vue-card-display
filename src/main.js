import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import { Message, MessageBox } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'
Vue.use(ElementUI, { locale })

import axios from 'axios'
Vue.prototype.$http = axios
Vue.prototype.$http.all = axios.all
Vue.config.productionTip = false

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
