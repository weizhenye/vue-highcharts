import HighchartsOnly from 'highcharts';
import ctors from './constructors.js';
import create from './create.js';

export default function install(Vue, options) {
  var Highcharts = (options && options.Highcharts) || HighchartsOnly;
  for (var name in ctors) {
    var component = create(name, Highcharts);
    component && Vue.component(name, component);
  }
}

if (typeof window !== 'undefined' && window.Vue && window.Highcharts) {
  install(window.Vue, window.Highcharts);
}

export { create as genComponent };
