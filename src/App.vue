<template>
	<div>
		<router-view to="/" id="app"></router-view>
		<div id="components-back-top-demo-custom">
			<a-back-top/>
		</div>
	</div>
</template>
<script>
</script>
<style>
	#app {
		width: 100%;
		height: 100%;
	}
</style>
<style scoped>
	#components-back-top-demo-custom .ant-back-top {
		bottom: 100px;
	}

	#components-back-top-demo-custom .ant-back-top-inner {
		height: 40px;
		width: 40px;
		line-height: 40px;
		border-radius: 4px;
		background-color: #1088e9;
		color: #fff;
		text-align: center;
		font-size: 20px;
	}
</style>
