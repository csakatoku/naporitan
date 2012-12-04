(function(App, undef) {
    "use strict";

    var ListElementView = App.views.BaseListElementView.extend({
        template: App.template('card/card_merge_select_list_element')
    });

    App.views.CrewMergeSelectView = App.views.BaseListView.extend({
        ListElementView: ListElementView,

        onElementClick: function(evt, element) {
            var mergeBaseId = element.get('id');
            App.localStorage.cardMergeBaseId = mergeBaseId;
            App.redirect('card/merge');
        }
    });
}(App));
