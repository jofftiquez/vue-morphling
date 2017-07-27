export default (Vue) => {
    Vue.filter('morph-sandwich', (value, start, end) => {
        return sandwich(value, start, end);
    });

    Vue.prototype.$morphSandwich = (value, start, end) => {
        return sandwich(value, start, end);
    };

    function sandwich(value, start, end) {
        return `${ start }${ value }${ end }`;
    }
};