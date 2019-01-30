# vue-highcharts

[![Build status](https://img.shields.io/travis/weizhenye/vue-highcharts.svg)](https://travis-ci.org/weizhenye/vue-highcharts)
[![Coverage](https://img.shields.io/codecov/c/github/weizhenye/vue-highcharts.svg)](https://codecov.io/gh/weizhenye/vue-highcharts)
[![Dependencies](https://img.shields.io/david/weizhenye/vue-highcharts.svg)](https://david-dm.org/weizhenye/vue-highcharts)
[![NPM version](https://img.shields.io/npm/v/vue-highcharts.svg)](https://www.npmjs.com/package/vue-highcharts)
[![License](https://img.shields.io/npm/l/vue-highcharts.svg)](https://github.com/weizhenye/vue-highcharts/blob/master/LICENSE)
[![File size](https://badge-size.herokuapp.com/weizhenye/vue-highcharts/master/dist/vue-highcharts.min.js?compression=gzip&color=blue&label=min%2Bgzip)](https://unpkg.com/vue-highcharts/dist/vue-highcharts.min.js)
[![Download](https://img.shields.io/npm/dm/vue-highcharts.svg)](https://www.npmjs.com/package/vue-highcharts)
[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/vue-highcharts/badge?style=rounded)](https://www.jsdelivr.com/package/npm/vue-highcharts)

Highcharts component for Vue.

## Requirements

* Vue >= 2.0.0
* Highcharts >= 4.2.0

## Installation

```bash
npm i -S vue-highcharts
```

If you use Vue v1, you should `npm i -S vue-highcharts@0.0`.

## Usage

You can simply import it and use it.

```js
import Vue from 'vue';
import VueHighcharts from 'vue-highcharts';

Vue.use(VueHighcharts);
```

If you want to use Highstock, Highmaps, Gantt or any other [add-ons](https://github.com/highcharts/highcharts-dist/tree/master/modules), you should load them as modules.

```js
import Vue from 'vue';
import VueHighcharts from 'vue-highcharts';
import Highcharts from 'highcharts';

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

Vue.use(VueHighcharts, { Highcharts });
// now you can use Highstock, Highmaps, Gantt, drilldown and solid gauge.
```

If you don't want to install vue-highcharts global, you can:

```js
import Highcharts from 'highcharts';
import loadMap from 'highcharts/modules/map.js';
import { genComponent } from 'vue-highcharts';

loadMap(Highcharts);

export default {
  name: 'MyComponent',
  component: {
    Highcharts: genComponent('Highcharts', Highcharts),
    Highmaps: genComponent('Highmaps', Highcharts),
    // Highstock: genComponent('Highstock', Highcharts),
    // HighchartsGantt: genComponent('HighchartsGantt', Highcharts),
  },
};
```

```js
/**
 * @param {String} name   Available values: 'Highcharts', 'Highstock', 'Highmaps', 'HighchartsGantt'
 * @param {Object} Highcharts   The `Highcharts` object
 * @returns {VueComponent|null}
 */
function genComponent(name, Highcharts) {}
```

Then you can use these components in the template.

```html
<template>
  <div>
    <Highcharts :options="options" />
    <Highstock :options="options" />
    <Highmaps :options="options" />
    <HighchartsGantt :options="options" />
  </div>
</template>
```

The `options` object can be found in [Highcharts API Reference](https://api.highcharts.com/highcharts). Note you should never pass in `chart.renderTo` for watching it may cause stack overflow.

If you want to access the `chart` instance, you can use child component refs:

```html
<Highcharts ref="highcharts" :options="options" />
```

```js
const { chart } = vm.$refs.highcharts;
```

## Demo

* [Access `chart` instance via refs](https://codepen.io/weizhenye/pen/rrKgbP)
* [Use Highmaps](https://codepen.io/weizhenye/pen/VKdJpW)
* [Synchronized charts](https://codepen.io/weizhenye/pen/NYPZMK)
