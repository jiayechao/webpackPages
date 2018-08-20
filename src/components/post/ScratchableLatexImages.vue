<template>
  <div class="scratchab-leLatex-images">
    <ul class="images">
      <li class="bg-image-cover item" :key="k" v-for="(item, k) in images" :style="bgImage(item.url)"></li>
    </ul>
  </div>
</template>

<script>
	export default {
		name: "ScratchableLatexImages",
		inject: ['bgImage'],
    data() {
			return {
			}
    },
    props: {
      images: {
      	type: Array,
        default () {
      		return []
        }
      }
		}
	}
</script>

<style lang="scss" scoped>
  .scratchab-leLatex-images {
    >.images {
      display: flex;
      justify-content: start;
      flex-wrap: wrap;
      padding-left: 30px;
      .item {
        width: 30%;
        padding-top: 28%;
        margin-right: 3%;
        margin-bottom: 3%;
      }
    }
  }
</style>