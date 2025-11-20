<template>
  <main>
    <div>
      <h1 class="mb-2 text-2xl font-semibold text-[#013C61]">
        Reset your password
      </h1>
      <p class="mb-6 text-sm text-[#013C61]">
        Don’t have an account? 
        <router-link
          to="/stepone"
          class="text-green-600 hover:text-green-700 font-medium"
        >
          Sign up
        </router-link>
      </p>
    </div>

    <div class="w-full max-w-md rounded-xl bg-white p-12 shadow-lg">
      <form class="space-y-4" @submit.prevent="sendReset">
        <label class="grid gap-1">
          <span class="text-sm font-medium text-gray-700">Email</span>
          <input
            v-model="email"
            type="email"
            placeholder="you@example.com"
            required
            class="block w-full border-b border-gray-300 py-2 pr-8  focus:border-green-500 focus:outline-none"
          />
        </label>

        <div class="mt-18 flex items-center justify-between">
          <router-link
            to="/login"
            class="text-sm text-[#2BDA53] hover:text-green-700"
          >
           Back to login
          </router-link>
          <div class="mt-2 flex justify-end">
            <BaseButton type="submit" variant="primary" size="md">Recover</BaseButton>
          </div>
        </div>
        
      </form>

      <p v-if="sent" class="mt-4 text-sm text-emerald-700">
        If an account exists for {{ email }}, you'll receive a reset link
        shortly.
      </p>
    </div>
  </main>
</template>

<script>
import BaseButton from '@/components/BaseButton.vue'
export default {
  name: "ForgotPassword",
  components: { BaseButton },
  data() {
    return {
      email: "",
      sent: false,
    };
  },
  methods: {
    sendReset() {
      // Placeholder action; integrate with backend/email service later
      this.sent = true;
    },
  },
};
</script>

<style scoped></style>
