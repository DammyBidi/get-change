<!-- src/layouts/AuthLayout.vue -->
<template>
  <div class="grid min-h-screen grid-cols-1 md:grid-cols-2">
    <!-- Left side image and caption -->
    <aside class="hidden relative md:flex">
      <!-- Background image -->
      <img
        :src="images[currentImageIndex]"
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
          <span
            v-for="(img, i) in images"
            :key="i"
            class="h-2 w-2 rounded-full"
            :class="i === currentImageIndex ? 'bg-[#2BDA53]' : 'bg-white/40'"
          ></span>
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
import Bitmap from "../assets/images/Bitmap.png";
import Bitmap2 from "../assets/images/Bitmap2.png";

export default {
  name: "AuthLayout",
  data() {
    return {
      images: [Bitmap, Bitmap2],
      currentImageIndex: 0,
      _intervalId: null,
      intervalMs: 5000,
    };
  },
  mounted() {
    this._intervalId = setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    }, this.intervalMs);
  },
  beforeUnmount() {
    if (this._intervalId) clearInterval(this._intervalId);
  },
};
</script>

<style scoped></style>
