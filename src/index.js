import filters from './filters';
import directives from './directives';

const VueMorphling = {
  install(Vue, options) {
    if(options.only && options.only.directives && !!options.only.directives.length) {
      options.only.directives.forEach(item => {
        console.log(item);
        console.log(directives[item]);
        if(!!directives[item])
          directives[item](Vue);
      });
    }

    if(options.only && options.only.filters && !!options.only.filters.length) {
      options.only.filters.forEach(item => {
        console.log(item);
        console.log(filters[item]);
        if(!!filters[item])
          filters[item](Vue);
      });
    }

    if(options.only && (options.only.filters || options.only.directives)) return;

    for (const key in filters) {
      filters[key](Vue);
    }

    for (const key in directives) {
      directives[key](Vue);
    }
  }
}

export default VueMorphling;