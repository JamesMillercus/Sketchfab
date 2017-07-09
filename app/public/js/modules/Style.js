import { activateForm } from './Loading';
import { loginFunctions } from './loginBackground';

export function styles(iframes) {
	if(iframes > 1) multiStyles(iframes);
	else singleStyle();
	$( ".url" ).remove();
	$( ".link" ).remove();
	$( ".name" ).remove();
}

/* MAIN PAGE MULTIPLE IFRAMES STYLING */

function multiStyles(iframes){
	//define the old parent
	let oldParent = document.getElementById('sketchContainer');	
	let wrapper;
	let firstIframe = document.getElementById('linkID1');
	
	// for each iframe
	for (var x = 1; x < iframes+1; x++) {

		//add a class called twin Model
		$( "#linkID"+x ).addClass( "twinModel" );
		// if the current model is an odd number
		// create a new section and add this model to it
		let oldChild = document.getElementById('linkID'+x);

		if( isOdd(x) ) { // CHANGE TO: if is a multiple of 4
			totalSections++;
			wrapper = document.createElement('section');
			wrapper.setAttribute( "id", 'section'+totalSections );
			// add the new section to the sectionContainer
			addSectionToContainer(wrapper, oldParent);
		}
		wrapper.appendChild(oldChild);
		
		// currentSectionContainer.appendChild($( "#linkID"+x ).appendChild);

		// if the last iframe is odd then make it go full width
		
	}

	if( isOdd( iframes ) ) $( "#linkID"+iframes ).removeClass( "twinModel" ).addClass( "oddModel" );
	resizeStyles( iframes );


}

/* MULTIPLE IFRAMES ADD SECTIONS TO CONTAINERS */
// can get rid of this section

function addSectionToContainer(wrapper, oldParent){
	let firstSectionContainer;
	let currentSectionContainer;
	let sectionContainers = $( ".sectionContainer").length;

	if(sectionContainers==0) {
		createFirstSection(firstSectionContainer, oldParent)
		sectionContainers = $( ".sectionContainer").length;
		currentSectionContainer = document.getElementById("sectionContainer" + sectionContainers);
	}else{
		currentSectionContainer = document.getElementById("sectionContainer" + sectionContainers);

		let sections = currentSectionContainer.getElementsByTagName("section").length+1;
		let newSectionContainer;
		if(isOdd( sections )) {
			sectionContainers++;
			newSectionContainer = document.createElement('div');
			newSectionContainer.setAttribute("id", "sectionContainer" + sectionContainers);
			newSectionContainer.setAttribute("class", "sectionContainer");	
			currentSectionContainer = newSectionContainer;
			oldParent.appendChild(currentSectionContainer);	
			sectionContainers = $( ".sectionContainer").length;
		}	
		//if there is more than one section of containers
		if(sectionContainers > 1) $(".sectionContainer").addClass("multiSectionContainers");
	}
	currentSectionContainer.appendChild(wrapper);
}

function createFirstSection(firstSectionContainer, oldParent) {
	firstSectionContainer = document.createElement("div");
	firstSectionContainer.setAttribute("id", "sectionContainer1");
	firstSectionContainer.setAttribute("class", "sectionContainer");
	oldParent.appendChild(firstSectionContainer);
}

function singleStyle(){
	$( ".title" ).remove();
	$( ".scrollOver" ).remove();
	$( "#linkID1" ).addClass("singleLinkID");
	$( ".momoModelLogoContainer" ).addClass("momoModelLogoSingleContainer");
	let description = $( ".description" ).text();
	description = description.replace(/(<([^>]+)>)/ig,"");
	let form = $("<form class = 'formInput'></form>");
	form.append("<input class = 'formFeedback' type='text' name='feedback' autocomplete = 'off' value='"+ description + "'>")
	form.append("<input class = 'submitForm' type=button value=Save>");
	$( "#sketchContainer" ).append( form );
	$( ".description" ).remove();
	activateForm();
}

															   //modelNameBox height 38px
let h = window.innerHeight, totalSections = 0, onePercent = 0, modelNameBox = 38, circleVHeight = 2.3; 

function resizeStyles(iframes){
	h = $( "#sketchContainer" ).height();
	let setCalc,
	sizeMultiplier,
	logoHeightSetter;

	if($(".sectionContainer").length >= 2) {
		setCalc = h/2.1;
		sizeMultiplier = .7;
		logoHeightSetter = 1.8;
		$(".multimodel").addClass("multimodelIframeHeight");
	}else {
		setCalc = h/totalSections;
		sizeMultiplier = 1.3;
		logoHeightSetter = 1.4;
	}
	

	onePercent = h*.01; // vertical spacing of 1%
	$( "section").height(setCalc);	
	$( "iframe").height(((((h)-onePercent)-modelNameBox)*sizeMultiplier)+3); //add 3 pixels to make sure scroll over doesn't reveal white
	$( ".linkID").height((setCalc)-onePercent);	
	if(isOdd(iframes)) {
		// $( "#iframe"+iframes ).height(h/totalSections);
		// $( "#iframe"+iframes ).removeClass("multimodel").addClass("multiOddmodel");
	}
	$( ".momoModelLogoContainer").css({"bottom": ($( "iframe").height()/circleVHeight)/logoHeightSetter })

	let sectionNumber = $( ".sectionContainer").length;
	// console.log($("#sectionContainer" + sectionNumber).length);
	if($("#sectionContainer" + sectionNumber).length > 1) {
		if($("#sectionContainer" + sectionNumber + " section").length < 2){
				
			$("#sectionContainer" + sectionNumber + " section").css({"height": $( "#sketchContainer" ).height() });
			$("#sectionContainer" + sectionNumber + " section .twinModel").css({"width":"100%", "margin-bottom": ".5%"});
		} 

		if ($("#sectionContainer" + sectionNumber + " section .linkID").length < 2) {
			$("#sectionContainer" + sectionNumber + " section .linkID").css({"height": ($( "#sectionContainer" + sectionNumber + " section .linkID").height()*2)+5});
			$("#sectionContainer" + sectionNumber + " section .linkID iframe").css({"height": ($( "#sectionContainer" + sectionNumber + " section .linkID").height())*1.2});
			$("#sectionContainer" + sectionNumber + " section .linkID .momoModelLogoContainer").css({"bottom": ($( "#sectionContainer" + sectionNumber + " section .linkID").height())/2.5});
		}
	}
}
function isOdd(num) { return num % 2; }

$( window ).resize(resizeStyles);

if ( $( ".backgroundImage" ).length ) loginFunctions();


$(document).ready(function () {
    $(document).on('mouseenter', '.linkID', function () {                       
    	let scrollBackground = "#"+$(this).find(".scrollOver").attr("id");
    	let logoColour = "#"+$(this).find(".momoModelLogoContainer").attr("id");
    	let logoColourChanger = "#"+$(logoColour).find(".momoModelLogo").attr("id");
    	let title = "#"+$(this).find(".title").attr("id");

    	$(title).css({"color": "#f90b7d", "background-color": "#d3d3d3"})
    	$(logoColourChanger).css({"background-color": "#f90b7d"})
        $(scrollBackground).css({"opacity": 0});
    }).on('mouseleave', '.linkID', function () {
    	$(".title").css({"color": "", "background-color": ""})
    	$(".momoModelLogo").css({"background-color": ""})
        $(".scrollOver").css({"opacity": 0.5})
    });
});