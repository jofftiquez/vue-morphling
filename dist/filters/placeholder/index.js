'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = Vue => {
    Vue.filter('morph-placeholder', (value, placeholder) => {
        if (!value) return;
        return replace(value, placeholder);
    });

    Vue.prototype.$morphPlaceholder = (value, placeholder) => {
        console.log(placeholder);
        return replace(value, placeholder);
    };

    function replace(value, placeholder) {
        return placeholder;
    }
};