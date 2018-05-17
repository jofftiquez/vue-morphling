
export const highlight = (Vue) => {
  Vue.directive('morph-highlight', {
    bind
  });
  function bind(el, binding, vnode) {
    const str = vnode.elm.innerText;
    const highlightee = binding.value.split('::')[0];
    const highlighter = binding.value.split('::')[1];
    const regex = new RegExp(highlightee, 'gi');
    el.innerHTML = str.replace(regex, `<span style="background-color: ${ highlighter }">${ highlightee }</span>`)
  }
};