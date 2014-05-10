<?php
/**
 * @package Skeleton WordPress Theme Framework
 * @subpackage skeleton
 * @author Alex Aloia - tripl3infinity Design & Dev
**/

// deregister unneeded parent theme assets
//styles
add_action( 'wp_print_styles', 'remove_parent_styles', 100 );
function remove_parent_styles() {
	wp_deregister_style( 'formalize' );
	wp_deregister_style( 'superfish' );
}

//scripts
add_action( 'wp_print_scripts', 'remove_parent_scripts', 100 );
function remove_parent_scripts() {
	wp_deregister_script( 'formalize' );
	wp_deregister_script( 'superfish' );
	wp_deregister_script( 'custom' );
}

// deregister jquery and include from google CDN with bower managed fallback
$jq_url = 'http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js'; // the URL to check against
$jq_test_url = @fopen($jq_url,'r'); // test parameters

if($jq_test_url !== false) { // test if the URL exists
	function load_external_jQuery() { // load external file
		if (!is_admin()) {
			wp_deregister_script( 'jquery' ); // deregisters the default WordPress jQuery
			wp_register_script('jquery', 'http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js'); // register the external file
			wp_enqueue_script('jquery'); // enqueue the external file
		}
	}
	add_action('wp_enqueue_scripts', 'load_external_jQuery'); // initiate the function
} else {
	function load_local_jQuery() {
		if (!is_admin()) {
			wp_deregister_script('jquery'); // deregisters the default WordPress jQuery
			wp_register_script('jquery', get_stylesheet_directory_uri().'/common/js/vender/bower/jquery/dist/jquery.min.js', __FILE__, false, '1.11.0', true); // register the local file
			wp_enqueue_script('jquery'); // enqueue the local file
		}
	}
	add_action('wp_enqueue_scripts', 'load_local_jQuery'); // initiate the function
}





//TODO: load assets from CDN w/ fallback
function tripl3inf_main_assets() {
	wp_enqueue_style( 'normalize', get_stylesheet_directory_uri().'/common/css/vender/normalize.css');

	wp_enqueue_style( 'main', get_stylesheet_directory_uri().'/common/css/main.css');
	//wp_enqueue_style( 'awesome_icons', get_stylesheet_directory_uri().'/common/js/vender/bower/font-awesome/css/font-awesome.css');

	wp_register_style('awesome_font', '//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css'); // register the external file
	wp_enqueue_style('awesome_font'); // enqueue the external file


	wp_register_style('pure.min', get_stylesheet_directory_uri().'/common/js/vender/pure-min.css'); // register the local file
	wp_enqueue_style('pure.min');
	wp_register_style('pure.skin', get_stylesheet_directory_uri().'/common/css/pureTheme.css');
	wp_enqueue_style('pure.skin');

	wp_register_style( 'index_style', get_stylesheet_directory_uri() . '/common/css/index.css' );
	wp_enqueue_style( 'index_style' );


	//wp_enqueue_script( 'easeljs', 'http://code.createjs.com/createjs-2013.12.12.min.js"');
	wp_enqueue_script( 'snap', get_stylesheet_directory_uri().'/common/js/vender/bower/Snap.svg/dist/snap.svg-min.js');

	wp_enqueue_script( 'jqueryui', get_stylesheet_directory_uri().'/common/js/vender/bower/jqueryui/ui/minified/jquery-ui.min.js', array('jquery'),'1.1', true);
	wp_enqueue_script( 'jqdrag', get_stylesheet_directory_uri().'/common/js/vender/bower/jqueryui/ui/minified/jquery.ui.draggable.min.js', array('jqueryui'), true);
	wp_enqueue_script( 'jqdrop', get_stylesheet_directory_uri().'/common/js/vender/bower/jqueryui/ui/minified/jquery.ui.droppable.min.js', array('jqueryui'), true);
	wp_enqueue_script( 'shapeshift', get_stylesheet_directory_uri().'/common/js/vender/bower/jquery.shapeshift/core/jquery.shapeshift.js', array('jqueryui'), true);
	wp_enqueue_script( 'tweenMax', get_stylesheet_directory_uri().'/common/js/vender/TweenMax.min.js');
	//wp_enqueue_script( 'gridOvrLay', get_stylesheet_directory_uri().'/common/js/gridOverlayPlugin.js');
	wp_register_script( 'parallax', get_stylesheet_directory_uri().'/common/js/vender/Parallaxjs/parallax.js', array('jquery'),'1.1', true);
	wp_enqueue_script('parallax');

	//wp_enqueue_script( 'portfolio_scripts', get_stylesheet_directory_uri().'/common/js/index.js', array('parallax'), true);

	wp_enqueue_script( 'home_animation', get_stylesheet_directory_uri().'/common/js/animations.js', array('portfolio_scripts'), true);

	//wp_enqueue_script( 'js_core', get_stylesheet_directory_uri().'/common/js/core/core.min.js', array('parallax'), true);



}
add_action( 'wp_enqueue_scripts', 'tripl3inf_main_assets' );




// //conditional scripts loading for portfolio
// add_action( 'wp_enqueue_scripts', 'index_script_dependz' );
// function index_script_dependz() {
// 	if ( is_page_template( 'page-index.php') ) {
// 		//wp_enqueue_script( 'jqLoader_script', get_stylesheet_directory_uri().'/common/js/vender/jPreLoader/jpreloader.js');

// 		wp_register_script( 'parallax', get_stylesheet_directory_uri().'/common/js/vender/Parallaxjs/parallax.js', array('jquery'),'1.1', true);
// 		wp_enqueue_script('parallax');

// 		wp_enqueue_script( 'portfolio_scripts', get_stylesheet_directory_uri().'/common/js/index.js', array('jquery'),'1.1', true);
// 		;
// 	}
// }






// unhook default bottom nav from footer
function unhook_default_before_footer() {
	// Don't forget the position number if the original function has one
	remove_action('skeleton_footer', 'skeleton_before_footer', 1);
}
add_action('init','unhook_default_before_footer');


function before_footer() {
	$footerwidgets = is_active_sidebar('footer-widget-area-1') + is_active_sidebar('footer-widget-area-2') + is_active_sidebar('footer-widget-area-3') + is_active_sidebar('footer-widget-area-4');
	$class = ($footerwidgets == '0' ? 'noborder' : 'normal');
	echo '<div class="clear"></div><div id="footer" class="'.$class.' container">';
}
add_action('skeleton_footer', 'before_footer',1);







// We'll use this form if we're going to just outright replace something
function theme_author() {
?>
	<div id="copyrt" class="container sixteen columns">
		<p>copyright 2014 tripl3infinity&#8482; Design &amp; Development</p>
	</div>
<?php
}
add_filter('skeleton_author_credits','theme_author', 4);




require_once('portfolio-type.php');


















/**
 * Remove standard image sizes so that these sizes are not
 * created during the Media Upload process
 */

	function wpcoke_remove_image_size($possible_sizes) {
		unset( $possible_sizes['small'] );
		unset( $possible_sizes['medium'] );
		unset( $possible_sizes['large'] );
		return $possible_sizes;
	}
	add_filter('image_size_names_choose', 'wpcoke_remove_image_size');






?>