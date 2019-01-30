(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('highcharts')) :
  typeof define === 'function' && define.amd ? define(['exports', 'highcharts'], factory) :
  (global = global || self, factory(global.VueHighcharts = {}, global.Highcharts));
}(this, function (exports, HighchartsOnly) { 'use strict';

  HighchartsOnly = HighchartsOnly && HighchartsOnly.hasOwnProperty('default') ? HighchartsOnly['default'] : HighchartsOnly;

  var ctors = {
    Highcharts: 'chart',
    Highstock: 'stockChart',
    Highmaps: 'mapChart',
    HighchartsGantt: 'ganttChart',
  };

  // eslint-disable-next-line consistent-return
  function clone(obj) {
    var copy;
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }
    if (obj instanceof Array) {
      copy = [];
      for (var i = obj.length - 1; i >= 0; i--) {
        copy[i] = clone(obj[i]);
      }
      return copy;
    }
    /* istanbul ignore else */
    if (obj instanceof Object) {
      copy = {};
      for (var key in obj) {
        copy[key] = clone(obj[key]);
      }
      return copy;
    }
  }

  function render(createElement) {
    return createElement('div');
  }

  function create(name, Highcharts) {
    var ctor = Highcharts[ctors[name]];
    if (!ctor) {
      return Highcharts.win
        ? null
        // When running in server, Highcharts will not be instanced,
        // so there're no constructors in Highcharts,
        // to avoid unmated content during SSR, it returns minimum component.
        : { render: render };
    }
    return {
      name: name,
      props: {
        options: { type: Object, required: true }
      },
      watch: {
        options: {
          handler: function () {
            this.$_h_render();
          },
          deep: true
        }
      },
      mounted: function () {
        this.$_h_render();
      },
      beforeDestroy: function () {
        this.chart.destroy();
      },
      methods: {
        $_h_render: function () {
          this.chart = ctor(this.$el, clone(this.options));
        }
      },
      render: render
    };
  }

  function install(Vue, options) {
    var Highcharts = (options && options.Highcharts) || HighchartsOnly;
    for (var name in ctors) {
      var component = create(name, Highcharts);
      component && Vue.component(name, component);
    }
  }

  if (typeof window !== 'undefined' && window.Vue && window.Highcharts) {
    install(window.Vue, window.Highcharts);
  }

  exports.default = install;
  exports.genComponent = create;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
