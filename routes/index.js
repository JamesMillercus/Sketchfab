//Initialises your application's routes and views
//This script imports your route controllers and binds them to URLs.

	//Load keystone, 
var keystone = require('keystone'),
	//the middleware.js file (below), 
    middleware = require('./middleware'),
	//and create an importer for the current directory
    importRoutes = keystone.importer(__dirname);
 
// Common Middleware

//Bind middleware (below) that:
//Initialises our basic error handlers
keystone.pre('routes', middleware.initErrorHandlers);
//Initialises common local variables for our view templates
keystone.pre('routes', middleware.initLocals);
//Retrieves flash messages from session before the view template is rendered
keystone.pre('render', middleware.flashMessages);
 
//Tell Keystone how to handle 404 and 500 errors
// Handle 404 errors
keystone.set('404', function(req, res, next) {
    res.notfound();
});
 
// Handle other errors
keystone.set('500', function(err, req, res, next) {
    var title, message;
    if (err instanceof Error) {
        message = err.message;
        err = err.stack;
    }
    res.err(err, title, message);
});

// Load Routes: Use the importer to load all 
var routes = {
	//the route controllers in the /routes/views directory
    views: importRoutes('./views')
};
 

// Bind Routes:
	//Export a method that binds the index route 
	//controller to GET requests on the root url /
exports = module.exports = function(app) {
	//The app argument to this method is our express app, 
	//so anything you can do binding routes in express, 
	//you can do here.
    app.get('/', routes.views.index);
    
    /*
		Additional route controllers that you add 
		to your app should be added using app.get, 
		app.post or app.all under your root controller.
    */
}