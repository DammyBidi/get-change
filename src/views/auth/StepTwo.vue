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
    <div class="w-full max-w-md rounded-xl bg-white p-8 shadow-sm">
      <form class="space-y-6" @submit.prevent="finish">
        <!-- Business Name -->
        <div>
          <label class="block text-sm font-medium text-gray-600 mb-1"
            >Business Name</label
          >
          <div class="relative">
            <input
              v-model="form.businessName"
              type="text"
              placeholder="Josh Bakery Ventures"
              required
              class="w-full border-b border-gray-200 py-2 pr-8 text-gray-800 placeholder-gray-400 focus:border-green-500 focus:outline-none"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 3h18M3 21h18M4 6h16M4 18h16M7 9v6m5-6v6m5-6v6"
              />
            </svg>
          </div>
        </div>

        <!-- Business Address -->
        <div>
          <label class="block text-sm font-medium text-gray-600 mb-1"
            >Business Address</label
          >
          <div class="relative">
            <input
              v-model="form.businessAddress"
              type="text"
              placeholder="62, Bode Thomas, Surulere, Lagos"
              required
              class="w-full border-b border-gray-200 py-2 pr-8 text-gray-800 placeholder-gray-400 focus:border-green-500 focus:outline-none"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 2a7 7 0 017 7c0 5.25-7 13-7 13s-7-7.75-7-13a7 7 0 017-7z"
              />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
          </div>
        </div>

        <!-- Phone Number -->
        <div>
          <label class="block text-sm font-medium text-gray-600 mb-1"
            >Phone Number</label
          >
          <div class="relative">
            <input
              v-model="form.phone"
              type="tel"
              placeholder="+2348012345678"
              required
              class="w-full border-b border-gray-200 py-2 pr-8 text-gray-800 placeholder-gray-400 focus:border-green-500 focus:outline-none"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15a2.25 2.25 0 002.25-2.25v-2.53a.75.75 0 00-.686-.744 11.066 11.066 0 01-3.396-.88.75.75 0 00-.806.174l-1.482 1.483a11.25 11.25 0 01-5.803-5.803l1.483-1.482a.75.75 0 00.174-.806 11.066 11.066 0 01-.88-3.396A.75.75 0 007.03 3H4.5A2.25 2.25 0 002.25 5.25v1.5z"
              />
            </svg>
          </div>
        </div>

        <!-- Finish Button -->
        <div class="mt-2 flex items-center justify-between">
          <router-link class="text-sky-600 hover:text-sky-700" to="/stepone"
            >Back</router-link
          >
          <button
            class="inline-flex items-center justify-center rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600"
            type="submit"
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
  name: "StepTwo",
  data() {
    return {
      form: {
        businessName: "",
        businessAddress: "",
        phone: "",
      },
    };
  },
  methods: {
    finish() {
      // You can handle submission or routing here
      this.$router.push("/complete");
    },
  },
};
</script>

<style scoped></style>
