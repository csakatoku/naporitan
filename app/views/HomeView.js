(function(app, undef) {
    app.views.HomeView = Backbone.View.extend({
        el: $("#container"),

        template: app.template("home/index"),

        initialize: function() {
            //
        },

        render: function() {
            $(this.el).html(this.template({}));
            return this;
        }
    });
}(App));
