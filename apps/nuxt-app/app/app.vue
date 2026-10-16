<script setup lang="ts">
import { computed, nextTick, onMounted, ref, version } from 'vue'
import { morphFilters } from 'vue-morphling'
import pkg from 'vue-morphling/package.json'
import { runChecks } from './dogfood-checks.js'

const thisYear = new Date().getFullYear()
const birthday = new Date(thisYear - 30, 0, 1)
const list = ref([1, 2, 3])
const objects = [{ a: 4 }, { a: 6 }, { a: 2 }]
const name = ref('numb')
const comment = '<img src=x onerror="window.pwned = (window.pwned || 0) + 1"> nice! https://vuejs.org'
const reversedLive = computed(() => morphFilters.arrReverse(list.value).join(', '))
const mode = import.meta.dev ? 'nuxt dev' : 'nuxt build + preview'
const nuxtVersion = useNuxtApp().versions?.nuxt

const root = ref<HTMLElement>()
const recheck = () => nextTick(() => setTimeout(() => runChecks(root.value!, `Nuxt ${nuxtVersion} · Vue ${version} SSR (${mode})`), 50))
onMounted(recheck)
function addItem () { list.value.push(list.value.length + 1) }
function typeName () { name.value = 'in the end' }
</script>

<template>
  <div class="wrap" ref="root">
    <h1>vue-morphling dogfood
      <span class="pill green">Vue {{ version }}</span>
      <span class="pill green">Nuxt {{ nuxtVersion }}</span>
      <span class="pill">SSR · {{ mode }}</span>
      <span class="pill">vue-morphling {{ pkg.version }} (packed tarball of chore/v2-modernize)</span>
    </h1>
    <p class="sub">Registered in <code>plugins/morphling.ts</code> with <code>nuxtApp.vueApp.use(VueMorphling)</code>. Filters are rendered on the <b>server</b> (see the SSR proof in the issue), then hydrated. Directives run on the client in <code>mounted</code>.</p>
    <div class="banner pending">running checks…</div>

    <section>
      <h2>Filters as global properties: <code>{{ '{' + '{ $morphX(…) }' + '}' }}</code></h2>
      <table><tbody>
        <tr><th></th><th>template</th><th>rendered</th></tr>
        <tr><td class="st"></td><td v-pre><code>{{ $morphAge(birthday) }}  // Jan 1, 30 years ago</code></td><td class="out" data-expect="30">{{ $morphAge(birthday) }}</td></tr>
        <tr><td class="st"></td><td v-pre><code>{{ $morphArrReverse([1, 2, 3]).join(', ') }}</code></td><td class="out" data-expect="3, 2, 1">{{ $morphArrReverse([1, 2, 3]).join(', ') }}</td></tr>
        <tr><td class="st"></td><td v-pre><code>{{ $morphArrSort(objects, 'a', 'asc').map(o => o.a).join(', ') }}</code></td><td class="out" data-expect="2, 4, 6">{{ $morphArrSort(objects, 'a', 'asc').map(o => o.a).join(', ') }}</td></tr>
        <tr><td class="st"></td><td v-pre><code>{{ $morphCapitalize('numb') }}</code></td><td class="out" data-expect="Numb">{{ $morphCapitalize('numb') }}</td></tr>
        <tr><td class="st"></td><td v-pre><code>{{ $morphChop('Papercut', 3) }}</code></td><td class="out" data-expect="Paper">{{ $morphChop('Papercut', 3) }}</td></tr>
        <tr><td class="st"></td><td v-pre><code>{{ $morphCurrency(100, 'PHP') }}</code></td><td class="out" data-expect="₱100">{{ $morphCurrency(100, 'PHP') }}</td></tr>
        <tr><td class="st"></td><td v-pre><code>{{ $morphDateFormat(new Date(2017, 6, 26), 'MMM dd, yyyy') }}</code></td><td class="out" data-expect="Jul 26, 2017">{{ $morphDateFormat(new Date(2017, 6, 26), 'MMM dd, yyyy') }}</td></tr>
        <tr><td class="st"></td><td v-pre><code>{{ $morphFileSize(1536) }}</code></td><td class="out" data-expect="1.5 KB">{{ $morphFileSize(1536) }}</td></tr>
        <tr><td class="st"></td><td v-pre><code>{{ $morphJson({ band: 'Linkin Park' }) }}</code></td><td class="out" data-expect='{"band":"Linkin Park"}'>{{ $morphJson({ band: 'Linkin Park' }) }}</td></tr>
        <tr><td class="st"></td><td v-pre><code>{{ $morphLowercase('LOST IN THE ECHO') }}</code></td><td class="out" data-expect="lost in the echo">{{ $morphLowercase('LOST IN THE ECHO') }}</td></tr>
        <tr><td class="st"></td><td v-pre><code>{{ $morphObjectSize({ a: 'test obj size' }) }}</code></td><td class="out" data-expect="21 B">{{ $morphObjectSize({ a: 'test obj size' }) }}</td></tr>
        <tr><td class="st"></td><td v-pre><code>{{ $morphPlaceholder('Battle Symphony', 'New Divide') }}</code></td><td class="out" data-expect="New Divide">{{ $morphPlaceholder('Battle Symphony', 'New Divide') }}</td></tr>
        <tr><td class="st"></td><td v-pre><code>{{ $morphReplace('I gave up', 'gave', 'never give') }}</code></td><td class="out" data-expect="I never give up">{{ $morphReplace('I gave up', 'gave', 'never give') }}</td></tr>
        <tr><td class="st"></td><td v-pre><code>{{ $morphReverse('Shadow of the day') }}</code></td><td class="out" data-expect="yad eht fo wodahS">{{ $morphReverse('Shadow of the day') }}</td></tr>
        <tr><td class="st"></td><td v-pre><code>{{ $morphSandwich('the', 'In ', ' end!') }}</code></td><td class="out" data-expect="In the end!">{{ $morphSandwich('the', 'In ', ' end!') }}</td></tr>
        <tr><td class="st"></td><td v-pre><code>{{ $morphTruncate('Leave out all the rest', 11) }}</code></td><td class="out" data-expect="Leave out a…">{{ $morphTruncate('Leave out all the rest', 11) }}</td></tr>
        <tr><td class="st"></td><td v-pre><code>{{ $morphUppercase('somewhere i belong') }}</code></td><td class="out" data-expect="SOMEWHERE I BELONG">{{ $morphUppercase('somewhere i belong') }}</td></tr>
      </tbody></table>
    </section>

    <section>
      <h2>Directives (Vue 3 <code>mounted</code> hook)</h2>
      <table><tbody>
        <tr><th></th><th>template</th><th>rendered</th></tr>
        <tr><td class="st"></td><td v-pre><code>&lt;p v-morph-url&gt;Docs: https://vuejs.org and https://vite.dev&lt;/p&gt;</code></td><td class="out" data-check="a[href^=http]:2"><p v-morph-url>Docs: https://vuejs.org and https://vite.dev</p></td></tr>
        <tr><td class="st"></td><td v-pre><code>&lt;p v-morph-email&gt;Mail a@x.io or b@y.io&lt;/p&gt;</code></td><td class="out" data-check="a[href^=mailto]:2"><p v-morph-email>Mail a@x.io or b@y.io</p></td></tr>
        <tr><td class="st"></td><td v-pre><code>&lt;p v-morph-highlight="'numb::yellow'"&gt;Numb, so numb&lt;/p&gt;</code></td><td class="out" data-check="mark:2"><p v-morph-highlight="'numb::yellow'">Numb, so numb</p></td></tr>
        <tr><td class="st"></td><td v-pre><code>&lt;p v-morph-url&gt;{{ comment }}&lt;/p&gt;  // comment has &lt;img onerror&gt;</code></td><td class="out" data-check="img:0,a:1" data-no-script><p v-morph-url>{{ comment }}</p></td></tr>
      </tbody></table>
    </section>

    <section>
      <h2>Reactivity</h2>
      <table><tbody>
        <tr><th></th><th>template</th><th>rendered</th></tr>
        <tr><td class="st"></td><td v-pre><code>{{ $morphCapitalize(name) }}</code></td><td class="out" :data-expect="name.charAt(0).toUpperCase() + name.slice(1)">{{ $morphCapitalize(name) }}</td></tr>
        <tr><td class="st"></td><td v-pre><code>{{ $morphArrReverse(list).join(', ') }}  // reactive ref</code></td><td class="out" :data-expect="list.slice().reverse().join(', ')">{{ $morphArrReverse(list).join(', ') }}</td></tr>
        <tr><td class="st"></td><td v-pre><code>{{ list.join(', ') }}  // the filter must not mutate list</code></td><td class="out" :data-expect="Array.from({ length: list.length }, (_, i) => i + 1).join(', ')">{{ list.join(', ') }}</td></tr>
      </tbody></table>
      <div class="row">
        <input v-model="name" aria-label="name" />
        <button id="type" @click="typeName(); recheck()">type "in the end"</button>
        <button id="push" @click="addItem(); recheck()">push item</button>
        <span>computed via <code>morphFilters.arrReverse</code>: {{ reversedLive }}</span>
      </div>
    </section>

    <ScriptSetupDemo />
  </div>
</template>
