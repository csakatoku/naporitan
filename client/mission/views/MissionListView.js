(function(app, undef) {
    "use strict";

    app.views.MissionListView = Backbone.View.extend({
        el: "#content",

        render: function() {
            var tmpl = app.template("mission/index");
            $(this.el).html(tmpl(this.data));
            return this;
        },

        dataBind: function(data) {
            this.data = data;
        }
    });
}(App));
