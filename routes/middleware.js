//Custom middleware for your routes
//This script includes common middleware for your application routes


var _ = require('underscore'),
    keystone = require('keystone');
 
/**
    Initialises the standard view locals.
    Include anything that should be initialised before route controllers are executed.
*/
exports.initLocals = function(req, res, next) {
    
    var locals = res.locals;
    
    locals.user = req.user;
    
    // Add your own local variables here
    
    next();
    
};
 
/*

Middleware functions 

Keystone expects middleware functions to accept 
the following arguments:

	req - an express request object
	res - an express response object
	next - the method to call when the middleware 
	has finished running (including any internal callbacks)

*/

/**
    Inits the error handler functions into `res`
*/
exports.initErrorHandlers = function(req, res, next) {
    
    res.err = function(err, title, message) {
        res.status(500).render('errors/500', {
            err: err,
            errorTitle: title,
            errorMsg: message
        });
    }
    
    res.notfound = function(title, message) {
        res.status(404).render('errors/404', {
            errorTitle: title,
            errorMsg: message
        });
    }
    
    next();
    
};

/*

Flash message support (no, not that flash)

Keystone includes support for 'flashing' messages 
to your visitors via session. The default setup 
above supports four categories, all of which can 
be styled differently:

	info
	success
	warning
	error

You can easily support other types of messages 
by updating your middleware and the .jade 
template that renders them (which we'll get to below).

To use flash messages in your route controllers, do this:

req.flash('info', 'Some information!');

Messages use session so they survive redirects, 
and will only be displayed to the user once, 
making them perfect for status messages 
(e.g. "Your changes have been saved") or form 
validation (e.g. "Please enter a valid email address").

Some Keystone features (such as the Update Handler) can 
automatically generate flash messages for you, and 
expect the categories above to be available.

*/
 
/**
    Fetches and clears the flashMessages before a view is rendered
*/
exports.flashMessages = function(req, res, next) {
    
    var flashMessages = {
        info: req.flash('info'),
        success: req.flash('success'),
        warning: req.flash('warning'),
        error: req.flash('error')
    };
    
    res.locals.messages = _.any(flashMessages, function(msgs) { return msgs.length }) ? flashMessages : false;
    
    next();
    
};