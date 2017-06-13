var keystone = require('keystone'),
    async = require('async');

exports = module.exports = function(req, res) {


    var locals = res.locals,
        view = new keystone.View(req, res);

    // Set locals
    locals.section = 'session';

    //Set form
    locals.form = req.body;


    view.on('post', { action: 'signin' }, function(next) {

        if (!req.body.signin_email || !req.body.signin_password) {
            req.flash('error', 'Please enter your username and password.');
            return next();
        }

        var onSuccess = function() {
            if (req.query && req.query.from) {
                res.redirect(req.query.from);
            } else {
            	if(!req.user.isAdmin) res.redirect('/user');	
                else res.redirect('/admin');
            }
        }

        var onFail = function() {
            req.flash('error', 'Your username or password were incorrect, please try again.');
            return next();
        }

        keystone.session.signin({ email: req.body.signin_email, password: req.body.signin_password }, req, res, onSuccess, onFail);

    });   

	view.render('signin');

}