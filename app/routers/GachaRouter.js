(function(app, undef) {
    "use strict";

    app.routers.GachaRouter = Backbone.Router.extend({
        defaultAction: function() {
            var view = new app.views.GachaListView();
            view.render();
            app.rootView.showMenuTab();
        },

        executeAction: function(args) {
            var multiple = ~~(args.multiple || 0);

            app.rootView.startIndicator();

            $.ajax({
                type: 'GET',
                url: '/api/gacha',
                data: {
                    multiple: multiple
                },
                dataType: 'json',
                success: function(res) {
                    var view = new app.views.GachaExecuteView(res.body);
                    view.render();

                    app.rootView.stopIndicator();
                    app.rootView.hideMenuTab();
                },
                error: function(res) {
                    alert("error!");
                    app.rootView.stopIndicator();
                }
            });
        }
    });
}(App));
