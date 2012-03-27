(function(app, undef) {
    "use strict";

    var Card = app.models.Card;

    app.views.GachaExecuteView = Backbone.View.extend({
        el: '#content',

        events: {
            'click #gacha-result': 'onResultClick'
        },

        initialize: function(args) {
            this.multiple = args.multiple || false;
            this.cards = args.cards || [];
        },

        render: function() {
            var templateName = this.multiple ? 'gacha/do' : 'gacha/do_many';
            var tmpl = app.template(templateName);
            $(this.el).html(tmpl({}));
            return this;
        },

        onResultClick: function() {
            var templateName = this.multiple ? 'gacha/result_many' : 'gacha/result';
            var tmpl = app.template(templateName);

            var items = [];

            this.cards.forEach(function(id) {
                var proto = App.data.card[id];
                if (proto) {
                    var instance = new Card(proto);
                    items.push(instance);
                }
            });

            $(this.el).html(tmpl({
                'items': items
            }));

            app.rootView.showMenuTab();

            return false;
        }
    });
}(App));
