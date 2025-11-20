<template>
  <section class="space-y-6">
    <!-- Header Row -->
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-semibold text-gray-800">Debit Cards</h2>
      <BaseButton variant="primary" size="md" @click="openAddCard"
        >Add New</BaseButton
      >
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
          <BaseButton
            variant="icon"
            class="text-gray-400 hover:text-red-500"
            @click="removeCard(index)"
          >
            <img src="../../assets/icons/delete-icon.svg" alt="" />
          </BaseButton>
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

    <!-- Add Card Modal -->
    <BaseModal
      v-model="showAddCard"
      title="Add New Card"
      size="sm"
      @close="() => (showAddCard = false)"
    >
      <div class="p-1 space-y-5">
        <div>
          <label class="block text-sm text-gray-600 mb-1">Card Number</label>
          <input
            v-model="form.cardNumber"
            type="text"
            placeholder="1234 5678 9012 3456"
            class="w-full border-b border-gray-300 focus:border-[#0B3C5D] focus:outline-none py-2 text-gray-800"
          />
        </div>
        <div class="flex gap-4">
          <div class="flex-1">
            <label class="block text-sm text-gray-600 mb-1"
              >Expiry Date (MM/YY)</label
            >
            <input
              v-model="form.expiry"
              type="text"
              placeholder="MM/YY"
              class="w-full border-b border-gray-300 focus:border-[#0B3C5D] focus:outline-none py-2 text-gray-800"
            />
          </div>
          <div class="w-1/2">
            <label class="block text-sm text-gray-600 mb-1">CVV</label>
            <input
              v-model="form.cvv"
              type="text"
              placeholder="CVV"
              class="w-full border-b border-gray-300 focus:border-[#0B3C5D] focus:outline-none py-2 text-gray-800"
            />
          </div>
        </div>
      </div>
      <template #footer>
        <div class="flex justify-end">
          <BaseButton variant="primary" size="sm" @click="addCard"
            >Add Card</BaseButton
          >
        </div>
      </template>
    </BaseModal>

    <!-- Add Card Success Modal -->
    <BaseModal
      v-model="showAddSuccess"
      title="Success"
      size="sm"
      @close="() => (showAddSuccess = false)"
    >
      <div class="p-1 text-center">
        <p class="text-base font-semibold text-[#0B3C5D] mb-1">
          Card added successfully
        </p>

        <div
          class="mx-auto mb-4 flex items-center justify-center h-16 w-16 rounded-full bg-green-100"
        >
          <img
            src="../../assets/icons/success-icon.svg"
            alt="Success"
            class="h-8 w-8"
          />
        </div>
        <div class="flex justify-center">
          <BaseButton
            variant="primary"
            size="sm"
            @click="showAddSuccess = false"
            >Done</BaseButton
          >
        </div>
      </div>
    </BaseModal>
  </section>
</template>

<script>
import BaseModal from "@/components/BaseModal.vue";
import BaseButton from "@/components/BaseButton.vue";

export default {
  name: "CardsView",
  components: { BaseModal, BaseButton },
  data() {
    return {
      showAddCard: false,
      form: { cardNumber: "", expiry: "", cvv: "" },
      cards: [
        {
          last4: "3745",
          holder: "Joshua Bakare",
          expiry: "03/22",
          brandLogo:
            "https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png",
        },
      ],
      showAddSuccess: false,
    };
  },
  methods: {
    openAddCard() {
      this.resetForm();
      this.showAddCard = true;
    },
    resetForm() {
      this.form = { cardNumber: "", expiry: "", cvv: "" };
    },
    detectBrand(num) {
      if (/^4/.test(num))
        return "https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg";
      if (/^5[1-5]/.test(num))
        return "https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png";
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Generic_credit_card_icon.svg/120px-Generic_credit_card_icon.svg.png";
    },
    addCard() {
      const raw = this.form.cardNumber.replace(/\s+/g, "");
      if (raw.length < 12) return; // minimal length guard
      const last4 = raw.slice(-4);
      this.cards.push({
        last4,
        holder: "Joshua Bakare", // placeholder; in real app fetch user/store owner
        expiry: this.form.expiry || "MM/YY",
        brandLogo: this.detectBrand(raw),
      });
      this.showAddCard = false;
      this.resetForm();
      this.showAddSuccess = true;
    },
    removeCard(index) {
      this.cards.splice(index, 1);
    },
  },
};
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
