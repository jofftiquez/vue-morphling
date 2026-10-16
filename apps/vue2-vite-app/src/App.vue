<script>
import Vue from 'vue'
import pkg from 'vue-morphling/package.json'
import ScriptSetupDemo from './ScriptSetupDemo.vue'
import { runChecks } from './dogfood-checks.js'

export default {
  components: { ScriptSetupDemo },
  data () {
    return {
      version: Vue.version,
      pkgVersion: pkg.version,
      mode: import.meta.env.DEV ? 'vite dev' : 'vite build + preview',
      birthday: new Date(new Date().getFullYear() - 30, 0, 1),
      objects: [{ a: 4 }, { a: 6 }, { a: 2 }],
      list: [1, 2, 3],
      name: 'numb',
      comment: '<img src=x onerror="window.pwned = (window.pwned || 0) + 1"> nice! https://vuejs.org'
    }
  },
  computed: {
    // Vue.prototype.$morph* from script code
    viaThis () {
      return {
        Age: this.$morphAge(this.birthday),
        ArrReverse: this.$morphArrReverse([1, 2, 3]).join(', '),
        ArrSort: this.$morphArrSort(this.objects, 'a', 'asc').map(o => o.a).join(', '),
        Capitalize: this.$morphCapitalize('numb'),
        Chop: this.$morphChop('Papercut', 3),
        Currency: this.$morphCurrency(100, 'PHP'),
        DateFormat: this.$morphDateFormat(new Date(2017, 6, 26), 'MMM dd, yyyy'),
        FileSize: this.$morphFileSize(1536),
        Json: this.$morphJson({ band: 'Linkin Park' }),
        Lowercase: this.$morphLowercase('LOST IN THE ECHO'),
        ObjectSize: this.$morphObjectSize({ a: 'test obj size' }),
        Placeholder: this.$morphPlaceholder('Battle Symphony', 'New Divide'),
        Replace: this.$morphReplace('I gave up', 'gave', 'never give'),
        Reverse: this.$morphReverse('Shadow of the day'),
        Sandwich: this.$morphSandwich('the', 'In ', ' end!'),
        Truncate: this.$morphTruncate('Leave out all the rest', 11),
        Uppercase: this.$morphUppercase('somewhere i belong')
      }
    }
  },
  mounted () { this.recheck() },
  methods: {
    recheck () { this.$nextTick(() => setTimeout(() => runChecks(this.$el, `Vue ${this.version} + Vite (${this.mode})`), 50)) },
    typeName () { this.name = 'in the end'; this.recheck() },
    addItem () { this.list.push(this.list.length + 1); this.recheck() }
  }
}
</script>

