module.exports = function(grunt) {

  grunt.initConfig({

    neuter: {
      options: {
        basePath: 'app/',
        template: '(function() {\n{%= src %}\n}).call(this);\n'
      },
      'dist/app.js': ['app/base.js']
    },

    bower: {
      install: {
        options: {
          copy: false
        }
      }
    },

    copy: {
      icon_css: {
        src: 'lib/ionicons/css/ionicons.min.css',
        dest: 'dist/fonts/ionicons.min.css'
      },
      icon_fonts: {
        expand: true,
        flatten: true,
        filter: 'isFile',
        src: '*',
        cwd: 'lib/ionicons/fonts/',
        dest: 'dist/fonts/'
      },
      addons: {
        expand: true,
        flatten: true,
        filter: 'isFile',
        src: '*',
        cwd: 'app/addons/',
        dest: 'dist/addons/'
      }
    },

    concat: {
      all: {
        src: [
          'lib/jquery/jquery.js',
          'lib/handlebars/handlebars.runtime.js',
          'lib/ember/ember.js',
          'lib/shapeshifter/shapeshifter.js',
          'dist/app.templates.js',
          'dist/app.js'
        ],
        dest: 'dist/app.bundle.js'
      }
    },

    less: {
      all: {
        files: {
          'dist/base.css': 'app/style/base.less'
        }
      }
    },

    uglify: {
      all: {
        files: {
          'dist/app.min.js': [
            'dist/app.bundle.js'
          ]
        }
      }
    },

    emberTemplates: {
      options: {
        /*templateRegistration: function(name, contents) {
          return 'App.Shapeshifter.TEMPLATES[' + JSON.stringify(name) + '] = ' + contents + ';'
        },*/
        templateName: function(sourceFile) {
          return sourceFile.replace(/app\/templates\//, '');
        }
      },
      'dist/app.templates.js': ["app/templates/**/*.hbs"]
    },

    watch: {
      app: {
        files: ['app/**/*.js', 'app/**/*.hbs'],
        tasks: ['build']
      },
      style: {
        files: ['app/**/*.less'],
        tasks: ['less']
      }
    },

    connect: {
      server: {
        options: {
          port: 5555,
          base: '.'
        }
      }
    }

  });

  [
    'grunt-neuter',
    'grunt-bower-task',
    'grunt-ember-templates',
    'grunt-contrib-watch',
    'grunt-contrib-uglify',
    'grunt-contrib-concat',
    'grunt-contrib-connect',
    'grunt-contrib-less',
    'grunt-contrib-copy'
  ]
  .forEach(function(task) {
    grunt.loadNpmTasks(task);
  });

  grunt.registerTask('default', ['build', 'connect', 'watch']);
  grunt.registerTask('build', ['less', 'bower', 'copy', 'neuter', 'emberTemplates', 'concat', 'uglify']);

};
