(function( $ ) {
	
$.fn.showLinkLocation = function() {
	return this.filter( "a" ).each(function() {
	var link = $( this );
	link.append( " (" + link.attr( "href" ) + ")" );
	
	});
};

}( jQuery ));

// Usage example:
jQuery( "a" ).showLinkLocation();

alert('t');