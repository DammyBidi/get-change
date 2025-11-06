<template>
  <div class="flex gap-6">
    <!-- LEFT SECTION -->
    <div class="flex-1 space-y-6">
      <!-- Top summary boxes -->
      <div class="space-y-4">
        <!-- Store Wallet -->
        <div
          class="bg-white rounded-md shadow-sm flex items-center justify-between px-6 py-4"
        >
          <p class="text-[#013C61] text-lg font-medium">Store Wallet</p>
          <h2 class="text-3xl font-bold text-[#013C61] mt-1">₦2,500</h2>

          <button
            class="bg-green-500 hover:bg-green-600 text-white font-medium px-5 py-2 rounded-md"
            @click="showTopUp = true"
          >
            Top up wallet
          </button>
        </div>

        <!-- Total Disbursed -->
        <div
          class="bg-white rounded-md shadow-sm flex items-center justify-between px-6 py-4"
        >
          <p class="text-[#013C61] text-lg font-medium">Total Disbursed</p>
          <h2 class="text-3xl font-bold text-[#013C61] mt-1">₦12,000</h2>

          <button
            class="border border-gray-300 hover:bg-gray-50 text-gray-800 font-medium px-5 py-2 rounded-md"
            @click="showHistory = true"
          >
            View History
          </button>
        </div>
      </div>

      <!-- Recent Activities -->
      <div class="bg-white rounded-md shadow-sm p-6">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-gray-800 font-semibold text-lg ">
            Recent Activities
          </h3>
          <!-- Pagination simulation -->
          <div class="flex items-center gap-2 text-sm text-gray-500">
            <span class="mr-2">1 of 8</span>
            <img src="/src/assets/icons/chevron-left.svg" alt="left icon" srcset="">
            <img src="/src/assets/icons/chevron-right.svg" alt="right icon" srcset="">
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full text-sm">
            <thead>
              <tr class="text-gray-500 border-b border-gray-200">
                <th class="py-2 text-left font-medium">#</th>
                <th class="py-2 text-left font-medium">DESCRIPTION</th>
                <th class="py-2 text-left font-medium">DATE</th>
                <th class="py-2 text-left font-medium">TIME</th>
                <th class="py-2 text-left font-medium">STAFF</th>
                <th class="py-2 text-left font-medium">AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in activities"
                :key="index"
                class="border-b border-gray-100 hover:bg-gray-50"
              >
                <td class="py-3 text-gray-800">{{ index + 1 }}</td>
                <td class="py-3 text-gray-800">{{ item.description }}</td>
                <td class="py-3 text-gray-800">{{ item.date }}</td>
                <td class="py-3 text-gray-800">{{ item.time }}</td>
                <td class="py-3 text-gray-800">{{ item.staff }}</td>
                <td class="py-3 text-gray-800">{{ item.amount }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- RIGHT WIDGET -->
    <div class="w-full lg:w-96 rounded-md overflow-hidden shadow-sm">
      <!-- Top dark section -->
      <div class="bg-[#002E5D] text-white p-6">
        <h3 class="text-xs font-semibold mb-4 tracking-wide">
          GETCHANGE WIDGET
        </h3>
        <input
          type="text"
          placeholder="Amount"
          class="w-full bg-transparent border-b border-gray-400 text-white placeholder-gray-300 text-sm pb-1 focus:outline-none mb-4"
        />

        <!-- Radio -->
        <div class="flex items-center gap-6 mb-6 text-sm">
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="type" checked class="accent-green-500" />
            <span>Airtime</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="type" class="accent-green-500" />
            <span>IOU Voucher</span>
          </label>
        </div>

        <!-- Phone input -->
        <input
          type="text"
          value="08012345678"
          readonly
          class="w-full bg-transparent text-center text-3xl font-semibold tracking-widest focus:outline-none"
        />
      </div>

      <!-- Keypad -->
      <div class="bg-white p-4">
        <div class="bg-[#2BDA5333] grid grid-cols-4 gap-2 mb-4">
          <button
            v-for="key in keypadRow1"
            :key="key"
            class="bg-transparent text-gray-800 font-semibold py-3 rounded-md hover:bg-green-100"
          >
            {{ key }}
          </button>
        </div>
        <div class="grid grid-cols-4 gap-2 mb-4">
          <button
            v-for="key in keypadRow2"
            :key="key"
            class="bg-transparent text-gray-800 font-semibold py-3 rounded-md hover:bg-green-100"
          >
            {{ key }}
          </button>
        </div>
        <div class="grid grid-cols-4 gap-2">
          <button
            v-for="key in keypadRow3"
            :key="key"
            class="bg-transparent text-gray-800 font-semibold py-3 rounded-md hover:bg-green-100"
          >
            {{ key }}
          </button>
        </div>
      </div>

      <!-- Bottom Buttons -->
      <div class="bg-white p-4 flex flex-col gap-3">
        <button
          class="border border-gray-300 text-gray-800 py-2 rounded-md font-medium hover:bg-gray-50"
        >
          Query
        </button>
        <button
          class="bg-green-500 hover:bg-green-600 text-white py-2 rounded-md font-medium"
        >
          Generate
        </button>
      </div>
    </div>
    
    <!-- Reusable Modals -->
    <BaseModal v-model="showTopUp" title="Top Up Wallet" @close="() => showTopUp = false">
      <div class="space-y-4">
        <label class="block">
          <span class="text-sm font-medium text-gray-700">Amount (₦)</span>
          <input type="number" class="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Enter amount" />
        </label>
      </div>
      <template #footer>
        <div class="flex justify-end gap-3 mt-2">
          <button class="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-50" @click="showTopUp = false">Cancel</button>
          <button class="px-4 py-2 text-sm rounded-md bg-green-500 text-white hover:bg-green-600">Confirm</button>
        </div>
      </template>
    </BaseModal>

    <BaseModal v-model="showHistory" title="Disbursement History" @close="() => showHistory = false">
      <div class="max-h-64 overflow-y-auto space-y-2 text-xs">
        <div v-for="(item, i) in activities" :key="i" class="flex justify-between border-b border-gray-100 py-1">
          <span class="text-gray-700">{{ item.description }}</span>
          <span class="text-gray-500">{{ item.amount }}</span>
        </div>
      </div>
      <template #footer>
        <div class="flex justify-end">
          <button class="px-4 py-2 text-sm rounded-md bg-green-500 text-white hover:bg-green-600" @click="showHistory = false">Close</button>
        </div>
      </template>
    </BaseModal>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseModal from '@/components/BaseModal.vue'

const activities = [
  {
    description: "Wallet top up",
    date: "06 Aug, 2019",
    time: "12:24PM",
    staff: "Admin",
    amount: "NGN2000.00",
  },
  {
    description: "Top for 081359491**",
    date: "06 Aug, 2019",
    time: "10:44AM",
    staff: "Jane",
    amount: "NGN55.00",
  },
  {
    description: "Top for 080234578**",
    date: "06 Aug, 2019",
    time: "09:14AM",
    staff: "Hannah",
    amount: "NGN400.00",
  },
  {
    description: "IOU for 081478491**",
    date: "05 Aug, 2019",
    time: "01:30PM",
    staff: "John",
    amount: "BRM***K",
  },
  {
    description: "IOU for 081359491**",
    date: "05 Aug, 2019",
    time: "11:24AM",
    staff: "Admin",
    amount: "SAM***G",
  },
  {
    description: "Top for 081359491**",
    date: "04 Aug, 2019",
    time: "12:45PM",
    staff: "Jane",
    amount: "NGN105.00",
  },
];

const keypadRow1 = ["C", "<", ">", "⌫"];
const keypadRow2 = ["1", "2", "3", "*"];
const keypadRow3 = ["4", "5", "6", "#", "7", "8", "9", "0"];

// Modal state
const showTopUp = ref(false)
const showHistory = ref(false)

function closeAll() {
  showTopUp.value = false
  showHistory.value = false
}
</script>

<style scoped>
table th,
table td {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}
</style>

