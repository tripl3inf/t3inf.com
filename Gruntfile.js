module.exports = function(grunt) {
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
	grunt.initConfig({

build: {
	dist: {
		js: {
			core: 'htdocs/content/themes/t3i_Skeleton/common/js/core',
			vender: 'htdocs/content/themes/t3i_Skeleton/common/js/components'
		},
		css: {
			core: 'htdocs/content/themes/t3i_Skeleton/common/css/core',
			vender: 'htdocs/content/themes/t3i_Skeleton/common/css/components'
		}
	},
	staging: {
		js: {
			core: 'assets/staging/js/core',
			vender: 'assets/staging/js/vender'
		},
		css: {
			core: 'assets/staging/css/core',
			vender: 'assets/staging/css/vender'
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


/*
 * Concoctenate files
 */

concat: {
    js_core: {
       src: [
             'assets/js/core/animations.js',
             'assets/js/core/index.js',
             'assets/js/core/gridOverlayPlugin.js'
            ],
        dest: '<%= build.staging.js.core %>/core.min.js'
    },

	css_core: {
		options: {
			stripBanners: true
		},
		src: ['assets/css/core/skeleton-960.css', 'assets/css/core/pureTheme.css', 'assets/css/core/main.css', 'assets/css/core/index.css', 'assets/css/core/portfolio.css'],
		dest: '<%= build.staging.css.core %>/core_combined.css'
	}
},







//========================================
//  process scripts
//=======================================|

// remove existing file/s
clean: {
	js_vender: ['<%= build.staging.js.vender %>']
},

//uglify config
uglify : {
	core: {
		options: {
			beautify: true,
			compress: false,
			mangle: false
			//banner: '/*\n js core - <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n',
			//footer: '/*\n ==========> END core scripts <==========\n*/\n'
		},
		src: '<%= build.staging.js.core %>/*.js',
		dest: '<%= build.dist.js.core %>/core.min.js'
	},
	vender: {
		options: {
			beautify: true,
			compress: false,
//			compress: {
//				drop_console: true,
//			},
			mangle: false
			//banner: '/*\n js vender dependancies - <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n',
			//footer: '/*\n==========> END vender dependancies scripts <==========*/\n'
		},
		files: [{
			//expand: true,
			//cwd: 'assets/staging/js/vender',
			src: '<%= build.staging.js.vender %>/**/*.js',
			dest: '<%= build.dist.js.vender %>/components.min.js'
		}]
	}
},

concat: {
	js_core: {
		options: {
			stripBanners: true
		},
		src: ['assets/js/*.js'],
		dest: '<%= build.staging.js.core %>/core_combined.js'
	}
},


//=========================================|
// css processing
//=========================================|
clean: {
	css_lint_results: ['cssLint_core_results*.xml','cssLint_vender_results*.xml']
},

csslint: {
	core: {
		options: {
			import: false,
			csslintrc: '.csslintrc',
			formatters: [{id: 'compact', dest: 'assets/logs/cssLint_core_results_<%= grunt.template.today("yyyy-mm-dd") %>.xml'}]
		},
	    src: 'assets/css/*.css'
	  },
	vender: {
		options: {
			import: false,
			csslintrc: '.csslintrc',
			formatters: [{id: 'compact', dest: 'assets/logs/cssLint_vender_results_<%= grunt.template.today("yyyy-mm-dd") %>.xml'}]
		},
	    src: 'assets/staging/css/vender/*.css'
	  }
},

//concat: {
//	css_core: {
//	 src: ['assets/css/*.css'],
//	 dest: ['core_combined.css']
//	}
//},







uncss: {
	core : {
		options: {
			csspath: '../../../../<%= build.staging.css.core %>/',
			stylesheets: ['core_combined.css']
		},
		files : [{
			src : 'htdocs/content/themes/t3i_Skeleton/page-index.php',
			dest : '<%= build.staging.css.core %>/core_uncss_results.css'
		}]
	}
},


autoprefixer: {
	css_core: {
		options : {
			//diff: 'patch.css', //splits up the prefix'd css from rules w/o prefixes ?
			//diff: false,
			cascade: true
		},
		src : 'assets/staging/css/core/core_uncss_results.css',
		dest : 'assets/staging/css/core/core_autoprefix_results.css'
	}
},


csscomb: {
    css_core: {
    	options: {
    		config: 'assets/configs/zen.json'
    	},
        files: {
            'assets/staging/css/core/core_combed_results.css': ['assets/staging/css/core/core_autoprefix_results.css'],
        },
    },
},



cssmin: {
	css_core: {
		files: {
			'<%= build.dist.css.core %>/core.min.css': ['assets/staging/css/core/core_combined.css']
			}
	}
}

/*
 * *********** END TASKS *************************
 */


});
 grunt.registerTask('test_css', ['cssmin:css_core']);
//	grunt.registerTask('process_css', ['clean:css_lint_results', 'csslint:core', 'concat:css_core', 'uncss:core', 'bowercopy:pull_vender_css', 'csslint:vender']);

  grunt.registerTask('default', ['imageoptim:main']);

  grunt.registerTask('pull_assets', ['clean', 'bowercopy:pull_vender_js', 'concat:js_core', 'uglify:vender']);
  //, 'uglify:core'
  grunt.registerTask('process_scripts', ['concat:main']);
  grunt.registerTask('ugly', ['uglify:cdn', 'uglify:main']);

};
