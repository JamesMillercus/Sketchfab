var keystone = require('keystone');

//make this available outside this file
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;

	// set locals
	locals.section = 'audiences';

	// Load Audiences
	view.query('audiences', keystone.list('Audience').model.find());

	// Render view
	view.render('audiences');
}