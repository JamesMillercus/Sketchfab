var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var User = new keystone.List('User');

User.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, unique: true, index: true },
	image:{ type: Types.CloudinaryImage },
	description: { type: Types.Html, wysiwyg: true, height: 10 },
	managers: { type: Types.Relationship, ref: 'Manager', many: true },
	password: { type: Types.Password, initial: true, required: true },
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});


/**
 * Relationships
*/
User.relationship({ ref: 'Audience', path: 'Audience', refPath: 'users' });

User.relationship({ ref: 'Manager', path: 'Manager', refPath: 'users' });


/**
 * Registration
*/
User.defaultColumns = 'name, email, isAdmin';
User.register();

