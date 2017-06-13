var keystone = require('keystone');

//make this available outside this file
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	// set locals to audiences
	locals.section = 'users';
	//request the selected audience
	locals.filters = {
		audience: req.params.user
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

		// keystone.list('Audience').model.update({condition},$set:{
		// 'email': 'new email id'
		// },{
		// 'multi':false
		// }).exec(function(err,result){
		// //Do anything
		// });

		// load in the selected data's content
		q.exec(function(err, result){
			locals.data.audience = result;
			console.log(locals.data);
			next(err);
		});
	});

	// Render view
	view.render('user');
}