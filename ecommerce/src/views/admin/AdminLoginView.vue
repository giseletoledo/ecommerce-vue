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
        <form class="flex flex-col gap-4" @submit.prevent="submitLogin">

          <div class="flex flex-col gap-1">
            <label class="text-sm font-medium text-gray-300">E-mail</label>
            <InputText
              v-model="form.email"
              placeholder="admin@vueshop.com"
              class="w-full !bg-gray-700 !border-gray-600 !text-white"
              :class="{ 'p-invalid': v$.email.$error }"
              @blur="v$.email.$touch()"
            />
            <span v-if="v$.email.$error" class="text-red-400 text-xs mt-0.5">
              {{ v$.email.$errors[0]?.$message }}
            </span>
          </div>

          <div class="flex flex-col gap-1">
            <label class="text-sm font-medium text-gray-300">Senha</label>
            <Password
              v-model="form.password"
              :feedback="false"
              toggleMask
              placeholder="••••••••"
              class="w-full"
              inputClass="w-full !bg-gray-700 !border-gray-600 !text-white"
              :class="{ 'p-invalid': v$.password.$error }"
              @blur="v$.password.$touch()"
            />
            <span v-if="v$.password.$error" class="text-red-400 text-xs mt-0.5">
              {{ v$.password.$errors[0]?.$message }}
            </span>
          </div>

          <Button
            type="submit"
            label="Entrar como Administrador"
            icon="pi pi-lock-open"
            class="w-full justify-center"
            severity="warning"
            :loading="auth.loading"
            :disabled="auth.loading"
          />

        </form>
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
import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'
import { useToast } from 'primevue/usetoast'
import { useAuthStore } from '../../stores/auth.store'
import Card from 'primevue/card'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'

export default defineComponent({
  name: 'AdminLoginView',
  components: { Card, Button, InputText, Password },

  setup() {
    const router = useRouter()
    const toast = useToast()
    const auth = useAuthStore()

    const form = reactive({ email: '', password: '' })

    const rules = {
      email: {
        required: helpers.withMessage('E-mail é obrigatório.', required),
        email: helpers.withMessage('Informe um e-mail válido.', email),
      },
      password: {
        required: helpers.withMessage('Senha é obrigatória.', required),
      },
    }
    const v$ = useVuelidate(rules, form)

    async function submitLogin() {
      const valid = await v$.value.$validate()
      if (!valid) return

      try {
        await auth.login(form.email, form.password)

        // Garante que a conta tem perfil ADMIN
        if (!auth.isAdmin) {
          auth.logout()
          toast.add({
            severity: 'error',
            summary: 'Acesso negado',
            detail: 'Esta conta não tem permissão de administrador.',
            life: 4000,
          })
          return
        }

        toast.add({
          severity: 'success',
          summary: 'Acesso concedido',
          detail: `Bem-vindo, ${auth.user?.name}!`,
          life: 3000,
        })
        router.push('/admin')
      } catch (err: any) {
        toast.add({
          severity: 'error',
          summary: 'Credenciais inválidas',
          detail: err.message,
          life: 4000,
        })
      }
    }

    return { form, v$, submitLogin, auth }
  },
})
</script>