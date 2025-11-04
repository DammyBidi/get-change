<template>
	<div class="min-h-screen bg-gray-50 text-gray-900">
		<AppHeader />

		<div class="flex min-h-[calc(100vh-64px)]"> <!-- header assumed ~64px -->
			<AppSidebar />

			<main class="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
				<router-view />
			</main>
		</div>
	</div>
  
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import AppSidebar from '@/components/AppSidebar.vue'

export default {
	name: 'GeneralLayout',
	components: { AppHeader, AppSidebar },
}
</script>

<style scoped>
/* Layout-specific styles can be added here if needed */
</style>

