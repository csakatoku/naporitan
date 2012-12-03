(function(app, undef) {
    "use strict";

    app.views.GachaListView = Backbone.View.extend({
        events: {
            'click a[data-action="gacha-execute"]': 'onExecute',
            'click a[data-action="gacha-execute-many"]': 'onExecuteMany'
        },

        render: function() {
            var tmpl = app.template('gacha/index');
            $(this.el).html(tmpl());
            return this;
        },

        onExecute: function(e) {
            var $target = $(e.target);
            var gachaId = $target.data('gacha-id');
            this.trigger('onGachaExecute', {
                gacha_id: gachaId,
                multiple: false
            });
            return false;
        },

        onExecuteMany: function(e) {
            var $target = $(e.target);
            var gachaId = $target.data('gacha-id');
            this.trigger('onGachaExecute', {
                gacha_id: gachaId,
                multiple: true
            });
            return false;
        }
    });
}(App));
