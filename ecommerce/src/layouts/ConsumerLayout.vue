<!-- src/layouts/ConsumerLayout.vue -->
<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
    <!-- Header com navegação -->
    <header class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div class="max-w-screen-xl mx-auto px-6 h-16 flex items-center justify-between">
        <RouterLink to="/" class="text-2xl font-extrabold text-blue-600 dark:text-blue-400">
          VueShop
        </RouterLink>
        
        <!-- Navegação principal -->
        <nav class="hidden md:flex items-center gap-6">
          <RouterLink to="/" class="hover:text-blue-600 transition-colors">Home</RouterLink>
          <RouterLink to="/cart" class="hover:text-blue-600 transition-colors">Carrinho</RouterLink>
        </nav>
        
        <div class="flex items-center gap-3">
          <!-- Botão Admin (só aparece se logado como ADMIN) -->
          <RouterLink v-if="isAdmin" to="/admin">
            <Button label="Admin" icon="pi pi-cog" text severity="secondary" />
          </RouterLink>
          
          <!-- Botão de login/logout -->
          <Button 
            :label="isLoggedIn ? 'Sair' : 'Entrar'" 
            :icon="isLoggedIn ? 'pi pi-sign-out' : 'pi pi-sign-in'"
            severity="secondary"
            text
            @click="handleAuth"
          />
        </div>
      </div>
    </header>
    
    <!-- Conteúdo principal -->
    <main class="max-w-screen-xl mx-auto px-6 py-10">
      <RouterView />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'

export default defineComponent({
  name: 'ConsumerLayout',
  components: { Button },
  setup() {
    const router = useRouter()
    const isLoggedIn = ref(false)
    const isAdmin = ref(false)
    
    const checkAuth = () => {
      const role = localStorage.getItem('user_role')
      isLoggedIn.value = role !== null
      isAdmin.value = role === 'ADMIN'
    }
    
    onMounted(() => {
      checkAuth()
      // Ouvir mudanças no localStorage
      window.addEventListener('storage', checkAuth)
    })
    
    const handleAuth = () => {
      if (isLoggedIn.value) {
        localStorage.removeItem('user_role')
        isLoggedIn.value = false
        isAdmin.value = false
        router.push('/')
      } else {
        router.push('/login')
      }
    }
    
    return { isLoggedIn, isAdmin, handleAuth }
  }
})
</script>