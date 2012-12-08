module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-dep-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-s3');

    grunt.registerMultiTask('templates', 'Convert templates to JavaScript', function() {
        var buf = [
            'var _T = {};'
        ];
        var files = grunt.file.expandFiles(this.file.src);
        files.forEach(function(filepath) {
            var templateFileName = filepath.split('templates')[1];
            var templateId = templateFileName.substr(1).replace(/\.html$/, '');
            var content = grunt.file.read(filepath);

            var tmp = [];
            content.split("\n").forEach(function(line) {
                tmp.push(line.replace(/^\s*</, '<'));
            });

            buf.push('_T["' + templateId + '"] = ' + JSON.stringify(tmp.join('')) + ';');
        });

        grunt.file.write(this.file.dest, buf.join("\n"));
        grunt.log.writeln('File "' + this.file.dest + '" created.');
    });

    var depconcat = {
        bootstrap: {
            src: [
                'client/app.js',
                'client/common/utils/*.js'
            ],
            dest: 'server/public/js/dist/app.setup.js',
            separator: ';'
        }
    };
    ['top', 'home', 'gacha', 'item', 'card', 'mission', 'cash'].forEach(function(mod) {
        depconcat[mod] = {
            src: [
                'client/common/{models,collections,views,routers}/*.js',
                'client/'+ mod + '/**/*.js'
            ],
            dest: 'server/public/js/dist/app.' + mod + '.js'
        };
    });

    grunt.initConfig({
        pkg: '<json:package.json>',

        lint: {
            files: [
                'grunt.js',
                'client/**/*.js'
            ]
        },

        jshint: {
            globals: {
                console: true,
                Backbone: true,
                '$': true,
                '_': true,
                '__DEBUG__': true,
                'ASSET_URL': true
            }
        },

        less: {
            development: {
                options: {
                    paths: ['client/common/stylesheets']
                },
                files: {
                    'server/public/css/app.css': 'client/common/stylesheets/app.less',
                    'server/public/css/mission.css': 'client/mission/stylesheets/mission.less',
                    'server/public/css/gacha.css': 'client/gacha/stylesheets/gacha.less',
                    'server/public/css/card.css': 'client/card/stylesheets/card.less'
                }
            }
        },

        templates: {
            debug: {
                src: [
                    'client/*/templates/**/*.html'
                ],
                dest: 'server/public/js/dist/app.templates.js'
            }
        },

        depconcat: depconcat,

        aws: '<json:aws.json>',

        s3: {
            key: '<%= aws.key %>',
            secret: '<%= aws.secret %>',
            bucket: '<%= aws.bucket %>',
            access: 'public-read',
            upload: [
                {
                    src : 'server/public/js/*.js',
                    dest: 'naporitan/js/'
                },
                {
                    src : 'server/public/js/dist/*.js',
                    dest: 'naporitan/js/dist/'
                },
                {
                    src : 'server/public/css/*.css',
                    dest: 'naporitan/css/'
                }
            ]
        },

        watch: {
            files: [
                '<config:lint.files>',
                '<config:templates.debug.src>'
            ],
            tasks: 'default'
        }
    });

    grunt.registerTask('default', 'lint templates depconcat');
};
