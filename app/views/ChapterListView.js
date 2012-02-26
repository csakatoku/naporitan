(function(app, undef) {
    "use strict";

    app.views.ChapterListView = Backbone.View.extend({
        el: $("#container"),

        template: app.template('chapter/index'),

        initialize: function() {
            //
        },

        render: function() {
            var items = app.chapters;
            $(this.el).html(this.template({
                items: items
            }));
            return this;
        }
    });
}(App));
