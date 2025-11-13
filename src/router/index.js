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
import SettingsView from '@/views/dashboard/Settings.vue'
import WalletView from '@/views/dashboard/Wallet.vue'

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
      meta: { requiresAuth: true },
      children: [
        { path: 'dashboard', name: 'dashboard', component: DashboardHome },
        { path: 'employees', name: 'employees', component: EmployeesView },
        { path: 'cards', name: 'cards', component: CardsView },
        { path: 'settings', name: 'settings', component: SettingsView },
        { path: 'wallet', name: 'wallet', component: WalletView },
      ],
    },
    // Fallback: redirect unknown routes to root
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

// Global auth guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'

  if (to.matched.some((record) => record.meta && record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      // redirect to login with redirect back to the original target after login
      return next({ name: 'login', query: { redirect: to.fullPath } })
    }
  }

  next()
})

export default router
