(function(app, undef) {
    "use strict";

    app.views.GachaExecuteView = Backbone.View.extend({
        events: {
            'click [data-action="gacha-result"]': 'onResultClick',
            'click [data-action="gacha-reload"]': 'onReloadClick'
        },

        setResult: function(items) {
            this.result = items;
        },

        render: function() {
            var result = this.result || [];
            var templateName = result.length > 1 ? 'gacha/do' : 'gacha/do_many';
            var tmpl = app.template(templateName);
            $(this.el).html(tmpl({
                items: result
            }));
            return this;
        },

        onResultClick: function() {
            var result = this.result || [];
            var templateName = result.length > 1 ? 'gacha/result_many' : 'gacha/result';
            var tmpl = app.template(templateName);

            $(this.el).html(tmpl({
                items: result
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
