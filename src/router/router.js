import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home/home.vue'
import login from '@/components/login/login.vue'
import welcome from '@/components/home/welcome.vue'
import userList from '@/components/user/user.vue'
import test from '@/components/test/test.vue'
import role from '@/components/rights/roleList.vue'
import right from '@/components/rights/rightsList.vue'
import {Message} from 'element-ui'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      children:[
        {
          path:'/index',
          name:'index',
          component:welcome
        },
        {
          path:'/user',
          name:'user',
          component:userList
        },
        {
          path:'/test',
          name:'test',
          component:test
        },
        {
          path:'/role',
          name:'role',
          component:role
        },
        {
          path:'/right',
          name:'right',
          component:right
        },
        {
          path:'*',
          name:'index',
          component:welcome
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

router.beforeEach((to,from,next)=>{
  if (to.path === '/login') {
    next()
    return
  }

  const token = sessionStorage.getItem('token')
  if (!token) {
    Message .warning('请先登陆')
    router.push({name:'login'})
    return
  }

  next()
})

export default router
