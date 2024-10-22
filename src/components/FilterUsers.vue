<template>
	<div class="flex space-x-4 mb-4 w-full justify-end">
		<input
			v-model="nameFilter"
			@input="onInput"
			type="text"
			placeholder="Filtrar por Nome"
			class="w-60 text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-400 dark:border-gray-600"
		/>
		<input
			v-model="cpfFilter"
			@input="onInput"
			type="text"
			placeholder="Filtrar por CPF"
			class="w-60 text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-400 dark:border-gray-600"
		/>
	</div>
</template>


<script>
import { debounce } from 'lodash';

export default {
	data() {
		return {
			nameFilter: '',
			cpfFilter: '',
		};
	},

	methods: {
		onInput: debounce(function () {
			this.$emit('filters', {
				name: this.nameFilter,
				cpf: this.cpfFilter,
			});
		}, 500),
	},
};
</script>
