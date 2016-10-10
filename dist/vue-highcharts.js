(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('highcharts')) :
  typeof define === 'function' && define.amd ? define(['highcharts'], factory) :
  (global.VueHighcharts = factory(global.Highcharts));
}(this, (function (Highcharts) { 'use strict';

Highcharts = 'default' in Highcharts ? Highcharts['default'] : Highcharts;

var highcharts = {
  name: 'highcharts',
  template: '<div></div>',
  props: {
    options: Object
  },
  methods: {
    render: function(options) {
      var opts = options || {};
      opts.chart = opts.chart || {};
      opts.chart.renderTo = this.$el;
      this._chart = new Highcharts.Chart(opts);
    }
  },
  mounted: function() {
    this.render(this.options);
  },
  beforeDestroy: function() {
    this._chart.destroy();
  }
};

function install(Vue) {
  Vue.prototype.Highcharts = Highcharts;
  Vue.component('highcharts', highcharts);
}

return install;

})));
