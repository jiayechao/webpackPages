import Vue from 'vue';
import PostDetil from '../../components/post/postDetil.vue';
import '../../css/commen/reset.scss'
var vm = new Vue({
	el: '#app',
	template: '<PostDetil/>',
	components: { PostDetil }
});