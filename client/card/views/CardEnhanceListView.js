(function(App, undef) {
    "use strict";

    var ListElementView = App.views.BaseListElementView.extend({
        template: App.template('card/card_enhance_list_element')
    });

    App.views.CardEnhanceListView = App.views.BaseListView.extend({
        ListElementView: ListElementView,

        filterModels: function(models) {
            var baseId = ~~(App.localStorage.cardMergeBaseId || 0);

            return models.filter(function(model) {
                return model.get('id') !== baseId;
            });
        },

        onSubViewClick: function(evt, view) {
            var id = view.model.get('id');
            view.$el.toggleClass("selected");
        }
    });
}(App));
