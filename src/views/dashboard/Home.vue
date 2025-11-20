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
          <h3 class="text-gray-800 font-semibold text-lg">Recent Activities</h3>
          <!-- Pagination simulation -->
          <div class="flex items-center gap-2 text-sm text-gray-500">
            <span class="mr-2">1 of 8</span>
            <img
              src="/src/assets/icons/chevron-left.svg"
              alt="left icon"
              srcset=""
            />
            <img
              src="/src/assets/icons/chevron-right.svg"
              alt="right icon"
              srcset=""
            />
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
          @click="showQuery = true"
        >
          Query
        </button>
        <button
          class="bg-green-500 hover:bg-green-600 text-white py-2 rounded-md font-medium"
          @click="openIouModal"
        >
          Generate
        </button>
      </div>
    </div>

    <!-- Reusable Modals -->
    <BaseModal
      v-model="showTopUp"
      title=""
      @close="() => (showTopUp = false)"
    >
      <div class="p-6">
        <!-- Title -->
        <h2 class="text-2xl font-semibold text-[#0B3C5D] mb-6">
          Top up your store wallet
        </h2>

        <!-- Amount -->
        <div class="mb-4">
          <label class="block text-gray-500 text-sm mb-1">Enter Amount</label>
          <input
            type="number"
            placeholder=""
            class="w-full border-b border-gray-300 focus:border-[#0B3C5D] focus:outline-none py-2 text-gray-800"
          />
        </div>

        <!-- Card Number -->
        <div class="mb-4">
          <label class="block text-gray-500 text-sm mb-1">Card Number</label>
          <input
            type="text"
            placeholder=""
            class="w-full border-b border-gray-300 focus:border-[#0B3C5D] focus:outline-none py-2 text-gray-800"
          />
        </div>

        <!-- Expiry and CVV -->
        <div class="flex gap-4 mb-4">
          <div class="flex-1">
            <label class="block text-gray-500 text-sm mb-1"
              >Expiry Date (MM/YY)</label
            >
            <input
              type="text"
              placeholder=""
              class="w-full border-b border-gray-300 focus:border-[#0B3C5D] focus:outline-none py-2 text-gray-800"
            />
          </div>
          <div class="w-1/2">
            <label class="block text-gray-500 text-sm mb-1">CVV</label>
            <input
              type="text"
              placeholder=""
              class="w-full border-b border-gray-300 focus:border-[#0B3C5D] focus:outline-none py-2 text-gray-800"
            />
          </div>
        </div>

        <!-- Checkbox + Button -->
        <div class="flex items-center justify-between mt-6">
          <label class="flex items-center text-gray-500 text-sm">
            <input
              type="checkbox"
              class="accent-[#00E676] w-4 h-4 rounded mr-2 border border-gray-300"
            />
            Use saved debit card
          </label>

          <button
            class="bg-[#00E676] hover:bg-[#00c964] text-white font-medium px-6 py-2 rounded-md transition-colors"
          >
            Credit Wallet
          </button>
        </div>
      </div>
    </BaseModal>

    <BaseModal
      v-model="showHistory"
      title="Disbursement History"
      @close="() => (showHistory = false)"
    >
      <div class="max-h-64 overflow-y-auto space-y-2 text-xs">
        <div
          v-for="(item, i) in activities"
          :key="i"
          class="flex justify-between border-b border-gray-100 py-1"
        >
          <span class="text-gray-700">{{ item.description }}</span>
          <span class="text-gray-500">{{ item.amount }}</span>
        </div>
      </div>
      <template #footer>
        <div class="flex justify-end">
          <button
            class="px-4 py-2 text-sm rounded-md bg-green-500 text-white hover:bg-green-600"
            @click="showHistory = false"
          >
            Close
          </button>
        </div>
      </template>
    </BaseModal>

    <!-- Query Modal -->
    <BaseModal
      v-model="showQuery"
      title="Query"
      size="xl"
      @close="() => (showQuery = false)"
    >
      <div class="p-1">
        <!-- Green Phone Number Box -->
        <div
          class="bg-[#00E676] text-white text-center text-3xl font-medium py-5 rounded-md shadow-sm mb-8"
        >
          08012345678
        </div>

        <!-- Table Section -->
        <div class="overflow-x-auto">
          <table class="min-w-full text-left border-collapse">
            <thead>
              <tr
                class="text-[#0B3C5D] text-sm font-semibold border-b border-gray-200"
              >
                <th class="py-2 px-2">DESCRIPTION</th>
                <th class="py-2 px-2">DATE</th>
                <th class="py-2 px-2">STATUS</th>
              </tr>
            </thead>
            <tbody class="text-gray-700 text-sm">
              <tr
                v-for="(item, index) in activities"
                :key="index"
                class="border-b border-gray-100"
              >
                <td class="py-2 px-2">
                  {{ item.amount }} {{ item.description }}
                </td>
                <td class="py-2 px-2">{{ item.date }}</td>
                <td class="py-2 px-2">
                  <!-- Example logic for showing dropdown or label -->
                  <template v-if="index === 1">
                    <select
                      class="text-gray-600 border border-gray-300 rounded-md text-xs px-2 py-1 focus:outline-none"
                    >
                      <option>Change status</option>
                      <option>Redeemed as airtime</option>
                      <option>Redeemed as voucher</option>
                    </select>
                  </template>
                  <template v-else-if="index === 2">
                    <span
                      class="text-red-600 bg-red-100 px-3 py-1 rounded-md text-xs font-medium"
                    >
                      Redeemed as voucher
                    </span>
                  </template>
                  <template v-else>
                    <span
                      class="text-red-600 bg-red-100 px-3 py-1 rounded-md text-xs font-medium"
                    >
                      Redeemed as airtime
                    </span>
                  </template>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </BaseModal>
    <!-- IOU Code Validation Modal -->
    <BaseModal
      v-model="showIouValidate"
      title="Validate IOU Voucher"
      size="xl"
      @close="() => (showIouValidate = false)"
    >
      <div class="p-10">
        <p class="text-3xl text-[#013C61] text-center font-bold mb-4">
          Kindly enter customer unique IOU code to validate their voucher
        </p>
        <div class="flex gap-3 justify-center mb-4">
          <input
            v-for="(part, i) in codeParts"
            :key="i"
            :ref="'code' + i"
            v-model="codeParts[i]"
            @input="handleCodeInput(i, $event)"
            @keydown.backspace="handleBackspace(i, $event)"
            maxlength="1"
            class="w-12 h-12 text-center border border-gray-300 rounded-md text-xl uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-green-500"
            type="text"
            autocomplete="off"
          />
        </div>
        <p v-if="iouError" class="text-red-600 text-sm mb-4">{{ iouError }}</p>
        <div class="flex justify-center gap-4">
          <button
            class="px-4 py-2 rounded-md bg-green-500 text-white text-sm font-medium hover:bg-green-600"
            @click="validateIou"
          >
            Validate
          </button>
          <button
            class="px-4 py-2 rounded-md bg-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-300"
            @click="showIouValidate = false"
          >
            Cancel
          </button>
        </div>
      </div>
    </BaseModal>
    <!-- IOU Success Modal -->
    <BaseModal
      v-model="showIouSuccess"
      title="Success"
      size="sm"
      @close="() => (showIouSuccess = false)"
    >
      <div class="p-1 text-center">
        <p class="text-base font-semibold text-[#0B3C5D] mb-1">
          IOU Voucher redeemed successfully
        </p>
        <p class="text-sm text-gray-600 mb-5">
          The voucher has been validated and marked as redeemed.
        </p>
        <div
          class="mx-auto mb-4 flex items-center justify-center h-16 w-16 rounded-full bg-green-100"
        >
          <svg
            class="h-10 w-10 text-green-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
      </div>
    </BaseModal>
  </div>
