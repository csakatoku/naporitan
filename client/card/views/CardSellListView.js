(function(App, undef) {
    "use strict";

    var ListElementView = App.views.BaseListElementView.extend({
        template: App.template('card/card_sell_list_element')
    });

    App.views.CardSellListView = App.views.BaseListView.extend({
        ListElementView: ListElementView
    });
}(App));
