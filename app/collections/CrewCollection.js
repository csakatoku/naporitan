(function(app, undef) {
    "use strict";

    var CREW_SORT_TOTAL_DESC     = -1;
    var CREW_SORT_TOTAL_ASC      = 1;
    var CREW_SORT_HP_DESC        = -2;
    var CREW_SORT_HP_ASC         = 2;
    var CREW_SORT_AT_DESC        = -3;
    var CREW_SORT_AT_ASC         = 3;
    var CREW_SORT_DF_DESC        = -4;
    var CREW_SORT_DF_ASC         = 4;
    var CREW_SORT_COST_DESC      = -5;
    var CREW_SORT_COST_ASC       = 5;
    var CREW_SORT_RARITY_DESC    = -6;
    var CREW_SORT_RARITY_ASC     = 6;
    var CREW_SORT_TIMESTAMP_DESC = -7;
    var CREW_SORT_TIMESTAMP_ASC  = 7;
    var CREW_SORT_SKILL_DESC     = -8;
    var CREW_SORT_SKILL_ASC      = 8;
    var CREW_SORT_PRIORITY_DESC  = -9;
    var CREW_SORT_PRIORITY_ASC   = 9;

    app.collections.CrewCollection = Backbone.Collection.extend({
        model: app.models.Crew,

        filterByCategory: function(category) {
            category = ~~category;
            if (category === 0) {
                return this;
            } else {
                return new app.collections.CrewCollection(this.filter(function(x) {
                    return x.get("category") === category;
                }));
            }
        },

        sortByType: function(type) {
            type = ~~type;
            var order = type < 0 ? -1 : 1;
            var index = Math.abs(type);

            if (index === CREW_SORT_TOTAL_ASC) {
                return this.sortBy(function(x) {
                    var param = x.get("hp") + x.get("attack") + x.get("defence");
                    return param * order;
                });
            } else {
                var properties = [
                    "hp",
                    "attack",
                    "defence",
                    "cost",
                    "rarity",
                    "timestamp",
                    "skillLevel"
                ];
                var prop = properties[index - 2];
                return this.sortBy(function(x) {
                    return x.get(prop) * order;
                });
            }
        }
    });
}(App));
