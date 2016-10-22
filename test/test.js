/**
 * See https://github.com/npm/npm/issues/5499
 *
 * For it's impossible to install multiple versions of a dependency,
 * only latest version of Vue and Highcharts will be tested.
 *
 * Old version of Vue and Highcharts should be tested manually.
 */

/* global expect, Vue, Highcharts, VueHighcharts */
/* eslint-env mocha */
/* eslint max-len: 0 */
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
      expect(vm.$el.querySelector('.highcharts-root')).to.exist;
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

  it('should destroy the chart instance when vm destroyed', function(done) {
    var chart = null;
    var renderer = null;
    var el = null;
    var vm = new Vue({
      el: document.createElement('div'),
      template:
        '<div>' +
          '<highcharts :options="{}" ref="highcharts"></highcharts>' +
          '<highcharts-renderer :width="400" :height="300" ref="highchartsRenderer"></highcharts-renderer>' +
        '</div>',
      beforeDestroy: function() {
        el = vm.$el;
        chart = vm.$refs.highcharts.chart;
        renderer = vm.$refs.highchartsRenderer.renderer;
        expect(el.querySelector('.highcharts-root')).to.exist;
        expect(chart).to.not.be.empty;
        expect(renderer).to.not.be.empty;
      },
      destroyed: function() {
        this.$nextTick(function() {
          expect(el.querySelector('.highcharts-root')).to.not.exist;
          expect(chart).to.be.empty;
          expect(renderer).to.be.empty;
          done();
        });
      }
    });
    vm.$destroy();
  });

  it('should watch `options`', function(done) {
    var vm = new Vue({
      el: document.createElement('div'),
      template: '<highcharts :options="options" ref="highcharts"></highcharts>',
      data: {
        options: { title: { text: 'origin' } }
      }
    });
    expect(vm.$refs.highcharts.chart.title.textStr).to.equal('origin');
    vm.options.title.text = 'changed';
    vm.$nextTick(function() {
      expect(vm.$refs.highcharts.chart.title.textStr).to.equal('changed');
      done();
    });
  });

  it('should watch `width` and `height`', function(done) {
    var vm = new Vue({
      el: document.createElement('div'),
      template: '<highcharts-renderer :width="width" :height="height" ref="highchartsRenderer"></highcharts-renderer>',
      data: {
        width: 100,
        height: 100
      }
    });
    expect(vm.$refs.highchartsRenderer.renderer.width).to.equal(100);
    expect(vm.$refs.highchartsRenderer.renderer.height).to.equal(100);
    vm.width = 400;
    vm.height = 300;
    vm.$nextTick(function() {
      expect(vm.$refs.highchartsRenderer.renderer.width).to.equal(400);
      expect(vm.$refs.highchartsRenderer.renderer.height).to.equal(300);
      done();
    });
  });
});
