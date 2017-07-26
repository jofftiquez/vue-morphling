export default (Vue) => {
    Vue.filter('morph-reverse', (value) => {
        return reverse(value);
    });

    Vue.prototype.$morphReverse = (value) => {
        return reverse(value);
    };

    function reverse(value) {
        if(typeof value !== 'string') value = value.toString();
        return value.split('').reverse().join('');
    }
};