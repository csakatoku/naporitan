(function(App, undef) {
    "use strict";

    var ListElementView = App.views.BaseListElementView.extend({
        template: App.template('card/card_sell_list_element'),

        toggle: function() {
            console.log("toggle: " + this.element.get("id"));
            this.$el.toggleClass("selected");
        }
    });

    App.views.CrewSellListView = App.views.BaseListView.extend({
        ListElementView: ListElementView,

        onElementClick: function(evt, element, view) {
            var id = element.get('id');
            view.toggle();
        }
    });
}(App));
