<?php
/*
	Template Name: Main Template
	Description: Main Template
*/
?>


<?php
get_header();
//do_action('skeleton_before_content');
//get_template_part( 'loop', 'page' );
//do_action('skeleton_after_content');
//get_sidebar('page');
?>


<!--
<style>
.box {
	height: 300px;
	background: blue;
}
#ovrLayContainer {
	z-index: -1;
}

.testBlock {
	background: #FFF;
}
</style>



<div>
	<div class="one-third column testBlock">left</div>
 	<div class="one-third column testBlock">center</div>
	<div class="one-third column testBlock">right</div>
</div>
<div>
 	<div class="span16 column testBlock">center</div>
</div>
<div>
	<div class="span4 columns testBlock">left</div>
 	<div class="span4 columns testBlock">center</div>
 	<div class="span4 columns testBlock">center</div>
	<div class="letters2 span4 columns testBlock">right</div>
</div>
 -->

<?php
// unhook default bottom nav from footer
function unhook_default_bottom_nav() {
	// Don't forget the position number if the original function has one
	remove_action('skeleton_footer', 'skeleton_footer_nav', 3);
}
add_action('init','unhook_default_bottom_nav');

function bottom_nav() {
?>
	<div id="contactBtnWrap" class="btnWrap eight columns">
	<ul id="contactBtn" class="navBtn">
		<li id="contactBtn_c"></li>
		<li id="contactBtn_o"></li>
		<li id="contactBtn_n"></li>
		<li id="contactBtn_t"></li>
		<li id="contactBtn_a"></li>
		<li id="contactBtn_c2"></li>
		<li id="contactBtn_t2"></li>
		<li class="last"></li>
	</ul>
	</div>

	<!-- <img id="contactBtnBkrnd" src="images/contact_btn_bkrnd.png" alt="contact" /> -->

	<div id="portBtnWrap" class="btnWrap eight columns">
	<ul id="portBtn" class="navBtn">
		<li id="portBtn_p" alt="portfoilio"></li>
		<li id="portBtn_o" alt="portfoilio"></li>
		<li id="portBtn_r" alt="portfoilio"></li>
		<li id="portBtn_t" alt="portfoilio"></li>
		<li id="portBtn_f" alt="portfoilio"></li>
		<li id="portBtn_o2" alt="portfoilio"></li>
		<li id="portBtn_l" alt="portfoilio"></li>
		<li id="portBtn_i" alt="portfoilio"></li>
		<li id="portBtn_o3" alt="portfoilio"></li>
	</ul>
	</div>
	<!-- <img id="portfolioBtnBkrnd" src="images/port_btn_bkrnd.png" alt="portfolio"/> -->



<script>

	jQuery.noConflict();
	(function($) {
		$.fn.animTxtBtn = function(){

			var letter = this.children();
			var mainBtn_TL = new TimelineMax();

			mainBtn_TL.staggerFromTo( letter, 2, {scale:3, rotationX:-180}, {scale:1, rotationX:0}, 0.4, "phase1");
			mainBtn_TL.staggerTo( letter, 2, {opacity:1}, 0.4, "phase1");

			this.hover(
				function () {
					TweenLite.to( this, 0.5, {scale:1.2});
					//TweenLite.to( this, 0.5, {scale:1.2});
					//TweenLite.to( letter, 0.5, {scale:1.2});
				},
				function () {
					TweenLite.to( this, 0.5, {scale:1});
					//TweenLite.to( this, .5, {scale:1});
					//TweenLite.to( letter, 0.5, {scale:1});
				}
			);

		};

		$(window).load(function() {
			$('#contactBtn').animTxtBtn();
			$('#portBtn').animTxtBtn();
		});
	})(jQuery);

</script>



<?php
}

add_filter('skeleton_footer','bottom_nav', 3);
?>


<?php the_content(); ?>













<?php get_footer(); ?>