// load: client/app.js
/*global localStorage:true, sessionStorage:true */
(function(app) {
    "use strict";

    var _localStorage;
    var _sessionStorage;

    var proxy = function(storage, testKey) {
        try {
            storage[testKey] = "1";
            delete storage[testKey];
            return storage;
        } catch (x) {
            return {};
        }
    };

    _.extend(app.utils, {
        getLocalStorage: function() {
            if (_localStorage === undefined) {
                _localStorage = proxy(localStorage, '__LOCAL_STROAGE_TEST');
            }
            return _localStorage;
        },

        getSessionStorage: function() {
            if (_sessionStorage === undefined) {
                _sessionStorage = proxy(sessionStorage, '__SESSION_STORAGE_TEST');
            }
            return _sessionStorage;
        }
    });
}(App));
