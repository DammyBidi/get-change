<template>
  <section class="space-y-6">
    <!-- Header Row -->
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-semibold text-gray-800">Debit Cards</h2>
      <button
        class="bg-green-500 text-white px-5 py-2 rounded-md hover:bg-green-600 transition"
      >
        Add New
      </button>
    </div>

    <!-- Card List -->
    <div class="flex flex-wrap gap-4">
      <!-- Debit Card -->
      <div
        v-for="(card, index) in cards"
        :key="index"
        class="relative w-72 bg-white rounded-lg shadow-sm border border-gray-200 p-5"
      >
        <!-- Card Number -->
        <div class="flex justify-between items-start mb-8">
          <p class="text-gray-800 text-lg tracking-widest font-semibold">
            **** **** **** {{ card.last4 }}
          </p>
          <button class="text-gray-400 hover:text-red-500 transition">
            <i class="fas fa-trash"></i>
          </button>
        </div>

        <!-- Card Footer -->
        <div class="flex justify-between items-end">
          <div>
            <p class="text-xs text-gray-400">Card Holder</p>
            <p class="text-sm font-medium text-gray-800">{{ card.holder }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-400">Exp. Date</p>
            <p class="text-sm font-medium text-gray-800">{{ card.expiry }}</p>
          </div>
          <img
            :src="card.brandLogo"
            alt="card logo"
            class="h-5 object-contain"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const cards = [
  {
    last4: '3745',
    holder: 'Joshua Bakare',
    expiry: '03/22',
    brandLogo:
      'https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png',
  },
]
</script>

<style scoped>
/* Optional for a clean soft shadow look */
.w-72 {
  transition: all 0.2s ease;
}
.w-72:hover {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
}
</style>
