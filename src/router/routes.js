import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import Dashboard from '../components/Dashboard.vue';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			name: 'Login',
			component: Login
		},
		{
			path: '/register',
			name: 'Register',
			component: Register,
		},
		{
			path: '/dashboard',
			name: 'Dashboard',
			component: Dashboard
		},
	]
})

router.beforeEach((to, from, next) => {
	const registrationFinished = Number(localStorage.getItem('registration_finished'));

	if (to.name === 'Login') return next();

	if (!registrationFinished  && to.name !== 'Register') {
		return next({ name: 'Register' });
	}

	if (registrationFinished == '1' && to.name === 'Register') {
		return next({ name: 'Dashboard' });
	}

	next();
});


export default router
