import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/components/pages/Login'
import Dashboard from '@/components/pages/Dashboard'
import ProductsList from '@/components/pages/Products'
import OrdersList from '@/components/pages/Orders'
import CouponsList from '@/components/pages/Coupons'
import CustomerOrder from '@/components/pages/customerOrder'
import CustomerCheckout from '@/components/pages/customerCheckout'
import User from '@/view/User'
import Products from '@/components/User/Products'
import UserHome from '@/components/User/UserHome'
import Product from '@/components/User/Product'
import Coupons from '@/components/User/Coupons'
import Order from '@/components/User/Order'
import CheckOut from '@/components/User/CheckOut'

//防止重複路由的情況
const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

export default new VueRouter({
    linkActiveClass: 'active',
    routes: [
        {
            path: '*',
            redirect: '/',
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
        },
        {
            path: '/',
            component: User,
            children:[
                {
                    path: '/',
                    name: 'UserHome',
                    component: UserHome,
                },
                {
                    path: 'products',
                    name: 'Products',
                    component: Products,
                },
                {
                    path: 'product/:productId',
                    name: 'Product',
                    component: Product,
                },
                {
                    path: 'coupons',
                    name: 'Coupons',
                    component: Coupons,
                },
                {
                    path: 'order',
                    name: 'Order',
                    component: Order,
                },
                {
                    path: 'checkout/:orderId',
                    name: 'CheckOut',
                    component: CheckOut,
                },
            ]
        },
        {
            path: '/admin',
            name: 'Dashboard',
            component: Dashboard,
            meta: { requiresAuth: true },
            children: [
                {
                    path: 'productslist',
                    name: 'ProductsList',
                    component: ProductsList,
                    meta: { requiresAuth: true },
                },
                {
                    path: 'orderslist',
                    name: 'OrdersList',
                    component: OrdersList,
                    meta: { requiresAuth: true },
                },
                {
                    path: 'couponslist',
                    name: 'CouponsList',
                    component: CouponsList,
                    meta: { requiresAuth: true },
                },
            ],
        },
        {
            path: '/dashboard',
            //name : 'Dashboard',
            component: Dashboard,
            children: [
                {
                    path: '/customerOrder',
                    name: 'CustomerOrder',
                    component: CustomerOrder,
                },
                {
                    path: '/CustomerCheckout/:orderId',
                    name: 'CustomerCheckout',
                    component: CustomerCheckout,
                },
            ]
        },
    ]
})