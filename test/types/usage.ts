// Type-level tests for types/vue-morphling.d.ts (checked by `yarn test:types`).
import { createApp, defineComponent } from 'vue';
import { VueMorphling, morphCapitalize, morphFilters, vMorphUrl } from 'vue-morphling';

createApp({}).use(VueMorphling).use(morphCapitalize).use(vMorphUrl);

const age: number = morphFilters.age(new Date());
const reversed: number[] = morphFilters.arrReverse([1, 2, 3]);
const sorted: { a: number }[] = morphFilters.arrSort([{ a: 1 }], 'a', 'asc');
const size: string = morphFilters.fileSize(1024, { round: 0 });

// @ts-expect-error sort key must exist on the items
morphFilters.arrSort([{ a: 1 }], 'b', 'asc');
// @ts-expect-error direction is 'asc' | 'desc'
morphFilters.arrSort([{ a: 1 }], 'a', 'up');

defineComponent({
  mounted () {
    const text: string = this.$morphCapitalize('numb');
    const when: string = this.$morphDateFormat(new Date(), 'yyyy');
    // @ts-expect-error unknown global
    this.$morphNope('x');
    return [text, when];
  }
});

export { age, reversed, sorted, size };
