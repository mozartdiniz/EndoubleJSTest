module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },
        sass: {
            dev: {
                options: {
                    style: 'expanded',
                    compass: true
                },
                files: [
                    {
                        expand: true,
                        cwd: 'css',
                        src: ['*.scss'],
                        dest: '',
                        ext: '.css'
                    }
                ]
            },
            dist: {
                options: {
                    style: 'compressed',
                    compass: true
                },
                files: {
                    "index.css": "css/index.scss"
                }
            }
        },
        watch: {
            css: {
                files: 'css/index.scss',
                tasks: ['sass:dev']
            }
        }
    });

    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('css', ['sass:dev']);
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('test', ['sass:dev', 'karma']);
};