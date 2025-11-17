<template>
  <section class="space-y-6">
    <!-- Top Header Row -->
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-semibold text-gray-800">Employees</h2>
      <button
        class="bg-green-500 text-white px-5 py-2 rounded-md hover:bg-green-600 transition"
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
        <div class="text-gray-400 hover:text-red-500 cursor-pointer">
          <i class="fas fa-trash"></i>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Employees',
  data() {
    return {
      searchQuery: '',
      selectedRole: '',
      selectAll: false,
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
  },
}
</script>

<style scoped>
/* Optional subtle hover animation */
.grid:hover {
  transition: all 0.2s ease;
}
</style>
