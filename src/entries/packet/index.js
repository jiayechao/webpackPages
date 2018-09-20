import Vue from 'vue'
import App from '../../pages/packet/src/app.vue'
import router from '../../pages/packet/src/route.js'
import store from '../../pages/packet/src/store.js'
import {toast} from '@/components/commen/tw-toast'
import {loading} from '@/components/commen/tw-loading'
import '../../css/commen/reset.scss'

Vue.use(loading)
Vue.use(toast)
// APP内打开时去取sid
const UA = navigator.userAgent
if(UA.indexOf('aygBitcoin') > 0) {
	let sid = JSON.parse(jsInvoker.getUserInfo()).sid;
	localStorage.setItem('sid', sid)
}

router.beforeEach((to, from, next) => {
	// localStorage.setItem('sid', 'fcvudqkt2efq8o20qs0kmtjo56')
	// toast(UA)
	if (to.meta.role && !localStorage.getItem('sid')) {
		next({ path: '/login', query: { redirect: to.fullPath } });
	}
	if (to.meta.title) {
		document.title = to.meta.title
	}
	next()
})
var vm = new Vue({
	el: '#ap',
	template: '<App/>',
	router,
	data: store,
	components: { App }
});






