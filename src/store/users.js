import api from "@/plugins/axios";

const state = {
    users: [],

    pagination: {
        currentPage: 1,
        lastPage: 1,
        total: 0,
    },
}

const mutations = {

    SET_USERS(state, users) {
        state.users = users;
    },
    SET_PAGINATION(state, pagination) {
        state.pagination = pagination;
    },
}

const actions = {
    async fetchUsers({ commit }, page = 1) {
        try {
            const { data } = await api.get(`/users?page=${page}`);
            commit('SET_USERS', data.users.data);
            commit('SET_PAGINATION', {
                currentPage: data.users.current_page,
                lastPage: data.users.last_page,
                total: data.users.total,
            });
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    },
}

const getters = {

    users: (state) => state.users,
    pagination: (state) => state.pagination,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};