module.exports = function(grunt) {

    // 1. Init configs
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            production: {
                files: {
                    'dist/js/lib.min.js': ['js/lib/*.js'],
                    'dist/ui.js'        : ['js/ui/*.js']
                }
            }
        },
        uglify: {
            production: {
                options: { compress: true, mongle: true },
                files: {
                    'dist/js/ui.min.js'  : ['dist/ui.js'],
                    'dist/js/main.min.js': ['dist/main.js']
                }
            }
        },
        less: {
            production: {
                options: { path: ['less'] },
                files  : { 'dist/css/style.css': 'less/style.less' }
            }
        },
        copy: {
            main: {
                files: [
                    {expand: true, src: ['index.html'], dest: 'dist/'},
                    {expand: true, src: ['html/**'],    dest: 'dist/'},
                    {expand: true, src: ['image/**'],   dest: 'dist/'}
                ]
            }
        },
        clean: {
            production: {
                src: ['dist/ui.js']
            },
            all: {
                src: ['dist/*']
            }
        },
        watch: {
            less: {
                files: 'less/*.less',
                tasks: 'less'
            },
            script: {
                files: 'js/*.js',
                tasks: ['concat', 'uglify', 'clean']
            },
            html: {
                files: ['index.html', 'html/*.html', 'image/*'],
                tasks: ['copy']
            }
        }
    });

    // 2. Load tasks
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less'  );
    grunt.loadNpmTasks('grunt-contrib-copy'  );
    grunt.loadNpmTasks('grunt-contrib-clean' );
    grunt.loadNpmTasks('grunt-contrib-watch' );

    // 3. Register tasks
    grunt.registerTask('default', ['copy', 'concat', 'uglify', 'clean:production', 'less', 'watch']);
};
