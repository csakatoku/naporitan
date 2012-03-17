(function(app, undef) {
    "use strict";

    var gettext = app.utils._tr;

    app.models.Chapter = Backbone.Model.extend({
        initialize: function(args) {
            var id = args.id;
            this.set({
                name: gettext('chapter_name_' + id)
            });
        }
    });
}(App));
