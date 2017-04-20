export class SketchfabModel{
	constructor(urlid){
		this.urlid = urlid;
		let version = '1.0.0';
		let iframe = document.getElementById( 'api-frame' );
		this.client = new Sketchfab( version, iframe );
		this.init();
	}

	init(){
		this.client.init( this.urlid, {
			success: function onSuccess( api ){
				api.start();
				api.addEventListener( 'viewerready', function() {
				// API is ready to use
				// Insert your code here
					console.log( 'Viewer is ready' );
				} );
			},
			error: function onError() {
				console.log( 'Viewer error' );
			}
		} );
	}
}

