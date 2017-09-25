'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
const corpus = {
    '<': '>',
    '>': '<',
    '[': ']',
    ']': '[',
    '(': ')',
    ')': '(',
    '{': '}',
    '}': '{'
};
const corpusRegex = /(<|>|\[|\]|\(|\)|\{|\})/g;

exports.default = Vue => {
    Vue.filter('morph-sandwich', (value, start, end) => {
        if (!value) return;
        return sandwich(value, start, end);
    });

    Vue.prototype.$morphSandwich = (value, start, end) => {
        return sandwich(value, start, end);
    };

    function flip(str) {
        return str.replace(corpusRegex, match => corpus[match]).split('').reverse().join('');
    }

    function sandwich(value, start, end) {
        start = start || '';
        end = end || flip(start);

        return `${start}${value}${end}`;
    }
};