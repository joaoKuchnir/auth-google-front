<template>
	<div class="flex flex-col items-center justify-center">
		<button
			@click="Logout"
			class="w-60 text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400 p-2 m-4 rounded-md"
			type="submit"
		>
			Sair
		</button>
		<FilterUsers @filters="filters" />
		<div class="flex items-center justify-center w-full">
			<div class="overflow-x-auto shadow-md sm:rounded-lg">
				<div class="overflow-x-auto shadow-md sm:rounded-lg">
					<table
						class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
					>
						<thead
							class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
						>
							<tr>
								<th
									v-for="header in tableHeaders"
									:key="header"
									scope="col"
									class="py-3 px-6"
								>
									{{ header }}
								</th>
							</tr>
						</thead>
						<tbody>
							<tr
								v-for="user in filteredUsers"
								:key="user.id"
								class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
							>
								<td class="py-4 px-6">
									<img
										class="h-12 w-12 rounded-full ring-2 ring-slate-950"
										:src="user.picture"
										alt="profile picture"
									/>
								</td>

								<td class="py-4 px-6">{{ user.name }}</td>
								<td class="py-4 px-6">{{ user.email }}</td>
								<td class="py-4 px-6">{{ user.cpf }}</td>
								<td class="py-4 px-6">
									{{ formatDateToBR(user.birth_date) }}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<div
			v-if="filteredUsers.length === 9"
			class="text-white flex flex-row items-center justify-center space-x-4 m-5"
		>
			<!-- Botão para página anterior -->
			<button
				@click="loadLess"
				:disabled="pagination.currentPage === 1"
				class="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-600 disabled:cursor-not-allowed"
			>
				<
			</button>

			<!-- Números das páginas -->
			<div class="flex space-x-2">
				<span
					v-for="page in pagination.lastPage"
					class="cursor-pointer px-3 py-2 rounded"
					:key="page"
					:disabled="pagination.currentPage === 1"
					:class="{
						'bg-gray-900 text-white font-bold':
							page === pagination.currentPage,
						'bg-gray-700 text-gray-300 hover:bg-gray-600':
							page !== pagination.currentPage,
					}"
					@click="fetchUsers(page)"
				>
					{{ page }}
				</span>
			</div>

			<!-- Botão para próxima página -->
			<button
				@click="loadMore"
				:disabled="pagination.currentPage === pagination.lastPage"
				class="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-600 disabled:cursor-not-allowed"
			>
				>
			</button>
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import FilterUsers from './FilterUsers.vue';


export default {
	name: 'ListUsers',
	components: {
		FilterUsers
	},

	data() {
		return {
			filterName: '',
			filterCpf: '',
		};
	},
	computed: {
		...mapGetters({
			users: 'users/users',
			pagination: 'users/pagination',
		}),

		tableHeaders() {
			return ['', 'Nome', 'Email', 'Cpf', 'Data de Nascimento'];
		},

		filteredUsers() {
			return this.users.filter((user) => {
				return (
					(!this.filterName || user.name.toLowerCase().includes(this.filterName.toLowerCase())) &&
					(!this.filterCpf || user.cpf.toLowerCase().includes(this.filterCpf.toLowerCase()))
				);
			});
		},
	},

	mounted() {
		this.fetchUsers();
	},

	methods: {
		...mapActions({
			fetchUsers: 'users/fetchUsers',
		}),

		filters(filters) {
			this.filterName = filters.name;
			this.filterCpf = filters.cpf;
		},

		formatDateToBR(dateString) {
			if (dateString) {
				const [year, month, day] = dateString.split('-');
				return `${day}/${month}/${year}`;
			}
		},

		loadMore() {
			const nextPage = this.pagination.currentPage + 1;
			this.fetchUsers(nextPage);
		},

		loadLess() {
			const prevPage = this.pagination.currentPage - 1;
			this.fetchUsers(prevPage);
		},

		Logout() {
			localStorage.removeItem('token');
			this.$router.push('/');
		},
	},
};
</script>
<style lang="scss" scoped></style>;
