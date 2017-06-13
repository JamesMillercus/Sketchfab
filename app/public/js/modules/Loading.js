export let urlid = [],
	models = [],
	linkid = [];

$( ".url" ).each(function( index ) {
  urlid[index] = $( this ).text();
});

$( ".link" ).each(function( number ) {
  linkid[number] = $( this ).text();
});


export function loadPage(e, selected) {
    var link = $(selected).attr('href');
    e.preventDefault();
    $( "#loadingScreen" ).css({"z-index": "100"});
	$( "#loadingScreen" ).animate({
	    opacity: 1,
	  }, 500, function() {
	    // Animation complete.
	    window.location.href = link;
	});
};



