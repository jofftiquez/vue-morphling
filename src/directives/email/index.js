
export default (Vue) => {
    const re = /(?:[A-Za-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[A-Za-z0-9-]*[A-Za-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gi

    Vue.directive('morph-email', {
        bind
    });

    function bind(el, binding, vnode) {
        var s = vnode.elm.innerText;
        const m = s.match(re);
        const a = [];
        var prev;

        if(!m) return;

        console.warn(m)

        if(m.length === 1){
            el.innerHTML = s.replace(m[0], convertToA(m[0], binding));
            return;  
        }

        m.forEach((email, i, arr) => {
            console.warn(email)
            if(i % 2 === 0) {
                prev = s.replace(email, convertToA(email, binding));
            } else {
                s = prev.replace(email, convertToA(email, binding));
            }
        });
        el.innerHTML = s;
    }

    function convertToA(email, binding) {
        return `<a target="_blank" href="mailto:${ email }">${ email }</a>`;
    }
};