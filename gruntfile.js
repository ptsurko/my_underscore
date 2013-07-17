module.exports = function (grunt) {

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');

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
                //separator: ';'
                banner: '(function() {',
                footer: '})(window);'
            },
            build: {
                src: 'underscore/**/*.js',
                dest: 'build/<%= pkg.name %>.js',
            }
        },
        watch: {
            files: ['**/*.js'],
            tasks: ['concat']
        }
    });

    // Default task(s).
    grunt.registerTask('default', ['concat', 'uglify']);
};