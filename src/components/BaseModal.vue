<template>
  <Teleport to="body">
    <transition name="fade" appear>
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center"
        @keydown.esc.prevent="handleEsc"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-black/40 backdrop-blur-sm"
          aria-hidden="true"
          @click="onBackdropClick"
        ></div>

        <!-- Modal panel -->
        <transition name="scale" appear>
          <div
            v-show="modelValue"
            ref="panel"
            :class="['relative w-full bg-white rounded-lg shadow-lg border border-gray-200 focus:outline-none', sizeClass]"
            role="dialog"
            aria-modal="true"
            :aria-labelledby="titleId"
            @click.stop
          >
            <!-- Header -->
            <div class="relative px-4 py-3 border-b border-gray-200">
              <div class="min-w-0 text-center" v-if="hasHeaderSlot || title">
                <h2 v-if="title" :id="titleId" class="text-base font-semibold text-[#013C61]">{{ title }}</h2>
                <slot v-if="hasHeaderSlot" name="header" />
              </div>
              <button
                type="button"
                class="absolute right-2 top-1/2 -translate-y-1/2 transform inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                @click="close('close-button')"
                aria-label="Close"
              >
                <span class="text-lg leading-none">×</span>
              </button>
            </div>

            <!-- Body -->
            <div class="px-4 py-4 text-sm text-gray-700">
              <slot />
            </div>

            <!-- Footer -->
            <div v-if="hasFooterSlot" class="px-4 py-3 border-t border-gray-200 bg-gray-50 rounded-b-lg">
              <slot name="footer" />
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </Teleport>
</template>

<script>


export default {
  name: 'BaseModal',
  props: {
    modelValue: { type: Boolean, default: false },
    title: { type: String, default: '' },
    size: { type: String, default: 'md' }, // sm, md, lg, xl, 2xl
    closeOnBackdrop: { type: Boolean, default: true },
    closeOnEsc: { type: Boolean, default: true },
    restoreFocus: { type: Boolean, default: true },
  },
  emits: ['update:modelValue', 'open', 'close'],
  data() {
    return {
      panel: null,
      lastFocused: null,
      titleId: `modal-title-${Math.random().toString(36).slice(2)}`,
    }
  },
  computed: {
    hasHeaderSlot() {
      return !!this.$slots.header
    },
    hasFooterSlot() {
      return !!this.$slots.footer
    },
    sizeClass() {
      switch (this.size) {
        case 'sm': return 'max-w-sm'
        case 'lg': return 'max-w-lg'
        case 'xl': return 'max-w-xl'
        case '2xl': return 'max-w-2xl'
        default: return 'max-w-md'
      }
    }
  },
  watch: {
    modelValue(val) {
      if (val) {
        this.open()
      } else {
        this.releaseFocus()
      }
    }
  },
  mounted() {
    if (this.modelValue) this.open()
  },
  beforeUnmount() {
    this.releaseFocus()
  },
  methods: {
    open() {
      this.$emit('open')
      this.trapFocus()
    },
    close(reason = 'programmatic') {
      this.$emit('update:modelValue', false)
      this.$emit('close', reason)
      this.releaseFocus()
    },
    handleEsc() {
      if (this.closeOnEsc) this.close('escape')
    },
    onBackdropClick() {
      if (this.closeOnBackdrop) this.close('backdrop')
    },
    trapFocus() {
      if (!this.panel) return
      this.lastFocused = document.activeElement
      const focusable = this.panel.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      ;(focusable || this.panel).focus({ preventScroll: true })
      document.addEventListener('focus', this.enforceFocus, true)
    },
    releaseFocus() {
      document.removeEventListener('focus', this.enforceFocus, true)
      if (this.restoreFocus && this.lastFocused instanceof HTMLElement) {
        this.lastFocused.focus({ preventScroll: true })
      }
    },
    enforceFocus(e) {
      if (!this.panel || this.panel.contains(e.target)) return
      e.stopPropagation()
      this.panel.focus({ preventScroll: true })
    }
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.15s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.scale-enter-active { transition: transform 0.18s ease, opacity 0.18s ease; }
.scale-enter-from { transform: scale(0.96); opacity: 0; }
.scale-leave-active { transition: transform 0.15s ease, opacity 0.15s ease; }
.scale-leave-to { transform: scale(0.98); opacity: 0; }
</style>
