<?php



if ( function_exists( 'add_theme_support' ) ) {
	add_theme_support( 'post-thumbnails' );
	set_post_thumbnail_size( 300, 170, true ); // Normal post thumbnails
	add_image_size( 'screen-shot'); // Full size screen
	//add_image_size( 'gallery', 300, 170 ); // gallery thumb size
}


add_action('init', 'portfolio_register');

function portfolio_register() {
	$args = array(
			'label' => __('Portfolio'),
			'singular_label' => __('Project'),
			'public' => true,
			'show_ui' => true,
			'capability_type' => 'post',
			'hierarchical' => false,
			'rewrite' => true,
			'supports' => array('title', 'editor', 'thumbnail')
	);

	register_post_type( 'portfolio' , $args );
}


register_taxonomy("project-type", array("portfolio"), array("hierarchical" => true, "label" => "Project Types", "singular_label" => "Project Type", "rewrite" => true));


add_action("admin_init", "portfolio_meta_box");


function portfolio_meta_box(){
	add_meta_box("projInfo-meta", "Project Options", "portfolio_meta_options", "portfolio", "side", "low");
}


function portfolio_meta_options(){
	global $post;
	if ( defined('DOING_AUTOSAVE') && DOING_AUTOSAVE ) return $post_id;
	$custom = get_post_custom($post->ID);
	$link = $custom["projLink"][0];
	?>
    <label>Link:</label><input name="projLink" value="<?php echo $link; ?>" />
<?php
}


add_action('save_post', 'save_project_link');

function save_project_link(){
	global $post;

	if ( defined('DOING_AUTOSAVE') && DOING_AUTOSAVE ){
		return $post_id;
	}else{
		update_post_meta($post->ID, "projLink", $_POST["projLink"]);
	}
}


add_filter("manage_edit-portfolio_columns", "project_edit_columns");

function project_edit_columns($columns){
	$columns = array(
			"cb" => "<input type=\"checkbox\" />",
			"title" => "Project",
			"description" => "Description",
			"link" => "Link",
			"type" => "Type of Project",
	);

	return $columns;
}


add_filter('excerpt_length', 'my_excerpt_length');

function my_excerpt_length($length) {

	return 25;

}

add_filter('excerpt_more', 'new_excerpt_more');

function new_excerpt_more($text){

	return ' ';

}

function portfolio_thumbnail_url($pid){
	$image_id = get_post_thumbnail_id($pid);
	$image_url = wp_get_attachment_image_src($image_id,'screen-shot');
	//$image_gallery_url = wp_get_attachment_gallery_image_src($image_id,'gallery');
	return  $image_url[0];
}









?>