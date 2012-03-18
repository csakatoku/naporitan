(function(globals) {
    var key = '_naporitan_uid';
    var uid = localStorage[key];
    if (uid === undefined) {
        uid = Math.floor(Math.random() * 10000 + 1);
        localStorage[key]= uid;
    }

    var Event = {
        subscribe: function() {
            console.log('FB.Event.subscribe');
        }
    };

    globals.FB = {
        getUserID: function() {
            console.log("FB.getUserID() == " + uid);
            return uid;
        },

        init: function() {
            console.log("FB.init");
        },

        Event: Event
    };

    globals.fbAsyncInit();
}(this));
