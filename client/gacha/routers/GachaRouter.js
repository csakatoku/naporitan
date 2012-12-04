/*global alert:true */
(function(App, undef) {
    "use strict";

    var Card = App.models.Card;
    var GachaBoxItem = App.models.GachaBoxItem;

    App.routers.GachaRouter = Backbone.Router.extend({
        routes: {
            '': 'defaultAction',
            '!/box/:box_id': 'boxListAction'
        },

        initialize: function() {
            this.listView = new App.views.GachaListView({
                el: '#content'
            });
            this.listView.on('onGachaExecute', this.onExecute, this);

            this.resultView = new App.views.GachaExecuteView({
                el: '#content'
            });
            this.resultView.on('onGachaReload', this.onReload, this);

            this.on('onCardsAdded', this.onCardAdded, this);

            this.boxCollection = new Backbone.Collection(null, {
                model: GachaBoxItem
            });
        },

        defaultAction: function() {
            // TODO: こんなテキトーな画面切り替えでいいのか?
            $('#gacha_box_list').empty();

            this.listView.render();
            App.rootView.showMenuTab();
        },

        boxListAction: function(boxId) {
            // TODO: こんなテキトーな画面切り替えでいいのか?
            $('#content').empty();

            var view = new App.views.GachaBoxListView({
                el: '#gacha_box_list',
                collection: this.boxCollection
            }).render();

            this.boxCollection.fetch({
                url: App.net.resolve('gacha_box_list', {
                    user_id: App.uid,
                    box_id: boxId
                })
            });
        },

        onReload: function(args) {
            this.listView.render();
        },

        onExecute: function(args) {
            var self = this;

            App.rootView.startIndicator();

            App.net.post('gacha_execute', args)
                .done(function(res) {
                    var cards = res.cards || [];
                    var items = [];
                    var collection = App.getPlayer().getCrews();

                    cards.forEach(function(id) {
                        var proto = App.data.card[id];
                        if (proto) {
                            var instance = new Card(proto);
                            collection.add(instance);
                            items.push(instance);
                        }
                    });

                    self.trigger('onCardsAdded', {
                        response: res,
                        items: items
                    });
                })
                .fail(function() {
                    alert("error!");
                    App.rootView.stopIndicator();
                });
        },

        onCardAdded: function(res) {
            App.rootView.stopIndicator();
            App.rootView.hideMenuTab();

            this.resultView.setResult(res.items);
            this.resultView.render();
        }
    });
}(App));
