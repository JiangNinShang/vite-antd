<template>
	<div class='login'>
		<a-form :rules="rules" :model="user" @finish="submit()" style="margin-left: 40%;width: 500px;">
			<a-form-item ref="name" label="用户名" name="name">
				<a-input v-model:value="user.username" placeholder="用户名" />
			</a-form-item>
			<a-form-item ref="password" label="密----码" name="password">
				<a-input v-model:value="user.password" type="password" placeholder="密码" />
			</a-form-item>
			<a-form-item>
				<a-button type="primary" html-type="submit" :disabled="user.username === '' || user.password === ''">
					登录
				</a-button>
			</a-form-item>
		</a-form>
	</div>
</template>
<script>
	export default ({
		data() {
			return {
				user: {
					username: '',
					password: ''
				},
			}
		},
		methods: {
			submit() {
				this.$store.dispatch('user/login', this.user).then(res => {

				}).catch(err => {

				})
			},
		}
	});
</script>
<style>
	.login {
		/* background-image: url(../assets/back.jpg);
		backgroundSize: cover;
		backgroundRepeat: no-repeat;
		backgroundPosition: center center; */
		height: 6.25rem;
		width: 6.25rem;
	}
</style>
