var keystone = require('keystone');

//make this available outside this file
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;

	// set locals
	locals.section = 'audiences';

	locals.data = {
		audiencemodels: null,
		audiencecategories: null,
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
		keystone.list('AudienceCategory').model.find().sort('name').exec(function (err, feedback) {
			if (err || !feedback.length) return next(err);
			//loop through each product
			locals.data.audiencecategories = feedback;
			for(var x = 0; x < locals.data.audiencemodels.length; x++){
				//for each category assigned to that product				
				for(var y = 0; y< locals.data.audiencemodels[x].categories.length; y++){
					//loop through all category names within the cms ('feedback')
					for(var z = 0; z < locals.data.audiencecategories.length; z++){
						//check if that category name exists within products created category
						if(locals.data.audiencecategories[z]._id.toString() == locals.data.audiencemodels[x].categories[y].toString()){
							//if so, then replace the id of the category with the name
							locals.data.audiencemodels[x].categories[y] = locals.data.audiencecategories[z].name;
							//if the data has been selected as 'active',then display them on the front end
							if(locals.data.audiencecategories[z].active == 'true'){
								locals.data.active.push(locals.data.audiencemodels[x]);
							}
						}
					}
				}
			}
			next();
		});
	});

	// Render view
	view.render('audiences');
}