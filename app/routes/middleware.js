/**
 * This file contains the common middleware used by your routes.
 *
 * Extend or replace these functions as your application requires.
 *
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */
var _ = require('lodash');
var keystone = require('keystone');

/**
	Initialises the standard view locals

	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/
exports.initLocals = function (req, res, next) {
	res.locals.navLinks = [
		{ label: 'Home', key: 'home', href: '/' },
		{ label: 'Blog', key: 'blog', href: '/blog' },
		{ label: 'Gallery', key: 'gallery', href: '/gallery' },
		{ label: 'Audiences', key: 'audiences', href: '/audiences' },
		{ label: 'Users', key: 'users', href: '/user' },
		{ label: 'Contact', key: 'contact', href: '/contact' },
	];
	res.locals.user = req.user;

	next();
};


/**
	Fetches and clears the flashMessages before a view is rendered
*/
exports.flashMessages = function (req, res, next) {
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error'),
	};
	res.locals.messages = _.some(flashMessages, function (msgs) { return msgs.length; }) ? flashMessages : false;
	next();
};


/**
	Prevents people from accessing protected pages when they're not signed in
 */
exports.requireUser = function (req, res, next) {
	console.log("required user");
	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/signin');
	} else {
		next();
	}
};

/**
	Redirect logic (remove if not working)
 */
 
exports.nonAdminSignIn = function(req, res, next) {

 //  	console.log("Sign in recorded:");
 //  	console.log(req.user);
 //  	if(req.user){
 //  	  console.log("user logged in, admin privilidge? ");
	//   console.log(req.user.isAdmin);
	//   if(!req.user.isAdmin){
	//   	console.log("is not an admin");
	// 	  // keystone.set('signin redirect', '/user');
	// 	  // res.redirect('/user');
	//   }
	//   else{
	//   	console.log("is an admin");
	//   }
 //  	}

 //  	keystone.set('signin redirect', function(user, req, res){
	//   var url = (req.user.isAdmin) ? '/keystone' : '/user';
	//   res.redirect(url);
	// });
  // if (!req.user.isAdmin) {

  //   // res.redirect('/user');
  //   // return;
  // }
  next();
}
