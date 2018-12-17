import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Article from '@/components/Article'
import Create from '@/components/Create'
import ClockGame from '@/components/game/ClockGame'
import LifeGame from '@/components/game/LifeGame'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/article/:id',
      name: 'Article',
      component: Article
    },
    {
      path: '/create',
      name: 'Create',
      component: Create
    },
    {
      path: '/demo/life',
      name: 'Life',
      component: LifeGame
    },
    {
      path: '/demo/clock',
      name: 'Clock',
      component: ClockGame
    }
  ]
})
