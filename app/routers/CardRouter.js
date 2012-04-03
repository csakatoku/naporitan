(function(App, undef) {
    "use strict";

    App.routers.CardRouter = Backbone.Router.extend({
        initialize: function() {
            var rootView = App.rootView;

            // Card List and Detail
            this.listView = new App.views.CrewListView();
            this.detailView = new App.views.CrewDetailView();

            // Merge cards
            this.mergeListView = new App.views.CrewMergeListView();
            this.mergeSelectView = new App.views.CrewMergeSelectView();

            // Sell cards
            this.sellListView = new App.views.CrewSellListView();
            this.sellConfirmView = new App.views.CrewSellView();
        },

        defaultAction: function() {
            this.listView.render();
            this.rootView.showMenuTab();
        },

        mergeAction: function() {
            var mergeBaseId = App.localStorage["card_merge_base_id"];
            var player = App.getPlayer();
            var items = player.getCrews();
            var mergeBase = items.get(mergeBaseId);
            if (!mergeBase) {
                App.redirect('card/merge_select');
            }

            this.mergeListView.dataBind({
                base: mergeBase,
                items: items
            });
            this.mergeListView.render();
            this.rootView.showMenuTab();
        },

        mergeSelectAction: function() {
            this.mergeSelectView.render();
            this.rootView.showMenuTab();
        },

        sellAction: function() {
            this.sellListView.render();
            this.rootView.showMenuTab();
        },

        sellConfirmAction: function() {
            this.sellConfirmView.render();
            this.rootView.showMenuTab();
        },

        detailAction: function(id) {
            var player = App.getPlayer();
            var card = player.getCrews().get(id);
            this.detailView.item = card;
            this.detailView.render();
            this.rootView.showMenuTab();
        }
    });
}(App));
