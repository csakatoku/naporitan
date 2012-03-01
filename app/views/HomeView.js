(function(app, undef) {
    app.views.HomeView = Backbone.View.extend({
        el: $("#container"),

        template: app.template("home/index"),

        initialize: function() {
            //
        },

        render: function() {
            var all = app.getPlayer().getCrews().toArray();
            var crews = [null, null, null, null, null];
            var i = 0;
            [2, 1, 3, 0, 4].forEach(function(pos) {
                var crew = all[i] || null;
                if (crew) {
                    crews[pos] = crew;
                }
                i += 1;
            });

            $(this.el).html(this.template({
                crews: crews
            }));
            return this;
        }
    });
}(App));
