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
        <span>1 of 2</span>
        <button class="p-1 hover:text-blue-500">&lt;</button>
        <button class="p-1 hover:text-blue-500">&gt;</button>
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

<script setup lang="ts">
import { ref, computed } from 'vue'

type Tx = {
  id: number
  description: string
  date: string
  time: string
  staff: string
  amount: number
}

const transactions = ref<Tx[]>([
  { id: 1, description: 'Top for 081359491**', date: '06 Aug, 2019', time: '12:24PM', staff: 'Admin', amount: 300 },
  { id: 2, description: 'Top for 081359491**', date: '06 Aug, 2019', time: '10:44AM', staff: 'Jane', amount: 55 },
  { id: 3, description: 'Top for 080234578**', date: '06 Aug, 2019', time: '09:14AM', staff: 'Hannah', amount: 400 },
  { id: 4, description: 'Top for 081359491**', date: '05 Aug, 2019', time: '01:30PM', staff: 'Admin', amount: 120 },
  { id: 5, description: 'Top for 081359491**', date: '05 Aug, 2019', time: '11:24AM', staff: 'Admin', amount: 250 },
  { id: 6, description: 'Top for 081359491**', date: '04 Aug, 2019', time: '12:45PM', staff: 'Jane', amount: 105 },
  { id: 7, description: 'Top for 081359491**', date: '04 Aug, 2019', time: '12:45PM', staff: 'Jane', amount: 105 },
  { id: 8, description: 'Top for 081359491**', date: '04 Aug, 2019', time: '12:45PM', staff: 'Jane', amount: 105 },
])

const currentPage = ref(1)
const perPage = 6

const totalPages = computed(() =>
  Math.max(1, Math.ceil(transactions.value.length / perPage))
)

const paginatedTransactions = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return transactions.value.slice(start, start + perPage)
})

function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++
}

function prevPage() {
  if (currentPage.value > 1) currentPage.value--
}

const gridColsClass = computed(() => {
  return 'grid grid-cols-6 md:grid-cols-6 lg:grid-cols-7 gap-4'
})
</script>

<style scoped>
/* Gives that clean space-between-cards appearance */
.space-y-4 > * + * {
  margin-top: 1rem;
}
</style>
