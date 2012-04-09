(function(app, undef) {
    "use strict";

    app.views.GachaListView = Backbone.View.extend({
        el: '#content',

        events: {
            'click a[data-action="gacha-execute"]': 'onExecute',
            'click a[data-action="gacha-execute-many"]': 'onExecuteMany'
        },

        initialize: function(options) {
            //options = options || {};
            //this.el = options.el || ;
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
