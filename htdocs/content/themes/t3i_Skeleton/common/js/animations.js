/**
 * custom animations
 */

window.onload = function() {
	// graphic logo
	var infContainer = Snap("#svg");
	var infShape = infContainer.path("M120.494,48.498L78.206,92.263l-44.01,46.517c0,0-2.391,7.661-6.332,16.924  c-3.886,9.127-9.268,19.814-16.747,32.737c-0.108,0.187-0.21,0.371-0.323,0.562l99.053-104.62 c-0.022-19.658,7.807-37.459,25.413-51.429c33.147-26.302,81.334-20.76,107.64,12.381c26.299,33.14,20.758,81.333-12.388,107.632 c0,0-38.852,38.449-94.059,8.637c-69.605-40.01-56.28-113.376-37.061-147.707l-79.911,83.27");

	var infShape2 = infShape.clone();

	infShape.transform( 't165,56');

	//var f = infContainer.filter(Snap.filter.shadow(0, 0, 0.5, 'green'));

	var infContainer = infContainer.group(infShape,infShape2)
	.attr({
		//filter: f,
	    fill: "none",
	    //fill: "r()#fff-#000",
	    strokeWidth: 5,
	    stroke: "green"
	  });

	
	//var inter = Snap.path.intersection(infShape,infShape2);
	//console.log('inter'+inter);
	 //inter.attr({opacity:0});
	infShape2.attr({
			transform: "r180"
		});

	infContainer.attr({
			'stroke-dasharray': 1050,
			'stroke-dashoffset': 1050
	});
	infContainer.attr({transform: "r-8,s2,t100,100"});

	console.log( 'total length' + Snap.path.getTotalLength( infShape ));

	var animPath = function(path, time){
	    	pathLength = Snap.path.getTotalLength( path );
	    	//console.log(pathLength);

	  var pathTL = new TimelineLite({paused:true});
	  pathTL.add( TweenLite.set( path.node, {opacity:0, strokeDasharray:pathLength, strokeDashoffset:pathLength, onComplete:animate}) );

	  //blurNode = $("feGaussianBlur");
	  
	  function animate() {
		pathTL.to(path.node, 3, {opacity:1}, 'stage1' );
	    pathTL.add( TweenLite.to(path.node, time, {strokeDashoffset:0}), 'stage1' );
	    	pathTL.add( TweenLite.to(path.node, 2, {opacity:0,delay:2}));
	    	pathTL.play();
	    };
	  };


	// tripl3infinity text letter variables
	var t3iTxt = Snap("#t3iTxt");
	 t1 = t3iTxt.path("M27.229,24.623v13.919h15.12v8.04h-15.12V77.9c0,7.2,2.04,11.28,7.92,11.28c2.88,0,4.56-0.24,6.12-0.72 l0.48,8.04c-2.04,0.72-5.28,1.44-9.36,1.44c-4.919,0-8.879-1.68-11.399-4.44c-2.88-3.24-4.08-8.399-4.08-15.239V46.582h-9v-8.04h9 V27.743L27.229,24.623z");
	 r1 = t3iTxt.path("M52.229,56.661c0-6.839-0.12-12.719-0.48-18.119h9.239l0.48,11.52h0.36c2.64-7.8,9.12-12.719,16.199-12.719 c1.08,0,1.92,0.12,2.88,0.24v9.959c 1.08-0.24-2.16-0.24-3.6-0.24c 7.439,0-12.719,5.52-14.159,13.439 c-0.24,1.44-0.36,3.24-0.36,4.919V96.62h-10.56V56.661z");
	 i1 = t3iTxt.path("M101.708,22.223c0,3.6-2.52,6.48-6.72,6.48c-3.84,0-6.36-2.88-6.36-6.48s2.64-6.6,6.6-6.6 C99.068,15.623,101.708,18.503,101.708,22.223z M89.948,96.62V38.542h10.56V96.62H89.948z");
	 p1_in = t3iTxt.path("M111.027,57.501c0-7.44-0.24-13.439-0.48-18.959h9.359l0.6,9.959h0.24c4.2-7.08,11.159-11.159,20.639-11.159 c14.16,0,24.719,11.879,24.719,29.398c0,20.879-12.839,31.199-26.519,31.199c-7.68,0-14.399-3.36-17.879-9.12h-0.24v31.559h-10.439 V57.501z");
	 p1_out = t3iTxt.path("M121.467,72.98c0,1.56,0.12,3,0.48,4.32c1.92,7.32,8.28,12.359,15.839,12.359c11.16,0,17.639-9.119,17.639-22.439 c0-11.52-6.12-21.479-17.279-21.479c-7.2,0-14.04,5.04-15.959,12.959c-0.36,1.32-0.72,2.88-0.72,4.2V72.98z");
	 l1 = t3iTxt.path("M174.306,11.423h10.56V96.62h-10.56V11.423z");
	 three = t3iTxt.path("M196.523,91.676c3,1.92,9.959,4.92,17.279,4.92c13.559,0,17.759-8.641,17.639-15.12 c-0.12-10.919-9.959-15.599-20.159-15.599h-5.88v-7.92h5.88c7.68,0,17.399-3.96,17.399-13.199c0-6.24-3.959-11.76-13.679-11.76 c-6.24,0-12.24,2.76-15.599,5.159l-2.76-7.68c4.08-2.999,12-5.999,20.399-5.999c15.359,0,22.319,9.119,22.319,18.599 c0,8.04-4.8,14.88-14.399,18.359v0.24c9.6,1.92,17.399,9.119,17.399,20.039c0,12.479-9.72,23.399-28.439,23.399 c-8.759,0-16.439-2.76-20.279-5.28L196.523,91.676z");
	 i2 = t3iTxt.path("M265.683,22.223c0,3.6-2.52,6.48-6.72,6.48c3.84,0-6.359-2.88-6.359-6.48s2.64-6.6,6.6-6.6C263.043,15.623,265.683,18.503,265.683,22.223z M253.923,96.62V38.542h10.56V96.62H253.923z");
	 n1 = t3iTxt.path("M275.002,54.261c0-6.12-0.12-10.919-0.48-15.719h9.359l0.6,9.6h0.24c2.88-5.4,9.6-10.799,19.199-10.799c8.04,0,20.52,4.8,20.52,24.719V96.62h-10.56V63.141c0-9.36-3.48-17.159-13.439-17.159c-6.84,0-12.24,4.919-14.16,10.799 c-0.48,1.32-0.72,3.12-0.72,4.92V96.62h-10.56V54.261z");
	 fi1 = t3iTxt.path("M337.682,96.62V46.582h-8.04v-8.04h8.04v-3.24c0-15.239,9-25.199,25.318-25.199c5.4,0,11.76,1.68,14.76,3.84l-3,8.04c-2.64-1.8-7.08-3.36-12.239-3.36c-11.16,0-14.399,7.8-14.399,17.04v2.88h33.719V96.62h-10.56V46.582h-23.159V96.62H337.682z");
	 n2 = t3iTxt.path("M392.361,54.261c0-6.12-0.12-10.919-0.48-15.719h9.36l0.6,9.6h0.24c2.88-5.4,9.6-10.799,19.199-10.799 c8.039,0,20.519,4.8,20.519,24.719V96.62h-10.56V63.141c0-9.36-3.479-17.159-13.439-17.159c-6.839,0-12.239,4.919-14.159,10.799 c-0.479,1.32-0.72,3.12-0.72,4.92V96.62h-10.56V54.261z");
	 i3 = t3iTxt.path("M463.721,22.223c0,3.6-2.521,6.48-6.72,6.48c-3.84,0-6.36-2.88-6.36-6.48s2.641-6.6,6.6-6.6 C461.08,15.623,463.721,18.503,463.721,22.223z M451.961,96.62V38.542h10.56V96.62H451.961z");
	 t2 = t3iTxt.path("M490.76,24.623v13.919h15.119v8.04H490.76V77.9c0,7.2,2.039,11.28,7.919,11.28c2.88,0,4.561-0.24,6.12-0.72l0.48,8.04c-2.04,0.72-5.28,1.44-9.36,1.44c-4.92,0-8.88-1.68-11.399-4.44c-2.88-3.24-4.08-8.399-4.08-15.239V46.582h-8.999v-8.04 h8.999V27.743L490.76,24.623z");
	 y1 = t3iTxt.path("M524.678,38.542l12.6,34.319c1.439,3.84,2.88,8.399,3.84,11.879h0.24c1.079-3.48,2.279-7.92,3.72-12.12 l11.52-34.079h11.159l-15.84,41.398c-7.56,19.919-12.719,29.999-19.919,36.358c-5.279,4.439-10.319,6.24-12.959,6.719l-2.64-8.759 c2.64-0.84,6.119-2.52,9.239-5.16c2.88-2.28,6.359-6.36,8.88-11.76c0.479-1.08,0.84-1.92,0.84-2.52c0-0.6-0.24-1.44-0.84-2.76 l-21.359-53.518H524.678z");

	var t3iTxt_group = [t1,r1,i1,p1_in,p1_out,l1,three,i2,n1,fi1,n2,i3,t2,y1];
	/*var text = t3iTxt.text(200, 100, "Snap.svg")
	.attr({
		fill: "red",
		strokeWidth: 3
	});
*/
	t3iTxt.attr({
		fill: "none",
		strokeWidth: 3,
		stroke: 'white'
	});



	var animLetter = function(path, time, delay){
    	pathLength = Snap.path.getTotalLength( path );
    	//console.log(pathLength);

	  var pathTL = new TimelineLite({paused:true,delay:2.5});
	  pathTL.add( TweenLite.set( path.node, {strokeDasharray:pathLength, strokeDashoffset:pathLength, onComplete:animate}) );

	  function animate() {
	    	pathTL.add( TweenLite.to(path.node, time, {strokeDashoffset:0,delay:delay}) );
	    	pathTL.add( TweenLite.to(t3iTxt.node, 1.5, {opacity:0,delay:3}) );
	    	pathTL.play();

	  }
  };

  
  animPath( infShape, 4);
  animPath( infShape2, 4);
  
  animLetter( t1, 1.5, 1);
  animLetter( r1, 1.5, 1.2);
  animLetter( i1, 1.5, 1.4);
  animLetter( p1_in, 1.5, 1.6);
  animLetter( p1_out, 1, 1.6);
  animLetter( l1, 1.5, 1.8);
  animLetter( three, 1.5, 2);
  animLetter( i2, 1.5, 2.2);
  animLetter( n1, 1.5, 2.4);
  animLetter( fi1, 1.5, 2.6);
  animLetter( n2, 1.5, 2.8);
  animLetter( i3, 1.5, 3);
  animLetter( t2, 1.5, 3.2);
  animLetter( y1, 1.5, 3.4);


};