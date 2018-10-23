import Vue from 'vue';
import { createLocalVue } from '@vue/test-utils'
import { currency } from '../../src/filters/currency'

it('adds a $morphCurrency method to the Vue prototype', () => {
    const localVue = createLocalVue()
    localVue.use(currency)
    expect(typeof localVue.prototype.$morphCurrency).toBe('function')
})

it('should add currency to a string', () => {
    const localVue = createLocalVue()
    localVue.use(currency)
    expect(localVue.prototype.$morphCurrency('100', 'PHP')).toEqual('₱100')
})
