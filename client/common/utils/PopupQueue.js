(function(App, global) {
    var PopupQueue = function() {
        this._views = [];
    };

    var p = PopupQueue.prototype;

    p.push = function(view) {
        this._views.push(view);
    };

    p.start = function() {
        return this._start(true);
    };

    p._start = function(first) {
        if (first === true) {
            this._dfd = new _.Deferred();
        }

        if (this._views.length) {
            var view = this._views.shift();
            view.on('close', this.onClose, this);
            view.render().show();
        }

        return this._dfd.promise();
    };

    p.onClose = function(view) {
        var self = this;
        if (view) {
            view.off(null, null, this);
        }

        if (this._views.length === 0) {
            this._dfd.resolve();
        } else {
            global.setTimeout(function(x) {
                self._start(false);
            }, 0);
        }
    };

    App.utils.PopupQueue = PopupQueue;
}(App, this));
