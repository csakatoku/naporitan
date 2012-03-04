(function(globals, undef) {
    "use strict";

    var compiledTemplates = {};

    globals.App = {
        _player: undef,

        utils: {},
        views: {},
        models: {},
        collections: {},
        routers: {},
        templates: {},

        template: function(name) {
            var app = this;

            return function(args) {
                var tmpl;
                if (name in compiledTemplates) {
                    tmpl = compiledTemplates[name];
                } else {
                    tmpl = compiledTemplates[name] = _.template(app.templates[name]);
                }

                // Helper functions
                args = args || {};
                args._path = app.router.reverse;

                return tmpl(args);
            };
        },

        getPlayer: function() {
            if (this._player === undef) {
                this._player = new this.models.Player();
            }
            return this._player;
        }
    };
}(this));
