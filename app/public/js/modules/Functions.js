let h = window.innerHeight, totalSections = 0;

export function styles(iframes) {
	if(iframes == 1) $( "#iframe" + iframes ).addClass( "onlyModel" );
	else {
		//define the old parent
		let oldParent = document.getElementById('sketchContainer');
		let wrapper;
		for (var x = 1; x < iframes+1; x++) {
			$( "#iframe"+x ).addClass( "twinModel" );
			let oldChild = document.getElementById('iframe'+x);
			if(isOdd(x)){
				totalSections++;
				wrapper = document.createElement('section');
				wrapper.setAttribute( "id", 'section'+totalSections );
				oldParent.appendChild(wrapper);
			}
			wrapper.appendChild(oldChild);
			resizeStyles();
		}
	}
}
function resizeStyles(){
	h = window.innerHeight;
	$( "section").height(h/totalSections);	
}
function isOdd(num) { return num % 2; }

$( window ).resize(resizeStyles);

export const sqrt = Math.sqrt;
export function test(x, y) {
    return sqrt(square(x) + square(y));
}
