// load: client/card/views/CardBaseListPage.js
(function(App) {
    "use strict";

    App.views.CardSellListPage = App.views.CardBaseListPage.extend({
        templateName: 'card/sell_list',
        ListViewClassName: 'CardSellListView'
    });
}(App));
