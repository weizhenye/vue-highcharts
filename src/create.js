import ctors from './constrators.js';

function create(tagName, Highcharts) {
  var Ctor = Highcharts[ctors[tagName]];
  if (!Ctor) {
    return null;
  }
  var isRenderer = tagName === 'highcharts-renderer';
  return {
    name: tagName,
    template: '<div></div>',
    props: isRenderer
      ? {
          width: { type: Number, required: true },
          height: { type: Number, required: true }
        }
      : { options: { type: Object, required: true } },
    methods: {
      _renderChart: function() {
        if (isRenderer) {
          this.renderer = new Ctor(this.$el, this.width, this.height);
        } else {
          var opts = this.options || {};
          opts.chart = opts.chart || {};
          opts.chart.renderTo = this.$el;
          this.chart = new Ctor(opts);
        }
      }
    },
    mounted: function() {
      this._renderChart();
    },
    updated: function() {
      this._renderChart();
    },
    beforeDestroy: function() {
      !isRenderer && this.chart.destroy();
    },
    // compat Vue v1.x
    ready: function() {
      this._renderChart();
    }
  };
}

export default create;
