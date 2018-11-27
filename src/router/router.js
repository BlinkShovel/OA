import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home/home.vue'
import login from '@/components/login/login.vue'
import welcome from '@/components/home/welcome.vue'
import userList from '@/components/user/user.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      children:[
      	{
      		path:'/',
      		name:'wel',
      		component:welcome
      	},
      	{
      		path:'/user',
      		name:'user',
      		component:userList
      	}
      ]
    },
    {
    	path:'/login',
    	name:'login',
    	component:login
    }
  ]
})
