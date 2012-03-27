(function(App, undef) {
    "use strict";

    var last = null;

    App.routers.GachaRouter = Backbone.Router.extend({
        defaultAction: function() {
            var view = new App.views.GachaListView();
            view.render();
            App.rootView.showMenuTab();
        },

        executeAction: function(args) {
            var multiple = ~~(args.multiple || 0);

            App.rootView.startIndicator();

            $.ajax({
                type: 'GET',
                url: '/api/gacha',
                data: {
                    multiple: multiple
                },
                dataType: 'json',
                success: function(res) {
                    last = res;
                    var resultId = res.result_id;
                    App.rootView.stopIndicator();

                    App.redirect('gacha/result', {
                        result_id: resultId
                    });
                },
                error: function(res) {
                    alert("error!");
                    App.rootView.stopIndicator();
                }
            });
        },

        resultAction: function(args) {
            var view = new App.views.GachaExecuteView(last);
            view.render();
            App.rootView.hideMenuTab();
        }
    });
}(App));
