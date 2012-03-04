(function(app, undef) {
    "use strict";

    app.views.CrewListView = Backbone.View.extend({
        el: "#content",

        template: app.template('crew/index'),

        events: {
            "change .sort": "onChangeSort",
            "click [data-action='filter-crew']": "onChangeFilter"
        },

        initialize: function() {
            this.sortType = 0;
            this.filterCategory = 0;
        },

        render: function() {
            var crews = app.getPlayer().getCrews()
                .filterByCategory(this.filterCategory)
                .sortByType(this.sortType);
            $(this.el).html(this.template({
                crews: crews
            }));
            return this;
        },

        onChangeFilter: function(e) {
            this.filterCategory = $(e.target).data("filter");
            this.render();
            return false;
        },

        onChangeSort: function(e) {
            this.sortType = $(e.target).val();
            this.render();
        }
    });
}(App));
