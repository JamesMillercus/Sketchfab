var keystone = require('keystone');


//define a new keystone object, with the name 'Audience' and below fields
var AudienceCategory = new keystone.List('AudienceCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
});

AudienceCategory.add({
	name: { type: String, required: true },
});

// AudienceCategory.relationship({ ref: 'AudienceCategory'});
AudienceCategory.relationship({ ref: 'Audience', path: 'Audience', refPath: 'categories' });

AudienceCategory.register();