</template>

<script>
import BaseModal from "@/components/BaseModal.vue";

export default {
  name: "HomeView",
  components: { BaseModal },
  data() {
    return {
      activities: [
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
      ],
      keypadRow1: ["C", "<", ">", "⌫"],
      keypadRow2: ["1", "2", "3", "*"],
      keypadRow3: ["4", "5", "6", "#", "7", "8", "9", "0"],
      showTopUp: false,
      showHistory: false,
      showQuery: false,
      queryTerm: "",
      showIouValidate: false,
      codeParts: ["", "", "", "", ""],
      iouError: "",
      showIouSuccess: false,
    };
  },
  methods: {
    closeAll() {
      this.showTopUp = false;
      this.showHistory = false;
      this.showQuery = false;
    },
    runQuery() {
      // Placeholder for future query logic
      // For now just close the modal
      this.showQuery = false;
    },
    openIouModal() {
      this.resetIou();
      this.showIouValidate = true;
      this.$nextTick(() => {
        const first = this.$refs.code0;
        if (first) first.focus();
      });
    },
    resetIou() {
      this.codeParts = ["", "", "", "", ""];
      this.iouError = "";
    },
    handleCodeInput(index, evt) {
      let val = evt.target.value
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, "")
        .slice(0, 1);
      this.codeParts[index] = val;
      if (val && index < 4) {
        const next = this.$refs[`code${index + 1}`];
        if (next) next.focus();
      }
    },
    handleBackspace(index) {
      if (!this.codeParts[index] && index > 0) {
        const prev = this.$refs[`code${index - 1}`];
        if (prev) prev.focus();
      }
    },
    validateIou() {
      const code = this.codeParts.join("");
      if (code.length !== 5) {
        this.iouError = "Enter complete 5-character IOU code";
        return;
      }
      // Placeholder validation logic; replace with real API check
      const mockValid = "ABCDE"; // example expected code
      if (code !== mockValid) {
        this.iouError =
          "Error: code not associated with customer’s phone number";
      } else {
        this.iouError = "";
        this.showIouValidate = false;
        this.showIouSuccess = true;
        this.resetIou();
      }
    },
  },
};
</script>

<style scoped>
table th,
table td {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}
</style>
