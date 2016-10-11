import HighchartsOnly from 'highcharts';
import create from './create.js';

function install(Vue, options) {
  var Highcharts = (options && options.Highcharts) || HighchartsOnly;
  Vue.prototype.Highcharts = Highcharts;
  ['highcharts', 'highstock', 'highmaps'].forEach(function(tagName) {
    var component = create(tagName, Highcharts);
    component && Vue.component(tagName, component);
  });
}

export default install;
