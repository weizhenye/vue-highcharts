(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('highcharts')) :
  typeof define === 'function' && define.amd ? define(['highcharts'], factory) :
  (global.VueHighcharts = factory(global.Highcharts));
}(this, (function (HighchartsOnly) { 'use strict';

HighchartsOnly = 'default' in HighchartsOnly ? HighchartsOnly['default'] : HighchartsOnly;

function create(tagName, Highcharts) {
  var ctors = {
    highcharts: 'Chart',
    highstock: 'StockChart',
    highmaps: 'Map'
  };
  var Ctor = Highcharts[ctors[tagName]];
  if (!Ctor) {
    return null;
  }
  return {
    name: tagName,
    template: '<div></div>',
    props: {
      options: Object
    },
    methods: {
      render: function(options) {
        var opts = options || {};
        opts.chart = opts.chart || {};
        opts.chart.renderTo = this.$el;
        this._chart = new Ctor(opts);
      }
    },
    mounted: function() {
      this.render(this.options);
    },
    beforeDestroy: function() {
      this._chart.destroy();
    }
  };
}

function install(Vue, options) {
  var Highcharts = (options && options.Highcharts) || HighchartsOnly;
  Vue.prototype.Highcharts = Highcharts;
  ['highcharts', 'highstock', 'highmaps'].forEach(function(tagName) {
    var component = create(tagName, Highcharts);
    component && Vue.component(tagName, component);
  });
}

return install;

})));
