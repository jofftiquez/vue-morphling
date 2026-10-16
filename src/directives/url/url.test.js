import { url } from './index';
import { targets } from '../../../test/vue';

describe.each(targets)('v-morph-url on $name', (target) => {
  let vue;
  beforeEach(() => { vue = target.install(url); });

  const links = el => [...el.querySelectorAll('a')].map(a => a.getAttribute('href'));

  it('turns a url into a link', () => {
    const el = vue.render('<p v-morph-url>Visit https://vuejs.org now</p>');
    expect(links(el)).toEqual(['https://vuejs.org']);
    expect(el.textContent).toBe('Visit https://vuejs.org now');
  });

  it('turns every url into a link', () => {
    const el = vue.render('<p v-morph-url>a http://a.io b https://b.io c ftp://c.io d</p>');
    expect(links(el)).toEqual(['http://a.io', 'https://b.io', 'ftp://c.io']);
  });

  it('handles the same url twice', () => {
    const el = vue.render('<p v-morph-url>https://a.io and https://a.io</p>');
    expect(links(el)).toEqual(['https://a.io', 'https://a.io']);
    expect(el.textContent).toBe('https://a.io and https://a.io');
  });

  it('applies the binding value as the link style', () => {
    const el = vue.render('<p v-morph-url="\'color: red\'">https://a.io</p>');
    expect(el.querySelector('a').getAttribute('style')).toBe('color: red');
  });

  it('leaves text without urls untouched', () => {
    const el = vue.render('<p v-morph-url>no links here</p>');
    expect(el.innerHTML).toBe('<p>no links here</p>');
  });

  it('does not turn interpolated text into HTML (XSS)', () => {
    const text = '<img src=x onerror="window.pwned=1"> see https://a.io';
    const el = vue.render('<p v-morph-url>{{ text }}</p>', { text });
    expect(el.querySelector('img')).toBeNull();
    expect(el.textContent).toBe(text);
    expect(links(el)).toEqual(['https://a.io']);
  });
});
