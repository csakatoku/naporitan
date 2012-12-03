(function(app, undef) {
    "use strict";

    var gettext = app.utils._tr;

    app.models.Mission = Backbone.Model.extend({
        initialize: function(args) {
            var id = args.id;
            this.set({
                name: gettext('<Mission>mission_name_' + id),
                description: gettext('<Mission>mission_description_' + id)
            });
        }
    });
}(App));
