(function(app, undef) {
    "use strict";

    app.models.Crew = Backbone.Model.extend({
        /**
         * Get image URL used in list views
         */
        getSquarePictureURL: function() {
            var id = 1;
            return ASSET_URL + '/images/character/' + id + '/48x48.png';
        },

        /**
         * Get the smaller image URL
         */
        getSmallPictureURL: function() {
            var id = 1;
            return ASSET_URL + '/images/character/' + id + '/80x107.png';
        },

        /**
         * Get the biggest image URL which used in the detail view
         */
        getLargePictureURL: function() {
            var id = 1;
            return ASSET_URL + '/images/character/' + id + '/320x427.jpg';
        },

        /**
         * Get landscape image URL which used in mission views.
         */
        getLandscapePictureURL: function() {
            var id = 1;
            return ASSET_URL + '/images/character/' + id + '/320x64.jpg';
        },

        /**
         * Get portrait image URL which used in home views.
         */
        getPortraitPictureURL: function() {
            var id = 1;
            return ASSET_URL + '/images/character/' + id + '/64x128.jpg';
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
