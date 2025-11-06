## Reusable Modal Component

`BaseModal.vue` provides a flexible, accessible modal you can use across the app.

### Features
* Two-way binding with `v-model` (`modelValue` boolean)
* Optional `title` prop and header/footer slots
* Size control via `size` prop: `sm | md | lg | xl | 2xl`
* Closes on ESC or backdrop (configurable via `closeOnBackdrop`)
* Focus trapping and automatic focus restoration
* Teleported to `<body>` so it isn't constrained by parent stacking contexts

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | Boolean | `false` | Controls visibility (use `v-model`). |
| `title` | String | `''` | Simple text title (use header slot for custom). |
| `size` | String | `'md'` | Max width (`sm, md, lg, xl, 2xl`). |
| `closeOnBackdrop` | Boolean | `true` | Click backdrop to close. |
| `restoreFocus` | Boolean | `true` | Returns focus to the last focused element after close. |

### Slots
| Slot | Purpose |
|------|---------|
| default | Modal body content |
| header | Custom header contents (replaces `title`) |
| footer | Footer actions (buttons, etc.) |

### Events
| Event | Payload | Description |
|-------|---------|-------------|
| `open` | none | Fired when modal becomes visible |
| `close` | reason (string) | Fired when closing (`escape`, `backdrop`, `close-button`, `programmatic`) |
| `update:modelValue` | boolean | Standard v-model update |

### Usage Example
```vue
<script setup>
import { ref } from 'vue'
import BaseModal from '@/components/BaseModal.vue'

const show = ref(false)
</script>

<template>
  <button class="px-4 py-2 bg-green-500 text-white rounded" @click="show = true">Open Modal</button>
  <BaseModal v-model="show" title="Example" size="lg" @close="(r) => console.log('Closed because', r)">
    <p class="text-sm">Your content goes here.</p>
    <template #footer>
      <div class="flex justify-end gap-2">
        <button class="px-3 py-1 text-sm border rounded" @click="show = false">Cancel</button>
        <button class="px-3 py-1 text-sm bg-green-500 text-white rounded" @click="show = false">Confirm</button>
      </div>
    </template>
  </BaseModal>
</template>
```

### Accessibility Notes
* Focus is trapped within the modal while open.
* `Esc` closes the modal for keyboard users.
* Backdrop has `aria-hidden` and dialog uses `role="dialog"` + `aria-modal="true"`.

### Extending
Add more sizes or animations by editing `BaseModal.vue` (`sizeClass` switch + `<style>` transitions).

# get-change

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) 
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
