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
                '_': true
            }
        },

        less: {
            development: {
                options: {
                    paths: ['client/common/stylesheets']
                },
                files: {
                    'server/public/css/app.css': 'client/common/stylesheets/app.less'
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

        depconcat: {
            bootstrap: {
                src: [
                    'client/app.js',
                    'client/common/utils/dom.js'
                ],
                dest: 'server/public/js/dist/app.setup.js',
                separator: ';'
            },
            top: {
                src: [
                    'client/common/**/*.js'
                ],
                dest: 'server/public/js/dist/app.top.js'
            },
            home: {
                src: [
                    'client/common/**/*.js'
                ],
                dest: 'server/public/js/dist/app.home.js'
            },
            gacha: {
                src: [
                    'client/common/**/*.js',
                    'client/gacha/**/*.js'
                ],
                dest: 'server/public/js/dist/app.gacha.js'
            },
            item: {
                src: [
                    'client/common/**/*.js',
                    'client/item/**/*.js'
                ],
                dest: 'server/public/js/dist/app.item.js'
            },
            card: {
                src: [
                    'client/common/**/*.js',
                    'client/card/**/*.js'
                ],
                dest: 'server/public/js/dist/app.card.js'
            },
            mission: {
                src: [
                    'client/common/**/*.js',
                    'client/mission/**/*.js'
                ],
                dest: 'server/public/js/dist/app.mission.js'
            }
        },

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
