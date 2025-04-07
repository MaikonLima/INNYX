import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import { Button, Checkbox, Column, ConfirmationService, ConfirmDialog, DataTable, DatePicker, Dialog, Drawer, FileUpload, IconField, InputIcon, InputText, Menu, Message, MultiSelect, Panel, ProgressSpinner, Select, Textarea, Timeline, Toast, ToastService, ToggleSwitch, Tooltip } from 'primevue';
import router from './routes';
import { createPinia } from 'pinia';

const pinia = createPinia();


createApp(App)
    .use(PrimeVue, {
        theme: {
            preset: Aura,
            options: {
                prefix: 'p',
                darkModeSelector: false,
                cssLayer: false
            }
        }
    })
    .component('InputText', InputText)
    .component('InputIcon', InputIcon)
    .component('Button', Button)
    .component('Dialog', Dialog)
    .component('Select', Select)
    .component('Textarea', Textarea)
    .component('MultiSelect', MultiSelect)
    .component('DatePicker', DatePicker)
    .component('Drawer', Drawer)
    .component('DataTable', DataTable)
    .component('Column', Column)
    .component('Panel', Panel)
    .component('ToggleSwitch', ToggleSwitch)
    .component('ConfirmDialog', ConfirmDialog)
    .component('FileUpload', FileUpload)
    .component('InputIcon', InputIcon)
    .component('IconField', IconField)
    .component('Checkbox', Checkbox)
    .component('ProgressSpinner', ProgressSpinner)
    .component('Menu', Menu)
    .component('Timeline', Timeline)
    .component('Message', Message)
    .directive('tooltip', Tooltip)
    .use(ConfirmationService)
    .use('Toast', Toast)
    .use(router)
    .use(ToastService)
    .use(pinia)
    .mount('#app')
