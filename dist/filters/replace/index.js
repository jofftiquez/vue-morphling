'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = Vue => {
    Vue.filter('morph-replace', (value, replacee, replacer) => {
        if (!value) return;
        return replace(value, replacee, replacer);
    });

    Vue.prototype.$morphReplace = (value, replacee, replacer) => {
        return replace(value, replacee, replacer);
    };

    function replace(value, replacee, replacer) {
        return value.replace(replacee, replacer);
    }
};