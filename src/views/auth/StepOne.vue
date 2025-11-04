<!-- src/views/auth/StepOne.vue -->
<template>
  <main>
    <div>
      <h1 class="mb-2 text-2xl font-semibold text-[#013C61]">
        Create your free account
      </h1>
      <p class="mb-6 text-sm text-[#013C61]">
        Already registered?
        <router-link
          to="/login"
          class="text-green-600 hover:text-green-700 font-medium"
        >
          Sign in
        </router-link>
      </p>
    </div>
    <div class="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
      <form class="space-y-4" @submit.prevent="goNext">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label class="grid gap-1">
            <span class="text-sm font-medium text-gray-700">First Name</span>
            <input
              v-model="form.firstName"
              type="text"
              placeholder="Joshua"
              required
              class="block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </label>

          <label class="grid gap-1">
            <span class="text-sm font-medium text-gray-700">Last Name</span>
            <input
              v-model="form.lastName"
              type="text"
              placeholder="Bakare"
              required
              class="block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </label>
        </div>

        <label class="grid gap-1">
          <span class="text-sm font-medium text-gray-700">Email</span>
          <input
            v-model="form.email"
            type="email"
            placeholder="josh.bakery@gmail.com"
            required
            class="block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
        </label>

        <label class="grid gap-1">
          <span class="text-sm font-medium text-gray-700">Password</span>
          <input
            v-model="form.password"
            type="password"
            placeholder="***********"
            required
            class="block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
        </label>

        <div class="mt-4 flex justify-end">
          <button
            type="submit"
            class="inline-flex items-center rounded-lg bg-green-500 px-4 py-2 text-white font-medium hover:bg-green-600"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  </main>
</template>

<script>
export default {
  name: "StepOne",
  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    goNext() {
      // Proceed to next step or send data to backend
      this.$router.push("/steptwo");
    },
  },
};
</script>

<style scoped></style>
