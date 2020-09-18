# vue-highcharts

[![GitHub Action](https://github.com/weizhenye/vue-highcharts/workflows/CI/badge.svg)](https://github.com/weizhenye/vue-highcharts/actions)
[![Coverage](https://badgen.net/codecov/c/github/weizhenye/vue-highcharts?icon=codecov)](https://codecov.io/gh/weizhenye/vue-highcharts)
[![NPM version](https://badgen.net/npm/v/vue-highcharts?icon=npm)](https://www.npmjs.com/package/vue-highcharts)
[![License](https://badgen.net/npm/license/vue-highcharts?icon=https://api.iconify.design/octicon:law.svg?color=white)](https://github.com/weizhenye/vue-highcharts/blob/master/LICENSE)
[![File size](https://badgen.net/bundlephobia/minzip/vue-highcharts?icon=https://api.iconify.design/ant-design:file-zip-outline.svg?color=white)](https://bundlephobia.com/result?p=vue-highcharts)
[![Download](https://badgen.net/npm/dm/vue-highcharts?icon=npm)](https://www.npmjs.com/package/vue-highcharts)
[![jsDelivr](https://badgen.net/jsdelivr/hits/npm/vue-highcharts?icon=https://api.iconify.design/simple-icons:jsdelivr.svg?color=white)](https://www.jsdelivr.com/package/npm/vue-highcharts)

Highcharts component for Vue.

## Requirements

* Vue >= 3.0.0
* Highcharts >= 4.2.0

## Installation

```bash
npm i -S vue-highcharts
```

For **Vue 2**, please run `npm i -S vue-highcharts@0.1`, and checkout document [here](https://github.com/weizhenye/vue-highcharts/tree/v0.1.0).

## Usage

### Registering globally

```js
import { createApp } from 'vue';
import Highcharts from 'highcharts';
import VueHighcharts from 'vue-highcharts';

import App from './App.vue';

const app = createApp(App);
app.use(VueHighcharts, { Highcharts });
// now <Highcharts /> is available in components
```

<details>
<summary>Direct <code>&lt;script&gt;</code> include</summary>

```html
<script src="/path/to/vue/dist/vue.global.prod.js"></script>
<script src="/path/to/highcharts/highcharts.js"></script>
<script src="/path/to/vue-highcharts/dist/vue-highcharts.js"></script>
<script>
const { createApp } = window.Vue;
const app = createApp();
app.use(window.VueHighcharts['default'], { Highcharts: window.Highcharts });
</script>
```
</details>

### Highstock, Highmaps and any other add-ons

```js
import { createApp } from 'vue';
import Highcharts from 'highcharts';
import VueHighcharts from 'vue-highcharts';

import App from './App.vue';

// load these modules as your need
import loadStock from 'highcharts/modules/stock.js';
import loadMap from 'highcharts/modules/map.js';
import loadGantt from 'highcharts/modules/gantt.js';
import loadDrilldown from 'highcharts/modules/drilldown.js';
// some charts like solid gauge require `highcharts-more.js`, you can find it in official document.
import loadHighchartsMore from 'highcharts/highcharts-more.js';
import loadSolidGauge from 'highcharts/modules/solid-gauge.js';

loadStock(Highcharts);
loadMap(Highcharts);
loadGantt(Highcharts);
loadDrilldown(Highcharts);
loadHighchartsMore(Highcharts);
loadSolidGauge(Highcharts);

const app = createApp(App);
app.use(VueHighcharts, { Highcharts });
// now <Highcharts />, <Highstock />, <Highmaps />, <HighchartsGantt /> is available in components
// drilldown and solid gauge are work with <Highcharts />
```

### Registering in components

```vue
<template>
  <Highcharts />
  <Highmaps />
</template>

<script>
import Highcharts from 'highcharts';
import { createHighcharts } from 'vue-highcharts';

import loadMap from 'highcharts/modules/map.js';

loadMap(Highcharts);

export default {
  components: {
    Highcharts: createHighcharts('Highcharts', Highcharts),
    Highmaps: createHighcharts('Highmaps', Highcharts),
    // Highstock: createHighcharts('Highstock', Highcharts),
    // HighchartsGantt: createHighcharts('HighchartsGantt', Highcharts),
  },
};
</script>
```

Typing:

```ts
type ChartName = 'Highcharts' | 'Highstock' | 'Highmaps' | 'HighchartsGantt';
function createHighcharts(name: ChartName, Highcharts: Highcharts): VueComponent | null
```

### Configuration options and the chart instance

```vue
<template>
  <Highcharts ref="highchartsRef" :options="chartOptions" />
  <Highstock :options="stockOptions" />
  <Highmaps :options="mapsOptions" />
  <HighchartsGantt :options="ganttOptions" />
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const highchartsRef = ref(null);
    onMounted(() => {
      // access the `chart` instance with template refs
      const { chart } = highchartsRef.value;
    });
    return {
      highchartsRef,
      chartOptions: {},
      stockOptions: {},
      mapsOptions: {},
      ganttOptions: {},
    };
  },
};
</script>
```

The `options` object can be found in [Highcharts API Reference](https://api.highcharts.com/highcharts/).

The `chart` instance can be accessed with template refs.

## Demo

* [Access `chart` instance via template refs](https://codepen.io/weizhenye/pen/yLeobOP)
* [Synchronized charts](https://codepen.io/weizhenye/pen/PoZKmjG)
* [Use Highmaps](https://codepen.io/weizhenye/pen/QWyMxaq)
