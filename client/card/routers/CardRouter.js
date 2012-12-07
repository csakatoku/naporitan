// load: client/common/routers/Router.js
(function(App) {
    "use strict";

    var Card = App.models.Card;

    App.routers.CardRouter = App.routers.Router.extend({
        routes: {
            '': 'defaultAction',
            '!/': 'defaultAction',
            '!/enhance': 'enhanceAction',
            '!/enhance/base': 'enhanceBaseAction',
            '!/sell': 'sellAction'
        },

        initializeViews: function() {
            var collection = App.getPlayer().cards;

            // Card List and Detail
            this.listPage = new App.views.CardListPage({
                el: '#card-list',
                collection: collection
            });

            this.enhanceListPage = new App.views.CardEnhanceListPage({
                el: '#card-enhance-list',
                collection: collection
            });

            this.enhanceListBasePage = new App.views.CardEnhanceBaseListPage({
                el: '#card-base-select-list',
                collection: collection
            });

            // Sell cards
            this.sellListPage = new App.views.CardSellListPage({
                el: '#card-sell-list',
                collection: collection
            });
        },

        defaultAction: function() {
            this.listPage.active();
            this.listPage.render();
            this.maybeFetch();
        },

        enhanceAction: function() {
            var mergeBaseId = App.localStorage.cardMergeBaseId;
            var player = App.getPlayer();
            /*
            var items = player.getCrews();
            var mergeBase = items.get(mergeBaseId);
            if (!mergeBase) {
                App.redirect('card/merge_select');
            }*/
            this.enhanceListPage.active();
            this.enhanceListPage.render();
            this.maybeFetch();
        },

        enhanceBaseAction: function() {
            this.enhanceListBasePage.active();
            this.enhanceListBasePage.render();
            this.maybeFetch();
        },

        sellAction: function() {
            this.sellListPage.active();
            this.sellListPage.render();
            this.maybeFetch();
        },

        // private methods
        maybeFetch: function() {
            var collection = App.getPlayer().cards;

            // カードを1枚も保持していないという状態はありえないので
            // 1枚以上あればデータ取得済みということである(最新ではないかもしれないが)
            if (collection.length > 0) {
                collection.trigger('reset', collection, {});
            } else {
                collection.fetch({
                    url: App.net.resolve('card_list', {
                        user_id: App.uid
                    })
                });
            }
        }
    });
}(App));
