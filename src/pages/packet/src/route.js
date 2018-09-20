import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			redirect: '/login'
		},
		{
			path: '/login',
			name: 'login',
			component: () => import('./views/login.vue')
		},{
			path: '/detail',
			name: 'detail',
			component: () => import('./views/packetDetail.vue'),
			meta: {
				title: '红包详情',
				role: 'login'
			}
		},
		{
			path: '/setting',
			name: 'setting',
			component: () => import('./views/setting.vue'),
			meta: {
				title: '红包设置',
				role: 'login'
			}
		},
		{
			path: '/token-select',
			name: 'token',
			component: () => import('./views/token.vue'),
			meta: {
				title: '选择token',
				role: 'login'
			}
		},
		{
			path: '/share',
			query: { shareImgUrl: '' },
			name: 'share',
			component: () => import('./views/share.vue'),
			meta: {
				title: '红包分享'
			}
		},
		{
			path: '/list',
			name: 'list',
			component: () => import('./views/list.vue'),
			meta: {
				title: '分享已设置的红包',
				role: 'login'
			}
		},
	]
})
