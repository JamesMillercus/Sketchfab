/* User functionality page:
	1. User gets url to sign into
	2. If user is not signed in, display sign in form else display content
	3. user signs in
	3. user is displayed content on their page */
	
var keystone = require('keystone');


//make this available outside this file
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;

	// set locals
	locals.section = 'users';

	locals.data = {
		audiencemodels: null,
		users: null,
		active: [],
	};

	// Load all products
	view.on('init', function (next) {
		keystone.list('Audience').model.find().exec(function (err, audiencemodels) {
			if (err) return next(err);
			locals.data.audiencemodels = audiencemodels;
			next();
		});
	});

	// Load all categories names and replace product id's with the names
	view.on('init', function (next) {
		keystone.list('User').model.find().exec(function (err, feedback) {
			if (err || !feedback.length) return next(err);
			//loop through each product
			locals.data.users = feedback;
			// console.log(feedback);
			for(var x = 0; x < locals.data.audiencemodels.length; x++){
				//for each user assigned to that product				
				for(var y = 0; y< locals.data.audiencemodels[x].users.length; y++){
					//loop through all category names within the cms ('feedback')
					for(var z = 0; z < locals.data.users.length; z++){
						//check if that user name exists within products created category
						if(locals.data.users[z]._id.toString() == locals.data.audiencemodels[x].users[y].toString()){
							//if user is logged in
							if(req.user){
								//if current logged in user = locals.data.users[z])
								if(req.user.id == locals.data.users[z]._id) {
									//display content based on what user is logged in
									locals.data.active.push(locals.data.audiencemodels[x]);
								}
							}
						}
						
					}
				}
			}
			next();
		});
	});

	// Render view
	view.render('users');
}