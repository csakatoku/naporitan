(function(App, undefined) {
    "use strict";

    var ListElementView = App.views.BaseListElementView.extend({
        template: App.template('card/card_list_element')
    });

    App.views.CardListView = App.views.BaseListView.extend({
        ListElementView: ListElementView,

        onSubViewClick: function(evt, view) {
            new App.views.CardDetailView({}).show({
                model: view.model
            }).done(function(view) {
                view.hide();
            });
        }
    });
}(App));
