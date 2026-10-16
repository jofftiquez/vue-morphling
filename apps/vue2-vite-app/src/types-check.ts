// Type-checks vue-morphling's declarations against Vue 2.7's own types.
import Vue, { defineComponent } from 'vue'
import { VueMorphling, morphCapitalize, morphFilters } from 'vue-morphling'

Vue.use(VueMorphling)
Vue.use(morphCapitalize)

const size: string | undefined = morphFilters.fileSize(2048)

export default defineComponent({
  data: () => ({ name: 'numb' }),
  computed: {
    title (): string { return this.$morphCapitalize(this.name) },
    when (): string { return this.$morphDateFormat(new Date(), 'yyyy') }
  },
  mounted () {
    // @ts-expect-error not a morphling global
    this.$morphNope()
    return size
  }
})
