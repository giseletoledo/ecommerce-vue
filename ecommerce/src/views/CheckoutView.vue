<!-- src/views/CheckoutView.vue -->
<template>
  <div class="max-w-3xl mx-auto">
    <h1 class="text-2xl font-bold mb-6">Finalizar Compra</h1>
    
    <Card>
      <template #content>
        <div class="text-center py-8">
          <i class="pi pi-check-circle text-green-500 text-5xl mb-4"></i>
          <h2 class="text-xl font-semibold mb-2">Checkout Protegido</h2>
          <p class="text-gray-600">
            Esta página só pode ser acessada por usuários autenticados.
          </p>
          <p class="text-gray-500 text-sm mt-4">
            ✅ Você está logado e tem permissão para finalizar a compra.
          </p>
        </div>
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Card from 'primevue/card'

export default defineComponent({
  name: 'CheckoutView',
  components: { Card }
})
</script>