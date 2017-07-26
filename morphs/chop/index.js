export default (Vue) => {
    Vue.filter('morph-chop', (value, length, direction) => {
        return chop(value, length, direction);
    });

    Vue.prototype.$morphChop = (value, length, direction) => {
        return chop(value, length, direction);
    };

    function chop(value, length, direction) {
        if(!length) return 'Warn: argument length (number) is required. morph-chop(length, direction)'
        if(!direction) direction = 'end';
        if(typeof value !== 'string') value = value.toString();
        if(direction === 'end')
            return value.toString().slice(0, ~length+1)
        if(direction === 'start')
            return value.toString().substring(length);
    }
};