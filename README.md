# vue-highcharts

[![Build status](https://img.shields.io/travis/weizhenye/vue-highcharts.svg)](https://travis-ci.org/weizhenye/vue-highcharts)
[![Coverage](https://img.shields.io/codecov/c/github/weizhenye/vue-highcharts.svg)](https://codecov.io/gh/weizhenye/vue-highcharts)
[![Dependencies](https://img.shields.io/david/weizhenye/vue-highcharts.svg)](https://david-dm.org/weizhenye/vue-highcharts)
[![Download](https://img.shields.io/npm/dm/vue-highcharts.svg)](https://www.npmjs.com/package/vue-highcharts)
[![NPM version](https://img.shields.io/npm/v/vue-highcharts.svg)](https://www.npmjs.com/package/vue-highcharts)
[![License](https://img.shields.io/npm/l/vue-highcharts.svg)](https://github.com/weizhenye/vue-highcharts/blob/master/LICENSE)
[![File size](https://badge-size.herokuapp.com/weizhenye/vue-highcharts/master/dist/vue-highcharts.min.js?compression=gzip&color=blue&label=min%2Bgzip)](https://unpkg.com/vue-highcharts/dist/vue-highcharts.min.js)

Highcharts component for Vue.

## Requirements

* Vue >= 1.0.0 (support both v1 and v2)
* Highcharts >= 4.2.0

## Installation

```bash
npm i vue-highcharts -S
```

## Usage

You should always call the `Vue.use()` global method:

```js
import Vue from 'vue';
import VueHighcharts from 'vue-highcharts';

Vue.use(VueHighcharts);
```

If you want to use Highstock, Highmaps or any other add-ons, you should pass in the `Highcharts` object [which included the corresponding modules](https://www.highcharts.com/docs/getting-started/install-from-npm).

```js
import Vue from 'vue';
import VueHighcharts from 'vue-highcharts';
import Highcharts from 'highcharts';

// load these modules as your need
import loadStock from 'highcharts/modules/stock';
import loadMap from 'highcharts/modules/map';
import loadDrilldown from 'highcharts/modules/drilldown';
// some charts like solid gauge require `highcharts-more.js`, you can find it in official demo.
import loadHighchartsMore from 'highcharts/highcharts-more';
import loadSolidGauge from 'highcharts/modules/solid-gauge';

loadStock(Highcharts);
loadMap(Highcharts);
loadDrilldown(Highcharts);
loadHighchartsMore(Highcharts);
loadSolidGauge(Highcharts);

Vue.use(VueHighcharts, { Highcharts });
// Now you can use Highstock, Highmaps, drilldown and solid gauge.
```

Then you can use the components in your template.

```html
<highcharts :options="options"></highcharts>
<highstock :options="options"></highstock>
<highmaps :options="options"></highmaps>
<highcharts-renderer :width="width" :height="height"></highcharts-renderer>
```

The `options` object can be found in [Highcharts API Reference](https://api.highcharts.com/highcharts). Note you should never pass in `chart.renderTo` for watching it may cause stack overflow.

`<highcharts-renderer>` [creates an independent renderer](https://api.highcharts.com/class-reference/Highcharts.SVGRenderer).

The `Highcharts` object is available at `vm.Highcharts`. If you want to access the `chart` or `renderer` instance, you can use child component refs:

```html
<highcharts :options="options" ref="highcharts"></highcharts>
<highcharts-renderer :width="width" :height="height" ref="highchartsRenderer"></highcharts-renderer>
```

```js
const { chart } = vm.$refs.highcharts;
const { renderer } = vm.$refs.highchartsRenderer;
```

## Demo

* [Access `chart` instance via refs](https://codepen.io/weizhenye/pen/rrKgbP)
* [Use Highmaps](https://codepen.io/weizhenye/pen/VKdJpW)
* [Use independent Renderer](https://codepen.io/weizhenye/pen/kkpKvY)
