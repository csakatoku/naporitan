(function(App, undef) {
    "use strict";

    var ListElementView = App.views.BaseListElementView.extend({
        template: App.template('crew/card_merge_select_list_element')
    });

    App.views.CrewMergeSelectView = App.views.BaseListView.extend({
        template: App.template('crew/merge_select'),

        ListElementView: ListElementView,

        onElementClick: function(evt, element) {
            var mergeBaseId = element.get('id');
            App.localStorage["card_merge_base_id"] = mergeBaseId;
            App.redirect('card/merge');
        }
    });
}(App));
