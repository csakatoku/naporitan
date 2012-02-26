(function(app, undef) {
    "use strict";

    app.models.Player = Backbone.Model.extend({
        defaults: {
            maxEnergy: 10,
            energy: 10,
            xp: 0,
            level: 1,
            coins: 100,
            cash: 0
        },

        initialize: function() {
            this.set(this.defaults);
        },

        getEnergy: function() {
            return this.get("energy");
        },

        addXp: function(delta) {
            var level = this.get("level");
            var xp = this.get("xp") + delta;
            this.set("xp", xp);

            if (xp >= (level * 20)) {
                this.__lastEnergyGenerated = Date.now();
                this.set("maxEnergy", this.get("maxEnergy") + 1);
                this.set("energy", this.get("maxEnergy"));
                this.set("level", this.get("level") + 1);
            }
        },

        regenerateEnergy: function() {
            var now = Date.now();
            var delta = now - this.__lastEnergyGenerated;
            var period = 10 * 1000;
            if (delta > period) {
                var generated = Math.floor(delta / period);
                var energy = Math.min(this.getEnergy() + generated, this.getMaxEnergy());
                this.setEnergy(energy);
                this.__lastEnergyGenerated = now;
                if (__DEBUG__) {
                    console.log("energy regenerated");
                }
            }
        },

        getProgressById: function(missionId) {
            var m = this.getMissions();
            var current = m[missionId] || 0;
            return current > 100 ? 100 : current;
        },

        executeMission: function(mission) {
            var energy = this.getEnergy();
            if (energy >= mission.get("energy")) {
                //var coins = r.util.Random.randInt(mission.minCoins, mission.maxCoins);
                var coins = 100;
                this.set({
                    "energy": energy - mission.get("energy"),
                    "coins" : this.get("coins") + coins
                });
                this.addXp(mission.get("xp"));
                this.progressMission(mission.get("id"), 10);
            }
        },

        progressMission: function(missionId, delta) {
            //
        },

        getCurrentMission: function() {
            var self = this;
            var chapter = this.getCurrentChapter();
            var missions = chapter.getMissions().filter(function(m) {
                return !self.isLockedMission(m);
            });
            return missions[missions.length - 1];
        },

        isLockedMission: function(mission) {
            var missionId = mission.id;
            if (missionId === 1) {
                return false;
            }
            var prev = r.model.Mission.get(missionId - 1);
            return !this.isCompletedMission(prev);
        },

        isCompletedMission: function(mission) {
            return this.getProgressById(mission.id) >= 100;
        },

        isLockedChapter: function(chapter) {
            var chapterId = chapter.getId();
            if (chapterId === 1) {
                // first chapter is always unlocked
                return false;
            }
            var prev = r.model.Chapter.get(chapterId - 1);
            return !this.isCompletedChapter(prev);
        },

        isCompletedChapter: function(chapter) {
            var self = this;
            return chapter.getMissions().every(function(mission) {
                var progress = self.getProgressById(mission.id);
                return progress >= 100;
            });
        },

        refreshCurrentChapter: function() {
            var chapters = r.model.Chapter.list();
            var chapter = chapters[0], next;
            for (var i = 0, length = chapters.length; i < length; i++) {
                next = chapters[i];
                if (!this.isCompletedChapter(chapter)) {
                    break;
                }
                chapter = next;
            }
            this.__currentChapter = chapter;
        },

        getCurrentChapter: function() {
            return this.__currentChapter;
        },

        addCrew: function(obj) {
            var clone = {};
            for (var k in obj) {
                if (obj.hasOwnProperty(k)) {
                    clone[k] = obj[k];
                }
            }
            clone.id = this.getCrews().length + 1;
            this.getCrews().push(clone);
        },

        sellCrew: function(id) {
            var crew, crews = this.getCrews();
            id = parseInt(id);
            for (var i = 0, length = crews.length; i < length; i++) {
                crew = crews[i];
                if (crew.id === id) {
                    crews.splice(i, 1);
                    this.setCoins(this.getCoins() + 100);
                    break;
                }
            }
        },

        getCrews: function() {
            if (this.__crews === undefined) {
                this.__crews = [
                    {
                        id: 1,
                        name: 'Default Crew',
                        attack: 1000,
                        defence: 500,
                        level: 1,
                        xp: 0
                    }
                ];
            }
            return this.__crews;
        },

        onGameBooted: function() {
            var self = this;
            this.__lastEnergyGenerated = Date.now();
            this.__interval = setInterval(function() {
                self.regenerateEnergy();
            }, 1000);

            this.refreshCurrentChapter();

            this.unregister('app.boot.complete');
        }
    });
}(App));
