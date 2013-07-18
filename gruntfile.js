module.exports = function (grunt) {

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
            },
            build: {
                src: 'build/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },
        concat: {
            options: {

            },
            build: {
                src: 'underscore/**/*.js',
                dest: 'build/<%= pkg.name %>.js',
            }
        },
        jshint: {
            options: {
                force: true,
                globals: {
                    _: true
                }
            },
            beforeconcat: {
                src: ['underscore/**/*.js']
            },
            afterconcat: {
                src: ['build/<%= pkg.name %>.js']
            }
        },
        watch: {
            files: ['**/*.js'],
            tasks: ['concat']
        }
    });

    // Default task(s).
    grunt.registerTask('default', ['jshint:beforeconcat', 'concat', 'uglify']);
};