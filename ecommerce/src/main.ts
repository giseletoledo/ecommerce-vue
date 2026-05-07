import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

// Router & State
import router from './router'
import { createPinia } from 'pinia'

// PrimeVue core
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'
import Tooltip from 'primevue/tooltip'

// PrimeVue components
import Button from 'primevue/button'
import Card from 'primevue/card'
import DataView from 'primevue/dataview'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import ConfirmDialog from 'primevue/confirmdialog'
import Toast from 'primevue/toast'
import Message from 'primevue/message'

// Icons
import 'primeicons/primeicons.css'

const app = createApp(App)

// Pinia deve vir antes do router
app.use(createPinia())
app.use(router)

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: { darkModeSelector: '.dark' },
  },
})
app.use(ToastService)
app.use(ConfirmationService)

app.directive('tooltip', Tooltip)

// Componentes globais
app.component('Button', Button)
app.component('Card', Card)
app.component('DataView', DataView)
app.component('InputNumber', InputNumber)
app.component('InputText', InputText)
app.component('Password', Password)
app.component('ConfirmDialog', ConfirmDialog)
app.component('Toast', Toast)
app.component('Message', Message)

app.mount('#app')