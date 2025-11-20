<template>
  <section class="space-y-6">
    <!-- Top Header Row -->
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-semibold text-gray-800">Employees</h2>
      <button
        class="bg-green-500 text-white px-5 py-2 rounded-md hover:bg-green-600 transition"
        @click="showAddEmployee = true"
      >
        Add New
      </button>
    </div>

    <!-- Business Info Card -->
    <div
      class="rounded-lg border border-gray-200 bg-white px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between"
    >
      <h3 class="text-2xl font-semibold text-gray-800">Josh Bakery Ventures</h3>
      <p class="text-gray-600 text-sm md:text-base">
        62, Bode Thomas, Surulere, Lagos
      </p>
    </div>

    <!-- Controls -->
    <div
      class="flex flex-col md:flex-row md:items-center md:justify-between gap-3"
    >
      <div class="flex items-center gap-2 flex-wrap">
        <select
          v-model="selectedRole"
          class="border rounded-md px-3 py-2 text-sm text-gray-700 focus:ring focus:ring-blue-200"
        >
          <option value="">Change role</option>
          <option value="Admin">Admin</option>
          <option value="Staff">Staff</option>
        </select>
        <button
          class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
          @click="changeRole"
        >
          Change
        </button>
        <div class="relative">
          <input
            type="text"
            placeholder="Enter staff name here..."
            v-model="searchQuery"
            class="border rounded-md px-3 py-2 text-sm text-gray-700 w-60 focus:ring focus:ring-blue-200"
          />
          <span class="absolute right-3 top-2.5 text-gray-400">
            <i class="fas fa-search"></i>
          </span>
        </div>
      </div>

      <!-- Pagination -->
      <div class="flex items-center text-sm text-gray-600 gap-2 self-end md:self-auto">
        <span>1 of 2</span>
        <button class="p-1 hover:text-blue-500">&lt;</button>
        <button class="p-1 hover:text-blue-500">&gt;</button>
      </div>
    </div>

    <!-- Employee Table (Card-like Rows) -->
    <div class="space-y-3">
      <!-- Table Header -->
      <div
        class="grid grid-cols-7 text-gray-600 text-sm uppercase px-4 py-2 border-b border-gray-200"
      >
        <div><input type="checkbox" v-model="selectAll" @change="toggleAll" /></div>
        <div>First Name</div>
        <div>Last Name</div>
        <div>Email</div>
        <div>Phone</div>
        <div>Role</div>
        <div></div>
      </div>

      <!-- Table Body -->
      <div
        v-for="(emp, index) in filteredEmployees"
        :key="index"
        class="grid grid-cols-7 items-center bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition"
      >
        <div>
          <input type="checkbox" v-model="emp.selected" />
        </div>
        <div class="font-medium text-gray-800">{{ emp.firstName }}</div>
        <div class="text-gray-800">{{ emp.lastName }}</div>
        <div class="text-gray-600 text-sm truncate">{{ emp.email }}</div>
        <div class="text-gray-600 text-sm">{{ emp.phone }}</div>
        <div class="text-gray-700">{{ emp.role }}</div>
        <div class="text-gray-400 hover:text-red-500 cursor-pointer" @click="confirmDelete(emp, index)">
          <img src="../../assets/icons/delete-icon.svg" alt="delete-icon" srcset="">
        </div>
      </div>
    </div>
  </section>

  <!-- Add Employee Modal -->
  <BaseModal
    v-model="showAddEmployee"
    title="Add a new member of your team"
    size="lg"
    @close="() => (showAddEmployee = false)"
  >
    <div class="p-1 space-y-5">
      <div>
        <label class="block text-sm text-gray-600 mb-1">Email</label>
        <input
          v-model="newInviteEmail"
          type="email"
          placeholder="e.g. jane.doe@company.com"
          class="w-full border-b border-gray-300 focus:border-[#0B3C5D] focus:outline-none py-2 text-gray-800"
        />
      </div>

      <div>
        <label class="block text-sm text-gray-600 mb-1">Phone Number</label>
        <input
          v-model="newInvitePhone"
          type="tel"
          placeholder="e.g. 08012345678"
          class="w-full border-b border-gray-300 focus:border-[#0B3C5D] focus:outline-none py-2 text-gray-800"
        />
      </div>

      <div>
        <label class="block text-sm text-gray-600 mb-1">Assign Role</label>
        <select
          v-model="newInviteRole"
          class="w-full border-b border-gray-300 focus:border-[#0B3C5D] focus:outline-none py-2 text-gray-800"
        >
          <option value="">Select a role</option>
          <option value="Admin">Admin</option>
          <option value="Staff">Staff</option>
        </select>
      </div>
    </div>

    <template #footer>
      <div class="flex justify-end">
        <button
          class="px-6 py-2 rounded-md bg-green-500 text-white text-sm font-medium hover:bg-green-600"
          @click="sendInvite"
        >
          Send invite
        </button>
      </div>
    </template>
  </BaseModal>

  <!-- Delete Employee Confirm Modal -->
  <BaseModal
    v-model="showDeleteConfirm"
    title="Delete Employee"
    size="sm"
    @close="() => (showDeleteConfirm = false)"
  >
    <div class="p-1">
      <p class="text-gray-700 text-sm mb-6 text-center">
        Are you sure you want to delete
        <span class="font-semibold text-[#013C61]">{{ deleteName }}</span>?
      </p>
      <div class="flex justify-center gap-3">
        <button
          class="px-4 py-2 rounded-md bg-gray-100 text-gray-700 text-sm hover:bg-gray-200"
          @click="cancelDelete"
        >
          No, Cancel
        </button>
        <button
          class="px-4 py-2 rounded-md bg-green-500 text-white text-sm hover:bg-green-600"
          @click="performDelete"
        >
          Yes, Delete
        </button>
      </div>
    </div>
  </BaseModal>
