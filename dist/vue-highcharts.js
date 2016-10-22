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
      _init: function() {
        this._renderChart();
        if (isRenderer) {
          this.$watch('width', this._renderChart);
          this.$watch('height', this._renderChart);
        } else {
          this.$watch('options', this._renderChart, { deep: true });
        }
      },
      _renderChart: function() {
        if (isRenderer) {
          this.renderer && this.$el.removeChild(this.renderer.box);
          this.renderer = new Ctor(this.$el, this.width, this.height);
        } else {
          var opts = {};
          for (var property in this.options) {
            opts[property] = this.options[property];
          }
          this.chart = new Ctor(this.$el, opts);
        }
      }
    },
    mounted: function() {
      this._init();
    },
    beforeDestroy: function() {
      if (isRenderer) {
        this.$el.removeChild(this.renderer.box);
        for (var property in this.renderer) {
          delete this.renderer[property];
        }
        this.renderer = null;
      } else {
        this.chart.destroy();
      }
    },
    // compat Vue v1.x
    ready: function() {
      this._init();
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
