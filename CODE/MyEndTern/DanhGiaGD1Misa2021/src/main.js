import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import CustomerList from './views/customer/CustomerList.vue'
import EmployeeList from './views/employee/EmployeeList.vue'
import ReportList from './views/report/ReportList.vue'


import VueMaterial from 'vue-material'
import { MdButton, MdContent, MdTabs , MdDialog, MdDialogAlert, MdDialogConfirm} from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import Vuelidate from 'vuelidate'

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(VueMaterial)
Vue.use(MdDialogAlert)
Vue.use(MdButton)
Vue.use(MdContent)
Vue.use(MdTabs)
Vue.use(MdDialog)
Vue.use(MdDialogConfirm)





//1. Định nghĩa các path:
const routes = [
  { path: '/customer', component: CustomerList },
  { path: '/employee', component: EmployeeList },
  { path: '/report', component: ReportList }
]
//2. Khởi tạo router:
const router = new VueRouter({
  routes // short for `routes: routes`
})

//3. Khai báo sử dụng Vue-Router:
Vue.use(VueRouter)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
