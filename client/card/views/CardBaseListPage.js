(function(App) {
    "use strict";

    var sortOptions = [
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

    var filterOptions = [
        [0, "全タイプ"],
        [1, "近接"],
        [2, "遠隔"],
        [3, "飛行"]
    ];

    App.views.CardBaseListPage = Backbone.View.extend({
        initialize: function(options) {
            var collection = options.collection;
            collection.on('all', this.renderElements, this);

            this.sortType = 0;
            this.filterCategory = 0;
        },

        render: function() {
            var ListView = App.views[this.ListViewClassName];
            var tmpl = App.template(this.templateName);
            $(this.el).html(tmpl({}));

            this.tabView =  new App.views.SelectView.create(filterOptions);
            this.tabView.render().$el.appendTo(this.$('.category-placeholder'));
            this.tabView.on('change', this.onChangeFilter, this);

            this.selectView = new App.views.SelectView.create(sortOptions);
            this.selectView.render().$el.appendTo(this.$('.sort-placeholder'));
            this.selectView.on('change', this.onChangeSort, this);

            this.listView = new ListView();
            this.listView.render().$el.appendTo(this.$('.card-list-placeholder'));

            return this;
        },

        renderElements: function() {
            if (this.listView) {
                var collection = new App.collections.CardCollection(
                    this.listView.filterModels(this.collection.models)
                );

                var filtered = collection
                    .filterByCategory(this.filterCategory)
                    .sortByType(this.sortType)
                ;

                this.listView.renderElements(filtered);
            }
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
