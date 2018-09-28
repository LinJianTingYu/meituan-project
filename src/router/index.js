import Vue from 'vue'
import Router from 'vue-router'

import Goods from '@/components/goods/Goods'
import Ratings from '@/components/ratings/Ratings'
import Seller from '@/components/seller/Seller'
// import HelloWorld from '@/components/HelloWorld'

// 二级导航
import AllRatings from "@/components/ratings/AllRatings"
import PictureRatings from "@/components/ratings/PictureRatings"
import Scroe from "@/components/ratings/Scroe"

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',redirect:"/goods"},
    {path: '/goods',name: 'Goods',component: Goods},
    {path: '/ratings',name: 'Ratings',component: Ratings,children:[
        //这里就是二级路由的配置
        {path: '/ratings/AllRatings',name: 'AllRatings',component: AllRatings},
        {path: '/ratings/PictureRatings',name: 'PictureRatings',component: PictureRatings},
        {path: '/ratings/Scroe',name: 'Scroe',component: Scroe},
    ],redirect:"/ratings/AllRatings"},
    {path: '/seller',name: 'Seller',component: Seller},
  ],
  linkActiveClass:"active",
  mode:"history"
})
