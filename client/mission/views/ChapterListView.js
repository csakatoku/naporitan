(function(app, undef) {
    "use strict";

    app.views.ChapterListView = Backbone.View.extend({
        el: "#content",

        render: function() {
            var tmpl = app.template('chapter/index');
            var items = app.data.chapter;
            var content = tmpl({
                items: items
            });
            $(this.el).html(content);
            return this;
        }
    });
}(App));
