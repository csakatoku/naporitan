module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-dep-concat');
    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.registerMultiTask('templates', 'Convert templates to JavaScript', function() {
        var buf = [
            'var _T = {};'
        ];
        var files = grunt.file.expandFiles(this.file.src);
        files.forEach(function(filepath) {
            var templateName = filepath.replace(/^client\/templates\//, '').replace(/\.html$/, '');
            var content = grunt.file.read(filepath);

            var tmp = [];
            content.split("\n").forEach(function(line) {
                tmp.push(line.replace(/^\s*</, '<'));
            });

            buf.push('_T["' + templateName + '"] = ' + JSON.stringify(tmp.join('')) + ';');
        });

        grunt.file.write(this.file.dest, buf.join("\n"));
        grunt.log.writeln('File "' + this.file.dest + '" created.');
    });

    grunt.initConfig({
        pkg: '<json:package.json>',

        lint: {
            files: [
                'grunt.js',
                'client/*.js',
                'client/{models,collections,views,routers}/*.js'
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
                    paths: ['css']
                },
                files: {
                    'server/public/css/app.css': 'css/app.less'
                }
            }
        },

        templates: {
            debug: {
                src: [
                    'client/templates/**/*.html'
                ],
                dest: 'server/public/js/app.template.js'
            }
        },

        depconcat: {
            bootstrap: {
                src: [
                    'app/setup.js'
                ],
                dest: 'server/public/js/app.setup.js',
                separator: ';'
            },
            app: {
                src: [
                    'client/{models,collections,views,routers}/*.js'
                ],
                dest: 'server/public/js/app.js'
            }
        },

        watch: {
            files: ['<config:lint.files>', '<config:templates.debug.src>'],
            tasks: 'default'
        }
    });

    grunt.registerTask('default', 'lint templates depconcat');
};
