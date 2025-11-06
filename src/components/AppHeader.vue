<template>
  <header
    class="h-16 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-20"
  >
    <div class="h-full flex items-center justify-between">
      <div class="ml-3">
        <img src="../assets/images/logo.svg" alt="Logo" />
      </div>

      <div class="flex items-center gap-3 mr-10">
        <div>
          <img src="../assets/images/avatar.png" alt="Avatar" />
        </div>
        <p class="hidden md:block text-sm font-medium text-gray-700">
          Hi, Joshua
        </p>
        <div>
          <img src="../assets/images/drop-icon.png" alt="Menu" />
        </div>
        <button
          class="text-xs font-medium text-red-500 hover:text-red-600 border border-red-200 px-2 py-1 rounded"
          @click="logout"
        >Logout</button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "AppHeader",
  methods: {
    logout() {
      try {
        localStorage.removeItem('isAuthenticated')
      } catch (e) {
        // ignore
      }
      this.$router.push({ name: 'login' })
    }
  }
};
</script>

<style scoped></style>
