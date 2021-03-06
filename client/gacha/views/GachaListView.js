/*global alert:true */
(function(app, undef) {
    "use strict";

    app.views.GachaListView = Backbone.View.extend({
        events: {
            'click a[data-action="gacha-execute"]': 'onExecute',
            'click a[data-action="gacha-execute-many"]': 'onExecuteMany',
            'click [data-action="next"]': 'onSwipeLeft',
            'click [data-action="prev"]': 'onSwipeRight',
            'swipeLeft': 'onSwipeLeft',
            'swipeRight': 'onSwipeRight'
        },

        initialize: function(options) {
            this._index = 0;
        },

        render: function() {
            var tmpl = app.template('gacha/index');
            $(this.el).html(tmpl());
            return this;
        },

        onSwipeLeft: function(evt) {
            if (this._index < 4) {
                this._index += 1;
                this._swipe();
            }
        },

        onSwipeRight: function(evt) {
            if (this._index > 0) {
                this._index -= 1;
                this._swipe();
            }
        },

        _swipe: function() {
            var dx = this._index * -300;
            this.$('.slide').css({
                '-webkit-transition': 'all 0.5s ease-in',
                '-webkit-transform': 'translate3d(' + dx + 'px, 0, 0)'
            });
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
            var gachaName = "ガチャ" + gachaId;

            new app.views.ConfirmView({
                templateName: 'gacha/confirm'
            }).show({
                gachaId: gachaId,
                boxId: boxId,
                times: times,
                gachaName: gachaName
            }).fail(function(view) {
                view.hide();
            }).done(function(view) {
                view.hide();
                self.execute(gachaId, boxId, times);
            });
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
