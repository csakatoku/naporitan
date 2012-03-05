(function(app) {
    _.extend(app.utils, {
        loadScript: function(url, callback) {
            var head = document.head;
            var el = document.createElement('script');
            var assign = function(element, func) {
                element.onload = element.onerror = element.onreadystatechange = func;
            };

            el.async = true;

            assign(el, function(event) {
                // TODO
                // error handling!

                // Prevent memory leaks
                assign(el, null);

                if (callback) {
                    callback(event);
                }
            });

            el.src = url;
            head.insertBefore(el, head.firstChild);
        }
    });
}(App));
