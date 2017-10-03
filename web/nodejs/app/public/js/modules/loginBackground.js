var movementStrength = 25;
var height = movementStrength / $(window).height();
var width = movementStrength / $(window).width();

export function loginFunctions(){
	$("body").mousemove(function(e){
	          var pageX = e.pageX - ($(window).width() / 2);
	          var pageY = e.pageY - ($(window).height() / 2);
	          var newvalueX = width * pageX * -1 - 25;
	          var newvalueY = height * pageY * -1 - 50;
	          $('.backgroundImage').css("background-position", newvalueX+"px     "+newvalueY+"px");
	});

	$('.inputBox').click(function() {
		$(".inputBox").toggle(this.checked);
		console.log("this.checked");
		if(this.checked) {
			$('#hidden-username, #hidden-password').attr("autocomplete", "on");
			$(".inputBox").css({ boxShadow : "0 0 5px 3px rgba(100,100,200,0)" });
		} else {
			$(".inputBox").css({ boxShadow : "", display: "inline-block" });
			$('#hidden-username, #hidden-password').attr("autocomplete", "off");
		}
	});

	if($.cookie("tickbox") == 'checked'){
		$(".inputBox").prop('checked', true);
		$(".inputBox").css({'-webkit-box-shadow' : 'none', '-moz-box-shadow' : 'none', 'box-shadow' : 'none', 'display': 'inline-block'});
		$('#hidden-username').val($.cookie("username"));
		$('#hidden-password').val($.cookie("password"));
		$('#hidden-username, #hidden-password').attr("autocomplete", "on");
	}

	$( ".logindetails" ).keydown(function() {
		if(event.keyCode == 13) {
			if($(".inputBox ").prop('checked')) saveLoginDetails();
	     	else emptyLoginDetails();
	    }
	});

	$( ".submitBtn" ).click(function() { 
		if($(".inputBox ").prop('checked')) saveLoginDetails();
	 	else emptyLoginDetails();  
	});

	function saveLoginDetails(){
		$.cookie('username',$('#hidden-username').val());
	 	$.cookie('password',$('#hidden-password').val());
	 	$.cookie('tickbox', 'checked');
	}

	function emptyLoginDetails(){
		$.cookie('username', '');
		$.cookie('password', '');
		$.cookie('tickbox', 'empty');
	}
}