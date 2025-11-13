<template>
  <header
    class="h-16 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-20"
  >
    <div class="h-full flex items-center justify-between">
      <div class="ml-3">
        <img src="../assets/images/logo.svg" alt="Logo" />
      </div>

      <div class="flex items-center gap-3 mr-10">
        <div>
          <img src="../assets/images/avatar.png" alt="Avatar" />
        </div>
        <p class="hidden md:block text-sm font-medium text-gray-700">
          Hi, Joshua
        </p>
        <div class="relative" ref="menuRoot">
          <img
            src="../assets/images/drop-icon.png"
            alt="Open menu"
            class="cursor-pointer select-none"
            @click="toggleMenu"
            @keydown.enter.prevent="toggleMenu"
            tabindex="0"
            aria-haspopup="true"
            :aria-expanded="showMenu.toString()"
          />
          <transition name="fade">
            <div
              v-if="showMenu"
              class="absolute top-7 right-[-12px] mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-30"
              role="menu"
              @keydown.esc.prevent="closeMenu"
            >
              <div
                class="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                role="menuitem"
                @click="navigateTo('wallet')"
              >
                <img src="../assets/icons/clock.png" alt="" srcset="">
                <span>Wallet History</span>
              </div>
              <div
                class="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                role="menuitem"
                @click="navigateTo('settings')"
              >
                <img src="../assets/icons/settings.svg" alt="" srcset="">
                <span>Settings</span>
              </div>
              <div
                class="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                role="menuitem"
                @click="logout"
              >
                <img src="../assets/icons/log-out.svg" alt="" srcset="">
                <span>Logout</span>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "AppHeader",
  data() {
    return {
      showMenu: false
    }
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    closeMenu() {
      this.showMenu = false;
    },
    navigateTo(name) {
      this.closeMenu();
      this.$router.push({ name });
    },
    logout() {
      try {
        localStorage.removeItem('isAuthenticated')
      } catch (e) {
        // ignore
      }
      this.$router.push({ name: 'login' })
      this.closeMenu();
    },
    handleDocumentClick(e) {
      if (!this.showMenu) return;
      const root = this.$refs.menuRoot;
      if (root && !root.contains(e.target)) {
        this.closeMenu();
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.handleDocumentClick);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleDocumentClick);
  }
};
</script>

<style scoped>
/* Simple fade transition */
.fade-enter-active, .fade-leave-active { transition: opacity .15s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
