(function(App) {
    "use strict";

    App.views.BaseConfirmView = Backbone.View.extend({
        events: {
            "click [data-confirm='yes']": "onYes",
            "click [data-confirm='no']": "onNo"
        },

        templateName: '',

        render: function() {
            var tmpl = App.template(this.templateName);
            $(this.el).html(tmpl({
                model: this.model,
                collection: this.collection
            }));
            this.$el.hide();
            return this;
        },

        show: function(options) {
            this.$el.show();
            this._dfd = $.Deferred();
            return this._dfd;
        },

        hide: function() {
            this.$el.hide();
        },

        onYes: function() {
            this._dfd.resolve(this);
        },

        onNo: function() {
            this._dfd.reject(this);
        }
    });
}(App));
