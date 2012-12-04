(function(App, undef) {
    "use strict";

    var ListElementView = App.views.BaseListElementView.extend({
        template: App.template('card/card_merge_select_list_element')
    });

    App.views.CrewMergeListView = App.views.BaseListView.extend({
        ListElementView: ListElementView,

        onElementClick: function(evt, element) {
            var id = element.get('id');
            console.log(id);
        }
    });
}(App));
