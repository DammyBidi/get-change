<template>
  <main>
    <div>
      <h1 class="mb-2 text-2xl font-semibold text-[#013C61]">Welcome back</h1>
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
      <form class="space-y-4" @submit.prevent="signIn">
        <label class="grid gap-1">
          <span class="text-sm font-medium text-gray-700">Email</span>
          <input
            v-model="form.email"
            type="email"
            placeholder="you@example.com"
            required
            class="block w-full border-b border-gray-300 py-2 pr-8  focus:border-green-500 focus:outline-none"
          />
        </label>

        <label class="grid gap-1">
          <span class="text-sm font-medium text-gray-700">Password</span>
          <input
            v-model="form.password"
            type="password"
            placeholder="********"
            required
            class="block w-full border-b border-gray-300 py-2 pr-8  focus:border-green-500 focus:outline-none"
          />
        </label>

        <div class=" mt-2 flex items-center justify-between">
          <router-link
            to="/forgot-password"
            class="text-sm text-[#2BDA53] hover:text-green-700"
          >
            Forgot password?
          </router-link>
          <div class=" flex justify-end">
            <button
              type="submit"
              class="inline-flex items-center rounded-lg bg-green-500 px-12 py-2 text-white font-medium hover:bg-green-600"
            >
              Sign in
            </button>
          </div>
        </div>
      </form>
    </div>
  </main>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    signIn() {
      // Placeholder sign-in action; replace with real auth later
      // For now, just navigate to complete page to simulate success
      this.$router.push("/complete");
    },
  },
};
</script>

<style scoped></style>
