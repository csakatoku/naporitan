(function(App) {
    "use strict";

    App.views.BaseConfirmView = Backbone.View.extend({
        events: {
            "click [data-confirm='yes']": "onYes",
            "click [data-confirm='no']": "onNo"
        },

        templateName: '',

        _render: function(options, show) {
            var tmpl = App.template(this.templateName);
            var ctxt = _.clone(options);

            this.$el.html(tmpl(_.extend({
                model     : this.model,
                collection: this.collection
            }, ctxt)));

            if (show !== true) {
                this.$el.hide();
            }

            this._rendered = true;

            App.rootView.presentModalView(this);

            return this;
        },

        render: function() {
            this._render({});
            return this;
        },

        show: function(options) {
            App.rootView.showOverlay();

            if (this._rendered !== true) {
                this._render(options, true);
            }

            this.$el.show();

            this._dfd = $.Deferred();
            return this._dfd;
        },

        hide: function() {
            App.rootView.hideOverlay();
            this.$el.remove();
        },

        onYes: function() {
            this._dfd.resolve(this);
        },

        onNo: function() {
            this._dfd.reject(this);
        }
    });
}(App));
