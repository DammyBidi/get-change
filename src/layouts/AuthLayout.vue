<!-- src/layouts/AuthLayout.vue -->
<template>
  <div class="grid min-h-screen grid-cols-1 md:grid-cols-2">
    <!-- Left side image and caption -->
    <aside class="hidden relative md:flex">
      <!-- Background image -->
      <img
        src="/src/assets/images/Bitmap.png"
        alt="Smiling shop owner"
        class="absolute inset-0 h-full w-full object-cover"
      />
      <!-- Dark overlay -->
      <div class="absolute inset-0 bg-black/40"></div>

      <!-- Text content -->
    <div
        class="absolute z-10 bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-center text-white px-8"
    >
        <h2 class="text-lg font-semibold mb-2">No Hazzles</h2>
        <p class="max-w-sm text-white/90">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod.
        </p>

        <!-- Pagination dots -->
        <div class="mt-6 flex items-center space-x-2">
            <span class="h-2 w-2 rounded-full bg-white"></span>
            <span class="h-2 w-2 rounded-full bg-white/40"></span>
        </div>
    </div>
    </aside>

  <!-- Right side form (dynamic via router-view) -->
  <main class="bg-gray-50 p-6 md:p-10 flex flex-col">
      <div class="mx-auto mt-15 flex max-w-lg flex-col justify-center align-center w-full">
        <router-view />
      </div>

      <!-- Legal agreements footer -->
      <div class="mt-auto pt-6 flex justify-between">
        <p class="mt-6 text-xs text-gray-500">
          By signing up, you agree to our
          <a href="#" class="text-green-600 hover:underline">Terms</a> and
          <a href="#" class="text-green-600 hover:underline">Privacy Policy</a>.
        </p>
        <p class="mt-6 text-xs text-gray-500">
          © 2019 Tinylabs. All rights reserved.
        </p>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "AuthLayout",
};
</script>

<style scoped></style>
