export default (Vue) => {
    Vue.filter('morph-json', (value, indent) => {
        return json(value, indent);
    });

    Vue.prototype.$morphJson = (value, indent) => {
        return json(value, indent);
    };

    function json(value, indent) {
        return JSON.stringify(value, null, indent);
    }
};