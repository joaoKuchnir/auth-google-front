import api from "@/plugins/axios";

const state = {
    formUser: {
        name: '',
        email: '',
        birth_date: '',
        cpf: '',
        password: '',
        confirmPassword: '',
        picture: '',
        registration_finished: '',
        token: ''
    },

    googleAuthUrl: '',
}
const mutations = {
    UPDATE_FORM_USER(state, payload) {
        state.formUser = payload;
    },

    SET_GOOGLE_AUTH_URL(state, payload) {
        state.googleAuthUrl = payload;
    },
}

const actions = {
     async getGoogleAuthUrl({ commit }, payload) {
        try {
            const { data } = await api.get('/auth/google/url');     
            commit('SET_GOOGLE_AUTH_URL', data.auth_url);                   
        } catch (error) {
            console.log('error', error);
        }
    },

    async updateFormUser({ commit }, payload) {
        try {
            const { data } = await api.get('/user');            
            commit('UPDATE_FORM_USER', data.user)            
            localStorage.setItem('token', data.user.google_access_token);
            localStorage.setItem('registration_finished', data.user.registration_finished);
        } catch (error) {
            console.log('error', error);
        }
    }
}

const getters = {
    formUser: (state) => state.formUser,
    googleAuthUrl: (state) => state.googleAuthUrl,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}