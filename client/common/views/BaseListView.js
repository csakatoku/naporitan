(function(App) {
    App.views.BaseListView = Backbone.View.extend({
        tagName: 'ul',

        events: {
            'click li': 'onClick'
        },

        onClick: function(evt) {
            var target = evt.currentTarget;
            var modelId = $(target).data('model-id');
            var view = this._elements[modelId];
            return this.onSubViewClick(evt, view);
        },

        onSubViewClick: function(evt, view) {
            return false;
        },

        renderElements: function(collection) {
            var self = this;
            var $list = this.$el;
            var ElementView = this.ListElementView;

            var elements = {};

            $list.empty();

            collection.forEach(function(model) {
                var id = model.get('id');
                var view = new ElementView({
                    attributes: {
                        'data-model-id': id
                    },
                    model: model
                });
                view.render();
                $list.append(view.$el);

                elements[id] = view;
            });

            this._elements = elements;

            return this;
        }
    });
}(App));
