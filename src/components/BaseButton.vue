<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="computedClasses"
    v-bind="$attrs"
  >
    <span v-if="loading" class="inline-flex items-center mr-2">
      <svg class="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
      </svg>
    </span>
    <slot />
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  inheritAttrs: false,
  props: {
    variant: {
      type: String,
      default: 'primary', // primary | secondary | danger | outline | ghost | icon
    },
    size: {
      type: String,
      default: 'md', // xs | sm | md | lg
    },
    block: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'button',
    },
  },
  computed: {
    computedClasses() {
      const base = [
        'inline-flex','items-center','justify-center','font-medium','rounded-md','transition','focus:outline-none','focus:ring-2','focus:ring-offset-2','disabled:opacity-60','disabled:cursor-not-allowed'
      ];

      // Size mapping
      const sizeMap = {
        xs: 'text-xs px-2 py-1',
        sm: 'text-sm px-3 py-1.5',
        md: 'text-sm px-4 py-2',
        lg: 'text-base px-5 py-3'
      };
      base.push(sizeMap[this.size] || sizeMap.md);

      // Variant mapping
      const variantMap = {
        primary: 'bg-green-500 hover:bg-green-600 text-white focus:ring-green-400',
        secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-800 focus:ring-gray-300',
        danger: 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-400',
        outline: 'border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 focus:ring-gray-300',
        ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-300',
        icon: 'p-2 bg-transparent hover:bg-gray-100 text-gray-500 focus:ring-gray-300'
      };
      base.push(variantMap[this.variant] || variantMap.primary);

      if (this.block) base.push('w-full');

      return base.join(' ');
    }
  }
};
</script>

<style scoped>
/* Additional subtle spinner alignment */
svg { display: block; }
</style>
