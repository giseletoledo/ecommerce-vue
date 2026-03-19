import './assets/main.css'

// Vue
import { createApp } from 'vue'

// App
import App from './App.vue'

// PrimeVue
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'

// Componentes PrimeVue 
import Button from 'primevue/button'
import Card from 'primevue/card'
import DataView from 'primevue/dataview'
import InputNumber from 'primevue/inputnumber'
import ConfirmDialog from 'primevue/confirmdialog'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'

// Icons
import 'primeicons/primeicons.css'

const app = createApp(App)

// Plugins PrimeVue
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.dark',
        }
    }
})
app.use(ToastService)
app.use(ConfirmationService)

// Registrar componentes globais
app.component('Button', Button)
app.component('Card', Card)
app.component('DataView', DataView)
app.component('InputNumber', InputNumber)
app.component('ConfirmDialog', ConfirmDialog)
app.component('Toast', Toast)

app.mount('#app')