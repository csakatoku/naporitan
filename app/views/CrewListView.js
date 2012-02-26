(function(app, undef) {
    "use strict";

    app.views.CrewListView = Backbone.View.extend({
        el: $("#container"),

        template: app.template('crew/index'),

        events: {
            "change .sort": "onChangeSort"
        },

        initialize: function() {
            this.sortType = 0;
            this.crews = app.getPlayer().getCrews();
            this.bind('all', this.render, this);
        },

        render: function() {
            var crews = this.crews.sortByType(this.sortType);
            $(this.el).html(this.template({
                crews: crews
            }));
            return this;
        },

        onChangeSort: function(e) {
            this.sortType = $(e.target).val();
            this.render();
        }
    });
}(App));
