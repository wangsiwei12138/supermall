/* import Vue from 'vue'
import VueRouter from 'Vue-router'

//1.安装插件
Vue.use(VueRouter)

const routes = [
	
]

//2.创建router
const router = new VueRouter({
	routes,
	mode:'history'
		

})

export default router */




import Vue from 'vue'
import VueRouter from 'vue-router'


//路由懒加载
const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Cart = () => import('views/cart/Cart')
const Profile = () => import('views/profile/Profile')
const Detail = () => import('views/detail/Detail')

// 1.安装插件
Vue.use(VueRouter)

const routes = [{
		path: '',
		redirect: '/home'
	},
	{
		path: '/home',
		component: Home
	},
	{
		path: '/category',
		component: Category
	},
	{
		path: '/cart',
		component: Cart
	},
	{
		path: '/profile',
		component: Profile
	},
	{
		path: '/detail/:iid',
		component: Detail
	}

]

const router = new VueRouter({
	//配置路由和组件之间的应用关系
	routes,
	mode: 'history',
})

// 导出router的实例
export default router


//设置双击不会报错
// Push版本
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

//Replace版本
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
	return originalReplace.call(this, location).catch(err => err);
}
