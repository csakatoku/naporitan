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
            '!/box/:box_id': 'boxListAction',
            '!/result': 'resultAction'
        },

        initializeViews: function() {
            this._lastResult = [];

            // Gacha Top Page
            this.listView = new App.views.GachaListView({
                el: '#gacha-index'
            });
            this.listView.on('onCardsAdded', this.onCardsAdded, this);

            this.listView.confirmView = new App.views.GachaConfirmView({
                el: '#gacha-confirm'
            }).render();

            // Gacha Animation
            this.animationView = new App.views.GachaExecuteView({
                el: '#gacha-animation'
            }).render();

            this.animationView.on('next', function() {
                App.redirect('gacha/result');
            }, this);

            // Gacha Result Page
            this.resultView = new App.views.GachaResultView({
                el: '#gacha-result'
            }).render();

            this.resultView.on('reload', function() {
                App.redirect('gacha/default');
            }, this);

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
            this.boxListView.active();
            this.boxCollection.fetch({
                url: App.net.resolve('gacha_box_list', {
                    user_id: App.uid,
                    box_id: boxId
                })
            });
        },

        resultAction: function(resultId) {
            this.resultView.active();
            this.resultView.setResult(this._lastResult);
            this.resultView.render();
        },

        onCardsAdded: function(res) {
            App.rootView.stopIndicator();

            this._lastResult = [];
            res.items.forEach(function(args) {
                var instance = new Card(args);
                this._lastResult.push(instance);
            }, this);

            this.animationView.active();
            this.animationView.setResult(this._lastResult);
            this.animationView.render();
        }
    });
}(App));
