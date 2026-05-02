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
          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-gray-700">E-mail</label>
            <InputText v-model="email" placeholder="seu@email.com" class="w-full" />
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-gray-700">Senha</label>
            <Password v-model="password" :feedback="false" toggleMask placeholder="••••••••" class="w-full" inputClass="w-full" />
          </div>

          <Button
            label="Entrar"
            icon="pi pi-sign-in"
            class="w-full justify-center"
            severity="primary"
            @click="login"
          />

          <p class="text-center text-xs text-gray-400 pt-2">
            Para fins de demonstração, qualquer e-mail e senha funcionam.
          </p>
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
import { defineComponent, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Card from 'primevue/card'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'

export default defineComponent({
  name: 'LoginView',
  components: { Card, Button, InputText, Password },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const email = ref('')
    const password = ref('')

    const login = () => {
      if (!email.value || !password.value) return
      localStorage.setItem('user_role', 'USER')
      const redirect = route.query.redirect as string || '/'
      router.push(redirect)
    }

    return { email, password, login }
  }
})
</script>