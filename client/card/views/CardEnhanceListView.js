//load client/card/views/CardBaseListPage.js
(function(App) {
    "use strict";

    App.views.CardListPage = App.views.CardBaseListPage.extend({
        templateName: 'card/enhance_list',
        ListViewClassName: 'CardListView'
    });
}(App));
