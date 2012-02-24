(function(globals, undef) {
    var app = globals.App;

    app.router = new app.routers.AppRouter();

    // Initialize the Backbone router.
    Backbone.history.start();
}(this));
