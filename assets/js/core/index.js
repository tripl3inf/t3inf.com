jQuery.noConflict();
(function($) {
	// animate main nav btns
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
	// END animate main nav btns

	// background overlay
	function bgFade(direction){
		var bgOverlay = $('<div class="bgOverlay"></div>');
		if ( direction == 'in' ) {
			$('body').prepend(bgOverlay);
			TweenLite.to( $('.bgOverlay'), 1, {autoAlpha:.8});
		}
		else if ( direction == 'out' ) {
			function rmOverlay() {
				$('.bgOverlay').remove();
			}
			TweenLite.to( $('.bgOverlay'), 1, {autoAlpha:0, onComplete:rmOverlay});
		}
	};
	// END background overlay


	//$(document).ready(function () {
		// paralax
		parallax.add( jQuery('#index'))
		.add( jQuery('#portfolio'))
		.add( jQuery('#contact'));

		parallax.background = ("body");
		parallax.scaling = 0.4;

		parallax.portfolio.show();

		$('#portBtn').click(function() {
			parallax.portfolio.right();
		});

		$('#contactBtn').click(function() {
			parallax.contact.left();
		});


		$('.navArrow.contact').click(function(event) {
			TweenLite.to( $(this) , 1, {autoAlpha:0, onStart:rtrnHome, onComplete:restoreArw} );
			function rtrnHome() {
				parallax.index.right();
			}
			function restoreArw() {
				TweenLite.set( $('#contactArw'), {autoAlpha:1});
			}
			bgFade('out');
		});

		$('#portfolioArw').click(function() {
			parallax.index.left();
			bgFade('out');
		});

		parallax.index.preload = function(){
			bgFade('out');
	    };

		parallax.contact.preload = function(){
			bgFade('in');
	    };

	    parallax.portfolio.preload = function(){
			bgFade('in');
	    };

		// END paralax


	//});




	$(window).load(function() {
		$('#contactBtn').animTxtBtn();
		$('#portBtn').animTxtBtn();
	});
})
(jQuery);





// Contact Form
jQuery.noConflict();
(function($) {

	var contactSubmt = new TimelineLite({paused:true});
	contactSubmt.to( $('#contactForm'), 1, {autoAlpha:0}, 'stage1');
	contactSubmt.to( $('.navArrow.contact'), 1, {autoAlpha:0, onStart:goHome}, 'stage1');
	function goHome() {
		parallax.index.right();
		TweenLite.set( $('#contactForm'), {autoAlpha:1});
		TweenLite.set( $('.navArrow.contact'), {autoAlpha:1});
	}


	$('#submit').click(function(event){
		$.post("/content/themes/t3i_Skeleton/contact.php", jQuery("#contactForm").serialize(),  function(response) {

			contactSubmt.play();
			$('#index').append(response);
			TweenLite.to( $('#formSuccessMsg'), 0.8, {autoAlpha:1, delay:0.8, onComplete:fadeOut});

			function fadeOut() {
				TweenLite.to( $('#formSuccessMsg'), 1.2, {autoAlpha:0, delay:1});
			}
		});
		return false;
	});


	// portfolio
/*	function portfolio() {

		var port = $('#portfolio');
		var item = port.children('.item');

		var port_TL = new TimelineLite({paused:true});
		port_TL.set( item, {autoAlpha:0});
	}
	*/





});
(jQuery);




jQuery( document ).ready(function( $ ) {
//jQuery(function() {
//jQuery('.item:nth-child(3)').attr( 'data-ss-colspan','2' );
//jQuery('.item:nth-child(3)').removeClass('four').addClass('eight');



	startW = $('.item').outerWidth();

	  // Bind the resize event. When the window size changes, update its corresponding
	  // info div.
	  $(window).resize(function(){

		  $( ".portContent" ).position({
			  my: "center",
			  at: "center",
			  of: "body"
		  });

		var pW = $('.item').outerWidth();

		console.log( 'startWIDTH' + startW );
	    console.log( 'WIDTH' + pW );
	    if ( startW !==  pW ) {
			shift();
			//console.info('SHIFT');

		}
	    else if ( startW ==  pW ) {
	    	shift();
		}
	    else {
	    	return;
	    }
	  });

	  // Updates the info div immediately.
	  $(window).resize();



// END doc ready func
});





function shift(){
	columnW = jQuery('.four.columns').width();
	//console.log('column width '+columnW);

	jQuery('.portContent').shapeshift({
		selector: "li",
		align: "left",
		colWidth: columnW,
		//minColumns: 4,
	    gutterX: 20,
	    gutterY: 20,
	    paddingX: 0,
	    paddingY: 0,
	    animateOnInit: true,
	    enableResize: false
	});
}

shift();


// END ready func
//});





