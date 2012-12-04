(function(App, undef) {
    "use strict";

    var ListElementView = App.views.BaseListElementView.extend({
        template: App.template('card/card_list_element')
    });

    App.views.CardListView = App.views.BaseListView.extend({
        ListElementView: ListElementView,

        onElementClick: function(evt, model) {
            var id = model.get('id');
            App.redirect('card/detail', {
                id: id
            });
        }
    });
}(App));
