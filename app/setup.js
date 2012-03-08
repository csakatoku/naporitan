(function(globals, undef) {
    var app = globals.App;

    // TODO
    // Initialize game data
    var desc = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    app.missions = new app.collections.MissionCollection([
        {
            id: 1,
            chapterId: 1,
            name: "ミッション1",
            description: desc,
            description: desc,
            energy: 1,
            xp: 1,
            minCoins: 10,
            maxCoins: 15
        },
        {
            id: 2,
            chapterId: 1,
            name: "ミッション2",
            description: desc,
            energy: 1,
            xp: 1,
            minCoins: 10,
            maxCoins: 15
        },
        {
            id: 3,
            chapterId: 1,
            name: "ミッション3",
            description: desc,
            energy: 1,
            xp: 1,
            minCoins: 10,
            maxCoins: 15
        },
        {
            id: 4,
            chapterId: 2,
            name: "ミッション4",
            description: desc,
            energy: 1,
            xp: 1,
            minCoins: 10,
            maxCoins: 15
        },
        {
            id: 5,
            chapterId: 2,
            name: "ミッション5",
            description: desc,
            energy: 1,
            xp: 1,
            minCoins: 10,
            maxCoins: 15
        },
        {
            id: 6,
            chapterId: 2,
            name: "ミッション6",
            description: desc,
            energy: 1,
            xp: 1,
            minCoins: 10,
            maxCoins: 15
        }
    ]);

    app.chapters = new app.collections.ChapterCollection([
        {
            id  : 1,
            name: "チャプター1"
        },
        {
            id  : 2,
            name: "チャプター2"
        }
    ]);

    // TODO
    globals.I18N = {};

    app.boot();
}(this));
