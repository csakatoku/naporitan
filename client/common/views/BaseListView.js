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
            var id = view.model.get('id');
            view.$el.toggleClass("selected");

            this.toggleSelected(id);

            var values = this.selectedValues();
            this.trigger('change', values);

            return false;
        },

        filterModels: function(models) {
            return models;
        },

        toggleSelected: function(id) {
            if (this._selected === undefined) {
                this._selected = {};
            }

            var exist = (id in this._selected);
            if (exist) {
                delete this._selected[id];
            } else {
                this._selected[id] = id;
            }
            return exist;
        },

        selectedValues: function() {
            return (this._selected === undefined) ? [] : Object.keys(this._selected);
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
