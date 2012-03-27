(function(App, undef) {
    "use strict";

    var Card = App.models.Card;

    App.routers.GachaRouter = Backbone.Router.extend({
        initialize: function() {
            this.listView = new App.views.GachaListView();
            this.listView.on('onGachaExecute', this.onExecute, this);

            this.resultView = new App.views.GachaExecuteView();
            this.resultView.on('onGachaReload', this.onReload, this);

            this.on('onCardsAdded', this.onCardAdded, this);
        },

        defaultAction: function() {
            this.listView.render();
            App.rootView.showMenuTab();
        },

        onReload: function(args) {
            this.listView.render();
        },

        onExecute: function(args) {
            var self = this;

            App.rootView.startIndicator();

            $.ajax({
                type: 'GET',
                url: '/api/gacha',
                data: args,
                dataType: 'json',
                success: function(res) {
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
                },
                error: function(res) {
                    alert("error!");
                    App.rootView.stopIndicator();
                }
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
