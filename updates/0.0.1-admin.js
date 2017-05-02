//Update script to add the first admin 
//(change to your own name, email and password)

/*

Writing Updates

To do this, we're going to create an update script, 
which Keystone will automatically run before starting 
the web server.

Keystone's automatic update functionality is enabled in 
web.js by the auto update option.

When the option is set to true, Keystone will scan the 
updates directory for .js files, each of which should 
export a method accepting a single argument:

next - the method to call when the update has finished 
running (including any internal callbacks)

Updates are ordered using Semantic Versioning, and 
Keystone will only run them once (successfully 
executed updates are stored in your database, in a 
collection called app_updates).

Update file names should match the pattern x.x.x-description.js 
- anything after the first hyphen is ignored, so you can 
describe the update in the filename.

So to automatically add a new Admin User when your app 
first launches, create a updates/0.0.1-admin.js file:

*/

var keystone = require('keystone'),
    User = keystone.list('User');
 
exports = module.exports = function(done) {
    
    new User.model({
        name: { first: 'Admin', last: 'User' },
        email: 'admin@keystonejs.com',
        password: 'admin',
        canAccessKeystone: true
    }).save(done);
    
};