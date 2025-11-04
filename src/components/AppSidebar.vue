<template>
  <aside class="flex flex-col items-center w-16 bg-white border-r border-gray-200 py-6 space-y-10">
    <nav class="flex flex-col items-center space-y-30 mt-10">
      <!-- Dashboard -->
      <RouterLink to="/dashboard" v-slot="{ isActive }">
        <div class="relative flex items-center justify-center">
          <div
            v-if="isActive"
            class="absolute left-0 w-1 h-8 bg-green-500 rounded-r-md -ml-3"
          ></div>
          <DashboardIcon :class="['transition-colors duration-200', isActive ? 'text-green-500' : 'text-gray-400 hover:text-green-400']" />
        </div>
      </RouterLink>

      <!-- Employees -->
      <RouterLink to="/employees" v-slot="{ isActive }">
        <div class="relative flex items-center justify-center">
          <div
            v-if="isActive"
            class="absolute left-0 w-1 h-8 bg-green-500 rounded-r-md -ml-3"
          ></div>
          <EmployeesIcon :class="['transition-colors duration-200', isActive ? 'text-green-500' : 'text-gray-400 hover:text-green-400']" />
        </div>
      </RouterLink>

      <!-- Cards -->
      <RouterLink to="/cards" v-slot="{ isActive }">
        <div class="relative flex items-center justify-center">
          <div
            v-if="isActive"
            class="absolute left-0 w-1 h-8 bg-green-500 rounded-r-md -ml-3"
          ></div>
          <CardIcon :class="['transition-colors duration-200', isActive ? 'text-green-500' : 'text-gray-400 hover:text-green-400']" />
        </div>
      </RouterLink>
    </nav>
  </aside>
</template>

<script>
import DashboardIcon from './icons/DashboardIcon.vue'
import EmployeesIcon from './icons/EmployeesIcon.vue'
import CardIcon from './icons/CardIcon.vue'

export default {
  name: 'AppSidebar',
  components: {
    DashboardIcon,
    EmployeesIcon,
    CardIcon,
  },
}
</script>

<style scoped>
</style>
