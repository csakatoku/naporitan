// load: client/card/views/CardBaseListPage.js
(function(App) {
    "use strict";

    App.views.CardSellListPage = App.views.CardBaseListPage.extend({
        events: {
            'click [data-action="confirm"]': 'onConfirm'
        },

        templateName: 'card/sell_list',
        ListViewClassName: 'CardSellListView',

        onConfirm: function(evt) {
            var player = App.getPlayer();
            var values = this.listView.selectedValues();
            var models = player.cards.filter(function(m) {
                return (values.indexOf(m.get('id') + "") >= 0);
            });

            var view = new App.views.CardSellConfirmView({
                el: '#card-sell-confirm'
            }).show({
                collection: new Backbone.Collection(models)
            }).fail(function(view) {
                console.log("CANCEL");
                view.hide();
            }).done(function(view) {
                console.log(values);
                view.hide();
            });
        },

        onSelectionChange: function(values) {
            var $el = this.$('[data-action="confirm"]');
            if (values.length > 0) {
                $el.removeAttr('disabled');
            } else {
                $el.attr('disabled', 'disabled');
            }
        }
    });
}(App));
