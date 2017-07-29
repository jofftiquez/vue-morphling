import filters from './filters';
import directives from './directives';

const Morphling = {
    install(Vue, options) {
       filters(Vue, options);
       directives(Vue);
    }
}

export default Morphling;