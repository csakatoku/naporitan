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
            // Gacha Top Page
            this.listView = new App.views.GachaListView({
                el: '#gacha-index'
            });
            this.listView.on('onGachaExecute', this.onExecute, this);

            // Gacha Animation
            this.resultView = new App.views.GachaExecuteView({
                el: '#gacha-animation'
            });
            this.resultView.on('onGachaReload', this.defaultAction, this);

            this.on('onCardsAdded', this.onCardAdded, this);

            // Gacha Box List Page
            this.boxCollection = new Backbone.Collection(null, {
                model: GachaBoxItem
            });

            this.boxListView = new App.views.GachaBoxListView({
                el: '#gacha-box-list',
                collection: this.boxCollection
            }).render();
        },

        defaultAction: function() {
            // TODO: こんなテキトーな画面切り替えでいいのか?
            var _a = this.boxListView && this.boxListView.$el.empty();
            var _b = this.resultView && this.resultView.$el.empty();

            this.listView.render();
        },

        boxListAction: function(boxId) {
            // TODO: こんなテキトーな画面切り替えでいいのか?
            var _a = this.listView &&  this.listView.$el.empty();
            var _b = this.resultView && this.resultView.$el.empty();

            this.boxCollection.fetch({
                url: App.net.resolve('gacha_box_list', {
                    user_id: App.uid,
                    box_id: boxId
                })
            });
        },

        onExecute: function(args) {
            var self = this;

            App.rootView.startIndicator();
            args.user_id = App.uid;

            App.net.post('gacha_execute', args)
                .done(function(res) {
                    var cards = res.cards || [];
                    var items = [];

                    cards.forEach(function(args) {
                        var instance = new Card(args);
                        items.push(instance);
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

            // TODO: こんなテキトーな画面切り替えでいいのか?
            var _a = this.listView && this.listView.$el.empty();

            this.resultView.setResult(res.items);
            this.resultView.render();
        }
    });
}(App));
