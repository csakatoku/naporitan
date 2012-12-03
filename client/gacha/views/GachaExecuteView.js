(function(app, undef) {
    "use strict";

    app.views.GachaExecuteView = Backbone.View.extend({
        el: '#content',

        events: {
            'click [data-action="gacha-result"]': 'onResultClick',
            'click [data-action="gacha-reload"]': 'onReloadClick'
        },

        initialize: function(options) {
            // this.el = options.el;
            this.result = [];
        },

        setResult: function(items) {
            this.result = items;
        },

        render: function() {
            var templateName = this.result.length > 1 ? 'gacha/do' : 'gacha/do_many';
            var tmpl = app.template(templateName);
            $(this.el).html(tmpl({
                items: this.result
            }));
            return this;
        },

        onResultClick: function() {
            var templateName = this.result.length > 1 ? 'gacha/result_many' : 'gacha/result';
            var tmpl = app.template(templateName);

            $(this.el).html(tmpl({
                items: this.result
            }));

            app.rootView.showMenuTab();

            return false;
        },

        onReloadClick: function() {
            this.trigger('onGachaReload');
            return false;
        }
    });
}(App));
