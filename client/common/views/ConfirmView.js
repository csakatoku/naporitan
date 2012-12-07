//load: client/common/views/BaseConfirmView.js
(function(App) {
    "use strict";

    App.views.ConfirmView = App.views.BaseConfirmView.extend({
        initialize: function(options) {
            this.templateName = options.templateName || this.templateName;
        }
    });
}(App));

