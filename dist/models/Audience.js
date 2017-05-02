var keystone = require('keystone'),
	Types = keystone.Field.Types; // input types for fields

//define a new keystone object, with the name 'Audience' and below fields
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

//add fields to be used
Audience.add({
	title: { type: String, required: true },
	price: { type: Number },
	quantity: { type: Number },
	description: { type: Types.Html, wysiwyg: true, height: 300 },
	image: { type: Types.CloudinaryImage },
	publishDate: { type: Date, default: Date.now }
});

Audience.register();