function create(tagName, Highcharts) {
  var ctors = {
    highcharts: 'Chart',
    highstock: 'StockChart',
    highmaps: 'Map'
  };
  var Ctor = Highcharts[ctors[tagName]];
  if (!Ctor) {
    return null;
  }
  return {
    name: tagName,
    template: '<div></div>',
    props: {
      options: Object
    },
    methods: {
      render: function(options) {
        var opts = options || {};
        opts.chart = opts.chart || {};
        opts.chart.renderTo = this.$el;
        this._chart = new Ctor(opts);
      }
    },
    mounted: function() {
      this.render(this.options);
    },
    beforeDestroy: function() {
      this._chart.destroy();
    }
  };
}

export default create;
