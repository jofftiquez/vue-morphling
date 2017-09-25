'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = Vue => {
    Vue.filter('morph-json', (value, indent) => {
        if (!value) return;
        return json(value, indent);
    });

    Vue.prototype.$morphJson = (value, indent) => {
        return json(value, indent);
    };

    function json(value, indent) {
        return JSON.stringify(value, null, indent);
    }
};