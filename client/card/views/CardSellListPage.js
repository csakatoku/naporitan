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
            var values = this.listView.selectedValues();
            var view = new App.views.CardSellConfirmView({
                el: '#card-sell-confirm'
            }).render();

            view.show()
                .fail(function(modal) {
                    console.log("CANCEL");
                    modal.hide();
                })
                .done(function(modal) {
                    console.log(values);
                    modal.hide();
                })
            ;
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
