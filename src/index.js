import Highcharts from 'highcharts';
import highcharts from './components/highcharts.js';

function install(Vue) {
  Vue.prototype.Highcharts = Highcharts;
  Vue.component('highcharts', highcharts);
}

export default install;
