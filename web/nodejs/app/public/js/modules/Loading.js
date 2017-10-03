export let urlid = [],
	models = [],
	linkid = [],
	modelName = [];

$( ".url" ).each(function( index ) {
  if(index < 8) urlid[index] = $( this ).text();
});

$( ".link" ).each(function( number ) {
  if(number < 8) linkid[number] = $( this ).text();
});

$( ".name" ).each(function( no ) {
  if(no < 8) modelName[no] = $( this ).text();
});

export function loadingScreen() {
	$( "#loadingScreen" ).animate({ "right": - $( "#loadingScreen" ).width(), "opacity": 0 }, 500, function() {
	    $( "#loadingScreen" ).css({"right": $( "#loadingScreen" ).width()});
	});
}

export function loadPage(e, selected) {
    var link = $(selected).attr('href');
    if(e != null) e.preventDefault();
    //if there is more than on the screen 1 model
    $( ".loadingLogos" ).css({"opacity": 0});
    if($('.linkID').length > 1 || $('.commentFormContainer').length == 1) {
	    $( "#loadingScreen" ).css({"right": -$( "#loadingScreen" ).width(), "opacity": 0, "z-index":10});
		$( "#loadingScreen" ).animate({
		    "right": 0, "opacity": 1 
		  }, 500, function() {
		    // Animation complete.
		    window.location.href = link;
		});
	//else if there is only 1 model, display loading screen and load that model's page straight away
    } else if($('.linkID').length == 1 && $('.commentFormContainer').length == 0){
	    $( "#loadingScreen" ).css({"opacity": 1 });
	    window.location.href = link;
    }

};

export function activateForm(description) {
	let clicked = true;
	let model = $( "#title" ).text();
	let user = $( "#username" ).text();
	let email = $( "#email" ).text();
	$( ".formFeedback" ).keydown(function() {
		self = this;
		if(clicked) {
			$(this).val('');
			clicked = false;
		}
		if(event.keyCode == 13) {
			event.preventDefault();
			if(!clicked) {
				saveDetails(user, email, this.value, model);
				showNewMessage(this.value);
			}
	    }

	});
    $( ".cancelForm" ).click( function() {
		// $( ".commentFormContainer" ).animate({ "right": - $( ".commentFormContainer" ).width(), "opacity": 0 });
		$( ".commentFormContainer" ).stop().animate({
		    "right": - $( ".commentFormContainer" ).width(), "opacity": 0
		  }, 500, function() {
			if(description) $(".newMessage").text(description);
			else {
				$(".newMessage").text("");
			  	$('.noMessage').css({'display':'block', 'margin-top': ''});
				$( ".messageContainer" ).stop().animate({
				    "opacity": 0 
				  }, 500, function() {
				  	$( ".noMessage" ).stop().animate({"opacity":1});
				    // Animation complete.
				    //prep new message to display
			    });
			}
		});
		saveDetails(user, email, description, model);  
		$(".formFeedback").val('');
	});

	$( ".submitForm" ).click(function() { 
		if(!clicked) {
			saveDetails(user, email, self.value, model);  
			showNewMessage(self.value);
		}
	});
	
	function saveDetails(user, email, details, modelID) {
		clicked = true;
		$.ajax({ 
		   type: "POST",
		   data: { details, user, email },
		   url: "/api/post/"+modelID+"/update",
		   success: function(data){        
		     console.log("email(data.postOne.description)");
			 $(".formFeedback").val("");
		   }
		});
	}

	function showNewMessage(details){
		if($('.noMessage').css('opacity') == 1){
			//make previous message disapear
			$( ".noMessage" ).stop().animate({
			    "margin-top": -5, "opacity": 0 
			  }, 500, function() {
			    // Animation complete.
			    //prep new message to display
			  	$('.noMessage').css({'display':'none'});
			  	$('.messageContainer').css({'display':'block'});
			  	$('.commentLogo').css({'opacity':0, 'margin-top':35});
			  	$('.newMessageBox').css({'opacity':0});
			  	$('.newMessage').css({'opacity':0}).text(details);



				//display logo
				$( ".commentLogo" ).stop().animate({
				    "margin-top": 40, "opacity": 1 
				  }, 500, function() {
				  	let newMessageBoxHeight = $('.newMessage').outerHeight();
				  	$('.newMessageBox').css({"margin-top":-10, "height": newMessageBoxHeight});
				  	$('.newMessageBackground').height(newMessageBoxHeight);
					 //display message box
					$( ".newMessageBox" ).stop().animate({
					    "margin-left": 0, "opacity": 1 
					  }, 500, function() {
					  	//display text
					  	$( ".newMessage" ).stop().animate({ "margin-top": 0, "opacity": 1 });	

					});
				});
			});
		} else {
			$( ".newMessageBox" ).stop().animate({
			    "margin-top": -10, "opacity": 0 
			  }, 500, function() {
			  	//display text
			  	$('.newMessage').css({"opacity":0}).text(details);
			  	let newMessageBoxHeight = $('.newMessage').outerHeight();
			  	$('.newMessageBox').css({"margin-top":-10, "height": newMessageBoxHeight});
			  	$('.newMessageBackground').height(newMessageBoxHeight);

			  	$( ".newMessageBox" ).stop().animate({
				    "margin-top": 0, "opacity": 1 
				  }, 500, function() {
				  	//display text
				  	$( ".newMessage" ).stop().animate({ "margin-top": 0, "opacity": 1 });	
				});

			});
		}
	}
}