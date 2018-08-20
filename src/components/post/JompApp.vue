<template>
  <div class="jomp-app">
    <img @click="jumpApp" src="../../img/post/down_banner.png" alt="">
  </div>
</template>

<script>
  import {jumpApp} from '../../util/tool'
	export default {
		name: "JompApp",
    methods: {
	    jumpApp() {
		    jumpApp()
      }
    }
	}
</script>

<style scoped>

  .jomp-app {
    position: fixed;
    bottom:0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .jomp-app img {
    width: 100%;
  }

</style>