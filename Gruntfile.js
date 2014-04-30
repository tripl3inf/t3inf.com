module.exports = function(grunt) {
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
	grunt.initConfig({

build: {
	dist: {
		js: {
			core: 'htdocs/content/themes/t3i_Skeleton/common/js/core/',
			vender: 'htdocs/content/themes/t3i_Skeleton/common/js/components'
		},
		css: {
			core: 'htdocs/content/themes/t3i_Skeleton/common/css/core/',
			vender: 'htdocs/content/themes/t3i_Skeleton/common/css/components'
		}
	},
	staging: {
		js: {
			core: 'assets/staging/js/core/',
			vender: 'assets/staging/js/vender/'
		},
		css: {
			core: 'assets/staging/css/core/',
			vender: 'assets/staging/css/vender/'
		}
	},
},

//=========================================|
// image opti osx
//=========================================|
imageoptim: {
  main: {
    options: {
      jpegMini: true,
      imageAlpha: true,
      quitAfter: true
    },
    src: ['images/']
  }
},


//=========================================|
// copy components from bower repo
//=========================================|
bowercopy: {
    options: {
    	clean: false,
    	report: false
    },

    pull_vender_js: {
    	options: {
           destPrefix: '<%= build.staging.js.vender %>',
        },
    	files: {
    		// Make dependencies follow your naming conventions
            'jquery.js': 'jquery/dist/jquery.js',
            'jquery-ui.js': 'jqueryui/ui/jquery-ui.js',
            'snapsvg.js': 'snap.svg/dist/snap.svg.js',
            'greensock.js': 'greensock-js/src/uncompressed/TweenMax.js',
            'parallax.js': 'Parallaxjs/parallax.js',
            'shapeshifter.js': 'shapeshifter/shapeshifter.js'
    	}
    },

    pull_vender_css: {
    	options: {
           destPrefix: '<%= build.staging.css.vender %>',
        },
    	files: {
            'font-awesome.css': 'font-awesome/css/font-awesome.css',
            'pure.base.css': 'pure/base.css',
            'pure.grids.css': 'pure/grids.css',
            'pure.forms.css': 'pure/forms.css'
    	}
    }
},
//END copy components


//========================================
//  process scripts
//=======================================|
concat: {
	options: {
		separator: ';'
	},
	mainScripts: {
		src: ['assets/js/*.js'],
		dest: 'htdocs/content/themes/t3i_Skeleton/common/js/main.js'
	}
},



//uglify config
uglify : {
	vender: {
		options: {
			beautify: false,
			compress: {
				drop_console: true,
			},
			mangle: true,
			banner: '/*\n js vender dependancies - <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n',
			footer: '==========> END main scripts <=========='
		},
		//src: [''],
		//dest: '<%= build.dist.js.vender %>',
		files: [{
			//expand: true,
			cwd: '<%= build.staging.js.vender %>',
			src: '**/*.js',
			dest: '<%= build.dist.js.vender %>/components.min.js'
		}]
	},
	main: {
		src: ['htdocs/content/themes/t3i_Skeleton/common/js/main.js'],
		dest: 'htdocs/content/themes/t3i_Skeleton/common/js/main.min.js',
	}
},



//=========================================|
// css processing
//=========================================|

csslint: {
  options: {
    rules: {
        "import": false
    },
	formatters: [{id: 'compact', dest: 'csslint.xml'}]
  },
  main: {
    src: "assets/css/*.css"
  }
},

concat: {
    css: {
       src: [
             'assets/css/*.css'
            ],
        dest: 'htdocs/content/themes/t3i_Skeleton/common/css/combined.css'
    }
},

cssmin: {
  minify: {
    expand: true,
    src: 'htdocs/content/themes/t3i_Skeleton/common/css/combined.css',
    dest: 'main.min.css'
  }
}







});

  grunt.registerTask('default', ['imageoptim:main']);

  grunt.registerTask('pull_assets', ['bowercopy:pull_vender_js', 'bowercopy:pull_vender_css', 'uglify:vender']);
  grunt.registerTask('process_scripts', ['concat:main']);
  grunt.registerTask('ugly', ['uglify:cdn', 'uglify:main']);
  grunt.registerTask('process_css', ['csslint:main','concat:css','cssmin']);
};
