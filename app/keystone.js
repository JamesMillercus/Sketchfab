// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Require keystone
var keystone = require('keystone');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({
	'name': 'Keystone',
	'brand': 'Keystone',
	'sass': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'pug',
	'host':'127.0.0.1',
	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',
});

// Load your project's Models
keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('dist/locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});

// Load your project's Routes
keystone.set('routes', require('./routes'));


// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
	posts: ['posts', 'post-categories'],
	galleries: 'galleries',
	enquiries: 'enquiries',
	audiences: ['audiences', 'audience-categories'],
	users: 'users'
});

keystone.set('admin path', 'admin');

keystone.set('signin url', '/signin');
keystone.set('signout url', '/signout');
keystone.set('signin redirect', '/');

// keystone.set('signin redirect', function(user, req, res){
//   console.log("yes???");
//   var url = (req.user.isAdmin) ? '/keystone' : '/user';
//   res.redirect(url);
// });

// Start Keystone to connect to your database and initialise the web server
keystone.start();
