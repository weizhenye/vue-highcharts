/**
 * See https://github.com/npm/npm/issues/5499
 *
 * For it's impossible to install multiple versions of a dependency,
 * only latest version of Vue will be tested.
 *
 * Vue v1.x should be tested manually.
 */

import VueHighcharts from '../src/index.js';

/* istanbul ignore next */
describe('vue-highcharts', function() {
  var createVM = function(template) {
    return new Vue({
      el: document.createElement('div'),
      template: template
    });
  };
  var componentHelper = function(done, template) {
    var vm = createVM(template);
    vm.$nextTick(function() {
      expect(this.$el.querySelector('.highcharts-root')).to.exist;
      done();
    });
  };

  before(function() {
    Vue.use(VueHighcharts, { Highcharts: Highcharts });
  });

  it('should support <highcharts> component', function(done) {
    componentHelper(done, '<highcharts :options="{}"></highcharts>');
  });

  it('should support <highstock> component', function(done) {
    componentHelper(done, '<highstock :options="{}"></highstock>');
  });

  it('should support <highstock> component', function(done) {
    componentHelper(done, '<highstock :options="{}"></highstock>');
  });

  it('should support <highcharts-renderer> component', function(done) {
    componentHelper(done, '<highcharts-renderer :width="400" :height="300"></highcharts-renderer>');
  });

  it('can access the `chart` instance via refs', function(done) {
    var vm = createVM('<highcharts :options="{}" ref="highcharts"></highcharts>');
    vm.$nextTick(function() {
      expect(vm.$refs.highcharts.chart).to.be.an('object');
      done();
    });
  });

  it('can access the `renderer` instance via refs', function(done) {
    var vm = createVM('<highcharts-renderer :width="400" :height="300" ref="highchartsRenderer"></highcharts-renderer>');
    vm.$nextTick(function() {
      expect(vm.$refs.highchartsRenderer.renderer).to.be.an('object');
      done();
    });
  });
});
