<?php
/*
	Template Name: Front Page Template
	Description: Front Page Template
*/
?>


<?php get_header();
//do_action('skeleton_before_content');
//get_template_part( 'loop', 'page' );
//do_action('skeleton_after_content');
//get_sidebar('page');
?>



<style>
body {
	background: #000;

}

.box {
	height: 300px;
	background: blue;
}
#ovrLayContainer {
	z-index: -1;
}

</style>



	<?php the_content(); ?>

     <canvas id="testCanvas" width="800" height="800"></canvas>

<script>


jQuery(document).ready(function() {
	gridOvrlay();
});
</script>



<? //php get_footer(); ?>