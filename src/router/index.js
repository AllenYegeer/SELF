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
        return { path:'/enterTOHome'}
      } 
    }
    ,
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/Layout/index.vue'),
      redirect: '/homePage/首页',
      children: [
        {
          path: '/homePage/:name',
          name: 'homePage',
          component: () => import('@/views/homePage/article/index.vue')
        },
        {
          path: '/homePage/search/:name',
          name: 'homePageSearch',
          component: () => import('@/components/search/index.vue')
        }
        ,
        {
          path: "/homePage/createArticle",
          name: 'createArticle',
          component: () => import('@/views/createArticle/Create.vue')
        }
        ,
        {
          path: '/homePage/Articles/:id',
          name: 'myArticle',
          component: () => import('@/views/myArticle/index.vue')
        },
        {
          path:'/homePage/articleDetails/:id',
          name:'articleDetails',
          component:() => import('../views/homePage/article/particulars/index.vue')
        },
        {
          path: '/homepage/Article/:name',
          name: 'myCollectedArticle',
          component: () => import('@/components/article/index.vue')
        },
        {
          path: '/homepage/myLikedArticle/:id',
          name: 'myLikedArticle',
          component: () => import('@/components/article/index.vue')
        }
        ,
        {
          path: '/homePage/userInfo/:id',
          name: 'homePage_userInfo',
          component: () => import('@/views/userInfo/index.vue'),
          children:[
              {
                path: '/homePage/userInfo/userFans',
                name: 'userFans',
                component: () => import('@/components/myFans/index.vue')
              },
              {
                path: '/homePage/userInfo/userAttenion',
                name: 'userAttenion',
                component: () => import('@/components/myAttenion/index.vue')
              }
          ]
        }
      ]
    }
    ,
    {
      path: '/loginTo',
      name: 'loginTo',
      component: () => import('@/views/login_register/loginTo/index.vue')
    }
    ,
    {
      path:'/register',
      name: 'register',
      component: () => import('@/views/login_register/registerPage/index.vue')
    }
    ,
    {
      path: '/enterTOHome',   //轮播图
      name: 'enterTOHome',
      component: () => import('@/components/sideShow/index.vue')
    }
    ,
    {
      path:'/comments',
      name: 'comments',
      component: () => import('@/components/comments/index.vue')
    }
    ,
    {
      path:'/waitting',
      name: 'waitting',
      component: () => import('@/components/waitting/index.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/views/myCollection/index.vue')
    }
  ]
})
export default router
