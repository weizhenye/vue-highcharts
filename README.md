# vue-highcharts

[![NPM version](https://img.shields.io/npm/v/vue-highcharts.svg)](https://www.npmjs.com/package/vue-highcharts)
[![License](https://img.shields.io/npm/l/vue-highcharts.svg)](https://github.com/weizhenye/vue-highcharts/blob/master/LICENSE)

Highcharts component for Vue.

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

If you want to use Highstock, Highmaps or any add-ons, you should pass in the `Highcharts` object [which included the corresponding modules](http://www.highcharts.com/docs/getting-started/install-from-npm).

```js
// Use Highstock
import Vue from 'vue';
import VueHighcharts from 'vue-highcharts';
import Highcharts from 'highcharts/highstock';

Vue.use(VueHighcharts, { Highcharts });
```

```js
// Use Highstock and Highmaps
import Vue from 'vue';
import VueHighcharts from 'vue-highcharts';
import Highcharts from 'highcharts/highstock';
import loadMap from 'highcharts/modules/map';

loadMap(Highcharts);

Vue.use(VueHighcharts, { Highcharts });
```

Then you can use the component in your template. And you can access the `Highcharts` object via `vm.Highcharts`.

```html
<highcharts :options="options"></highcharts>
<highstock :options="options"></highstock>
<highmaps :options="options"></highmaps>
```

The `options` object can be found in [Highcharts API Reference](http://api.highcharts.com/highcharts), [Highstock API Reference](http://api.highcharts.com/highstock) and [Highmaps API Reference](http://api.highcharts.com/highmaps).
