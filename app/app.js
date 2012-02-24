(function(globals, undef) {
    globals.App = {
        views: {},
        models: {},
        collections: {},
        routers: {},
        templates: {},

        template: function(name) {
            return _.template(this.templates[name]);
        }
    };
}(this));
