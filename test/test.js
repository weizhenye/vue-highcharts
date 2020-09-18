/* global describe, it, expect */

import { createApp, ref, nextTick, onUnmounted, onBeforeUnmount } from 'vue';
import Highcharts from 'highcharts';
import loadStock from 'highcharts/modules/stock.js';
import loadMap from 'highcharts/modules/map.js';
import loadGantt from 'highcharts/modules/gantt.js';
import VueHighcharts, { createHighcharts } from '../index.js';

loadStock(Highcharts);
loadMap(Highcharts);
loadGantt(Highcharts);

describe('vue-highcharts', () => {
  function createComponent(Component) {
    const app = createApp(Component);
    app.use(VueHighcharts, { Highcharts });
    return app.mount(document.createElement('div'));
  }
  function checkComponent(template) {
    const root = createComponent({
      template,
      setup() {
        return { chartRef: ref(null) };
      },
    });
    expect(root.chartRef.highchartsRef.querySelector('.highcharts-root')).toBeDefined();
  }

  it('should support <Highcharts /> component', () => {
    checkComponent('<Highcharts ref="chartRef" :options="{}" />');
  });

  it('should support <Highstock /> component', () => {
    checkComponent('<Highstock ref="chartRef" :options="{}" />');
  });

  it('should support <Highmaps /> component', () => {
    checkComponent('<Highmaps ref="chartRef" :options="{}" />');
  });

  it('should support <HighchartsGantt /> component', () => {
    checkComponent('<HighchartsGantt ref="chartRef" :options="{}" />');
  });

  it('can access the `chart` instance via template refs', () => {
    const root = createComponent({
      template: '<Highcharts ref="chartRef" :options="{}" />',
      setup() {
        return { chartRef: ref(null) };
      },
    });
    expect(root.chartRef.chart).toBeDefined();
  });

  it('should destroy the chart instance when vm destroyed', (done) => {
    let chart = null;
    let el = null;
    const app = createApp({
      template: '<div ref="divRef"><Highcharts ref="chartRef" :options="{}" /></div>',
      setup() {
        const divRef = ref(null);
        const chartRef = ref(null);
        onBeforeUnmount(() => {
          el = divRef.value;
          chart = chartRef.value.chart;
          expect(el.querySelector('.highcharts-root')).toBeDefined();
          expect(chart).toBeDefined();
        });
        onUnmounted(() => {
          nextTick(() => {
            expect(el.querySelector('.highcharts-root')).toBeFalsy();
            expect(chart).toEqual({});
            done();
          });
        });
        return { divRef, chartRef };
      },
    });
    app.use(VueHighcharts, { Highcharts });
    app.mount(document.createElement('div'));
    app.unmount();
  });

  it('should watch `options`', () => {
    const root = createComponent({
      template: '<Highcharts ref="chartRef" :options="options" />',
      setup() {
        return {
          chartRef: ref(null),
          options: ref({ title: { text: 'origin' } }),
        };
      },
    });
    expect(root.chartRef.chart.title.textStr).toBe('origin');
    root.options.title.text = 'changed';
    nextTick().then(() => {
      expect(root.chartRef.chart.title.textStr).toBe('changed');
    });
  });

  it('can create single Componet', () => {
    const names = ['Highcharts', 'Highstock', 'Highmaps', 'HighchartsGantt'];
    names.forEach((name) => {
      const Component = createHighcharts(name, Highcharts);
      expect(Component.name).toEqual(name);
    });
    const Unknown = createHighcharts('Unknown', Highcharts);
    expect(Unknown).toBeFalsy();
  });
});
