<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
    <Card class="w-full max-w-md">
      <template #title>
        <div class="text-center">
          <h1 class="text-3xl font-bold">VueShop</h1>
          <p class="text-gray-500 mt-2">Entre na sua conta</p>
        </div>
      </template>
      
      <template #content>
        <div class="space-y-4">
          <div class="bg-blue-50 p-4 rounded-lg text-sm">
            <p class="font-semibold mb-2">🔐 Credenciais de teste:</p>
            <p>👑 Admin: clique em "Entrar como Admin"</p>
            <p>👤 Usuário comum: clique em "Entrar como Usuário"</p>
          </div>
          
          <div class="space-y-3">
            <Button 
              label="Entrar como Usuário Comum" 
              icon="pi pi-user" 
              class="w-full justify-center"
              severity="info"
              @click="loginAsUser"
            />
            
            <Button 
              label="Entrar como Administrador" 
              icon="pi pi-shield" 
              class="w-full justify-center"
              severity="success"
              @click="loginAsAdmin"
            />
          </div>
        </div>
      </template>
      
      <template #footer>
        <div class="text-center">
          <RouterLink to="/" class="text-blue-600 hover:underline text-sm">
            ← Voltar para a Loja
          </RouterLink>
        </div>
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Card from 'primevue/card'
import Button from 'primevue/button'

export default defineComponent({
  name: 'LoginView',
  components: { Card, Button },
  setup() {
    const router = useRouter()
    const route = useRoute()
    
    const loginAsUser = () => {
      localStorage.setItem('user_role', 'USER')
      const redirect = route.query.redirect as string || '/'
      router.push(redirect)
    }
    
    const loginAsAdmin = () => {
      localStorage.setItem('user_role', 'ADMIN')
      const redirect = route.query.redirect as string || '/admin'
      router.push(redirect)
    }
    
    return { loginAsUser, loginAsAdmin }
  }
})
</script>