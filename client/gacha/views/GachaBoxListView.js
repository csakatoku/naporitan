(function(app, undef) {
    "use strict";

    var klass = app.views.GachaBoxListView = Backbone.View.extend({
        initialize: function(options) {
            var collection = options.collection;
            klass.__super__.initialize.call(this, options);
            if (collection) {
                collection.bind('all', this.onDataRetrieved, this);
            }
        },

        onDataRetrieved: function() {
            var collection = this.collection;
            var items = [];
            var numerators = {};
            var denominators = {};
            var tmpl = app.template('gacha/box_list');

            collection.forEach(function(model) {
                var rarity = model.get('rarity');
                var num = model.get('numerator');
                var denom = model.get('denominator');
                numerators[rarity] = (numerators[rarity] || 0) + num;
                denominators[rarity] = (denominators[rarity] || 0) + denom;

                if (rarity >= 4) {
                    items.push(model);
                }
            });

            $(this.el).html(tmpl({
                items: items,
                numerators: numerators,
                denominators: denominators
            }));
        }
    });
}(App));
