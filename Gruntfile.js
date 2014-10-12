module.exports = function(grunt) {
  'use strict';

  // Load grunt tasks automatically
  //require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    connect: {
      server: {
        options: {
          port: 9001,
          hostname: 'localhost',
          base: 'app/src/',
          keepalive: true
        }
      }
    },

    jshint: {
      all: ['Gruntfile.js', 'app/src/js/**/*.js'],
      options: {
        ignores: ['app/src/js/lib/*.js']
      }
    },

    copy: {
      main: {
        files: [
          {
            expand:true, 
            cwd: 'app/src/',
            src: '**',
            dest:'app/dist/', 
            filter:'isFile'
          }
        ]
      }
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'app/dist/index.html': 'app/src/index.html',
        }
      }
    },

    cssmin: {
      combine: {
        files: {
          'app/dist/css/main.min.css': ['app/src/css/reset.css', 'app/src/css/main.css']
        }
      }
    },

    uglify: {
      options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
          src: 'app/src/js/<%= pkg.main %>.js',
          dest: 'app/dist/js/<%= pkg.main %>.min.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['jshint', 'copy:main', /*'htmlmin',*/ 'cssmin'/*,'uglify'*/]);
};