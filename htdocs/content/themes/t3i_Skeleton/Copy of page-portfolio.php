<?php
/* Template Name: Portfolio */

get_header();
query_posts('post_type=portfolio&posts_per_page=9');

?>

<style>
.menu {
	display: none;
}
</style>



<h2>Portfolio of Work</h2>
<p id="btn" style="color:purple;position:relative;top:500;">CLICK</p>
<ul id="portfolio">

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


<div id="panel1" style="color:orange">
	<h1>THIS IS PANEL 1</h1>
	<p>11111111111111111111111111</p>
	<p id="btn1" style="color:red;position:relative;top:300;">CLICK</p>
</div>

<div id="panel2" style="color:yellow">
	<h1>THIS IS PANEL 2</h1>
	<p>22222222222222222222222222</p>
	<p id="btn2" style="color:white;position:relative;top:300;">CLICK</p>
</div>

<script>
//jQuery(window).load(function() {
	//setTimeout(function() {
	//	jQuery('#portfolio').portfolio();
	//}, 500);

	jQuery(function() {

		//jQuery('#portfolio').portfolio();

		//parallax.background = ("body");
		//parallax.add('index', jQuery('#portfolio'));
		parallax.add('panel1', jQuery('#panel1'));
		parallax.add('panel2', jQuery('#panel2'));

		parallax.panel1.show();
		
		parallax.panel1.onload=function(){
			//setLeft("panel1", "panel1");
			setRight("panel2", "panel2");
			//setTop("index", "portfolio");
		};

		parallax.panel2.onload=function(){
			setLeft("panel1", "panel1");
			//setRight("panel1", "panel1");
			//setTop("index", "portfolio");
		};
		
		jQuery('#btn1').click(function() {
			parallax.panel2.right();
		});

		jQuery('#btn2').click(function() {
			parallax.panel1.left();
		});

/* 		jQuery('#btn2').click(function() {
			parallax.index.top();
		}); */

		





/* 		jQuery('body').jpreLoader({
	    	autoClose: true,
	    	showSplash: false,
	    	loaderVPos: '50%',
	    	onetimeLoad: false,
	    	}, function() {	//callback function
	    	  jQuery('#portfolio').portfolio();
	  	}); */


	});
//});
</script>




<?php get_footer(); ?>