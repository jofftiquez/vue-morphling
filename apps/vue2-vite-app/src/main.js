import Vue from 'vue'
import { VueMorphling } from 'vue-morphling'
import App from './App.vue'
import './dogfood.css'

Vue.use(VueMorphling)

new Vue({ render: h => h(App) }).$mount('#app')
