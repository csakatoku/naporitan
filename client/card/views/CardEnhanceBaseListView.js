(function(App, undef) {
    "use strict";

    var ListElementView = App.views.BaseListElementView.extend({
        template: App.template('card/card_enhance_base_list_element'),

        templateContext: function(params) {
            params.button = '強化する';
            return params;
        }
    });

    App.views.CardEnhanceBaseListView = App.views.BaseListView.extend({
        ListElementView: ListElementView,

        onSubViewClick: function(evt, view) {
            var mergeBaseId = view.model.get('id');
            App.localStorage.cardMergeBaseId = mergeBaseId;
            App.redirect('card/enhance');
        }
    });
}(App));
