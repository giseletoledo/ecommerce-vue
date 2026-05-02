<template>
  <div class="min-h-screen bg-gray-900 flex items-center justify-center p-6">
    <Card class="w-full max-w-md !bg-gray-800 !border-gray-700">
      <template #title>
        <div class="text-center">
          <i class="pi pi-shield text-4xl text-blue-400 mb-3 block"></i>
          <h1 class="text-2xl font-bold text-white">Acesso Administrativo</h1>
          <p class="text-gray-400 mt-1 text-sm">Área restrita</p>
        </div>
      </template>

      <template #content>
        <div class="space-y-4">
          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-gray-300">Usuário</label>
            <InputText
              v-model="username"
              placeholder="admin"
              class="w-full !bg-gray-700 !border-gray-600 !text-white"
            />
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-gray-300">Senha</label>
            <Password
              v-model="password"
              :feedback="false"
              toggleMask
              placeholder="••••••••"
              class="w-full"
              inputClass="w-full !bg-gray-700 !border-gray-600 !text-white"
            />
          </div>

          <Message v-if="error" severity="error" :closable="false">
            {{ error }}
          </Message>

          <Button
            label="Entrar como Administrador"
            icon="pi pi-lock-open"
            class="w-full justify-center"
            severity="warning"
            @click="login"
          />
        </div>
      </template>

      <template #footer>
        <div class="text-center">
          <RouterLink to="/" class="text-gray-500 hover:text-gray-300 text-sm transition-colors">
            ← Voltar para a Loja
          </RouterLink>
        </div>
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import Card from 'primevue/card'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Message from 'primevue/message'

const ADMIN_USER = import.meta.env.VITE_ADMIN_USER
const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASS

export default defineComponent({
  name: 'AdminLoginView',
  components: { Card, Button, InputText, Password, Message },
  setup() {
    const router = useRouter()
    const username = ref('')
    const password = ref('')
    const error = ref('')

    const login = () => {
      error.value = ''
      if (username.value === ADMIN_USER && password.value === ADMIN_PASS) {
        localStorage.setItem('user_role', 'ADMIN')
        router.push('/admin')
      } else {
        error.value = 'Usuário ou senha incorretos.'
      }
    }

    return { username, password, error, login }
  }
})
</script>