(function(App) {
    App.views.BaseListView = Backbone.View.extend({
        tagName: 'ul',

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
