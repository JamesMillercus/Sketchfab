//The route controller for our home page view

/*

Your first View

Now we're going to set up your first route 
controller (for the index page), and 
the template it will render.

The importer (above) expects the directory 
you ask it for to include .js or .coffee 
files that export a single method accepting 
the following arguments:

	req - an express request object
	res - an express response object

*/

var keystone = require('keystone');
 
exports = module.exports = function(req, res) {
    
    var view = new keystone.View(req, res);
    
    view.render('index');
    
}