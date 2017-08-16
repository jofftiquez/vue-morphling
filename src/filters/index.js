import capitalize from './capitalize';
import chop from './chop';
import currency from './currency';
import date from './date';
import json from './json';
import lowercase from './lowercase';
import placeholder from './placeholder';
import replace from './replace';
import reverse from './reverse';
import sandwich from './sandwich';
import truncate from './truncate';
import uppercase from './uppercase';

export default (Vue) => {
    capitalize(Vue);
    chop(Vue);
    currency(Vue);
    date(Vue);
    json(Vue);
    lowercase(Vue);
    placeholder(Vue);
    replace(Vue);
    reverse(Vue);
    sandwich(Vue);
    truncate(Vue);
    uppercase(Vue);
};