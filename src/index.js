import filters from './filters';
import directives from './directives';

const VueMorphling = {
  install(Vue, options) {
    filters(Vue, options);
    directives(Vue);
  }
}

export default VueMorphling;