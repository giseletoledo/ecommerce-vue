<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-950 flex items-center justify-center p-6">
    <Card class="w-full max-w-md shadow-xl">

      <template #title>
        <div class="text-center pb-2">
          <span
            class="text-3xl font-extrabold text-blue-600 dark:text-blue-400"
            style="font-family: var(--font-display)"
          >
            VueShop
          </span>

          <!-- Abas Entrar / Criar conta -->
          <div class="flex mt-6 border-b border-gray-200 dark:border-gray-700">
            <button
              class="flex-1 pb-3 text-sm font-semibold transition-colors"
              :class="tab === 'login'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-400 hover:text-gray-600'"
              @click="switchTab('login')"
            >
              Entrar
            </button>
            <button
              class="flex-1 pb-3 text-sm font-semibold transition-colors"
              :class="tab === 'register'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-400 hover:text-gray-600'"
              @click="switchTab('register')"
            >
              Criar conta
            </button>
          </div>
        </div>
      </template>

      <template #content>

        <!-- ── ABA LOGIN ── -->
        <form v-if="tab === 'login'" class="flex flex-col gap-4 pt-2" @submit.prevent="submitLogin">

          <div class="flex flex-col gap-1">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">E-mail</label>
            <InputText
              v-model="loginForm.email"
              placeholder="seu@email.com"
              class="w-full"
              :class="{ 'p-invalid': vLogin.email.$error }"
              @blur="vLogin.email.$touch()"
            />
            <span v-if="vLogin.email.$error" class="text-red-500 text-xs mt-0.5">
              {{ vLogin.email.$errors[0]?.$message }}
            </span>
          </div>

          <div class="flex flex-col gap-1">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Senha</label>
            <Password
              v-model="loginForm.password"
              :feedback="false"
              toggleMask
              placeholder="••••••••"
              class="w-full"
              inputClass="w-full"
              :class="{ 'p-invalid': vLogin.password.$error }"
              @blur="vLogin.password.$touch()"
            />
            <span v-if="vLogin.password.$error" class="text-red-500 text-xs mt-0.5">
              {{ vLogin.password.$errors[0]?.$message }}
            </span>
          </div>

          <Button
            type="submit"
            label="Entrar"
            icon="pi pi-sign-in"
            class="w-full justify-center mt-2"
            :loading="auth.loading"
            :disabled="auth.loading"
          />

          <p class="text-center text-xs text-gray-400 mt-1">
            Demo admin: <strong>{{ adminEmailHint }}</strong>
          </p>
        </form>

        <!-- ── ABA REGISTRO ── -->
        <form v-else class="flex flex-col gap-4 pt-2" @submit.prevent="submitRegister">

          <div class="flex flex-col gap-1">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Nome</label>
            <InputText
              v-model="registerForm.name"
              placeholder="Seu nome completo"
              class="w-full"
              :class="{ 'p-invalid': vRegister.name.$error }"
              @blur="vRegister.name.$touch()"
            />
            <span v-if="vRegister.name.$error" class="text-red-500 text-xs mt-0.5">
              {{ vRegister.name.$errors[0]?.$message }}
            </span>
          </div>

          <div class="flex flex-col gap-1">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">E-mail</label>
            <InputText
              v-model="registerForm.email"
              placeholder="seu@email.com"
              class="w-full"
              :class="{ 'p-invalid': vRegister.email.$error }"
              @blur="vRegister.email.$touch()"
            />
            <span v-if="vRegister.email.$error" class="text-red-500 text-xs mt-0.5">
              {{ vRegister.email.$errors[0]?.$message }}
            </span>
          </div>

          <div class="flex flex-col gap-1">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Senha</label>
            <Password
              v-model="registerForm.password"
              toggleMask
              placeholder="Mínimo 6 caracteres"
              class="w-full"
              inputClass="w-full"
              :class="{ 'p-invalid': vRegister.password.$error }"
              @blur="vRegister.password.$touch()"
            />
            <span v-if="vRegister.password.$error" class="text-red-500 text-xs mt-0.5">
              {{ vRegister.password.$errors[0]?.$message }}
            </span>
          </div>

          <div class="flex flex-col gap-1">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Confirmar senha</label>
            <Password
              v-model="registerForm.confirmPassword"
              :feedback="false"
              toggleMask
              placeholder="Repita a senha"
              class="w-full"
              inputClass="w-full"
              :class="{ 'p-invalid': vRegister.confirmPassword.$error }"
              @blur="vRegister.confirmPassword.$touch()"
            />
            <span v-if="vRegister.confirmPassword.$error" class="text-red-500 text-xs mt-0.5">
              {{ vRegister.confirmPassword.$errors[0]?.$message }}
            </span>
          </div>

          <Button
            type="submit"
            label="Criar conta"
            icon="pi pi-user-plus"
            class="w-full justify-center mt-2"
            severity="success"
            :loading="auth.loading"
            :disabled="auth.loading"
          />
        </form>

      </template>

      <template #footer>
        <div class="text-center pt-2 border-t border-gray-100 dark:border-gray-700">
          <RouterLink to="/" class="text-blue-600 hover:underline text-sm">
            ← Voltar para a Loja
          </RouterLink>
        </div>
      </template>

    </Card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, helpers, sameAs } from '@vuelidate/validators'
