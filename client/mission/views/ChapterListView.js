(function(app, undef) {
    "use strict";

    app.views.ChapterListView = Backbone.View.extend({
        render: function() {
            var tmpl = app.template('chapter/index');
            var content = tmpl({
                items: this.collection.models
            });
            $(this.el).html(content);
            return this;
        }
    });
}(App));
