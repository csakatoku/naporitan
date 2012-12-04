(function(app, undef) {
    app.views.HomeView = Backbone.View.extend({
        render: function() {
            var tmpl = app.template("home/index");
            var all = {};
            var crews = [null, null, null, null, null];
            var i = 0;
            [2, 1, 3, 0, 4].forEach(function(pos) {
                var crew = all[i] || null;
                if (crew) {
                    crews[pos] = crew;
                }
                i += 1;
            });

            $(this.el).html(tmpl({
                crews: crews
            }));

            return this;
        }
    });
}(App));
