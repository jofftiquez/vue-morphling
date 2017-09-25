'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = Vue => {
    Vue.filter('morph-uppercase', value => {
        if (!value) return;
        return value.toUpperCase();
    });

    Vue.prototype.$morphUppercase = value => {
        return value.toUpperCase();
    };
};