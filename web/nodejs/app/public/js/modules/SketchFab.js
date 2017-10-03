import { loadingScreen } from './Loading';

export class SketchfabModel{
	constructor(urlid, linkid, name, totalLinks, number){
		let version = '1.0.0';
		this.api = null;
		self = this;
		this.client = new Sketchfab( version, this.createIframe(this.createContainer(linkid, name)) );
		this.requestSketchfabModel(urlid);
		this.checkIframeLoaded(number+1, totalLinks);
	}

	createContainer(linkContainer, name){
		let totalContainers = document.getElementsByClassName("linkID").length+1;
		let linkID = "linkID"+ totalContainers;
		let link = document.createElement( "a" );
		// let name = $( ".name" ).text();
		link.setAttribute( "href", linkContainer );
		link.setAttribute( "id", linkID );
		link.setAttribute( "class", "linkID" );

		let title = document.createElement("div");
		title.setAttribute("class", "title");
		title.setAttribute("id", "title" + totalContainers);
		title.append(name);
		
		let momoLogoContainer = document.createElement("div");
		momoLogoContainer.setAttribute("class", "momoModelLogoContainer");
		momoLogoContainer.setAttribute("id", "momoModelLogoContainer"+ totalContainers);

		let momoLogo = document.createElement("div");
		momoLogo.setAttribute("class", "momoModelLogo");
		momoLogo.setAttribute("id", "momoModelLogo"+ totalContainers);

		let scrollID = "scrollID"+ totalContainers;
		let scrollOver = document.createElement( "div" );
		scrollOver.setAttribute( "id", scrollID );
		scrollOver.setAttribute( "class", "scrollOver" );

		$( link ).append( momoLogoContainer );
		$( momoLogoContainer ).append( momoLogo );
		$( link ).append( title );
		$( link ).append( scrollOver );
		$( "#sketchContainer" ).append( link );
		return linkID;
	}

	createIframe(container){
		let totalIframes = document.getElementsByTagName("iframe").length+1;
		let iframeID = "iframe"+ totalIframes;
		let iframe = document.createElement( "iframe" );
		iframe.setAttribute( "id", iframeID );
		iframe.setAttribute( "class", "multimodel" );
		$( "#" + container ).append( iframe );
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
					console.log( 'Viewer is ready' );
					if($("iframe").length == 1) loadingScreen();
				});
			},
			error: function onError() {
				console.log( 'Viewer error' );
			}
		} );
	}

	checkIframeLoaded(iframe, total) {
    	$("#iframe"+iframe).load(function() {
    		let oldParent = document.getElementById('sketchContainer');
			let tempIframe = document.createElement('div');
			tempIframe.setAttribute( "class", 'loadingIframe');
			tempIframe.setAttribute( "id", 'loadingIframe'+iframe );
			oldParent.appendChild(tempIframe);
			if(total > 1 || $('#loadingScreen').length) {
				if(total == $( ".loadingIframe" ).length) {
					loadingScreen();
					$( ".loadingIframe" ).remove();
				}
			}
		});
	}
}