var keystone = require('keystone'),
	Types = keystone.Field.Types; // input types for fields

//define a new keystone object, with the name 'Audience' and below fields
var AudienceCategory = new keystone.List('AudienceCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
});

AudienceCategory.add({
	name: { type: String, required: true },
	active: { type: Types.Select, options: 'true, false', default: 'false' },
});

// AudienceCategory.relationship({ ref: 'AudienceCategory'});
AudienceCategory.relationship({ ref: 'Audience', path: 'Audience', refPath: 'categories' });

AudienceCategory.register();