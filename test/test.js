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
        return { $chart: ref(null) };
      },
    });
    expect(root.$chart.$highcharts.querySelector('.highcharts-root')).toBeDefined();
  }

  it('should support <Highcharts /> component', () => {
    checkComponent('<Highcharts ref="$chart" :options="{}" />');
  });

  it('should support <Highstock /> component', () => {
    checkComponent('<Highstock ref="$chart" :options="{}" />');
  });

  it('should support <Highmaps /> component', () => {
    checkComponent('<Highmaps ref="$chart" :options="{}" />');
  });

  it('should support <HighchartsGantt /> component', () => {
    checkComponent('<HighchartsGantt ref="$chart" :options="{}" />');
  });

  it('can access the `chart` instance via template refs', () => {
    const root = createComponent({
      template: '<Highcharts ref="$chart" :options="{}" />',
      setup() {
        return { $chart: ref(null) };
      },
    });
    expect(root.$chart.chart).toBeDefined();
  });

  it('should destroy the chart instance when vm destroyed', (done) => {
    let chart = null;
    let el = null;
    const app = createApp({
      template: '<div ref="$div"><Highcharts ref="$chart" :options="{}" /></div>',
      setup() {
        const $div = ref(null);
        const $chart = ref(null);
        onBeforeUnmount(() => {
          el = $div.value;
          chart = $chart.value.chart;
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
        return { $div, $chart };
      },
    });
    app.use(VueHighcharts, { Highcharts });
    app.mount(document.createElement('div'));
    app.unmount();
  });

  it('should watch `options`', () => {
    const root = createComponent({
      template: '<Highcharts ref="$chart" :options="options" />',
      setup() {
        return {
          $chart: ref(null),
          options: ref({ title: { text: 'origin' } }),
        };
      },
    });
    expect(root.$chart.chart.title.textStr).toBe('origin');
    root.options.title.text = 'changed';
    nextTick().then(() => {
      expect(root.$chart.chart.title.textStr).toBe('changed');
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
