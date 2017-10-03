var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var Manager = new keystone.List('Manager');

Manager.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, unique: true, index: true },		
	users: { type: Types.Relationship, ref: 'User', many: true },

});

/**
 * Relationships
*/
Manager.relationship({ ref: 'User', path: 'User', refPath: 'managers' });


/**
 * Registration
*/

Manager.register();