import { useToast } from 'primevue/usetoast'
import { useAuthStore } from '../stores/auth.store'
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
    const toast = useToast()
    const auth = useAuthStore()

    const tab = ref<'login' | 'register'>('login')

    // Reseta validação ao trocar de aba
    const switchTab = (newTab: 'login' | 'register') => {
      tab.value = newTab
      vLogin.value.$reset()
      vRegister.value.$reset()
    }

    // Dica de e-mail admin sem expor a senha
    const adminEmailHint = import.meta.env.VITE_ADMIN_EMAIL ?? 'admin@vueshop.com'

    // ── Login ──────────────────────────────────────────────
    const loginForm = reactive({ email: '', password: '' })

    const loginRules = {
      email: {
        required: helpers.withMessage('E-mail é obrigatório.', required),
        email: helpers.withMessage('Informe um e-mail válido.', email),
      },
      password: {
        required: helpers.withMessage('Senha é obrigatória.', required),
      },
    }
    const vLogin = useVuelidate(loginRules, loginForm)

    async function submitLogin() {
      const valid = await vLogin.value.$validate()
      if (!valid) return

      try {
        await auth.login(loginForm.email, loginForm.password)
        toast.add({
          severity: 'success',
          summary: 'Bem-vindo!',
          detail: `Olá, ${auth.user?.name}!`,
          life: 3000,
        })
        const redirect = (route.query.redirect as string) || (auth.isAdmin ? '/admin' : '/')
        router.push(redirect)
      } catch (err: any) {
        toast.add({
          severity: 'error',
          summary: 'Credenciais inválidas',
          detail: err.message,
          life: 4000,
        })
      }
    }

    // ── Registro ───────────────────────────────────────────
    const registerForm = reactive({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    })

    const registerRules = computed(() => ({
      name: {
        required: helpers.withMessage('Nome é obrigatório.', required),
      },
      email: {
        required: helpers.withMessage('E-mail é obrigatório.', required),
        email: helpers.withMessage('Informe um e-mail válido.', email),
      },
      password: {
        required: helpers.withMessage('Senha é obrigatória.', required),
        minLength: helpers.withMessage('Mínimo de 6 caracteres.', minLength(6)),
      },
      confirmPassword: {
        required: helpers.withMessage('Confirme sua senha.', required),
        sameAs: helpers.withMessage(
          'As senhas não coincidem.',
          sameAs(computed(() => registerForm.password)),
        ),
      },
    }))
    const vRegister = useVuelidate(registerRules, registerForm)

    async function submitRegister() {
      const valid = await vRegister.value.$validate()
      if (!valid) return

      try {
        await auth.register(registerForm.name, registerForm.email, registerForm.password)
        toast.add({
          severity: 'success',
          summary: 'Conta criada!',
          detail: `Bem-vindo, ${auth.user?.name}!`,
          life: 3000,
        })
        router.push('/')
      } catch (err: any) {
        toast.add({
          severity: 'error',
          summary: 'Erro no cadastro',
          detail: err.message,
          life: 4000,
        })
      }
    }

    return {
      tab,
      switchTab,
      adminEmailHint,
      loginForm,
      vLogin,
      submitLogin,
      registerForm,
      vRegister,
      submitRegister,
      auth,
    }
  },
})
</script>