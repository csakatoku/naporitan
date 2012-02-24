(function(app, undef) {
    "use strict";

    app.views.ChapterView = Backbone.View.extend({
        el: $("#container"),

        initialize: function() {
            //
        },

        render: function() {
            $(this.el).html("<h1>Chapter</h1>");
            return this;
        }
    });
}(App));
