<template>
  <div class="min-h-screen bg-gray-900 text-gray-100">
    <!-- Header Admin -->
    <header class="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
      <div class="max-w-screen-xl mx-auto px-6 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <RouterLink to="/" class="text-xl font-extrabold text-blue-400 no-underline">
            VueShop
          </RouterLink>
          <span class="text-gray-500">|</span>
          <span class="text-sm text-gray-400 font-medium">Painel Admin</span>
        </div>

        <RouterLink to="/">
          <Button label="Voltar à Loja" icon="pi pi-arrow-left" text severity="secondary" size="small" />
        </RouterLink>
      </div>
    </header>

    <!-- Conteúdo -->
    <main class="max-w-screen-xl mx-auto px-6 py-10">
      <RouterView />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Button from 'primevue/button'

export default defineComponent({
  name: 'AdminLayout',
  components: { Button },
})
</script>