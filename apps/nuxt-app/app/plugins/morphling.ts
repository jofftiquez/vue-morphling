import { VueMorphling } from 'vue-morphling'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueMorphling)
})
