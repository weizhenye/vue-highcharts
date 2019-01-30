/**
 * See https://github.com/npm/npm/issues/5499
 *
 * For it's impossible to install multiple versions of a dependency,
 * only latest version of Vue and Highcharts will be tested.
 *
 * Old version of Vue and Highcharts should be tested manually.
 */

/* global expect, Vue, Highcharts */
/* eslint-env mocha */
/* eslint-disable max-len, no-unused-expressions */

import VueHighcharts, { genComponent } from '../src/index.js';
import clone from '../src/clone.js';

describe('vue-highcharts', function () {
  var createVM = function (template) {
    return new Vue({
      el: document.createElement('div'),
      template: template
    });
  };
  var componentHelper = function (template) {
    var vm = createVM(template);
    return vm.$nextTick().then(function () {
      expect(vm.$el.querySelector('.highcharts-root')).to.exist;
    });
  };

  before(function () {
    Vue.use(VueHighcharts, { Highcharts: Highcharts });
  });

  it('should support <highcharts> component', function () {
    return componentHelper('<highcharts :options="{}"></highcharts>');
  });

  it('should support <highstock> component', function () {
    return componentHelper('<highstock :options="{}"></highstock>');
  });

  it('should support <highmaps> component', function () {
    return componentHelper('<highmaps :options="{}"></highmaps>');
  });

  it('should support <highcharts-gantt> component', function () {
    return componentHelper('<highcharts-gantt :options="{ series: [] }"></highcharts-gantt>');
  });

  it('can access the `chart` instance via refs', function () {
    var vm = createVM('<highcharts :options="{}" ref="highcharts"></highcharts>');
    return vm.$nextTick().then(function () {
      expect(vm.$refs.highcharts.chart).to.be.an('object');
    });
  });

  it('should destroy the chart instance when vm destroyed', function (done) {
    var chart = null;
    var el = null;
    var vm = new Vue({
      el: document.createElement('div'),
      template: '<div><highcharts :options="{}" ref="highcharts"></highcharts></div>',
      beforeDestroy: function () {
        el = vm.$el;
        chart = vm.$refs.highcharts.chart;
        expect(el.querySelector('.highcharts-root')).to.exist;
        expect(chart).to.not.be.empty;
      },
      destroyed: function () {
        this.$nextTick(function () {
          expect(el.querySelector('.highcharts-root')).to.not.exist;
          expect(chart).to.be.empty;
          done();
        });
      }
    });
    vm.$destroy();
  });

  it('should watch `options`', function () {
    var vm = new Vue({
      el: document.createElement('div'),
      template: '<highcharts :options="options" ref="highcharts"></highcharts>',
      data: {
        options: { title: { text: 'origin' } }
      }
    });
    expect(vm.$refs.highcharts.chart.title.textStr).to.equal('origin');
    vm.options.title.text = 'changed';
    return vm.$nextTick().then(function () {
      expect(vm.$refs.highcharts.chart.title.textStr).to.equal('changed');
    });
  });

  it('can generate single Componet', function () {
    var names = ['Highcharts', 'Highstock', 'Highmaps', 'HighchartsGantt'];
    names.forEach(function (name) {
      var Component = genComponent(name, window.Highcharts);
      expect(Component.name).to.equal(name);
    });
    var Unknown = genComponent('Unknown', window.Highcharts);
    expect(Unknown).to.not.exist;
  });
});

describe('clone', function () {
  it('should clone object', function () {
    var obj = {
      arr: [{ a: 1 }, 2, '3', null, undefined, false],
      num: 1,
      str: '2',
      bool: false,
      obj: { a: 1 }
    };
    expect(clone(obj)).to.deep.equal(obj);
  });
});
