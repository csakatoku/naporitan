(function(App, undefined) {
    "use strict";

    var Item = App.models.Item;
    var dummyModels = [
        new Item({
            name: '癒しの水',
            description: '課金に疲れた心を癒してくれるという逆説的な課金アイテム'
        }),
        new Item({
            name: '自分専用癒しの水',
            description: 'バグや障害に振り回されるユーザーの心を少しだけ癒してくれる補填専用アイテム'
        }),
        new Item({
            name: 'ベヘリット',
            description: '課金で手に入れたレアカードを捧げることによって、恐ろしい力を召喚することができる'
        })
    ];

    var klass = App.routers.ItemRouter = Backbone.Router.extend({
        defaultAction: function() {
            var self = this;

            var tmpl = App.template('item/list');
            var elementTmpl = App.template('item/list_element');

            var view = new Backbone.View({
                el: '#content'
            });
            view.render();
            $(view.el).html(tmpl({}));

            dummyModels.forEach(function(model) {
                var el = new Backbone.View({
                    tagName: 'li'
                });

                el.render().$el.html(elementTmpl({
                    model: model
                }));
                el.$el.appendTo(view.$('#item-list'));
                el.delegateEvents({
                    'click .use-button': function() {
                        self.onConfirmUse(el);
                    }
                });
            });
        },

        buyAction: function() {
            var self = this;
            var tmpl = App.template('item/buy_list');
            var elementTmpl = App.template('item/buy_list_element');

            var view = new Backbone.View({
                el: '#content'
            });
            view.render();
            $(view.el).html(tmpl({}));

            dummyModels.forEach(function(model) {
                var el = new Backbone.View({
                    tagName: 'li'
                });

                el.render().$el.html(elementTmpl({
                    model: model
                }));
                el.$el.appendTo(view.$('#item-list'));
                el.delegateEvents({
                    'click .use-button': function() {
                        self.onConfirmBuy(el);
                    }
                });
            });
        },

        onConfirmUse: function(sender) {
            if (__DEBUG__) {
                console.log("confirm use");
            }

            // TODO
            if (confirm("本当に本当に使いますか?")) {
                this.onUse();
            }
        },

        onUse: function() {
            if (__DEBUG__) {
                console.log("use");
            }
        },

        onConfirmBuy: function(sender) {
            if (__DEBUG__) {
                console.log("confirm buy");
            }

            // TODO
            if (confirm("本当に本当に買いますか?")) {
                this.onUse();
            }
        },

        onBuy: function() {
            if (__DEBUG__) {
                console.log("buy");
            }
        }
    });
}(App));
