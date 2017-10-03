import { SketchfabModel } from './SketchFab';
import { loadPage, urlid, models, linkid, modelName } from './Loading';
import { styles } from './Style';


export function start(){
	// load each model that was defined from the cms
	for(var x = 0;x<urlid.length;x++) models[x] = new SketchfabModel(urlid[x], linkid[x], modelName[x], linkid.length, x);
	// when a link is clicked fade out the page, then load content (more graceful when loading in next page)
	$( ".linkID" ).click(function(e) { loadPage(e, this) });
	$( ".homeBtn" ).click(function(e) { loadPage(e, this) });
	// $( ".submitBtn" ).click(function(e) { loadPage(e, this) });
	// $( ".signoutButton" ).click(function(e) { loadPage(e, this) });
	// style the page
	styles(urlid.length);
}