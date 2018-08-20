<template>
  <div class="nav-bar">
    <span class="title">{{title}}</span>
  </div>
</template>

<script>
  export default {
		name: "NavBar",
    props: {
			title: {
				type: String,
        default: ''
      }
    }
	}
</script>

<style lang="scss" scoped>
  .nav-bar {
    height: 88px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #F2F2F2;
    .title {
      font-family: AppleSystemUIFont;
      font-size: 34px;
      color: #030303;
    }
  }
</style>