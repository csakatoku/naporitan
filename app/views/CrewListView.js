(function(App, undef) {
    "use strict";

    var ListElementView = App.views.BaseListElementView.extend({
        template: App.template('crew/card_list_element')
    });

    App.views.CrewListView = App.views.BaseListView.extend({
        template: App.template('crew/index'),

        ListElementView: ListElementView,

        onElementClick: function(evt, model) {
            var id = model.get('id');
            App.redirect('card/detail', {
                id: id
            });
        }
    });
}(App));
