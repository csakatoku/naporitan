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
                this.__crews = new app.collections.UserCardCollection([
                    {
                        id     : 1,
                        rarity : 2,
                        category: 1,
                        name   : 'Crew 1',
                        cost   : 3,
                        hp     : 100,
                        attack : 100,
                        defence: 100,
                        xp     : 0,
                        level  : 1,
                        skillLevel: 0,
                        timestamp: 100,
                        priority: 0
                    },
                    {
                        id     : 2,
                        rarity : 1,
                        category: 2,
                        name   : 'Crew 2',
                        cost   : 6,
                        hp     : 200,
                        attack : 80,
                        defence: 120,
                        xp     : 0,
                        level  : 5,
                        skillLevel: 5,
                        timestamp: 10,
                        priority: 0
                    },
                    {
                        id     : 3,
                        rarity : 3,
                        category: 3,
                        name   : 'Crew 3',
                        cost   : 10,
                        hp     : 300,
                        attack : 500,
                        defence: 320,
                        xp     : 0,
                        level  : 10,
                        skillLevel: 1,
                        timestamp: 0,
                        priority: 0
                    }
                ]);
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
