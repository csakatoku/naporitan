(function(app, undef) {
    "use strict";

    app.collections.MissionCollection = Backbone.Collection.extend({
        model: app.models.Mission
    });
}(App));
