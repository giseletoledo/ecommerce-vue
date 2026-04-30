<!-- src/views/admin/AdminDashboard.vue -->
<template>
  <div class="space-y-6">
    <!-- Título da página -->
    <div>
      <h1 class="text-2xl font-bold text-white mb-2">Dashboard Administrativo</h1>
      <p class="text-gray-400">Gerencie seus produtos e acompanhe as vendas</p>
    </div>
    
    <!-- Cards de estatísticas -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card v-for="stat in stats" :key="stat.title" class="!bg-gray-800 !border-gray-700">
        <template #content>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-400 text-sm">{{ stat.title }}</p>
              <p class="text-2xl font-bold text-white mt-1">{{ stat.value }}</p>
            </div>
            <i :class="stat.icon" class="text-4xl text-blue-400"></i>
          </div>
        </template>
      </Card>
    </div>
    
    <!-- Tabela de Produtos (DataTable do PrimeVue) -->
    <Card class="!bg-gray-800 !border-gray-700">
      <template #title>
        <div class="flex items-center justify-between">
          <span class="text-white text-xl font-bold">📦 Produtos Cadastrados</span>
          <Button label="Novo Produto" icon="pi pi-plus" severity="success" size="small" />
        </div>
      </template>
      <template #content>
        <DataTable 
          :value="products" 
          stripedRows 
          paginator 
          :rows="5"
          :rowsPerPageOptions="[5, 10, 20]"
          tableStyle="min-width: 50rem"
          class="p-datatable-sm"
        >
          <Column field="id" header="ID" sortable style="width: 80px">
            <template #body="{ data }">
              <span class="text-gray-300">#{{ data.id }}</span>
            </template>
          </Column>
          
          <Column field="name" header="Produto" sortable>
            <template #body="{ data }">
              <div class="flex items-center gap-3">
                <img :src="data.img" class="w-10 h-10 object-cover rounded" />
                <span class="font-medium text-white">{{ data.name }}</span>
              </div>
            </template>
          </Column>
          
          <Column field="category" header="Categoria" sortable>
            <template #body="{ data }">
              <Tag :value="data.category" severity="info" />
            </template>
          </Column>
          
          <Column field="price" header="Preço" sortable>
            <template #body="{ data }">
              <span class="text-green-400 font-semibold">R$ {{ data.price.toFixed(2) }}</span>
            </template>
          </Column>
          
          <Column field="stock" header="Estoque" sortable>
            <template #body="{ data }">
              <span :class="data.stock < 10 ? 'text-red-400' : 'text-gray-300'">
                {{ data.stock }} unidades
              </span>
            </template>
          </Column>
          
          <Column header="Ações" style="width: 120px">
            <template #body>
              <div class="flex gap-2">
                <Button icon="pi pi-pencil" text rounded severity="warning" size="small" />
                <Button icon="pi pi-trash" text rounded severity="danger" size="small" />
              </div>
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>
    
    <!-- Últimos Pedidos -->
    <Card class="!bg-gray-800 !border-gray-700">
      <template #title>
        <span class="text-white text-xl font-bold">🛒 Últimos Pedidos</span>
      </template>
      <template #content>
        <DataTable :value="recentOrders" stripedRows class="p-datatable-sm">
          <Column field="id" header="Pedido #">
            <template #body="{ data }">
              <span class="text-gray-300">{{ data.id }}</span>
            </template>
          </Column>
          <Column field="customer" header="Cliente">
            <template #body="{ data }">
              <span class="text-white">{{ data.customer }}</span>
            </template>
          </Column>
          <Column field="date" header="Data">
            <template #body="{ data }">
              <span class="text-gray-400">{{ data.date }}</span>
            </template>
          </Column>
          <Column field="total" header="Total">
            <template #body="{ data }">
              <span class="text-green-400">R$ {{ data.total }}</span>
            </template>
          </Column>
          <Column field="status" header="Status">
            <template #body="{ data }">
              <Tag :value="data.status" :severity="getStatusSeverity(data.status)" />
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Card from 'primevue/card'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Tag from 'primevue/tag'

export default defineComponent({
  name: 'AdminDashboard',
  components: { Card, DataTable, Column, Button, Tag },
  
  setup() {
    // Cards de estatísticas
    const stats = [
      { title: 'Total de Vendas', value: 'R$ 45.231,89', icon: 'pi pi-chart-line' },
      { title: 'Produtos', value: '8', icon: 'pi pi-box' },
      { title: 'Pedidos', value: '23', icon: 'pi pi-shopping-cart' },
      { title: 'Clientes', value: '42', icon: 'pi pi-users' }
    ]
    
    // Lista de produtos para o DataTable
    const products = [
      { id: 1, name: 'Notebook Gamer Pro', img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100', price: 4599.90, category: 'Eletrônicos', stock: 15 },
      { id: 2, name: 'Fone Bluetooth TWS', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100', price: 249.90, category: 'Acessórios', stock: 42 },
      { id: 3, name: 'Smartwatch Fit', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100', price: 799.00, category: 'Eletrônicos', stock: 8 },
      { id: 4, name: 'Tênis Running X200', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100', price: 359.90, category: 'Esportes', stock: 23 },
      { id: 5, name: 'Camiseta Premium', img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100', price: 89.90, category: 'Moda', stock: 56 }
    ]
    
    // Últimos pedidos
    const recentOrders = [
      { id: '#001', customer: 'João Silva', date: '2024-01-15', total: '459.90', status: 'Entregue' },
      { id: '#002', customer: 'Maria Santos', date: '2024-01-14', total: '799.00', status: 'Processando' },
      { id: '#003', customer: 'Pedro Costa', date: '2024-01-13', total: '249.90', status: 'Pendente' },
      { id: '#004', customer: 'Ana Oliveira', date: '2024-01-12', total: '1.299,90', status: 'Entregue' },
      { id: '#005', customer: 'Carlos Lima', date: '2024-01-11', total: '359.90', status: 'Enviado' }
    ]
    
    const getStatusSeverity = (status: string) => {
      const severities: Record<string, string> = {
        'Entregue': 'success',
        'Processando': 'info',
        'Pendente': 'warning',
        'Enviado': 'secondary'
      }
      return severities[status] || 'info'
    }
    
    return { stats, products, recentOrders, getStatusSeverity }
  }
})
</script>

<style scoped>
/* Ajustes para o DataTable no modo escuro */
:deep(.p-datatable) {
  background-color: transparent;
}
:deep(.p-datatable .p-datatable-thead > tr > th) {
  background-color: #1f2937;
  color: #9ca3af;
  border-color: #374151;
}
:deep(.p-datatable .p-datatable-tbody > tr) {
  background-color: #1f2937;
  color: #e5e7eb;
}
:deep(.p-datatable .p-datatable-tbody > tr:hover) {
  background-color: #374151;
}
:deep(.p-paginator) {
  background-color: #1f2937;
  color: #9ca3af;
}
</style>