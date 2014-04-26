<?php
/*
	Template Name: Home Template
	Description: Home Template
*/
get_header();
?>
<style>
body {
	  	background: #000;
}
#navigation,
#header {
	display: none;
}
#canvas_container {
	position: absolute;
	top: 50px;
	left: 50px;
	outline: 1px solid green;
}

#t3iTxt {
  position: absolute;
  top: 250px;
  left: 200px;
}
</style>


<svg version="1.1" id="svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="1000px" height="800px"  xml:space="preserve">
</svg>


<svg version="1.1" id="t3iTxt" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="575px" height="131px" viewBox="0 0 575 131" style="enable-background:new 0 0 575 131;" xml:space="preserve"></svg>




<?php get_footer(); ?>


