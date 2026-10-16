import { vMorphEmail as email } from '../../index';
import { targets } from '../../../test/vue';

describe.each(targets)('v-morph-email on $name', (target) => {
  let vue;
  beforeEach(() => { vue = target.install(email); });

  const links = el => [...el.querySelectorAll('a')].map(a => a.getAttribute('href'));

  it('turns an email address into a mailto link', () => {
    const el = vue.render('<p v-morph-email>Mail jo@example.com today</p>');
    expect(links(el)).toEqual(['mailto:jo@example.com']);
    expect(el.textContent).toBe('Mail jo@example.com today');
  });

  it('turns every address into a link', () => {
    const el = vue.render('<p v-morph-email>a@x.io, b@y.io and c@z.io</p>');
    expect(links(el)).toEqual(['mailto:a@x.io', 'mailto:b@y.io', 'mailto:c@z.io']);
  });

  it('does not log debug output', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    vue.render('<p v-morph-email>a@x.io b@y.io</p>');
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it('does not turn interpolated text into HTML (XSS)', () => {
    const text = '<img src=x onerror="window.pwned=1"> jo@example.com';
    const el = vue.render('<p v-morph-email>{{ text }}</p>', { text });
    expect(el.querySelector('img')).toBeNull();
    expect(el.textContent).toBe(text);
  });
});
