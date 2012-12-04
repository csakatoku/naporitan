(function(App) {
    "use strict";

    var options = [
        [0, "全タイプ"],
        [1, "近接"],
        [2, "遠隔"],
        [3, "飛行"]
    ];

    App.views.CardTabView = Backbone.View.extend({
        events: {
            'click li': function(e) {
                var target = e.target;
                var filter = $(target).data('filter');
                this.trigger('change', filter);
            }
        },

        tagName: 'ul',

        render: function() {
            var self = this;
            var ul = this.$el;

            options.forEach(function(pair) {
                var value = pair[0];
                var text = pair[1];
                var li = self.make('li', { "data-filter": value }, _.escape(text));
                ul.append(li);
            });

            return this;
        }
    });
}(App));
