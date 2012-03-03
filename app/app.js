(function(globals, undef) {
    "use strict";

    globals.App = {
        _player: undef,

        utils: {},
        views: {},
        models: {},
        collections: {},
        routers: {},
        templates: {},

        template: function(name) {
            var tmpl = _.template(this.templates[name]);
            var app = this;
            return function(args) {
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
