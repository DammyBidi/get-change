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
            <div class="flex items-start justify-between px-4 py-3 border-b border-gray-200">
              <div class="mr-4 min-w-0" v-if="hasHeaderSlot || title">
                <h2 v-if="title" :id="titleId" class="text-base font-semibold text-gray-900 truncate">{{ title }}</h2>
                <slot v-if="hasHeaderSlot" name="header" />
              </div>
              <button
                type="button"
                class="ml-auto inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
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

<script setup>
import { onMounted, onBeforeUnmount, ref, watch, computed, useSlots } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  title: { type: String, default: '' },
  size: { type: String, default: 'md' }, // sm, md, lg, xl, 2xl
  closeOnBackdrop: { type: Boolean, default: true },
  closeOnEsc: { type: Boolean, default: true },
  restoreFocus: { type: Boolean, default: true },
})

const emit = defineEmits(['update:modelValue', 'open', 'close'])

const panel = ref(null)
const lastFocused = ref(null)
const titleId = `modal-title-${Math.random().toString(36).slice(2)}`

const hasHeaderSlot = computed(() => !!useSlots().header)
const hasFooterSlot = computed(() => !!useSlots().footer)
const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm': return 'max-w-sm'
    case 'lg': return 'max-w-lg'
    case 'xl': return 'max-w-xl'
    case '2xl': return 'max-w-2xl'
    default: return 'max-w-md'
  }
})

function open() {
  emit('open')
  trapFocus()
}
function close(reason = 'programmatic') {
  emit('update:modelValue', false)
  emit('close', reason)
  releaseFocus()
}
function handleEsc() {
  if (props.closeOnEsc) close('escape')
}
function onBackdropClick() {
  if (props.closeOnBackdrop) close('backdrop')
}

// Focus management
function trapFocus() {
  if (!panel.value) return
  lastFocused.value = document.activeElement
  // Focus first focusable element or panel
  const focusable = panel.value.querySelector(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )
  ;(focusable || panel.value).focus({ preventScroll: true })
  document.addEventListener('focus', enforceFocus, true)
}
function releaseFocus() {
  document.removeEventListener('focus', enforceFocus, true)
  if (props.restoreFocus && lastFocused.value instanceof HTMLElement) {
    lastFocused.value.focus({ preventScroll: true })
  }
}
function enforceFocus(e) {
  if (!panel.value || panel.value.contains(e.target)) return
  e.stopPropagation()
  panel.value.focus({ preventScroll: true })
}

watch(() => props.modelValue, (val) => {
  if (val) {
    open()
  } else {
    releaseFocus()
  }
})

onMounted(() => {
  if (props.modelValue) open()
})

onBeforeUnmount(() => releaseFocus())
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.15s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.scale-enter-active { transition: transform 0.18s ease, opacity 0.18s ease; }
.scale-enter-from { transform: scale(0.96); opacity: 0; }
.scale-leave-active { transition: transform 0.15s ease, opacity 0.15s ease; }
.scale-leave-to { transform: scale(0.98); opacity: 0; }
</style>
