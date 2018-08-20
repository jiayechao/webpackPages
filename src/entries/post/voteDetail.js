import Vue from 'vue';
import VoteDetil from '../../components/post/voteDetil.vue';
import '../../css/commen/reset.scss'
var vm = new Vue({
	el: '#app',
	template: '<VoteDetil/>',
	components: { VoteDetil }
});