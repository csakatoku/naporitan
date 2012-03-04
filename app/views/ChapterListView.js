(function(app, undef) {
    "use strict";

    app.views.ChapterListView = Backbone.View.extend({
        el: "#content",

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
