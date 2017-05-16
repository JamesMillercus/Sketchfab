var keystone = require('keystone'),
    async = require('async');

exports = module.exports = function(req, res) {


    var locals = res.locals,
        view = new keystone.View(req, res);

    // Set locals
    locals.section = 'session';

    //Set form
    locals.form = req.body;


	view.on('init', function (next) {
		console.log("logged out?");
		keystone.session.signout(req, res, function(){ 
			res.redirect('/');
		});
		 
    });   

	view.render('signout');

}