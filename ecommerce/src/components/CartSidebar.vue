<template>
    <div class="flex flex-col gap-5 h-full">
        <!-- Header -->
        <div class="flex items-center justify-between">
            <Badge v-if="cart.getTotalItems() > 0" :value="cart.getTotalItems()" severity="info" class="text-sm" />
        </div>

        <!-- Empty state -->
        <div v-if="cart.getTotalItems() === 0"
            class="flex flex-col items-center justify-center gap-3 py-12 text-gray-400">
            <i class="pi pi-shopping-cart text-5xl opacity-30" />
            <p class="text-sm">Seu carrinho está vazio</p>
        </div>

        <!-- Item list -->
        <div v-else class="flex flex-col gap-3 flex-1 overflow-y-auto">
            <div v-for="item in cart.listproducts" :key="item.product.id"
                class="flex flex-col gap-2 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                <div class="flex justify-between items-start gap-2">
                    <div class="flex flex-col gap-0.5 flex-1 min-w-0">
                        <span class="font-bold text-gray-800 text-sm leading-snug truncate">
                            {{ item.product.name }}
                        </span>
                        <span class="text-xs text-gray-400">
                            {{ formatCurrency(item.product.priceWithDiscountApplied()) }} / un
                        </span>
                    </div>
                    <span class="font-extrabold text-blue-600 text-sm whitespace-nowrap">
                        {{ formatCurrency(item.product.priceWithDiscountApplied() * item.quantity) }}
                    </span>
                </div>

                <!-- Controls -->
                <div class="flex items-center gap-2">
                    <InputNumber :modelValue="item.quantity" showButtons buttonLayout="horizontal" :min="1" :step="1"
                        decrementButtonIcon="pi pi-minus" incrementButtonIcon="pi pi-plus"
                        inputClass="!w-10 !text-center !text-sm !font-bold !p-1" class="!text-sm"
                        @update:modelValue="onQuantityChange(item.product, $event)" />
                    <Button icon="pi pi-trash" size="small" severity="danger" text rounded
                        @click="$emit('remove-item', item.product)" class="!w-7 !h-7 ml-auto" />
                </div>
            </div>
        </div>

        <!-- Footer totals -->
        <Divider v-if="cart.getTotalItems() > 0" class="!my-0" />

        <div v-if="cart.getTotalItems() > 0" class="flex flex-col gap-3">
            <div class="flex justify-between items-center">
                <span class="text-sm text-gray-500">
                    Total ({{ cart.getTotalItems() }} {{ cart.getTotalItems() === 1 ? 'item' : 'itens' }})
                </span>
                <span class="text-2xl font-extrabold text-blue-600" style="font-family: var(--font-display)">
                    {{ formatCurrency(cart.getFinalPrice()) }}
                </span>
            </div>

            <Button label="Finalizar compra" icon="pi pi-check" class="w-full" severity="success" />

            <Button label="Limpar carrinho" icon="pi pi-trash" class="w-full" severity="danger" outlined
                @click="confirmClear" />

            <ConfirmDialog />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import { Cart } from '../models/cart.model'
import Button from 'primevue/button'
import Badge from 'primevue/badge'
import Divider from 'primevue/divider'
import InputNumber from 'primevue/inputnumber'
import { Product } from '../models/product.model'
import { useConfirm } from 'primevue/useconfirm'
import ConfirmDialog from 'primevue/confirmdialog'

export default defineComponent({
    name: 'CartSidebar',

    components: { Button, Badge, Divider, InputNumber, ConfirmDialog },

    props: {
        cart: {
            type: Object as PropType<Cart>,
            required: true,
        },
    },

    emits: ['add-to-cart', 'remove-unit', 'remove-item', 'clear-cart', 'set-quantity'],
    
    setup() {
        const confirm = useConfirm()
        return { confirm }
    },
    methods: {
        formatCurrency(value: number): string {
            return new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            }).format(value)
        },
        onQuantityChange(product: Product, value: number | null): void {
            if (!value || value < 1) return
            this.$emit('set-quantity', product, value)
        },
        confirmClear(): void {
            this.confirm.require({
                message: 'Tem certeza que deseja limpar o carrinho?',
                header: 'Confirmação',
                icon: 'pi pi-exclamation-triangle',
                acceptLabel: 'Sim, limpar',
                rejectLabel: 'Não, cancelar',
                accept: () => this.$emit('clear-cart'),
            })
        },
    },
})
</script>
