(function(app, undef) {
    "use strict";

    app.views.GachaExecuteView = Backbone.View.extend({
        el: "#content",

        events: {
            'click #gacha-result': 'onResultClick'
        },

        initialize: function(args) {
            this.multiple = args.multiple || false;
        },

        render: function() {
            var templateName = this.multiple ? 'gacha/do' : 'gacha/do_many';
            var tmpl = app.template(templateName);
            $(this.el).html(tmpl({}));
            return this;
        },

        onResultClick: function() {
            var templateName = this.multiple ? 'gacha/result' : 'gacha/result_many';
            var tmpl = app.template(templateName);
            $(this.el).html(tmpl({}));

            app.rootView.showMenuTab();

            return false;
        }
    });
}(App));
