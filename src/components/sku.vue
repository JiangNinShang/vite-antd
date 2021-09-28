<template>
	<el-carousel :interval="4000" type="card" height="300px">
		<el-carousel-item v-for="item in sum" :key="item">
			<el-image :src="item + '.jpg'" fit="scale-down" style="width: auto;height: auto;"></el-image>
		</el-carousel-item>
	</el-carousel>
</template>
<script>
	export default {
		props: {
			sum: {
				type: Number,
				default: 3,
			},
		}
	}
</script>
<style>
	.el-carousel__item h3 {
		color: #475669;
		font-size: 14px;
		opacity: 0.75;
		line-height: 200px;
		margin: 0;
	}

	.el-carousel__item:nth-child(2n) {
		background-color: #99a9bf;
	}

	.el-carousel__item:nth-child(2n + 1) {
		background-color: #d3dce6;
	}
</style>
