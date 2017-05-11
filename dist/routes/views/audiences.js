// TO DO:
// define CMS functionality
// user sign in
// displays content assigned to those associated categories 

var keystone = require('keystone');
var async = require('async');

//make this available outside this file
exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;

	// set locals
	locals.section = 'audiences';

	locals.data = {
		results: null,
	};

	// Load all products
	view.on('init', function (next) {
		keystone.list('Audience').model.find().exec(function (err, results) {
			if (err) return next(err);
			locals.data.results = results;
			next();
		});
	});

	// Load all categories names and replace product id's with the names
	view.on('init', function (next) {
		keystone.list('AudienceCategory').model.find().sort('name').exec(function (err, feedback) {
			if (err || !feedback.length) return next(err);
			//loop through each product
			for(var x = 0; x < locals.data.results.length; x++){
				//for each category assigned to that product				
				for(var y = 0; y< locals.data.results[x].categories.length; y++){
					//loop through all category names within the cms ('feedback')
					for(var z = 0; z < feedback.length; z++){
						//check if that category name exists within products created category
						if(feedback[z]._id.toString() == locals.data.results[x].categories[y].toString()){
							//if so, then replace the id of the category with the name
							locals.data.results[x].categories[y] = feedback[z].name;
						}
					}
				}
			}
			next();
		});
	});


	// Load all categories names and replace product id's with the names
	view.on('init', function (next) {
		keystone.list('User').model.find().exec(function (err, user) {
			console.log("USER = ");
			console.log(user);
		// 	if (err || !feedback.length) return next(err);
		// 	//loop through each product
		// 	for(var x = 0; x < locals.data.results.length; x++){
		// 		//for each category assigned to that product				
		// 		for(var y = 0; y< locals.data.results[x].categories.length; y++){
		// 			//loop through all category names within the cms ('feedback')
		// 			for(var z = 0; z < feedback.length; z++){
		// 				//check if that category name exists within products created category
		// 				if(feedback[z]._id.toString() == locals.data.results[x].categories[y].toString()){
		// 					//if so, then replace the id of the category with the name
		// 					locals.data.results[x].categories[y] = feedback[z].name;
		// 				}
		// 			}
		// 		}
		// 	}
		// 	next();
		});
	});

	// Render view
	view.render('audiences');
}