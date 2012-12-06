// load: client/card/views/CardBaseListPage.js
(function(App) {
    "use strict";

    var CurrentEnhanceElementView = App.views.BaseListElementView.extend({
        events: {
            'click a': 'onClick'
        },

        template: App.template('card/card_enhance_base_list_element'),

        templateContext: function(params) {
            params.button = '変更する';
            return params;
        },

        onClick: function(evt) {
            App.redirect('card/enhance/base');
        }
    });

    var Klass = App.views.CardEnhanceListPage = App.views.CardBaseListPage.extend({
        events: {
            'click [data-action="confirm"]': 'onConfirm'
        },

        templateName: 'card/enhance_list',

        ListViewClassName: 'CardEnhanceListView',

        onConfirm: function(evt) {
            var values = this.listView.selectedValues();
            var view = new App.views.CardEnhanceConfirmView({
                el: '#card-enhance-confirm'
            }).render();

            view.show()
                .fail(function(modal) {
                    console.log("CANCEL");
                    modal.hide();
                })
                .done(function(modal) {
                    console.log(values);
                    modal.hide();
                })
            ;
        },

        renderElements: function() {
            var player = App.getPlayer();

            var baseId = App.localStorage.cardMergeBaseId;
            var model = player.cards.get(baseId);
            if (model === undefined) {
                model = player.cards.models[0];
            }

            if (this.currentElementView !== undefined) {
                this.currentElementView.remove();
            }

            var view = this.currentElementView = new CurrentEnhanceElementView({
                model: model
            });
            this.$('.current-enhance-base-placeholder').append(view.render().el);

            Klass.__super__.renderElements.call(this);
        }
    });
}(App));
