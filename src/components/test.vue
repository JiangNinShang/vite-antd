<template>
	<div>
		<!-- <a-button @click="increment()">增加</a-button>
		<a-button @click="decrement()">减少</a-button>
		<a-button @click="incrementAsync()">延时增加</a-button>
		<p style="color: skyblue;">{{$store.getters['user/getCount']}}</p>
		<a-tag>{{count}}</a-tag> -->
	</div>
</template>

<script>
	import {
		$on,
		$once,
		$off,
		$emit
	} from 'vue-happy-bus'
	export const Bus = {
		$on,
		$once,
		$off,
		$emit
	}
	export default {
		data() {
			return {
				// count: this.$store.state.user.count,
				timer: ''
			}
		},
		methods: {
			increment() {
				// this.$store.dispatch('user/increment')
			},
			decrement() {
				// this.$store.dispatch('user/decrement')
			},
			incrementAsync() {
				// this.timer = setInterval(() => {
				// 	this.$store.dispatch('user/increment')
				// }, 1000)
			}
		},
	}
</script>
