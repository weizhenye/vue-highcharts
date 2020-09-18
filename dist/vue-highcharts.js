(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.VueHighcharts = {}, global.Vue));
}(this, (function (exports, vue) { 'use strict';

  var ctors = {
    Highcharts: 'chart',
    Highstock: 'stockChart',
    Highmaps: 'mapChart',
    HighchartsGantt: 'ganttChart'
  };

  function render() {
    return vue.h('div', {
      ref: 'highchartsRef'
    });
  }

  function createHighcharts(name, Highcharts) {
    var ctor = Highcharts[ctors[name]];

    if (!ctor) {
      return Highcharts.win ? null // When running in server, Highcharts will not be instanced,
      // so there're no constructors in Highcharts,
      // to avoid unmated content during SSR, it returns minimum component.
      : {
        render: render
      };
    }

    return {
      name: name,
      props: ['options'],
      render: render,
      setup: function setup(props) {
        var highchartsRef = vue.ref(null);
        var chart = vue.ref(null);
        vue.onMounted(function () {
          vue.watchEffect(function () {
            chart.value = ctor(highchartsRef.value, props.options);
          });
        });
        vue.onBeforeUnmount(function () {
          if (highchartsRef.value) {
            chart.value.destroy();
          }
        });
        return {
          highchartsRef: highchartsRef,
          chart: chart
        };
      }
    };
  }
  function install(app, options) {
    Object.keys(ctors).forEach(function (name) {
      var component = createHighcharts(name, options.Highcharts);

      if (component) {
        app.component(name, component);
      }
    });
  }

  exports.createHighcharts = createHighcharts;
  exports.default = install;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
