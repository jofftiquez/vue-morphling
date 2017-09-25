'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = Vue => {
    Vue.filter('morph-truncate', (value, length) => {
        if (!value) return;
        return truncate(value, length);
    });

    Vue.prototype.$morphTruncate = (value, length) => {
        return truncate(value, length);
    };

    function truncate(value, length) {
        if (value.length < length) {
            console.warn('Morphling Warn: trucate value cannot be greater than string length.');
        }
        return `${value.substr(0, length)}...`;
    }
};