(function(App) {
    "use strict";

    var options = [
        [-1, "総パラメータ高い順"],
        [1, "総パラメータ低い順"],
        [-2, "HP高い順"],
        [2, "HP低い順"],
        [-3, "AT高い順"],
        [3, "AT低い順"],
        [-4, "DF高い順"],
        [4, "DF低い順"],
        [-5, "必要統率高い順"],
        [5, "必要統率低い順"],
        [-6, "レア度高い順"],
        [6, "レア度低い順"],
        [-7, "最近出会った順"],
        [7, "昔に出会った順"],
        [-8, "SKがある順"],
        [8, "SKがない順"],
        [-9, "優先度高い順"],
        [9, "優先度低い順"]
    ];

    App.views.CardSortSelectView = Backbone.View.extend({
        tagName: 'select',

        events: {
            'change': function() {
                this.trigger('change', this.value());
            }
        },

        render: function() {
            var self = this;
            var select = this.$el;

            options.forEach(function(pair) {
                var value = pair[0];
                var text = pair[1];
                var option = self.make('option', { value: value }, _.escape(text));
                select.append(option);
            });

            return this;
        },

        value: function() {
            return this.$el.val();
        }
    });
}(App));
