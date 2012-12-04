/*global alert:true, setTimeout:true */
(function(app, undef) {
    "use strict";

    app.views.CrewSellView = Backbone.View.extend({
        events: {
            "click #crew_sell_execute": "execute"
        },

        initialize: function() {
            this.crews = app.getPlayer().getCrews();
        },

        render: function() {
            var tmpl = app.template('crew/sell_confirm');
            $(this.el).html(this.template({
                crews: this.crews
            }));
            return this;
        },

        execute: function() {
            alert("売却しました");
            setTimeout(function() {
                var router = app.router;
                router.navigate(router.reverse("home"), true);
            }, 1000);
        }
    });
}(App));
