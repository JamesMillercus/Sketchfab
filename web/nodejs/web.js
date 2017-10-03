// Main script that starts your application
var keystone = require('keystone');
keystone.init({
  
  'name': 'My Project',
  
  'favicon': 'public/favicon.ico',
  'less': 'public',
  'static': ['public'],
  
  'views': 'templates/views',
  'view engine': 'jade',
  
  'auto update': true,
  'mongo': 'mongodb://localhost/my-project',
  
  'session': true,
  'auth': true,
  'user model': 'User',
  'cookie secret': '(your secret here)'
  
});

// gets the user model for authentication and session management within the admin system
require('./models');
// tells keystone the locations of the pages to be loaded and sets up a middleware to determine which view to load and when
keystone.set('routes', require('./routes'));
 
keystone.start();