<template>
  <div class="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-sm">
    <h2 class="mb-3 text-2xl font-semibold text-slate-800">
      Great to have you onboard
    </h2>
    <p class="text-gray-600 leading-relaxed">
      We just mailed you a confirmation link to
      <span class="font-medium text-slate-800">josh.bakery@gmail.com</span>.
      Complete registration by following the link.
    </p>

    <router-link
      to="/dashboard"
      class="mt-8 inline-flex items-center justify-center rounded-md bg-emerald-500 px-6 py-2.5 text-white font-medium hover:bg-emerald-600 transition-colors"
    >
      Dashboard
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="ml-2 h-5 w-5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
        />
      </svg>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Complete",
};
</script>
