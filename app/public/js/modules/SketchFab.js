export class SketchfabModel{
	constructor(urlid){
		let version = '1.0.0';
		this.api = null;
		self = this;
		this.client = new Sketchfab( version, this.createIframe() );
		this.requestSketchfabModel(urlid);
	}

	createIframe(){
		let totalIframes = document.getElementsByTagName("iframe").length+1;
		let iframeID = "iframe"+ totalIframes;
		let iframe = document.createElement( "iframe" );
		iframe.setAttribute( "id", iframeID );
		$( "#sketchContainer" ).append( iframe );
		return iframe;
	}

	requestSketchfabModel(urlid){
		self.api = urlid;
		this.client.init( urlid, {
			success: function onSuccess( api ){
				self.api = api;
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

	startAPI(){
		console.log(self.api);
		self.api.start();
	}
}