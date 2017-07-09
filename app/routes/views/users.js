var keystone = require('keystone');

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	// set locals
	locals.section = 'users';
	// Set locals
    // locals.section = 'session';

    // //Set form
    // locals.form = req.body;

	locals.data = {
		audiencemodels: null,
		users: null,
		active: [],
		currentUser: null
	};


	//SIGN IN FUNCTIONALITY
    view.on('post', { action: 'signin' }, function(next) {
    	console.log("ATTEMPT SIGN IN");

        if (!req.body.signin_email || !req.body.signin_password) {
            req.flash('error', 'Please enter your username and password.');
            return next();
        }

        var onSuccess = function() {
            if (req.query && req.query.from) {
                res.redirect(req.query.from);
            } else {
            	if(!req.user.isAdmin) res.redirect('/');	
                else res.redirect('/admin');
            }
        }

        var onFail = function() {
            req.flash('error', 'Your username or password were incorrect, please try again.');
            return next();
        }

        keystone.session.signin({ email: req.body.signin_email, password: req.body.signin_password }, req, res, onSuccess, onFail);

    });

	//PRODUCT LOADING FUNCTIONALITY
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
			if(req.user){
				locals.data.currentUser = req.user;
				locals.data.currentUser.description = locals.data.currentUser.description.replace(/(<([^>]+)>)/ig,"");
				if (err || !feedback.length) return next(err);
				//loop through each product
				locals.data.users = feedback;
				// console.log(feedback);
				if(locals.data.audiencemodels){
					for(var x = 0; x < locals.data.audiencemodels.length; x++) {
						//for each user assigned to that product				
						for(var y = 0; y< locals.data.audiencemodels[x].users.length; y++) {
							//loop through all category names within the cms ('feedback')
							for(var z = 0; z < locals.data.users.length; z++) {
								//check if that user name exists within products created category
								if(locals.data.users[z]._id.toString() == locals.data.audiencemodels[x].users[y].toString()) {
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
				}
			}
			next();
		});
	});

	// Render view
	view.render('index');
}