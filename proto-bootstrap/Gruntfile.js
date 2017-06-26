module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // COPY ===================================/
        copy: {
            projectFiles: {
                files: [
                    {
                        expand: true,
                        src: ['img/**', 'js/**'],
                        dest: '<%= pkg.build %>/'
                    }
                ]
            },
            libFiles: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['lib/*/fonts/*'],
                        dest: '<%= pkg.build %>/fonts/'
                    }
                ]
            }
        },

        cssmin: {
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    '<%= pkg.build %>/css/main.css': [
                        'lib/googleapis-OpenSans.css',
                        'lib/bootstrap/css/bootstrap.min.css',
                        'lib/font-awesome/css/font-awesome.css',
                        'css/style.css'
                    ]
                }
            }
        },

        replace: {
            gather: {
                files: [
                    {
                        dest: '<%= pkg.build %>/',
                        expand: true,
                        src: [ 'index.html' ]
                    }
                ],
                options: {
                    patterns: [
                        {
                            //Grab the <!--build-css-start--> and <!--build-css-end--> comments and everything in-between
                            match: /\<\!\-\-build\-css\-start[\s\S]*build\-css\-end\-\-\>/,
                            replacement: function ( matchedString ) {
                                return '<link rel="stylesheet" media="screen" href="css/main.css"/>';
                            }
                        }
                    ]
                }
            }
        },


        clean: ['<%= pkg.build %>']

    });


    // DEPENDENT PLUGINS =========================/

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-replace');


    // TASKS =========================/

    // Build task
    grunt.registerTask('build', ['clean', 'copy:projectFiles', 'copy:libFiles','cssmin', 'replace:gather']);
};
