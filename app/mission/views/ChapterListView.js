(function(app, undef) {
    "use strict";

    app.views.ChapterListView = Backbone.View.extend({
        el: "#content",

        render: function() {
            var tmpl = app.template('chapter/index');
            var content = tmpl({
                items: app.chapters
            });
            $(this.el).html(content);
            return this;
        }
    });
}(App));
