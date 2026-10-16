<script setup>
import { computed, ref } from 'vue'
import { morphFilters } from 'vue-morphling'

const title = ref('one more light')
const shout = computed(() => morphFilters.uppercase(title.value))
const size = computed(() => morphFilters.fileSize(1024 * 1024 * 3))
</script>

<template>
  <section>
    <h2><code>morphFilters</code> inside <code>&lt;script setup&gt;</code> (Vue 2.7)</h2>
    <table>
      <tr><th></th><th>script</th><th>rendered</th></tr>
      <tr><td class="st"></td><td><code>computed(() =&gt; morphFilters.uppercase(title.value))</code></td><td class="out" data-expect="ONE MORE LIGHT">{{ shout }}</td></tr>
      <tr><td class="st"></td><td><code>computed(() =&gt; morphFilters.fileSize(1024 * 1024 * 3))</code></td><td class="out" data-expect="3 MB">{{ size }}</td></tr>
    </table>
  </section>
</template>
