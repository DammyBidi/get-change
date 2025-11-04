import { createRouter, createWebHistory } from 'vue-router'

// Layout
import AuthLayout from '@/layouts/AuthLayout.vue'
import GeneralLayout from '@/layouts/GeneralLayout.vue'

// Views (Option API single-file components)
import StepOne from '@/views/auth/StepOne.vue'
import StepTwo from '@/views/auth/StepTwo.vue'
import Complete from '@/views/auth/Complete.vue'
import Login from '@/views/auth/Login.vue'
import ForgotPassword from '@/views/auth/ForgotPassword.vue'
import DashboardHome from '@/views/dashboard/Home.vue'
import EmployeesView from '@/views/employees/Employees.vue'
import CardsView from '@/views/cards/Cards.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AuthLayout,
      children: [
        // Default to step one when visiting '/'
        { path: '', name: 'stepone', component: StepOne },
        { path: 'stepone', redirect: { name: 'stepone' } },
        { path: 'steptwo', name: 'steptwo', component: StepTwo },
        { path: 'complete', name: 'complete', component: Complete },
        { path: 'login', name: 'login', component: Login },
        { path: 'forgot-password', name: 'forgot-password', component: ForgotPassword },
      ],
    },
    {
      path: '/',
      component: GeneralLayout,
      children: [
        { path: 'dashboard', name: 'dashboard', component: DashboardHome },
        { path: 'employees', name: 'employees', component: EmployeesView },
        { path: 'cards', name: 'cards', component: CardsView },
      ],
    },
    // Fallback: redirect unknown routes to root
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

export default router
