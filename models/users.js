// This script initialises the User model. It doesn't need to export anything, but the model must be registered with Keystone.
var keystone = require('keystone'),
    Types = keystone.Field.Types;
 
// Ceate a user model, so that Keystone can do authentication and sessions management

var User = new keystone.List('User');
 
User.add({
    name: { type: Types.Name, required: true, index: true },
    email: { type: Types.Email, initial: true, required: true, index: true },
    password: { type: Types.Password, initial: true },
    canAccessKeystone: { type: Boolean, initial: true }
});
 
User.register();
