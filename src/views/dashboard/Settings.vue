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
          <BaseButton variant="primary" size="md" @click="saveChanges"
            >Save Changes</BaseButton
          >
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
            <BaseButton
              variant="primary"
              size="md"
              :loading="passwordLoading"
              :disabled="passwordLoading"
              @click="updatePassword"
            >
              {{ passwordLoading ? "Saving…" : "Save Changes" }}
            </BaseButton>
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
            <BaseButton
              variant="primary"
              size="md"
              :loading="storeLoading"
              :disabled="storeLoading"
              @click="saveStoreInfo"
            >
              {{ storeLoading ? "Saving…" : "Save Changes" }}
            </BaseButton>
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
            <BaseButton variant="primary" size="lg" @click="saveBillingInfo"
              >Save Changes</BaseButton
            >
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
              <BaseButton
                variant="outline"
                size="xs"
                @click="prevPage"
                :disabled="currentPage === 1"
                class="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <span class="text-green-600 select-none">‹</span>
              </BaseButton>

              <BaseButton
                variant="outline"
                size="xs"
                @click="nextPage"
                :disabled="currentPage === totalPages"
                class="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <span class="text-green-600 select-none">›</span>
              </BaseButton>
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

<script>
import BaseButton from "@/components/BaseButton.vue";
export default {
  name: "Settings",
  components: { BaseButton },
  data() {
    return {
      tabs: [
        "Profile",
        "Password",
        "Store Information",
        "Billing Information",
        "Invoice History",
      ],
      activeTab: "Profile",
      form: {
        firstName: "Joshua",
        lastName: "Bakare",
        email: "josh.bakery@gmail.com",
      },
      saved: false,

      // Password tab state
      passwordForm: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
      passwordErrors: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
      passwordSaved: false,
      passwordLoading: false,

      // Store Information state
      storeForm: {
        businessName: "",
        businessAddress: "",
        phoneNumber: "",
      },
      storeErrors: {
        businessName: "",
        businessAddress: "",
        phoneNumber: "",
      },
      storeSaved: false,
      storeLoading: false,

      // Billing Information
      billingForm: {
        primaryCard: "mastercard",
        recurring: "enable",
      },
      billingSaved: false,

      // Invoice History pagination
      invoices: [
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
      ],
      currentPage: 1,
      itemsPerPage: 7,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.invoices.length / this.itemsPerPage);
    },
    paginatedInvoices() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.invoices.slice(start, start + this.itemsPerPage);
    },
  },
  methods: {
    saveChanges() {
      this.saved = true;
      setTimeout(() => (this.saved = false), 2000);
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        console.log("Uploaded file:", file.name);
      }
    },
    updatePassword() {
      // reset state
      this.passwordSaved = false;
      this.passwordErrors = {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      };

      // validations
      if (!this.passwordForm.oldPassword) {
        this.passwordErrors.oldPassword = "Old password is required.";
      }
      if (!this.passwordForm.newPassword) {
        this.passwordErrors.newPassword = "New password is required.";
      } else if (this.passwordForm.newPassword.length < 8) {
        this.passwordErrors.newPassword =
          "Password must be at least 8 characters.";
      }
      if (!this.passwordForm.confirmPassword) {
        this.passwordErrors.confirmPassword =
          "Please confirm your new password.";
      } else if (
        this.passwordForm.newPassword !== this.passwordForm.confirmPassword
      ) {
        this.passwordErrors.confirmPassword = "Passwords do not match.";
      }

      // if any error present, stop
      const hasError = Object.values(this.passwordErrors).some(Boolean);
      if (hasError) return;

      // simulate async update
      this.passwordLoading = true;
      setTimeout(() => {
        this.passwordLoading = false;
        this.passwordSaved = true;
        // clear form values
        this.passwordForm.oldPassword = "";
        this.passwordForm.newPassword = "";
        this.passwordForm.confirmPassword = "";
        setTimeout(() => (this.passwordSaved = false), 2000);
      }, 800);
    },
    saveStoreInfo() {
      this.storeSaved = false;
      this.storeErrors = {
        businessName: "",
        businessAddress: "",
        phoneNumber: "",
      };

      // validations
      if (!this.storeForm.businessName) {
        this.storeErrors.businessName = "Business name is required.";
      }
      if (!this.storeForm.businessAddress) {
        this.storeErrors.businessAddress = "Business address is required.";
      }
      if (!this.storeForm.phoneNumber) {
        this.storeErrors.phoneNumber = "Phone number is required.";
      } else {
        const digits = this.storeForm.phoneNumber.replace(/\D/g, "");
        if (digits.length < 7) {
          this.storeErrors.phoneNumber = "Enter a valid phone number.";
        }
      }

      const hasError = Object.values(this.storeErrors).some(Boolean);
      if (hasError) return;

      // simulate async save
      this.storeLoading = true;
      setTimeout(() => {
        this.storeLoading = false;
        this.storeSaved = true;
        setTimeout(() => (this.storeSaved = false), 2000);
      }, 800);
    },
    saveBillingInfo() {
      this.billingSaved = true;
      setTimeout(() => (this.billingSaved = false), 2000);
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
  },
};
</script>
