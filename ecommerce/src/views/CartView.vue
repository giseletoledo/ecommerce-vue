<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Carrinho 🛒</h1>

    <!-- EMPTY STATE -->
    <Card v-if="cartItems.length === 0" class="text-center p-6">
      <p class="text-gray-500">Seu carrinho está vazio</p>
    </Card>

    <!-- LISTA -->
    <DataView v-else :value="cartItems">
      <template #list="slotProps">
        <div class="flex flex-col gap-4">

          <div
            v-for="item in slotProps.items"
            :key="item.product.id"
            class="flex items-center justify-between p-4 border rounded-lg shadow-sm"
          >
            <!-- imagem + info -->
            <div class="flex items-center gap-4">
              <img
                :src="item.product.img"
                class="w-20 h-20 object-contain"
              />

              <div>
                <h3 class="font-semibold">
                  {{ item.product.name }}
                </h3>

                <p class="text-gray-500 text-sm">
                  {{ item.product.category.title }}
                </p>

                <p class="font-bold text-primary">
                  R$ {{ item.product.formattedPrice }}
                </p>
              </div>
            </div>

            <!-- quantidade -->
            <div class="flex items-center gap-4">
              <InputNumber
                v-model="item.quantity"
                showButtons
                buttonLayout="horizontal"
                :min="1"
              />

              <!-- subtotal -->
              <p class="font-semibold">
                R$ {{ (item.product.priceWithDiscountApplied() * item.quantity).toFixed(2) }}
              </p>

              <!-- remover -->
              <Button
                icon="pi pi-trash"
                severity="danger"
                @click="removeItem(item.product.id)"
              />
            </div>
          </div>

        </div>
      </template>
    </DataView>

    <!-- TOTAL -->
    <div
      v-if="cartItems.length > 0"
      class="mt-6 flex justify-between items-center border-t pt-4"
    >
      <h2 class="text-xl font-bold">
        Total: R$ {{ total }}
      </h2>

      <Button label="Finalizar Compra" icon="pi pi-check" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

// PrimeVue
import DataView from 'primevue/dataview'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'
import Card from 'primevue/card'

// tipos
import type { Product } from '../models/product.model'

interface CartItem {
  product: Product
  quantity: number
}

export default defineComponent({
  name: 'CartView',

  components: {
    DataView,
    InputNumber,
    Button,
    Card,
  },

  data() {
    return {
      cartItems: [] as CartItem[],
    }
  },

  computed: {
    total(): string {
      const total = this.cartItems.reduce((acc, item) => {
        return acc + item.product.priceWithDiscountApplied() * item.quantity
      }, 0)

      return total.toFixed(2)
    },
  },

  methods: {
    removeItem(productId: number) {
      this.cartItems = this.cartItems.filter(
        (item) => item.product.id !== productId
      )
    },
  },
})
</script>