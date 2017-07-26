export default (Vue) => {
    Vue.filter('morph-uppercase', (value) => {
        return value.toUpperCase();
    });

    Vue.prototype.$morphUppercase = (value) => {
        return value.toUpperCase();
    };
};