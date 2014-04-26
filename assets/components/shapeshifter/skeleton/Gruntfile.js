module.exports = function(grunt) {

  grunt.initConfig({

    neuter: {
      options: {
        basePath: 'app/',
        template: '(function() {\n{%= src %}\n}).call(this);\n'
      },
      'dist/shapeshift.base.js': ['app/base.js']
    },

    'file-creator': {
      all: {
        'dist/shapeshift.js': function(fs, fd, done) {
          var pkg = grunt.file.readJSON('./package.json');
          fs.writeSync(fd, 'Balanced.Shapeshifter.register(\'' + pkg.name + '\', function() {\n  ' +
            grunt.file.read('dist/shapeshift.base.js') + '\n});\n');
          done();
        }
      }
    },

    concat: {
      all: {
        src: ['dist/shapeshift.templates.js', 'dist/shapeshift.js'],
        dest: 'dist/shapeshift.bundle.js'
      }
    },

    uglify: {
      all: {
        files: {
          'dist/shapeshift.min.js': [
            'dist/shapeshift.bundle.js'
          ]
        }
      }
    },

    emberTemplates: {
      options: {
        templateRegistration: function(name, contents) {
          return 'Balanced.Shapeshifter.TEMPLATES[' + JSON.stringify(name) + '] = ' + contents + ';'
        },
        templateName: function(sourceFile) {
          return sourceFile.replace(/app\/templates\//, '');
        }
      },
      'dist/shapeshift.templates.js': ["app/templates/**/*.hbs"]
    },

    watch: {
      app: {
        files: ['app/**/*.js', 'app/**/*.hbs'],
        tasks: ['build']
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
    'neuter',
    'file-creator',
    'ember-templates',
    'contrib-watch',
    'contrib-uglify',
    'contrib-concat',
    'contrib-connect'
  ]
  .forEach(function(task) {
    grunt.loadNpmTasks('grunt-' + task);
  });

  grunt.registerTask('default', ['build', 'connect', 'watch']);
  grunt.registerTask('build', ['neuter', 'emberTemplates', 'file-creator', 'concat', 'uglify']);

};
