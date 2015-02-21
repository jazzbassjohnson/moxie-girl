// Generated on 2014-09-22 using generator-angular 0.9.8
'use strict';



module.exports = function (grunt) {
  // grunt.file.setBase('./admin')

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);



  // Configurable paths for the application
  var appConfig = {
    app: require('./bower.json').appPath || '',
    dist: 'dist'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: appConfig,

    // The actual grunt server settings
    connect: {
      options: {
        port: 3000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          // base: ['<%= yeoman.app %>','<%= yeoman.app %>/'],
          open: true,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect().use(
                '<%= yeoman.app %>',
                connect.static('<%= yeoman.app %>')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use(
                './.bowerrc'.directory,
                connect.static('./.bowerrc'.directory)
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      dist: {
        
        options: {
          open: true,

          // set base directory and browsable app
          base: ['<%= yeoman.app %>','<%= yeoman.app %>/']
        }
      }
    },

    
  });


  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'wiredep',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });


  grunt.registerTask('build', 'Compile then start a connect web server', function(target) {
      
    return grunt.task.run([
      'connect:dist:keepalive',
    ]);

  });

  
};
