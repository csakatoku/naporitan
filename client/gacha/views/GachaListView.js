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
            var boxId = $target.data('box-id') || 1;
            this.trigger('onGachaExecute', {
                gacha_id: gachaId,
                box_id: boxId,
                multiple: false
            });
            return false;
        },

        onExecuteMany: function(e) {
            var $target = $(e.target);
            var gachaId = $target.data('gacha-id');
            var boxId = $target.data('box-id') || 1;
            this.trigger('onGachaExecute', {
                gacha_id: gachaId,
                box_id: boxId,
                multiple: true
            });
            return false;
        }
    });
}(App));
