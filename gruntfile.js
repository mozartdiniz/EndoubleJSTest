module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: [
                    'src/js/fields/Endouble.Base.js',
                    'src/js/fields/Endouble.Tags.js',
                    'src/js/fields/Endouble.Text.js',
                    'src/js/fields/Endouble.Select.js',
                    'src/js/fields/Endouble.Button.js',
                    'src/js/Endouble.Form.js'
                ],
                dest: 'dist/enouble_form_builder.js'
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
                        cwd: 'src/css',
                        src: ['*.scss'],
                        dest: 'dist',
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
                    "index.css": "src/css/index.scss"
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
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('build', ['sass:dev', 'concat']);
    grunt.registerTask('default', ['sass:dev', 'concat', 'karma']);
};