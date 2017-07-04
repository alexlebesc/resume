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
                        cwd: '<%= pkg.src %>',
                        src: [
                            'img/**',
                            'sitemap.xml'
                        ],
                        dest: '<%= pkg.build %>/'
                    }
                ]
            },
            libFiles: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        cwd: '<%= pkg.src %>',
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
                        '<%= pkg.src %>/lib/googleapis-OpenSans.css',
                        '<%= pkg.src %>/lib/bootstrap/css/bootstrap.min.css',
                        '<%= pkg.src %>/lib/font-awesome/css/font-awesome.css',
                        '<%= pkg.src %>/css/style.css'
                    ]
                }
            }
        },

        uglify: {
            target: {
                files: {
                    '<%= pkg.build %>/js/main.min.js': [
                        '<%= pkg.src %>/lib/jquery.min.js',
                        '<%= pkg.src %>/lib/bootstrap/js/bootstrap.js',
                        '<%= pkg.src %>/lib/ResizeSensor.js',
                        '<%= pkg.src %>/js/main.js'
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
                        cwd: '<%= pkg.src %>',
                        src: [
                            'index.html',
                            'en/index.html'
                        ]
                    }
                ],
                options: {
                    patterns: [
                        {
                            //Grab the <!--build-css-start--> and <!--build-css-end--> comments and everything in-between
                            match: /\<\!\-\-build\-css\-start[\s\S]*build\-css\-end\-\-\>/,
                            replacement: function (matchedString) {
                                return '<link rel="stylesheet" media="screen" href="/css/main.css"/>';
                            }
                        },

                        {
                            //Grab the <!--build-js-start--> and <!--build-js-end--> comments and everything in-between
                            match: /\<\!\-\-build\-js\-start[\s\S]*build\-js\-end\-\-\>/,
                            replacement: function (matchedString) {
                                return '<script type="text/javascript" src="/js/main.min.js"></script>';
                            }
                        }
                    ]
                }
            }
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    '<%= pkg.build %>/index.html': '<%= pkg.build %>/index.html',
                    '<%= pkg.build %>/en/index.html': '<%= pkg.build %>/en/index.html'
                }
            }
        },

        'http-server': {

            'dev': {

                // the server root directory
                root: 'public',

                // the server port
                // can also be written as a function, e.g.
                // port: function() { return 8282; }
                port: 8282,

                // the host ip address
                // If specified to, for example, "127.0.0.1" the server will
                // only be available on that ip.
                // Specify "0.0.0.0" to be available everywhere
                host: "0.0.0.0",

                showDir: true,
                autoIndex: true,

                // server default file extension
                ext: "html",

                // Tell grunt task to open the browser
                openBrowser: false,

            }
        },

        clean: ['<%= pkg.build %>']

    });


    // DEPENDENT PLUGINS =========================/

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-http-server');


    // TASKS =========================/

    // Build task
    grunt.registerTask('build', ['clean', 'copy:projectFiles', 'copy:libFiles','cssmin', 'uglify', 'replace:gather', 'htmlmin:dist']);
    grunt.registerTask('start', ['build','http-server:dev']);
};
