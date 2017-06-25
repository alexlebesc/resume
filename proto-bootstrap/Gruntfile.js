module.exports = function (grunt)
{

  // Project configuration.
  grunt.initConfig(
  {
    pkg: grunt.file.readJSON('package.json'),

    // COPY ===================================/
    copy:
    {
      all:
      {
        files: [
          {
            expand: true,
            src: ['css/**', 'img/**', 'js/**', 'lib/**', '*.html'],
            dest: '<%= pkg.build %>/'
          }
        ]
      }
    }
  });



  // DEPENDENT PLUGINS =========================/

  // Load the plugin that provides the "copy" task.
  grunt.loadNpmTasks('grunt-contrib-copy');


  // TASKS =========================/

  // Build task
  grunt.registerTask('build', ['copy:all']);
};
