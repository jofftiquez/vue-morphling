import Vue from 'vue';
import { createLocalVue } from '@vue/test-utils'
import { fileSize } from '../../src/filters/file-size'

it('adds a $morphFileSize method to the Vue prototype', () => {
    const localVue = createLocalVue()
    localVue.use(fileSize)
    expect(typeof localVue.prototype.$morphFileSize).toBe('function')
})

it('should format a file size value', () => {
    const localVue = createLocalVue()
    localVue.use(fileSize)
    expect(localVue.prototype.$morphFileSize(1024)).toEqual('1.0 Kb')
})
