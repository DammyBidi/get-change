<template>
  <div class="bg-gray-50 min-h-screen p-6">
    <div class="max-w-9xl mx-auto">
      <!-- Header + Pagination -->
      <div class="flex items-start justify-between mb-4">
        <div>
          <h1 class="text-2xl font-semibold text-gray-800">Wallet History</h1>
          <p class="text-sm text-gray-600 mt-1">All Transactions</p>
        </div>

          <!-- Pagination -->
      <div class="flex items-center text-sm text-gray-600 gap-2 self-end md:self-auto">
        <span>{{ currentPage }} of {{ totalPages }}</span>
        <BaseButton variant="ghost" size="xs" class="p-1 hover:text-blue-500" @click="prevPage">&lt;</BaseButton>
        <BaseButton variant="ghost" size="xs" class="p-1 hover:text-blue-500" @click="nextPage">&gt;</BaseButton>
      </div>
      </div>

      <!-- Column Headers -->
      <div class="grid grid-cols-6 md:grid-cols-6 lg:grid-cols-7 gap-4 text-xs text-gray-500 uppercase px-3 mb-3">
        <div>#</div>
        <div class="col-span-2">Description</div>
        <div>Date</div>
        <div>Time</div>
        <div>Staff</div>
        <div class="text-right">Amount</div>
      </div>

      <!-- Card-like Rows -->
      <div class="space-y-4">
        <div
          v-for="(t, idx) in paginatedTransactions"
          :key="t.id"
          class="bg-white border border-gray-200 rounded-lg px-4 py-4 shadow-sm hover:shadow-md transition grid items-center"
          :class="gridColsClass"
        >
          <div class="text-gray-600 font-medium">
            {{ idx + 1 + (currentPage - 1) * perPage }}
          </div>

          <div class="text-gray-700 col-span-2 truncate">
            {{ t.description }}
          </div>

          <div class="text-gray-600">{{ t.date }}</div>
          <div class="text-gray-600">{{ t.time }}</div>
          <div class="text-gray-600">{{ t.staff }}</div>

          <div class="text-right font-medium text-gray-700">
            NGN{{ t.amount.toFixed(2) }}
          </div>
        </div>
      </div>
    </div>
  </div>
 </template>

<script>
import BaseButton from '@/components/BaseButton.vue'
export default {
  name: 'Wallet',
  components: { BaseButton },
  data() {
    return {
      transactions: [
        { id: 1, description: 'Top for 081359491**', date: '06 Aug, 2019', time: '12:24PM', staff: 'Admin', amount: 300 },
        { id: 2, description: 'Top for 081359491**', date: '06 Aug, 2019', time: '10:44AM', staff: 'Jane', amount: 55 },
        { id: 3, description: 'Top for 080234578**', date: '06 Aug, 2019', time: '09:14AM', staff: 'Hannah', amount: 400 },
        { id: 4, description: 'Top for 081359491**', date: '05 Aug, 2019', time: '01:30PM', staff: 'Admin', amount: 120 },
        { id: 5, description: 'Top for 081359491**', date: '05 Aug, 2019', time: '11:24AM', staff: 'Admin', amount: 250 },
        { id: 6, description: 'Top for 081359491**', date: '04 Aug, 2019', time: '12:45PM', staff: 'Jane', amount: 105 },
        { id: 7, description: 'Top for 081359491**', date: '04 Aug, 2019', time: '12:45PM', staff: 'Jane', amount: 105 },
        { id: 8, description: 'Top for 081359491**', date: '04 Aug, 2019', time: '12:45PM', staff: 'Jane', amount: 105 },
      ],
      currentPage: 1,
      perPage: 6,
    }
  },
  computed: {
    totalPages() {
      return Math.max(1, Math.ceil(this.transactions.length / this.perPage))
    },
    paginatedTransactions() {
      const start = (this.currentPage - 1) * this.perPage
      return this.transactions.slice(start, start + this.perPage)
    },
    gridColsClass() {
      return 'grid grid-cols-6 md:grid-cols-6 lg:grid-cols-7 gap-4'
    },
  },
  methods: {
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--
    },
  },
}
</script>

<style scoped>

.space-y-4 > * + * {
  margin-top: 1rem;
}
</style>
