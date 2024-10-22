<template>
	<div class="flex flex-col justify-center items-center h-screen w-full">
		<div
			id="g_id_onload"
			data-client_id="276626004463-ajr2iuje5ulafu9sfs1eqltde6ces8vj.apps.googleusercontent.com"
			data-login_uri="http://localhost:9000/api/auth/google/callback"
			data-auto_prompt="false"
		></div>

		<div
			class="g_id_signin"
			data-type="standard"
			data-shape="rectangular"
			data-theme="outline"
			data-text="signin_with"
			data-size="large"
			data-logo_alignment="left"
		></div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
	name: 'Login',
	data() {
		return {};
	},

	computed: {
		...mapGetters({
			authUrl: 'register/googleAuthUrl',
		}),
	},

	methods: {
		...mapActions({
			updateFormUser: 'register/updateFormUser',
		}),

		async getUserToken() {
			const token = this.$route.query.token;

			if (token) {
				localStorage.setItem('token', token);
				
				await this.updateFormUser();
				
				this.$router.push({ name: 'Register' });
			}
		},
	},

	async created() {
		const script = document.createElement('script');
		script.src   = 'https://accounts.google.com/gsi/client';
		script.async = true;

		script.onload = () => {
			console.log('Google Sign-In script button loaded');
		};

		document.body.appendChild(script);

		this.getUserToken();
	},
};
</script>

<style lang="scss" scoped>
</style>