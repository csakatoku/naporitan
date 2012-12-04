//load client/card/views/CardBaseListPage.js
(function(App) {
    "use strict";

    var ParentView = App.views.CardBaseListPage;

    App.views.CardListPage = ParentView.extend({
        templateName: 'card/list',
        ListViewClassName: 'CardListView'
    });
}(App));
