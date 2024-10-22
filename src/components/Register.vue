<template>
	<div class="flex justify-center items-center h-screen w-full">
		<div class="w-1/8 p-6 bg-gray-50 dark:bg-gray-700 dark:text-gray-400 rounded-lg">
			<h2 class="text-xl font-bold mb-4 text-center text-white">
				<div class="flex-space-x-2 overflow-hidden p-4 pt-1">
					<img
						class="inline-block h-16 w-16 rounded-full ring-2 ring-slate-950"
						:src="formUser.picture"
						alt="profile picture"
					/>
				</div>
				Finalizar Cadastro
			</h2>
			<form @submit.prevent="submitRegister" class="text-white">
				<div class="mb-4">
					<label for="name" class="block text-sm font-medium"
						>Nome</label
					>
					<input
						type="text"
						id="name"
						v-model="formUser.name"
						disabled
						class="mt-1 block w-full p-2 border border-gray-300 rounded text-gray-300"
					/>
				</div>

				<div class="mb-4">
					<label
						for="email"
						class="block text-sm font-medium text-white"
						>Email</label
					>
					<input
						type="email"
						id="email"
						v-model="formUser.email"
						disabled
						class="mt-1 block w-full p-2 border border-gray-300 text-gray-300 rounded"
					/>
				</div>

				<div class="mb-4">
					<label
						for="birth_date"
						class="block text-sm font-medium text-white"
						>Data de Nascimento*</label
					>
					<input
						type="date"
						id="birth_date"
						v-model="formUser.birth_date"
						:max="dateNow"
						required
						class="mt-1 block w-full p-2 border border-gray-300 text-gray-700 rounded"
					/>
				</div>

				<div class="mb-4">
					<label
						for="cpf"
						class="block text-sm font-medium text-white"
						>CPF*</label
					>
					<input
						type="text"
						id="cpf"
						v-model="formUser.cpf"
						required
						maxlength="14"
						minlength="14"
						placeholder="000.000.000-00"
						class="mt-1 block w-full p-2 border border-gray-300 text-gray-700 rounded"
					/>
				</div>

				<div class="mb-4">
					<label
						for="password"
						class="block text-sm font-medium text-white"
						>Senha*</label
					>
					<input
						type="password"
						id="password"
						v-model="formUser.password"
						minlength="3"
						required
						class="mt-1 block w-full p-2 border border-gray-300 text-gray-700 rounded"
					/>
				</div>
				<div v-if="errors" class="m-5">
					<div class="text-red-500 text-xs mt-2">
						<ul>
							<li v-for="(error, index) in errors" :key="index">
								{{ error }}
							</li>
						</ul>
					</div>
				</div>
				<button
					class="w-full py-2 px-4 bg-green-400 text-white font-semibold rounded hover:bg-green-600"
					type="submit"
				>
					Finalizar
				</button>
				<button
					@click="cancelRegister"
					class="w-full py-2 px-4 bg-red-500 text-white font-semibold rounded hover:bg-red-600 mt-2"
					type="submit"
				>
					Cancelar
				</button>
			</form>
		</div>
	</div>
</template>

<script>
import api from '../plugins/axios';
import { mapGetters, mapActions } from 'vuex';
export default {
	name: 'Register',

	data() {
		return {
			errors: {},
		};
	},
	computed: {
		...mapGetters({
			formUser: 'register/formUser',
		}),

		dateNow() {
			return new Date().toISOString().split('T')[0];
		},
	},

	mounted() {
		this.getUserByToken();
	},

	methods: {
		...mapActions({
			updateFormUser: 'register/updateFormUser',
		}),

		async getUserByToken() {
			await this.updateFormUser();
		},

		async submitRegister() {
			const user = this.formUser;

			user.registration_finished = true;

			await api
				.put(`user/${user.id}`, user)
				.then(({ data }) => {
					localStorage.setItem('registration_finished', 1);
					this.$router.push({ name: 'Dashboard' });
				})
				.catch((error) => {
					this.handleApiError(error);
				});
		},

		cancelRegister() {
			this.backToHome();
		},

		backToHome() {
			localStorage.removeItem('token');
			localStorage.removeItem('registration_finished');
			this.$router.push('/');
		},

		handleApiError(error) {
			console.error('Error:', error);
			if (error.response && error.response.status === 422) {
				this.errors = error.response.data.errors;
			} else {
				this.errors = [
					'Ocorreu um erro ao tentar realizar o cadastro.',
				];
			}
		},
	},
};
</script>

<style scoped>
</style>
