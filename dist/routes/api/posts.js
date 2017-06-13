var async = require('async'),
	keystone = require('keystone');

var Post = keystone.list('Audience');

/**
 * List Posts
 */
exports.list = function(req, res) {
	Post.model.find(function(err, items) {
		
		if (err) return res.apiError('database error', err);
		
		res.apiResponse({
			posts: items
		});
		
	});
}

/**
 * Get Post by ID
 */
exports.get = function(req, res) {
	console.log("params = ");
	console.log(req.params.id);
	Post.model.find({ title: req.params.id}).exec(function(err, item) {
		
		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');
		
		res.apiResponse({
			post: item
		});
		
	});
}

/**
 * Get Post by ID
 */
exports.update = function(req, res) {
	Post.model.find({ title: req.params.id}).exec(function(err, item) {
	
		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');

		let storedData = {
			users: item[0].users,
			categories: item[0].categories
		}
		
		var data = (req.method == 'POST') ? req.body : req.query;
	
		item[0].getUpdateHandler(req).process(data, function(err) {
			if (err) return res.apiError('create error', err);
			item[0].description = data.details;
			item[0].users = storedData.users;
			item[0].categories = storedData.categories;
			console.log("item[0].users");
			console.log(item[0]);
			item[0].save();
			res.apiResponse({
				postOne: item[0]
			});
			
		});
		
	});
}

/**
 * Create a Post
 */
exports.create = function(req, res) {
	
	var item = new Post.model(),
		data = (req.method == 'POST') ? req.body : req.query;
	
	item.getUpdateHandler(req).process(data, function(err) {
		
		if (err) return res.apiError('error', err);
		
		res.apiResponse({
			post: item
		});
		
	});
}


/**
 * Delete Post by ID
 */
exports.remove = function(req, res) {
	Post.model.findById(req.params.id).exec(function (err, item) {
		
		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');
		
		item.remove(function (err) {
			if (err) return res.apiError('database error', err);
			
			return res.apiResponse({
				success: true
			});
		});
		
	});
}