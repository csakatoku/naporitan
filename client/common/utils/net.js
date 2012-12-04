// load: client/app.js
(function(App) {
    var request = function(path, method, args) {
        var deferred = $.Deferred();

        $.ajax({
            url: path,
            type: method,
            data: args,
            dataType: 'json',
            cache: false
        }).success(function(data) {
            deferred.resolve(data);
        }).fail(function() {
            deferred.reject();
        });

        return deferred.promise();
    };

    var net = {};

    net.get = function(path, args) {
        return request(net.resolve(path, args), 'GET', args);
    };

    net.post = function(path, args) {
        return request(net.resolve(path, args), 'POST', args);
    };

    net.resolve = function(routeName, args) {
        if ('gacha_box_list' === routeName) {
            return '/api/users/' + args.user_id + '/gacha/box/' + args.box_id;
        } else if ('gacha_execute' === routeName) {
            return '/api/users/' + args.user_id + '/gacha/box/' + args.box_id;
        } else {
            return routeName;
        }
    };

    App.net = net;
}(App));
