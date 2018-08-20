import Vue from 'vue';
import ranking from '../../components/ranking/index';
import '../../css/ranking/index.scss'
var vm = new Vue({
	el: '#app',
	template: '<ranking/>',
	components: { ranking }
});