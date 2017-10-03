var keystone = require('keystone');

//make this available outside this file
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;

	// set locals to audiences
	locals.section = 'audiences';
	//request the selected audience
	locals.filters = {
		audience: req.params.audience
	}
	//store data from the audience in data object
	locals.data = {
		audiences: []
	}

	// When audience is selected
	view.on('init', function(next){
		// set the slug to the selected Audience
		var q = keystone.list('Audience').model.findOne({
			slug: locals.filters.audience
		});
		// load in the selected data's content
		q.exec(function(err, result){
			locals.data.audience = result;
			next(err);
		});
	});

	// Render view
	view.render('audience');
}