/*global MAX_SKILL_LEVEL:true */
(function(App, undef) {
    "use strict";

    var Card = App.models.Card = Backbone.Model.extend({
        initialize: function(args) {
            this.cardId = args.card_id || 1;
            this.set(args);
            this.set({
                level: 1
            });
        },

        /**
         * Get image URL used in list views
         */
        getSquarePictureURL: function() {
            return ASSET_URL + '/images/character/' + this.cardId + '/48x48.png';
        },

        /**
         * Get the smaller image URL
         */
        getSmallPictureURL: function() {
            return ASSET_URL + '/images/character/' + this.cardId + '/80x107.png';
        },

        /**
         * Get the biggest image URL which used in the detail view
         */
        getLargePictureURL: function() {
            return ASSET_URL + '/images/character/' + this.cardId + '/320x427.jpg';
        },

        /**
         * Get landscape image URL which used in mission views.
         */
        getLandscapePictureURL: function() {
            return ASSET_URL + '/images/character/' + this.cardId + '/320x64.jpg';
        },

        /**
         * Get portrait image URL which used in home views.
         */
        getPortraitPictureURL: function() {
            return ASSET_URL + '/images/character/' + this.cardId + '/64x128.jpg';
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