</template>

<script>
import BaseModal from "@/components/BaseModal.vue";

export default {
  name: 'Employees',
  components: { BaseModal },
  data() {
    return {
      searchQuery: '',
      selectedRole: '',
      selectAll: false,
      showAddEmployee: false,
      newInviteEmail: '',
      newInvitePhone: '',
      newInviteRole: '',
      showDeleteConfirm: false,
      deleteIndex: null,
      deleteName: '',
      employees: [
        { firstName: 'Joshua', lastName: 'Bakare', email: 'josh.bakery@gmail.com', phone: '+2348012345678', role: 'Admin', selected: false },
        { firstName: 'Jane', lastName: 'Clement', email: 'josh.bakery@gmail.com', phone: '+2348012345678', role: 'Staff', selected: false },
        { firstName: 'Hannah', lastName: 'Johnson', email: 'josh.bakery@gmail.com', phone: '+2348012345678', role: 'Staff', selected: false },
        { firstName: 'John', lastName: 'Ngoka', email: 'josh.bakery@gmail.com', phone: '+2348012345678', role: 'Staff', selected: false },
        { firstName: 'Omotayo', lastName: 'Adeleke', email: 'josh.bakery@gmail.com', phone: '+2348012345678', role: 'Staff', selected: false },
        { firstName: 'Gloria', lastName: 'Amadi', email: 'josh.bakery@gmail.com', phone: '+2348012345678', role: 'Staff', selected: false }
      ],
    }
  },
  computed: {
    filteredEmployees() {
      if (!this.searchQuery) return this.employees
      const q = this.searchQuery.toLowerCase().trim()
      return this.employees.filter(emp =>
        `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(q)
      )
    },
  },
  methods: {
    toggleAll() {
      this.employees.forEach(emp => {
        emp.selected = this.selectAll
      })
    },
    changeRole() {
      this.employees.forEach(emp => {
        if (emp.selected && this.selectedRole) {
          emp.role = this.selectedRole
        }
      })
      this.selectedRole = ''
      this.selectAll = false
    },
    sendInvite() {
      // Placeholder: in real app, call API to send invite
      this.showAddEmployee = false
      this.newInviteEmail = ''
      this.newInvitePhone = ''
      this.newInviteRole = ''
    },
    confirmDelete(emp, index) {
      this.deleteIndex = index
      this.deleteName = emp.firstName
      this.showDeleteConfirm = true
    },
    cancelDelete() {
      this.showDeleteConfirm = false
      this.deleteIndex = null
      this.deleteName = ''
    },
    performDelete() {
      if (this.deleteIndex !== null) {
        this.employees.splice(this.deleteIndex, 1)
      }
      this.cancelDelete()
    },
  },
}
</script>

<style scoped>
/* Optional subtle hover animation */
.grid:hover {
  transition: all 0.2s ease;
}
</style>
