(function(globals, undef) {
    "use strict";

    globals.App = {
        _player: undef,

        views: {},
        models: {},
        collections: {},
        routers: {},
        templates: {},

        template: function(name) {
            return _.template(this.templates[name]);
        },

        getPlayer: function() {
            if (this._player === undef) {
                this._player = new this.models.Player();
            }
            return this._player;
        }
    };
}(this));
