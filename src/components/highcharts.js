import Highcharts from 'highcharts';

export default {
  name: 'highcharts',
  template: '<div></div>',
  props: {
    options: Object
  },
  methods: {
    render: function(options) {
      var opts = options || {};
      opts.chart = opts.chart || {};
      opts.chart.renderTo = this.$el;
      this._chart = new Highcharts.Chart(opts);
    }
  },
  mounted: function() {
    this.render(this.options);
  },
  beforeDestroy: function() {
    this._chart.destroy();
  }
};
