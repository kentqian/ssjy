var express = require('express');
var back_login = require('./return_back_into_login.js');
var router = express.Router();

/* GET users listing. */
router.route('/')
	.get(function (req, res, next) {
		back_login.return_back_into_login(req, res, function (){
			res.locals.user = req.session.user;
			res.render('user');
		}, function (){
			res.redirect('../login');
		});
});

router.route('/pwd_modify')
	.post(function (req, res, next) {
		back_login.return_back_into_login(req, res, function(){
			connection.query('update staff_list set password = password(?) where staff_name = ? and password = password(?)', [req.body.new_pwd, req.session.user.staff_name, req.body.old_pwd], function (err, results){
				if (err){
					console.log('[Update Error] - ',err.message);
					res.sendStatus(500);
				}
				if (results.affectedRows){
					if (results.changedRows){
						res.send({msg:'Pass!'});
					}else{
						res.send({msg:'与旧密码一致'});
					}
				}else{
					res.sendStatus(403);
				}
			});
		}, function (){
			res.send({msg:'redirect'});
		});
	});

module.exports = router;
