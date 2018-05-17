
export const url = (Vue) => {
  const re = /\b(https|http|ftp)?:\/\/\S+/gi

  Vue.directive('morph-url', {
    bind
  });

  function bind(el, binding, vnode) {
    var s = vnode.elm.innerText;
    const m = s.match(re);
    const a = [];
    var prev;

    if(!m) return;

    if(m.length === 1){
      el.innerHTML = s.replace(m[0], convertToA(m[0], binding));
      return;  
    }

    m.forEach((link, i, arr) => {
      if(i % 2 === 0) {
        prev = s.replace(link, convertToA(link, binding))
      } else {
        s = prev.replace(link, convertToA(link, binding))
      }
    });
    el.innerHTML = s;
  }

  function convertToA(link, binding) {
    return `<a target="_blank" href="${ link }" style="${ binding.value }">${ link }</a>`;
  }
};