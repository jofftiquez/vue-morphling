import Vue from 'vue';
import { createLocalVue } from '@vue/test-utils'
import { reverse } from '../../src/filters/reverse'

it('adds a $morphReverse method to the Vue prototype', () => {
    const localVue = createLocalVue()
    localVue.use(reverse)
    expect(typeof localVue.prototype.$morphReverse).toBe('function')
})

it('should reverse a string', () => {
    const localVue = createLocalVue()
    localVue.use(reverse)
    expect(localVue.prototype.$morphReverse('Shadow of the day')).toEqual('yad eht fo wodahS')
})