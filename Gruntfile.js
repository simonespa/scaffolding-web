module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        cnf: grunt.file.readJSON('config.json'),
        clean: {
            all: [
                '<%= cnf.lib %>',
                '<%= cnf.css %>',
                '.sass-cache',
                '<%= cnf.node %>',
                '<%= cnf.bower %>'
            ],
            dev: [
                '<%= cnf.lib %>',
                '<%= cnf.css %>',
                '.sass-cache'
            ]
        },
        copy: {
            dev: {
                files: [
                    {expand: true, flatten: true, src: '<%= cnf.bower %>/angular/angular.js', dest: '<%= cnf.lib %>'}
                ]
            }
        },
        sass: {
            dev: {
                options: {
                    style: 'expanded'
                },
                files: {
                    '<%= cnf.css %>/main.css': '<%= cnf.scss %>/*.scss'
                }
            }
        },
        jshint: {
            options: {
                jshintrc: true,
                reporter: require('jshint-stylish')
            },
            all: ['Gruntfile.js', '<%= cnf.js %>/*', '<%= cnf.lib %>/*'],
            dev: ['<%= cnf.js %>/*']
        },
        connect: {
            options: {
                port: 8080,
                livereload: 35729,
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    open: true,
                    base: 'src'
                }
            }
        },
        watch: {
            options: {
                livereload: '<%= connect.options.livereload %>'
            },
            scss: {
                files: ['<%= cnf.scss %>/*'],
                tasks: ['sass:dev']
            },
            js: {
                files: ['<%= cnf.js %>/*'],
                tasks: ['jshint:dev']
            },
            livereload: {
                files: [
                    '<%= cnf.scss %>/*',
                    'src/*.html'
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('dev', ['clean:dev', 'copy:dev', 'sass:dev', 'connect:livereload', 'watch']);
    grunt.registerTask('test', ['jshint:dev']);

};