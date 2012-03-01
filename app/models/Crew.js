(function(app, undef) {
    "use strict";

    var MAX_SKILL_LEVEL = 35 - 1;

    app.models.Crew = Backbone.Model.extend({
        getSquarePictureURL: function() {
            return '';
        },

        getSkillLevelStarClass: function() {
            var level = Math.min(this.get('skillLevel'), MAX_SKILL_LEVEL);
            var stars = Math.floor(level / 5);
            return stars > 0 ? 'skill-level-' + stars : null;
        },

        getSkillLevelStars: function() {
            var level = Math.min(this.get('skillLevel'), MAX_SKILL_LEVEL);
            var count = (level % 5) + 1;
            var buf = [];
            var str = (level < 5) ? "&#x2606" : "&#x2605";
            for (var i = 0; i < count; i++) {
                buf.push(str);
            }
            return buf.join("");
        }
    });
}(App));
