(function(app, undef) {
    "use strict";

    app.models.Crew = Backbone.Model.extend({
        /**
         * Get image URL used in list views
         */
        getSquarePictureURL: function() {
            return ASSET_URL + '/images/character/b06d47c396332d3feaa95ab6c81ca756.gif';
        },

        /**
         * Get the biggest image URL which used in the detail view
         */
        getLargePictureURL: function() {
            return ASSET_URL + '/images/character/10da790ae13565017316fefb15a83fe0.jpg';
        },

        /**
         * Get landscape image URL which used in mission views.
         */
        getLandscapePictureURL: function() {
            return ASSET_URL + '/images/character/6645714df79c5092df93452829ee20a7.jpg';
        },

        /**
         * Get portrait image URL which used in home views.
         */
        getPortraitPictureURL: function() {
            return ASSET_URL + '/images/character/c06e826192c2c65e842cf6afe03cd33c.jpg';
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
