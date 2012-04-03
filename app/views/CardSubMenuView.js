(function(App) {
    App.views.CardSubMenuView = Backbone.View.extend({
        events: {
            "click [data-action='list']" : "onList",
            "click [data-action='merge']": "onMerge",
            "click [data-action='sell']" : "onSell"
        },

        render: function() {
            var tmpl = App.template('_partial/card_sub_menu');
            $(this.el).html(tmpl());
            return this;
        },

        onList: function() {
            App.redirect('card/default');
        },

        onMerge: function() {
            App.redirect('card/merge');
        },

        onSell: function() {
            App.redirect('card/sell');
        }
    });
}(App));
