<template>
  <div class="p-6 max-w-4xl mx-auto">
    <div class="bg-white rounded-xl shadow-sm border border-gray-200">
      <!-- Tabs -->
      <div class="flex items-center space-x-8 border-b border-gray-200 px-6">
        <button
          v-for="tab in tabs"
          :key="tab"
          @click="activeTab = tab"
          :class="[
            'py-4 text-sm font-medium transition-all',
            activeTab === tab
              ? 'text-gray-900 border-b-2 border-green-500'
              : 'text-gray-500 hover:text-gray-800',
          ]"
        >
          {{ tab }}
        </button>
      </div>

      <!-- Profile Tab -->
      <div v-if="activeTab === 'Profile'" class="p-8">
        <div class="flex flex-col sm:flex-row sm:items-start sm:space-x-8">
          <!-- Profile Image Upload -->
          <div class="flex flex-col items-center sm:items-start">
            <label
              for="profile-upload"
              class="w-24 h-24 rounded-full bg-gray-400/60 flex items-center justify-center text-xs text-white cursor-pointer hover:bg-gray-500 transition"
            >
              Click to upload <br />
              profile
            </label>
            <input
              id="profile-upload"
              type="file"
              class="hidden"
              @change="handleFileUpload"
            />
          </div>

          <!-- Form Fields -->
          <div class="mt-8 sm:mt-0 flex flex-col gap-8">
            <div>
              <label class="block text-sm text-gray-500 mb-1">First Name</label>
              <input
                v-model="form.firstName"
                type="text"
                class="block w-full border-b border-gray-300 py-2 pr-8 focus:border-green-500 focus:outline-none text-gray-800 font-medium"
              />
            </div>

            <div>
              <label class="block text-sm text-gray-500 mb-1">Last Name</label>
              <input
                v-model="form.lastName"
                type="text"
                class="block w-full border-b border-gray-300 py-2 pr-8 focus:border-green-500 focus:outline-none text-gray-800 font-medium"
              />
            </div>

            <div class="sm:col-span-2">
              <label class="block text-sm text-gray-500 mb-1">Email</label>
              <input
                v-model="form.email"
                type="email"
                class="block w-full border-b border-gray-300 py-2 pr-8 focus:border-green-500 focus:outline-none text-gray-800 font-medium"
              />
            </div>
          </div>
        </div>

        <!-- Save Button -->
        <div class="mt-10 flex justify-end">
          <button
            @click="saveChanges"
            class="bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-2.5 rounded transition"
          >
            Save Changes
          </button>
          <p v-if="saved" class="text-sm text-green-600 mt-2">
            Changes saved successfully.
          </p>
        </div>
      </div>

      <!-- Password Tab -->
      <div v-else-if="activeTab === 'Password'" class="p-8">
        <div class="max-w-2xl mx-auto space-y-10">
          <!-- Old Password -->
          <div>
            <label class="block text-sm text-gray-500 mb-1">Old Password</label>
            <input
              v-model="passwordForm.oldPassword"
              type="password"
              autocomplete="current-password"
              class="block w-full border-b border-gray-300 py-2 pr-8 focus:border-green-500 focus:outline-none text-gray-800 font-medium"
            />
            <p
              v-if="passwordErrors.oldPassword"
              class="mt-1 text-xs text-red-600"
            >
              {{ passwordErrors.oldPassword }}
            </p>
          </div>

          <!-- New Password -->
          <div>
            <label class="block text-sm text-gray-500 mb-1">New Password</label>
            <input
              v-model="passwordForm.newPassword"
              type="password"
              autocomplete="new-password"
              class="block w-full border-b border-gray-300 py-2 pr-8 focus:border-green-500 focus:outline-none text-gray-800 font-medium"
            />
            <p
              v-if="passwordErrors.newPassword"
              class="mt-1 text-xs text-red-600"
            >
              {{ passwordErrors.newPassword }}
            </p>
          </div>

          <!-- Confirm New Password -->
          <div>
            <label class="block text-sm text-gray-500 mb-1"
              >Confirm New Password</label
            >
            <input
              v-model="passwordForm.confirmPassword"
              type="password"
              autocomplete="new-password"
              class="w-full border-b border-gray-300 py-2 pr-8 focus:border-green-500 focus:outline-none text-gray-800 font-medium"
            />
            <p
              v-if="passwordErrors.confirmPassword"
              class="mt-1 text-xs text-red-600"
            >
              {{ passwordErrors.confirmPassword }}
            </p>
          </div>

          <!-- Update Button -->
          <div class="pt-2 flex items-center justify-end gap-4">
            <button
              @click="updatePassword"
              :disabled="passwordLoading"
              class="bg-green-500 disabled:opacity-60 disabled:cursor-not-allowed hover:bg-green-600 text-white font-medium px-6 py-2.5 rounded transition"
            >
              {{ passwordLoading ? "Saving…" : "Save Changes" }}
            </button>
          </div>

          <p v-if="passwordSaved" class="text-sm text-green-600">
            Password updated successfully.
          </p>
        </div>
      </div>

      <!-- Store Information Tab -->
      <div v-else-if="activeTab === 'Store Information'" class="p-8">
        <div class="max-w-2xl mx-auto space-y-10">
          <!-- Business Name -->
          <div>
            <label class="block text-sm text-gray-500 mb-1"
              >Business Name</label
            >
            <input
              v-model="storeForm.businessName"
              type="text"
              class="block w-full border-b border-gray-300 py-2 pr-8 focus:border-green-500 focus:outline-none text-gray-800 font-medium"
            />
            <p
              v-if="storeErrors.businessName"
              class="mt-1 text-xs text-red-600"
            >
              {{ storeErrors.businessName }}
            </p>
          </div>

          <!-- Business Address -->
          <div>
            <label class="block text-sm text-gray-500 mb-1"
              >Business Address</label
            >
            <input
              v-model="storeForm.businessAddress"
              type="text"
              class="block w-full border-b border-gray-300 py-2 pr-8 focus:border-green-500 focus:outline-none text-gray-800 font-medium"
            />
            <p
              v-if="storeErrors.businessAddress"
              class="mt-1 text-xs text-red-600"
            >
              {{ storeErrors.businessAddress }}
            </p>
          </div>

          <!-- Phone Number -->
          <div>
            <label class="block text-sm text-gray-500 mb-1">Phone Number</label>
            <input
              v-model="storeForm.phoneNumber"
              type="tel"
              autocomplete="tel"
              class="block w-full border-b border-gray-300 py-2 pr-8 focus:border-green-500 focus:outline-none text-gray-800 font-medium"
            />
            <p v-if="storeErrors.phoneNumber" class="mt-1 text-xs text-red-600">
              {{ storeErrors.phoneNumber }}
            </p>
          </div>

          <!-- Save Button -->
          <div class="pt-2 flex items-center justify-end gap-4">
            <button
              @click="saveStoreInfo"
              :disabled="storeLoading"
              class="bg-green-500 disabled:opacity-60 disabled:cursor-not-allowed hover:bg-green-600 text-white font-medium px-6 py-2.5 rounded transition"
            >
              {{ storeLoading ? "Saving…" : "Save Changes" }}
            </button>
          </div>

          <p v-if="storeSaved" class="text-sm text-green-600">
            Store information saved.
          </p>
        </div>
      </div>

      <!-- Billing Information Tab -->
      <div v-else-if="activeTab === 'Billing Information'" class="p-8">
        <div class="max-w-2xl mx-auto space-y-10">
          <!-- Payment Method Section -->
          <div>
            <h3 class="text-sm font-medium text-gray-500 mb-6">
              Payment Method
            </h3>

            <div class="space-y-6">
              <!-- Mastercard -->
              <div class="flex items-center justify-between">
                <p class="text-gray-800 font-semibold">MASTERCARD</p>
                <p class="text-gray-600 text-sm tracking-wide">**** 3745</p>

                <div class="flex items-center space-x-2">
                  <label class="text-sm text-gray-500">Make Primary</label>
                  <input
                    type="radio"
                    name="primaryCard"
                    value="mastercard"
                    v-model="billingForm.primaryCard"
                    class="text-green-500 focus:ring-green-500"
                  />
                </div>
              </div>

              <!-- Visa -->
              <div class="flex items-center justify-between">
                <p class="text-gray-800 font-semibold">VISA CARD</p>
                <p class="text-gray-600 text-sm tracking-wide">**** 4254</p>

                <div class="flex items-center space-x-2">
                  <label class="text-sm text-gray-500">Make Primary</label>
                  <input
                    type="radio"
                    name="primaryCard"
                    value="visa"
                    v-model="billingForm.primaryCard"
                    class="text-green-500 focus:ring-green-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Recurring Billing -->
          <div>
            <h3 class="text-sm font-medium text-gray-500 mb-4">
              Recurring Billing
            </h3>
            <div class="flex items-center space-x-10">
              <label class="flex items-center space-x-2 text-sm text-gray-700">
                <span>Enable</span>
                <input
                  type="radio"
                  name="recurring"
                  value="enable"
                  v-model="billingForm.recurring"
                  class="text-green-500 focus:ring-green-500"
                />
              </label>
              <label class="flex items-center space-x-2 text-sm text-gray-700">
                <span>Disable</span>
                <input
                  type="radio"
                  name="recurring"
                  value="disable"
                  v-model="billingForm.recurring"
                  class="text-green-500 focus:ring-green-500"
                />
              </label>
            </div>
          </div>

          <!-- Save Changes Button -->
          <div class="flex justify-end pt-4">
            <button
              @click="saveBillingInfo"
              class="bg-green-500 hover:bg-green-600 text-white font-medium px-8 py-3 rounded transition"
            >
              Save Changes
            </button>
          </div>

          <p
            v-if="billingSaved"
            class="text-center text-sm text-green-600 mt-2"
          >
            Billing information saved successfully.
          </p>
        </div>
      </div>

      <!-- Invoice History Tab -->
      <!-- Invoice History Tab (pagination top-right) -->
      <div v-else-if="activeTab === 'Invoice History'" class="p-10">
        <div class="max-w-4xl mx-auto relative">
          <!-- Top row: (empty left) + pagination on right -->
          <div class="flex items-center justify-end mb-6">
            <div class="flex items-center space-x-3 text-sm text-gray-500">
              <!-- current page box -->
              <div
                class="px-2 py-1 border border-gray-200 rounded text-gray-700 bg-white"
              >
                {{ currentPage }}
              </div>
              <div class="text-gray-400">of {{ totalPages }}</div>

              <!-- prev/next circular controls -->
              <button
                @click="prevPage"
                :disabled="currentPage === 1"
                class="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <span class="text-green-600 select-none">‹</span>
              </button>

              <button
                @click="nextPage"
                :disabled="currentPage === totalPages"
                class="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <span class="text-green-600 select-none">›</span>
              </button>
            </div>
          </div>

          <!-- Table Header -->
          <div
            class="grid grid-cols-4 text-sm font-medium text-gray-500 border-b border-gray-200 pb-3"
          >
            <span>#</span>
            <span>Description</span>
            <span>Date</span>
            <span class="text-right">Amount</span>
          </div>

          <!-- Invoice Rows -->
          <div
            v-for="(invoice, index) in paginatedInvoices"
            :key="invoice.id"
            class="grid grid-cols-4 py-4 text-sm text-gray-700 border-b border-gray-100"
          >
            <span>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</span>
            <span>{{ invoice.description }}</span>
            <span>{{ invoice.date }}</span>
            <span class="text-right font-medium">{{ invoice.amount }}</span>
          </div>
        </div>
      </div>

      <!-- Placeholder Tabs -->
      <div v-else class="p-12 text-gray-500 text-center text-sm">
        <p>{{ activeTab }} settings coming soon...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const tabs = [
  "Profile",
  "Password",
  "Store Information",
  "Billing Information",
  "Invoice History",
];

