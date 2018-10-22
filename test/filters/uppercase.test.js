import Vue from 'vue';
import { createLocalVue } from '@vue/test-utils'
import { uppercase } from '../../src/filters/uppercase'

it('adds a $morphUppercase method to the Vue prototype', () => {
    const localVue = createLocalVue()
    localVue.use(uppercase)
    expect(typeof localVue.prototype.$morphUppercase).toBe('function')
})

it('should convert a string to uppercase', () => {
    const localVue = createLocalVue()
    localVue.use(uppercase)
    expect(localVue.prototype.$morphUppercase('somewhere i belong')).toEqual('SOMEWHERE I BELONG')
})