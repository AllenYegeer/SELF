import { createRouter,createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), //地址没有#号
  /* history: createWebHashHistory(), //会带一个#号 */
  routes: [ 
    {
      /* 重定向
      第一种写法: redirect:'/login', 
      第二种写法: */
      redirect:(to) =>{
        return {path:'/loginTo'}
      } 
    }
    /************大作业路由******************/
    ,
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/Layout/index.vue'),
      redirect: '/homePage',
      children: [
        {
          path: '/homePage',
          name: 'homePage',
          component: () => import('../views/homePage/article/index.vue')
        }
        ,
        {
          path: "/homePage/createArticle",
          name: 'createArticle',
          component: () => import('@/views/createAtricle/Create.vue')
        }
        ,
        {
          path: '/homePage/myArticle',
          name: 'myArticle',
          component: () => import('@/views/myAtricle/index.vue')
        },
      ]
    }
    ,
    {
      path: '/page',
      name: 'page',
      component: () => import('@/components/Pageination/index.vue')
    }
    /**************************************************************/
    ,
    {
      path: '/loginTo',
      name: 'loginTo',
      component: () => import('../views/loginTo/index.vue')
    }
    ,
    {
      path:'/register',
      name: 'register',
      component: () => import('@/views/registerPage/index.vue')
    }
  ]
})
export default router
