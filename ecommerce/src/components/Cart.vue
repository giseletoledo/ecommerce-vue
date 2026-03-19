<template>
  <Card>
    <template #title>
      <div class="flex justify-between items-center">
        <span class="text-xl font-bold">Carrinho de Compras</span>
        <Badge :value="cart.totalItems" severity="danger" />
      </div>
    </template>

    <template #content>
      <!-- Empty State com Card -->
      <Card v-if="cart.totalItems === 0" class="bg-gray-50 dark:bg-gray-800">
        <template #content>
          <div class="text-center py-8">
            <i class="pi pi-shopping-cart text-4xl text-gray-400 mb-4"></i>
            <p class="text-gray-500 dark:text-gray-400">Seu carrinho está vazio</p>
            <p class="text-sm text-gray-400 mt-2">Adicione produtos para começar</p>
          </div>
        </template>
      </Card>

      <!-- DataView para listar itens -->
      <DataView v-else :value="cart.cartItems" class="border rounded-lg">
        <template #list="slotProps">
          <div v-for="(item, index) in slotProps.items" :key="index">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-4"
                 :class="{ 'border-t': index !== 0 }">
              
              <!-- Info do produto -->
              <div class="flex items-center gap-4">
                <img 
                  :src="item.product.img" 
                  :alt="item.product.name"
                  class="w-16 h-16 object-contain bg-gray-50 rounded"
                  @error="handleImageError"
                />
                <div>
                  <h4 class="font-semibold">{{ item.product.name }}</h4>
                  <p class="text-sm text-gray-500">{{ item.product.category.title }}</p>
                  <p class="text-sm font-bold text-primary">
                    R$ {{ item.product.formattedPrice }}
                  </p>
                </div>
              </div>

              <!-- Controles de quantidade com InputNumber -->
              <div class="flex items-center gap-4 ml-auto">
                <div class="flex items-center gap-2">
                  <InputNumber
                    v-model="item.quantity"
                    :min="1"
                    showButtons
                    buttonLayout="horizontal"
                    decrementButtonClass="p-button-secondary"
                    incrementButtonClass="p-button-secondary"
                    @update:modelValue="updateQuantity(item.product.id, $event)"
                  />
                </div>

                <!-- Subtotal -->
                <p class="font-bold w-20 text-right">
                  R$ {{ (item.product.priceWithDiscountApplied() * item.quantity).toFixed(2) }}
                </p>

                <!-- Botão remover -->
                <Button
                  icon="pi pi-trash"
                  severity="danger"
                  text
                  @click="confirmRemoveItem(item.product.id)"
                />
              </div>
            </div>
          </div>
        </template>
      </DataView>
    </template>

    <!-- Footer com total e ações -->
    <template #footer v-if="cart.totalItems > 0">
      <div class="border-t pt-4">
        <div class="flex justify-between items-center mb-4">
          <span class="text-lg font-semibold">Total:</span>
          <span class="text-2xl font-bold text-primary">
            {{ cart.formattedTotalPrice }}
          </span>
        </div>

        <div class="flex gap-2">
          <Button
            label="Limpar carrinho"
            icon="pi pi-trash"
            severity="danger"
            class="flex-1"
            @click="confirmClearCart"
          />
          <Button
            label="Finalizar"
            icon="pi pi-check"
            severity="success"
            class="flex-1"
            @click="checkout"
          />
        </div>
      </div>
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import { Cart } from '../models/cart.model'
import type { Product } from '../models/product.model'
import Badge from 'primevue/badge'

export default defineComponent({
  name: 'Cart',

  components: {
    Badge
  },

  props: {
    cart: {
      type: Object as PropType<Cart>,
      required: true,
    },
  },

  emits: ['add-to-cart', 'remove-unit', 'remove-item', 'clear-cart'],

  methods: {


    updateQuantity(productId: number, quantity: number | null) {
      if (!quantity || quantity < 1) return
      // Ajusta a quantidade emitindo add ou remove até chegar no valor desejado
      const item = this.cart.cartItems.find((i) => i.product.id === productId)
      if (!item) return
      const diff = quantity - item.quantity
      if (diff > 0) {
        for (let i = 0; i < diff; i++) this.$emit('add-to-cart', item.product)
      } else {
        for (let i = 0; i < Math.abs(diff); i++) this.$emit('remove-unit', productId)
      }
    },

    confirmRemoveItem(productId: number) {
      this.$confirm.require({
        message: 'Remover este item do carrinho?',
        header: 'Confirmação',
        icon: 'pi pi-exclamation-triangle',
        rejectLabel: 'Cancelar',
        acceptLabel: 'Remover',
        acceptClass: 'p-button-danger',
        accept: () => {
          this.$emit('remove-item', productId)
          this.$toast.add({
            severity: 'success',
            summary: 'Removido',
            detail: 'Item removido do carrinho',
            life: 2000,
          })
        },
      })
    },

    confirmClearCart() {
      // Delega ao App.vue que tem o ConfirmDialog montado
      this.$emit('clear-cart')
    },

    checkout() {
      this.$toast.add({
        severity: 'success',
        summary: 'Compra finalizada!',
        detail: 'Obrigado por comprar conosco',
        life: 5000
      })
    },

    handleImageError(e: Event) {
      const img = e.target as HTMLImageElement
      img.src = 'https://placehold.co/100x100?text=Produto'
    }
  }
})
</script>