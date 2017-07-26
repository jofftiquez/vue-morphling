import capitalize from './capitalize';
import chop from './chop';
import date from './date';
import json from './json';
import lowercase from './lowercase';
import reverse from './reverse';
import uppercase from './uppercase';

export default (Vue) => {
    capitalize(Vue);
    chop(Vue);
    date(Vue);
    json(Vue);
    lowercase(Vue);
    reverse(Vue);
    uppercase(Vue);
};