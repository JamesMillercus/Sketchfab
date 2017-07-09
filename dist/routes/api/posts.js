var async = require('async'),
	keystone = require('keystone');

var Post = keystone.list('Audience'),
	nodemailer = require('nodemailer'),
	pw = 'breakinglincoln';

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
			item[0].save();
			res.apiResponse({
				postOne: item[0]
			});
			//PASS MANAGER EMAIL INTO DATA.MANAGER
			email( data.user, data.email, item[0].title, data.details );
		});
		
	});
}

function email(user, email, model, message){
	// create reusable transporter object using the default SMTP transport
	var transporter = nodemailer.createTransport({
	    service: 'gmail',
	    secure: false, // TLS requires secureConnection to be false
	    port: 25, // port for secure SMT
	    auth: {
	        user: 'jamesandjamesmiller@gmail.com',
	        pass: pw
	    },
	    tls: {
	    	rejectUnauthorized: false
	    }
	});

	// setup email data with unicode symbols
	var mailOptions = {
	    from: '"James Miller 👻" <jamesandjamesmiller@gmail.com>', // sender address
	    to: email, // list of receivers 
	    subject: 'Momo Sketchfab CMS Update', // Subject line
	    html: '<p> Model ' + model + ' has been updated by ' + user + '. Their message is: ' + message +'</p>' // html body
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, (error, info) => {
	    if (error) {
	        return console.log(error);
	    }
	    console.log('Message %s sent: %s', info.messageId, info.response);
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