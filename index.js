import { h, ref, watchEffect, onMounted, onBeforeUnmount } from 'vue';

const ctors = {
  Highcharts: 'chart',
  Highstock: 'stockChart',
  Highmaps: 'mapChart',
  HighchartsGantt: 'ganttChart',
};

function render() {
  return h('div', { ref: '$highcharts' });
}

function createHighcharts(name, Highcharts) {
  const ctor = Highcharts[ctors[name]];
  if (!ctor) {
    return Highcharts.win
      ? null
      // When running in server, Highcharts will not be instanced,
      // so there're no constructors in Highcharts,
      // to avoid unmated content during SSR, it returns minimum component.
      : { render };
  }
  return {
    name,
    props: ['options'],
    render,
    setup(props) {
      const $highcharts = ref(null);
      const chart = ref(null);
      onMounted(() => {
        watchEffect(() => {
          chart.value = ctor($highcharts.value, props.options);
        });
      });
      onBeforeUnmount(() => {
        if ($highcharts.value) {
          chart.value.destroy();
        }
      });
      return { $highcharts, chart };
    },
  };
}

export { createHighcharts };

export default function install(app, options) {
  Object.keys(ctors).forEach((name) => {
    const component = createHighcharts(name, options.Highcharts);
    if (component) {
      app.component(name, component);
    }
  });
}
