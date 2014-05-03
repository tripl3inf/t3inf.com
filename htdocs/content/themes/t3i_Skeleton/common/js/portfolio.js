

(function( $ ) {

jQuery.fn.portfolio = function() {
	var port = $(this);
	var item = port.children('.item');
	var intro_TL = new TimelineLite();
	//alert( $(item).length );

	//function randomPos() {
		var container_w = port.outerWidth(true);
		var container_h = port.outerHeight(true);
		console.log(container_w);
		console.log(container_h);

		var item_w = 200;
		var item_h = 170;

		var maxDist_x = container_w - item_w;
		var maxDist_y = container_h - item_h;
		console.log(maxDist_x);
		console.log(maxDist_y);

		var numbrOfItems = item.length;

/*
	item.each(function(xPos) {
		var xPos = getRandom(0, 720);

		function getRandom(min, max) {
			 return Math.random() * (max - min) + min;
		}
		TweenLite.set( this, {left:xPos});
		console.log( 'xPos '+ xPos);
		return xPos;
	});

*/
	//TweenLite.set(port, {perspective:400, transformOrigin:"center center"});
	//CSSPlugin.defaultTransformPerspective = 200;
	//intro_TL.staggerFrom( item, 1, {scale:0, autoAlpha:0}, 0.2, 'stage1');

/*

	jQuery(document).mousemove(function(e){
	//	console.info(e.pageX);
	});



	mousePerspective($(window).width(), $(window).height());
	 Xmouse = e.pageX;
     Ymouse = e.pageY;

	 //calc perc
	  Xperc = Xmouse / w;
	  Yperc = Ymouse / h;
	 Xpos = Math.floor(Xperc * 100);
	 Ypos = Math.floor(Yperc * 100);
	 //console.info("X Axis : " + Xpos + " Y Axis : " + Ypos);
	 Xrev = 100 - Xpos;
	 Yrev = 100 - Ypos;
	function mousePerspective(w, h) {
		jQuery(document).mousemove(function(e){


			 jQuery(port).css({ perspectiveOrigin: Xpos+'% '+Ypos+'%' });

			// TweenLite.to( port, 2, {rotationX:360, transformOrigin:"center center"}, 'stage1');

			 //return Xpos;
		});
//console.info(Xpos);
	}



*/




	var item_TL = new TimelineLite();

	item.hover(
		function() {
			TweenLite.to( this, 0.3, {z:60, ease:Power3.easeOut});

		}, function() {
			TweenLite.to( this, 0.3, {z:0, ease:Power3.easeOut, delay:0.1});
		}
	);

	//return this.each(function() {
	//});

};
}( jQuery ));



