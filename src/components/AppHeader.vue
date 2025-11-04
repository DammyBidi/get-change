<template>
  <header
    class="h-16 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-20"
  >
    <div
      class="h-full  flex items-center justify-between"
    >
      <div class="ml-3">
        <img src="../assets/images/logo.svg" alt="" srcset="" />
      </div>

      <div class="flex items-center gap-3 mr-10">
        <div>
          <img src="../assets/images/avatar.png" alt="" srcset="" />
        </div>
        <p class="hidden md:block text-sm font-medium text-gray-700">
          Hi, Joshua
        </p>
        <div class="">
          <img src="../assets/images/drop-icon.png" alt="" srcset="" />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "AppHeader",
};
</script>

<style scoped></style>
