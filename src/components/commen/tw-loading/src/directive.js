import Vue from 'vue'

Vue.directive('loading', {
  // 当绑定的元素插入到 DOM 时调用此函数……
  inserted: function (el, binding) {
		if(binding.value) {
			let div = document.createElement('div')
			div.className = 'tw-loading-svg'
			div.innerHTML = '<svg viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" fill="none" class="path"></circle></svg>'
			el.insertBefore(div,el.children[0])
			el.style.position = 'relative'
		}
	},
	update: function(el, binding) {
		if(binding.value) {
			let div = document.createElement('div')
			div.className = 'tw-loading-svg'
			div.innerHTML = '<svg viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" fill="none" class="path"></circle></svg>'
			el.insertBefore(div,el.children[0])
			el.style.position = 'relative'
		} else {
			el.getElementsByClassName('tw-loading-svg')[0]?el.removeChild(el.getElementsByClassName('tw-loading-svg')[0]):null
		}
	},
	unbind: function(el, binding) {
		el.getElementsByClassName('tw-loading-svg')[0]?el.removeChild(el.getElementsByClassName('tw-loading-svg')[0]):null
	}
})