const activeTab = ref("Profile");

const form = ref({
  firstName: "Joshua",
  lastName: "Bakare",
  email: "josh.bakery@gmail.com",
});

const saved = ref(false);

// Password tab state
const passwordForm = ref({
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const passwordErrors = ref({
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const passwordSaved = ref(false);
const passwordLoading = ref(false);

function saveChanges() {
  saved.value = true;
  setTimeout(() => (saved.value = false), 2000);
}

function handleFileUpload(event) {
  const file = event.target.files[0];
  if (file) {
    console.log("Uploaded file:", file.name);
  }
}

function updatePassword() {
  // reset state
  passwordSaved.value = false;
  passwordErrors.value = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  // validations
  if (!passwordForm.value.oldPassword) {
    passwordErrors.value.oldPassword = "Old password is required.";
  }
  if (!passwordForm.value.newPassword) {
    passwordErrors.value.newPassword = "New password is required.";
  } else if (passwordForm.value.newPassword.length < 8) {
    passwordErrors.value.newPassword =
      "Password must be at least 8 characters.";
  }
  if (!passwordForm.value.confirmPassword) {
    passwordErrors.value.confirmPassword = "Please confirm your new password.";
  } else if (
    passwordForm.value.newPassword !== passwordForm.value.confirmPassword
  ) {
    passwordErrors.value.confirmPassword = "Passwords do not match.";
  }

  // if any error present, stop
  const hasError = Object.values(passwordErrors.value).some(Boolean);
  if (hasError) return;

  // simulate async update
  passwordLoading.value = true;
  setTimeout(() => {
    passwordLoading.value = false;
    passwordSaved.value = true;
    // clear form values
    passwordForm.value.oldPassword = "";
    passwordForm.value.newPassword = "";
    passwordForm.value.confirmPassword = "";
    setTimeout(() => (passwordSaved.value = false), 2000);
  }, 800);
}

// Store Information state
const storeForm = ref({
  businessName: "",
  businessAddress: "",
  phoneNumber: "",
});

const storeErrors = ref({
  businessName: "",
  businessAddress: "",
  phoneNumber: "",
});

const storeSaved = ref(false);
const storeLoading = ref(false);

function saveStoreInfo() {
  storeSaved.value = false;
  storeErrors.value = {
    businessName: "",
    businessAddress: "",
    phoneNumber: "",
  };

  // validations
  if (!storeForm.value.businessName) {
    storeErrors.value.businessName = "Business name is required.";
  }
  if (!storeForm.value.businessAddress) {
    storeErrors.value.businessAddress = "Business address is required.";
  }
  if (!storeForm.value.phoneNumber) {
    storeErrors.value.phoneNumber = "Phone number is required.";
  } else {
    const digits = storeForm.value.phoneNumber.replace(/\D/g, "");
    if (digits.length < 7) {
      storeErrors.value.phoneNumber = "Enter a valid phone number.";
    }
  }

  const hasError = Object.values(storeErrors.value).some(Boolean);
  if (hasError) return;

  // simulate async save
  storeLoading.value = true;
  setTimeout(() => {
    storeLoading.value = false;
    storeSaved.value = true;
    setTimeout(() => (storeSaved.value = false), 2000);
  }, 800);
}

const billingForm = ref({
  primaryCard: "mastercard",
  recurring: "enable",
});

const billingSaved = ref(false);

function saveBillingInfo() {
  billingSaved.value = true;
  setTimeout(() => (billingSaved.value = false), 2000);
}

// Invoice History pagination

const invoices = ref([
  {
    id: 1,
    description: "Wallet top up",
    date: "06 Aug, 2019",
    amount: "NGN2000.00",
  },
  {
    id: 2,
    description: "Wallet top up",
    date: "04 Jul, 2019",
    amount: "NGN2000.00",
  },
  {
    id: 3,
    description: "Wallet top up",
    date: "06 Jun, 2019",
    amount: "NGN2000.00",
  },
  {
    id: 4,
    description: "Wallet top up",
    date: "02 May, 2019",
    amount: "NGN2000.00",
  },
  {
    id: 5,
    description: "Wallet top up",
    date: "06 Apr, 2019",
    amount: "NGN2000.00",
  },
  {
    id: 6,
    description: "Wallet top up",
    date: "06 Mar, 2019",
    amount: "NGN2000.00",
  },
  {
    id: 7,
    description: "Wallet top up",
    date: "12 Feb, 2019",
    amount: "NGN2000.00",
  },
  {
    id: 8,
    description: "Wallet top up",
    date: "10 Jan, 2019",
    amount: "NGN2000.00",
  },
]);

const currentPage = ref(1);
const itemsPerPage = 7;
const totalPages = computed(() =>
  Math.ceil(invoices.value.length / itemsPerPage)
);

const paginatedInvoices = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return invoices.value.slice(start, start + itemsPerPage);
});

function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++;
}

function prevPage() {
  if (currentPage.value > 1) currentPage.value--;
}
</script>
