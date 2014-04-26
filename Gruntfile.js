module.exports = function(grunt) {
  grunt.initConfig({

imageoptim: {
  main: {
    options: {
      jpegMini: true,
      imageAlpha: true,
      quitAfter: true
    },
    src: ['images/']
  }
}  

});
  grunt.loadNpmTasks('grunt-imageoptim');

  grunt.registerTask('default', ['imageoptim:main']);

};
