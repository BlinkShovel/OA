// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/router.js'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Http from '@/plugins/http.js'
import moment from 'moment'
import '@/assets/css/base.css'

Vue.use(ElementUi)
Vue.use(Http)

import BreadNav from '@/components/common/BreadNav.vue'

Vue.component(BreadNav.name,BreadNav)


Vue.filter('dFormat',(v)=>{
	return moment(v).format('YYYY-MM-DD hh:mm:ss')
})
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
