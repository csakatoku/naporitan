(function(App) {
    App.views.BaseListElementView = Backbone.View.extend({
        tagName: 'li',

        events: {
            'click a': 'onClick'
        },

        render: function() {
            this.$el.html(this.template({
                element: this.options.model
            }));
            return this;
        },

        onClick: function(e) {
            this.trigger('click', e, this.element, this);
        }
    });
}(App));
