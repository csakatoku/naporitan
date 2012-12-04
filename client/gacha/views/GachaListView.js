/*global alert:true */
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
            this.confirm(gachaId, boxId, 1);
            return false;
        },

        onExecuteMany: function(e) {
            var $target = $(e.target);
            var gachaId = $target.data('gacha-id');
            var boxId = $target.data('box-id') || 1;
            this.confirm(gachaId, boxId, 10);
            return false;
        },

        confirm: function(gachaId, boxId, times) {
            var self = this;

            this.confirmView.show({
                gachaId: gachaId,
                boxId: boxId,
                times: times
            });

            this.confirmView.off(null, null, this);
            this.confirmView.on('yes', function() {
                self.execute(gachaId, boxId, times);
            }, this);
        },

        execute: function(gachaId, boxId, times) {
            var self = this;

            app.rootView.startIndicator();

            var args = {
                user_id: app.uid,
                gacha_id: gachaId,
                box_id: boxId,
                times: times
            };

            app.net.post('gacha_execute', args)
                .done(function(res) {
                    var cards = res.cards || [];
                    self.trigger('onCardsAdded', {
                        response: res,
                        items: cards
                    });
                })
                .fail(function() {
                    alert("error!");
                    app.rootView.stopIndicator();
                });
        }
    });
}(App));
