<?php
/*
	Template Name: Index Template
	Description: Index Template
*/
get_header();
query_posts('post_type=portfolio&posts_per_page=9');

?>



<div id="index" class="paralax container">

	<div id="mainNavBtns">
		<div id="contactBtnWrap" class="btnWrap eight columns">
		<ul id="contactBtn" class="navBtn">
			<li id="contactBtn_c"></li>
			<li id="contactBtn_o"></li>
			<li id="contactBtn_n"></li>
			<li id="contactBtn_t"></li>
			<li id="contactBtn_a"></li>
			<li id="contactBtn_c2"></li>
			<li id="contactBtn_t2"></li>
		</ul>
		</div>

		<div id="portBtnWrap" class="btnWrap eight columns omega">
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
	</div>

</div>


<div id="portfolio" class="paralax">
	<ul class="portContent container">
	<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

	    <?php
	        $title= str_ireplace('"', '', trim(get_the_title()));
	        $desc= str_ireplace('"', '', trim(get_the_content()));
	    ?>

	    <li class="item four columns">
	    	<a title="<?=$title?>: <?=$desc?>" rel="lightbox[work]" href="<?php print  portfolio_thumbnail_url($post->ID) ?>">
	    		<div class="imgContainer">
	    			<img src="<?php print  portfolio_thumbnail_url($post->ID) ?>" alt="" />
	    		</div>
	    	</a>
		    </li>


	<?php endwhile; endif; ?>
	</ul>


	<i id="portfolioArw" class="navArrow fa fa-chevron-left fa-5x"></i>
</div>


<div id="contact" class="paralax">
	<form method="post" id="contactForm" class="pure-form pure-skin-t3i container offset4">
	    <fieldset>
	        <legend>Contact Me</legend>

	        <input type="text" id="name" name="name" class="required four columns" placeholder="Name"><i class="fa fa-asterisk"></i>
	        <input type="email" id="email" name="email" class="required four columns" placeholder="Email"><i class="fa fa-asterisk"></i>
	        <textarea id="message" name="message" class="required eight columns" placeholder="Message"></textarea><i class="fa fa-asterisk"></i>

			<div id="contact_Btns" class="offset4 eight columns">
		        <button id="Reset" type="reset" class="pure-button two columns">Reset<i class="fa fa-refresh"></i></button>
		        <button id="submit" type="submit" value="Send Message" name="submit" class="pure-button pure-button-primary two columns">Submit<i class="fa fa-envelope"></i></button>
	        </div>
	    </fieldset>
	</form>
	<i id="contactArw" class="navArrow contact fa fa-chevron-right fa-5x"></i>
</div>


<?php get_footer(); ?>


