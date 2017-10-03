var keystone = require('keystone'),
	Types = keystone.Field.Types; // input types for fields

var Audience = new keystone.List('Audience', { 
	map: { name: 'title'},
	singular: 'Audience',
	plural: 'Audiences',
	//create a slug for URLs (www.momentum.com/audiences)							
	//path goes to the slug part of url
	//that slug will be the title (defined as below)
	//unique means that there can't be two of the same slugs
	autokey: { path: 'slug', from: 'title', unique: true }
});



Audience.add({
	title: { type: String, required: true },
	url: { type: Types.Url },
	description: { type: Types.Html, wysiwyg: true, height: 10 },
	categories: { type: Types.Relationship, ref: 'AudienceCategory', many: true },
	users: { type: Types.Relationship, ref: 'User', many: true },
	// selector: { type: Types.Select, options: 'one, two, three', default: 'one' },
	publishDate: { type: Date, default: Date.now }
});

Audience.register();