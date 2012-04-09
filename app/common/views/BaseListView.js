// -*- jsconcat: 100 -*-
(function(App) {
    App.views.BaseListView = Backbone.View.extend({
        el: "#content",

        initialize: function() {
            this.sortType = 0;
            this.filterCategory = 0;

            this._elements = {};

            this._data = [];

            this.tabView = new App.views.CardTabView();
            this.tabView.render();
            this.tabView.on('change', this.onChangeFilter, this);

            this.selectView = new App.views.CardSortSelectView();
            this.selectView.render();
            this.selectView.on('change', this.onChangeSort, this);

            this.subMenuView = new App.views.CardSubMenuView();
            this.subMenuView.render();

            var events = _.extend({}, this.events);
            var eventName = 'click [data-list-view-id="' + this.cid  + '"] li';
            events[eventName] = 'onClick';
            this.delegateEvents(events);
        },

        dataBind: function(data) {
            this._data = data || {};
        },

        render: function() {
            this.$el.html(this.template(this._data));
            this.$list = this.$('#card-list');
            this.$list.attr('data-list-view-id', this.cid);

            this.renderElements();

            this.$('#sort-placeholder').html(this.selectView.el);
            this.$('#card-tab').html(this.tabView.el);
            this.$('#card-sub-menu').html(this.subMenuView.el);

            return this;
        },

        renderElements: function() {
            var self = this;
            var crews = App.getPlayer().getCrews()
                .filterByCategory(this.filterCategory)
                .sortByType(this.sortType);

            _.values(this._elements).forEach(function(el) {
                el.remove();
            });

            var $list = this.$list;
            var ElementView = this.ListElementView;

            var elements = {};

            crews.forEach(function(model) {
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
        },

        onClick: function(evt) {
            var id = $(evt.currentTarget).data('model-id');
            var view = this._elements[id];
            if (view) {
                this.onElementClick(evt, view.model);
            }
        },

        onElementClick: function(evt, element) {
            // Override this function
        },

        onChangeFilter: function(value) {
            value = ~~value;
            if (this.filterCategory !== value) {
                this.filterCategory = value;
                this.renderElements();
            }
        },

        onChangeSort: function(value) {
            this.sortType = ~~value;
            this.renderElements();
        }
    });
}(App));
