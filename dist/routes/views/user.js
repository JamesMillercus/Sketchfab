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
		audience: [],
		username: null,
		manager: null,
		emails: []
	}

	// Load all products
	view.on('init', function (next) {
		keystone.list('Manager').model.find().exec(function (err, manager) {
			if (err) return next(err);
			locals.data.manager = manager;
			next();
		});
	});

	// When audience is selected
	view.on('init', function(next){
		// set the slug to the selected Audience
		var q = keystone.list('Audience').model.findOne({
			slug: locals.filters.audience
		});

		// load in the selected data's content
		q.exec(function(err, result){
			if(result) locals.data.audience = result;
			if(req.user) {
				locals.data.username = req.user.name;
				//for each manager
				for(var x = 0; x < locals.data.manager.length; x++){
					// for each manager within the requested user information
					for(var y = 0; y < req.user.managers.length; y++){
				 		//check if that id exists within the users created manager email
						if(req.user.managers[y].toString() == locals.data.manager[x]._id.toString()){
							//if so then push that email address to the front end
							locals.data.emails.push(locals.data.manager[x].email);
						}
					}
				}
			}
			
			next(err);
		});
	});

	// Render view
	view.render('user');
}