<template>
  <div class="wrap">
    <h1>vue-morphling dogfood
      <span class="pill green">Vue {{ version }}</span>
      <span class="pill">Vite · {{ mode }}</span>
      <span class="pill">vue-morphling {{ pkgVersion }} (packed tarball of chore/v2-modernize)</span>
    </h1>
    <p class="sub"><code>Vue.use(VueMorphling)</code>: classic Vue 2 pipe filters, <code>this.$morph*</code> prototype methods and <code>&lt;script setup&gt;</code> (2.7).</p>
    <div class="banner pending">running checks…</div>

    <section>
      <h2>Filters via the pipe syntax: <code v-pre>{{ value | morph-x }}</code></h2>
      <table>
        <tr><th></th><th>template</th><th>rendered</th></tr>
        <tr><td class="st"></td><td v-pre><code>{{ birthday | morph-age }}  // Jan 1, 30 years ago</code></td><td class="out" data-expect="30">{{ birthday | morph-age }}</td></tr>
        <tr><td class="st"></td><td v-pre><code>{{ [1, 2, 3] | morph-arr-reverse }}</code></td><td class="out" :data-expect="JSON.stringify([3, 2, 1], null, 2)">{{ [1, 2, 3] | morph-arr-reverse }}</td></tr>
        <tr><td class="st"></td><td v-pre><code>{{ objects | morph-arr-sort('a', 'asc') }}</code></td><td class="out" :data-expect="JSON.stringify([{ a: 2 }, { a: 4 }, { a: 6 }], null, 2)">{{ objects | morph-arr-sort('a', 'asc') }}</td></tr>
        <tr><td class="st"></td><td v-pre><code>{{ 'numb' | morph-capitalize }}</code></td><td class="out" data-expect="Numb">{{ 'numb' | morph-capitalize }}</td></tr>
        <tr><td class="st"></td><td v-pre><code>{{ 'Papercut' | morph-chop(3) }}</code></td><td class="out" data-expect="Paper">{{ 'Papercut' | morph-chop(3) }}</td></tr>
        <tr><td class="st"></td><td v-pre><code>{{ 100 | morph-currency('PHP') }}</code></td><td class="out" data-expect="₱100">{{ 100 | morph-currency('PHP') }}</td></tr>
        <tr><td class="st"></td><td v-pre><code>{{ new Date(2017, 6, 26) | morph-date-format('MMM dd, yyyy') }}</code></td><td class="out" data-expect="Jul 26, 2017">{{ new Date(2017, 6, 26) | morph-date-format('MMM dd, yyyy') }}</td></tr>
        <tr><td class="st"></td><td v-pre><code>{{ 1536 | morph-file-size }}</code></td><td class="out" data-expect="1.5 KB">{{ 1536 | morph-file-size }}</td></tr>
        <tr><td class="st"></td><td v-pre><code>{{ { band: 'Linkin Park' } | morph-json }}</code></td><td class="out" data-expect="{&quot;band&quot;:&quot;Linkin Park&quot;}">{{ { band: 'Linkin Park' } | morph-json }}</td></tr>
        <tr><td class="st"></td><td v-pre><code>{{ 'LOST IN THE ECHO' | morph-lowercase }}</code></td><td class="out" data-expect="lost in the echo">{{ 'LOST IN THE ECHO' | morph-lowercase }}</td></tr>
        <tr><td class="st"></td><td v-pre><code>{{ { a: 'test obj size' } | morph-object-size }}</code></td><td class="out" data-expect="21 B">{{ { a: 'test obj size' } | morph-object-size }}</td></tr>
        <tr><td class="st"></td><td v-pre><code>{{ 'Battle Symphony' | morph-placeholder('New Divide') }}</code></td><td class="out" data-expect="New Divide">{{ 'Battle Symphony' | morph-placeholder('New Divide') }}</td></tr>
        <tr><td class="st"></td><td v-pre><code>{{ 'I gave up' | morph-replace('gave', 'never give') }}</code></td><td class="out" data-expect="I never give up">{{ 'I gave up' | morph-replace('gave', 'never give') }}</td></tr>
        <tr><td class="st"></td><td v-pre><code>{{ 'Shadow of the day' | morph-reverse }}</code></td><td class="out" data-expect="yad eht fo wodahS">{{ 'Shadow of the day' | morph-reverse }}</td></tr>
        <tr><td class="st"></td><td v-pre><code>{{ 'the' | morph-sandwich('In ', ' end!') }}</code></td><td class="out" data-expect="In the end!">{{ 'the' | morph-sandwich('In ', ' end!') }}</td></tr>
        <tr><td class="st"></td><td v-pre><code>{{ 'Leave out all the rest' | morph-truncate(11) }}</code></td><td class="out" data-expect="Leave out a…">{{ 'Leave out all the rest' | morph-truncate(11) }}</td></tr>
        <tr><td class="st"></td><td v-pre><code>{{ 'somewhere i belong' | morph-uppercase }}</code></td><td class="out" data-expect="SOMEWHERE I BELONG">{{ 'somewhere i belong' | morph-uppercase }}</td></tr>
      </table>
    </section>

    <section>
      <h2>Filters via <code>this.$morph*</code> (Vue.prototype) in a computed property</h2>
      <table>
        <tr><th></th><th>script</th><th>rendered</th></tr>
        <tr><td class="st"></td><td><code>this.$morphAge(birthday)</code></td><td class="out" data-expect="30">{{ viaThis.Age }}</td></tr>
        <tr><td class="st"></td><td><code>this.$morphArrReverse([1, 2, 3]).join(', ')</code></td><td class="out" data-expect="3, 2, 1">{{ viaThis.ArrReverse }}</td></tr>
        <tr><td class="st"></td><td><code>this.$morphArrSort(objects, 'a', 'asc').map(o =&gt; o.a).join(', ')</code></td><td class="out" data-expect="2, 4, 6">{{ viaThis.ArrSort }}</td></tr>
        <tr><td class="st"></td><td><code>this.$morphCapitalize('numb')</code></td><td class="out" data-expect="Numb">{{ viaThis.Capitalize }}</td></tr>
        <tr><td class="st"></td><td><code>this.$morphChop('Papercut', 3)</code></td><td class="out" data-expect="Paper">{{ viaThis.Chop }}</td></tr>
        <tr><td class="st"></td><td><code>this.$morphCurrency(100, 'PHP')</code></td><td class="out" data-expect="₱100">{{ viaThis.Currency }}</td></tr>
        <tr><td class="st"></td><td><code>this.$morphDateFormat(new Date(2017, 6, 26), 'MMM dd, yyyy')</code></td><td class="out" data-expect="Jul 26, 2017">{{ viaThis.DateFormat }}</td></tr>
        <tr><td class="st"></td><td><code>this.$morphFileSize(1536)</code></td><td class="out" data-expect="1.5 KB">{{ viaThis.FileSize }}</td></tr>
        <tr><td class="st"></td><td><code>this.$morphJson({ band: 'Linkin Park' })</code></td><td class="out" data-expect="{&quot;band&quot;:&quot;Linkin Park&quot;}">{{ viaThis.Json }}</td></tr>
        <tr><td class="st"></td><td><code>this.$morphLowercase('LOST IN THE ECHO')</code></td><td class="out" data-expect="lost in the echo">{{ viaThis.Lowercase }}</td></tr>
        <tr><td class="st"></td><td><code>this.$morphObjectSize({ a: 'test obj size' })</code></td><td class="out" data-expect="21 B">{{ viaThis.ObjectSize }}</td></tr>
        <tr><td class="st"></td><td><code>this.$morphPlaceholder('Battle Symphony', 'New Divide')</code></td><td class="out" data-expect="New Divide">{{ viaThis.Placeholder }}</td></tr>
        <tr><td class="st"></td><td><code>this.$morphReplace('I gave up', 'gave', 'never give')</code></td><td class="out" data-expect="I never give up">{{ viaThis.Replace }}</td></tr>
        <tr><td class="st"></td><td><code>this.$morphReverse('Shadow of the day')</code></td><td class="out" data-expect="yad eht fo wodahS">{{ viaThis.Reverse }}</td></tr>
        <tr><td class="st"></td><td><code>this.$morphSandwich('the', 'In ', ' end!')</code></td><td class="out" data-expect="In the end!">{{ viaThis.Sandwich }}</td></tr>
        <tr><td class="st"></td><td><code>this.$morphTruncate('Leave out all the rest', 11)</code></td><td class="out" data-expect="Leave out a…">{{ viaThis.Truncate }}</td></tr>
        <tr><td class="st"></td><td><code>this.$morphUppercase('somewhere i belong')</code></td><td class="out" data-expect="SOMEWHERE I BELONG">{{ viaThis.Uppercase }}</td></tr>
      </table>
    </section>

    <section>
      <h2>Directives (Vue 2 <code>bind</code> hook)</h2>
      <table>
        <tr><th></th><th>template</th><th>rendered</th></tr>
        <tr><td class="st"></td><td v-pre><code>&lt;p v-morph-url&gt;Docs: https://v2.vuejs.org and https://vite.dev&lt;/p&gt;</code></td><td class="out" data-check="a[href^=http]:2"><p v-morph-url>Docs: https://v2.vuejs.org and https://vite.dev</p></td></tr>
        <tr><td class="st"></td><td v-pre><code>&lt;p v-morph-email&gt;Mail a@x.io or b@y.io&lt;/p&gt;</code></td><td class="out" data-check="a[href^=mailto]:2"><p v-morph-email>Mail a@x.io or b@y.io</p></td></tr>
        <tr><td class="st"></td><td v-pre><code>&lt;p v-morph-highlight="'numb::yellow'"&gt;Numb, so numb&lt;/p&gt;</code></td><td class="out" data-check="mark:2"><p v-morph-highlight="'numb::yellow'">Numb, so numb</p></td></tr>
        <tr><td class="st"></td><td v-pre><code>&lt;p v-morph-url&gt;{{ comment }}&lt;/p&gt;  // comment has &lt;img onerror&gt;</code></td><td class="out" data-check="img:0,a:1" data-no-script><p v-morph-url>{{ comment }}</p></td></tr>
      </table>
    </section>

    <section>
      <h2>Reactivity</h2>
      <table>
        <tr><th></th><th>template</th><th>rendered</th></tr>
        <tr><td class="st"></td><td v-pre><code>{{ name | morph-capitalize }}</code></td><td class="out" :data-expect="name.charAt(0).toUpperCase() + name.slice(1)">{{ name | morph-capitalize }}</td></tr>
        <tr><td class="st"></td><td v-pre><code>{{ $morphArrReverse(list).join(', ') }}  // reactive data</code></td><td class="out" :data-expect="list.slice().reverse().join(', ')">{{ $morphArrReverse(list).join(', ') }}</td></tr>
        <tr><td class="st"></td><td v-pre><code>{{ list.join(', ') }}  // the filter must not mutate list</code></td><td class="out" :data-expect="Array.from({ length: list.length }, (_, i) => i + 1).join(', ')">{{ list.join(', ') }}</td></tr>
      </table>
      <div class="row">
        <input v-model="name" aria-label="name" />
        <button id="type" @click="typeName">type "in the end"</button>
        <button id="push" @click="addItem">push item</button>
      </div>
    </section>

    <ScriptSetupDemo />
  </div>
</template>
