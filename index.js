import morphs from './morphs';

console.log('morphs', morphs)

const VueFilterStash = {
    install(Vue, options) {
       morphs(Vue, options);
    }
}

export default VueFilterStash;