(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('highcharts')) :
  typeof define === 'function' && define.amd ? define(['highcharts'], factory) :
  (global.VueHighcharts = factory(global.Highcharts));
}(this, (function (HighchartsOnly) { 'use strict';

HighchartsOnly = 'default' in HighchartsOnly ? HighchartsOnly['default'] : HighchartsOnly;

var ctors = {
  highcharts: 'Chart',
  highstock: 'StockChart',
  highmaps: 'Map',
  'highcharts-renderer': 'Renderer'
};

function create(tagName, Highcharts) {
  var Ctor = Highcharts[ctors[tagName]];
  if (!Ctor) {
    return null;
  }
  var isRenderer = tagName === 'highcharts-renderer';
  return {
    name: tagName,
    template: '<div></div>',
    props: isRenderer
      ? {
          width: { type: Number, required: true },
          height: { type: Number, required: true }
        }
      : { options: { type: Object, required: true } },
    methods: {
      _renderChart: function() {
        if (isRenderer) {
          this.renderer = new Ctor(this.$el, this.width, this.height);
        } else {
          var opts = JSON.parse(JSON.stringify(this.options));
          opts.chart = opts.chart || {};
          opts.chart.renderTo = this.$el;
          this.chart = new Ctor(opts);
        }
      }
    },
    mounted: function() {
      this._renderChart();
    },
    beforeDestroy: function() {
      !isRenderer && this.chart.destroy();
    }
  };
}

function install(Vue, options) {
  var Highcharts = (options && options.Highcharts) || HighchartsOnly;
  Vue.prototype.Highcharts = Highcharts;
  for (var tagName in ctors) {
    var component = create(tagName, Highcharts);
    component && Vue.component(tagName, component);
  }
}

return install;

})));
