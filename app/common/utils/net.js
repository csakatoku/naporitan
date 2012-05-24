(function(App) {
    var request = function(path, method, args) {
        var deferred = $.Deferred();

        args = args || {};

        // TDDO
        args['uid'] = App.uid;

        $.ajax({
            url: path,
            method: method,
            data: args,
            dataType: 'json',
            cache: false
        }).success(function(data) {
            var metadata = data.metadata;
            var body = data.body || {};
            deferred.resolve(body);
        }).fail(function() {
            deferred.reject();
        });

        return deferred.promise();
    };

    var net = {};

    net.get = function(path, args) {
        return request(path, 'GET', args);
    };

    net.post = function(path, args) {
        return request(path, 'POST', args);
    };

    App.net = net;
}(App));
