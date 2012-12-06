// load: client/common/models/Card.js
// load: client/common/models/GachaBoxItem.js
// load: client/common/routers/Router.js
(function(App, undef) {
    "use strict";

    var Card = App.models.Card;
    var GachaBoxItem = App.models.GachaBoxItem;

    var Klass = App.routers.GachaRouter = App.routers.Router.extend({
        routes: {
            '': 'defaultAction',
            '!/box/:box_id': 'boxListAction'
        },

        initializeViews: function() {
            // Gacha Top Page
            this.listView = new App.views.GachaListView({
                el: '#gacha-index'
            });
            this.listView.on('onCardsAdded', this.onCardsAdded, this);

            this.confirmView = this.listView.confirmView = new App.views.GachaConfirmView({
                el: '#gacha-confirm'
            }).render();

            // Gacha Animation
            this.resultView = new App.views.GachaExecuteView({
                el: '#gacha-animation'
            });
            this.resultView.on('onGachaReload', this.defaultAction, this);

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
            this.listView.active();
            this.listView.render();
        },

        boxListAction: function(boxId) {
            this.boxCollection.active();
            this.boxCollection.fetch({
                url: App.net.resolve('gacha_box_list', {
                    user_id: App.uid,
                    box_id: boxId
                })
            });
        },

        onCardsAdded: function(res) {
            App.rootView.stopIndicator();

            var items = [];

            res.items.forEach(function(args) {
                var instance = new Card(args);
                items.push(instance);
            });

            this.resultView.active();
            this.resultView.setResult(items);
            this.resultView.render();
        }
    });
}(App));
