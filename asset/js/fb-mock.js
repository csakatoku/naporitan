(function(globals) {
    var key = '_naporitan_uid';
    var storage = (function() {
        try {
            localStorage["__FB_MOCK_LOCAL_STORAGE_TEST"] = "1";
            return localStorage;
        } catch (x) {
            return {};
        }
    }());

    var uid = storage[key];
    if (uid === undefined) {
        uid = Math.floor(Math.random() * 10000 + 1);
        storage[key]= uid;
    }

    var Event = {
        subscribe: function() {
            //console.log('FB.Event.subscribe');
        }
    };

    var UA = {
        nativeApp: function() {
            return true;
        }
    };

    globals.FB = {
        getUserID: function() {
            return uid;
        },

        init: function() {
            //console.log("FB.init");
        },

        Event: Event,

        UA: UA
    };

    globals.fbAsyncInit();
}(this));
