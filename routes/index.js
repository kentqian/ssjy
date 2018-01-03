var express = require('express');
var back_login = require('./return_back_into_login.js');
var router = express.Router();

/* GET home page. */
router.route('/')
	.get(function (req, res, nxt){
		back_login.return_back_into_login(req, res, function (){
			res.locals.user = req.session.user;
			switch (req.session.user.catalog){
				case '前台':
					res.render('reception');
				break;
				case '教师':
					var teacher_query = 'select lession_time, semester, grade, lession_section from teachers_list where teacher = ?';
					var user_params = [req.session.user.staff_name];
					connection.query(teacher_query, user_params, function (err, lessions_row, field){
						res.locals.teacher_lessions = lessions_row;
						res.render('teacher');
					});
				break;
			}
		}, function (){
			res.redirect('/login');
		});
	})
	.post(function (req, res, nxt){
		var user_query = 'select * from staff_list where staff_name = ?';
		var user_params = [req.body.username];
		var pwd_query = 'select if(password(?) = (select password from staff_list where staff_name = ?), "true", "false") as judge';
		var pwd_params = [req.body.password, req.body.username]
		var teacher_query = 'select lession_time, semester, grade, lession_section from teachers_list where teacher = ?';

		connection.query(user_query, user_params, function (err, row, field){
			if (row.length != 0){
				connection.query(pwd_query, pwd_params, function (err, pwd_row, field){
					if (pwd_row[0].judge == 'true'){
						var user = {
							staff_id: row[0].id,
							staff_name: row[0].staff_name,
							catalog: row[0].catalog
						}
						req.session.user = user;
						res.locals.user = req.session.user;
						switch (row[0].catalog){
							case '前台':
								res.render('reception');
							break;
							case '教师':
								connection.query(teacher_query, user_params, function (err, lessions_row, field){
									res.locals.teacher_lessions = lessions_row;
									res.render('teacher');
								});
							break;
						}
					}else{
						req.session.error_hint = true;
						req.session.login_error = 'pwd_error';
						res.redirect('/login');
					}
				});
			}else{
				req.session.error_hint = true;
				req.session.login_error = 'no_user';
				res.redirect('/login');
			}
		});
	})

router.route('/login')
	.get(function (req, res, nxt){
		back_login.return_back_into_login(req, res, function (){
			res.locals.user = req.session.user;
			res.redirect('/');
		}, function (){
			if (req.session.error_hint) {
				res.locals.error_hint = req.session.error_hint;
				res.locals.login_error = req.session.login_error;
				delete req.session.error_hint;
				delete req.session.login_error;
			}
			res.render('login_page');
		});
	});

router.route('/logout')
	.post(function (req, res, nxt){
		back_login.return_back_into_login(req, res, function (){
			user = req.session.user;
			delete req.session.user;
			res.send(user);
		}, function (){
			res.send({msg:'redirect'});
		});
	});

router.route('/static')
	.get(function (req, res, nxt){
		res.locals.user = req.session.user;
		res.render('static');
	});

router.route('/search_student')
	.post(function (req, res, nxt){
		back_login.return_back_into_login(req, res, function (){
			var search_student_query = 'Select name, school, grade, telephone, date_format(register_date, "%Y-%m-%d") as register_date, ' +
									'introducer, receptionist, comments, subject, teacher, lession_time, semester, campus, lession_section ' +
									'From students_list Where name = ?';
			var search_student_params = [req.body.student_name];
			connection.query(search_student_query, search_student_params, function (err, rows, field){
				if (err){
					console.log('[Select Error] - ',err.message);
					res.sendStatus(500);
				}
				if (rows.length == 0){
					res.sendStatus(403);
				}else{
					res.locals.student_list = rows;
					res.render('students_table');
				}
			});
		}, function (){
			res.send({msg:'redirect'});
		});
	});

router.route('/search_teacher')
	.post(function (req, res, nxt){
		back_login.return_back_into_login(req, res, function (){
			var search_teacher_query = 'Select * from teachers_list Where teacher = ?';
			var search_teacher_params = [req.body.teacher];
			connection.query(search_teacher_query, search_teacher_params, function (err, rows, field){
				if (err){
					console.log('[Select Error] - ',err.message);
					res.sendStatus(500);
				}
				if (rows.length == 0){
					res.sendStatus(403);
				}else{
					res.locals.teachers_list = rows;
					res.render('teachers_table');
				}
			});
		}, function (){
			res.send({msg:'redirect'});
		});
	});

router.route('/search_select')
	.post(function (req, res, nxt){
		back_login.return_back_into_login(req, res, function (){
			var search_teacher_query = 'Select * from teachers_list Where subject = ? and grade = ? ';
			var search_teacher_params = [req.body.subject, req.body.grade];
			connection.query(search_teacher_query, search_teacher_params, function (err, rows, field){
				if (err){
					console.log('[Select Error] - ',err.message);
					res.sendStatus(500);
				}
				if (rows.length == 0){
					res.sendStatus(403);
				}else{
					res.locals.teachers_list = rows;
					res.render('teachers_table');
				}
			});
		}, function (){
			res.send({msg:'redirect'});
		});
	});

router.route('/search_add_info')
	.post(function (req, res, nxt){
		var search_add_teacher_query = 'Select * from teachers_list Where subject = ? and campus = ? and semester = ? and grade = ?';
		var search_add_teacher_params = [req.body.subject, req.body.campus, req.body.semester, req.body.grade];
		connection.query(search_add_teacher_query, search_add_teacher_params, function (err, rows, field){
			if (err){
				console.log('[Select Error] - ',err.message);
				res.sendStatus(500);
			}
			res.send(rows);
		});
	});

router.route('/subject_submit')
	.post(function (req, res, nxt){
		back_login.return_back_into_login(req, res, function (){
			var raw_data = JSON.parse(req.body.data);
			for (var i = 0; i < raw_data.subjects.length; i++){
				var subject_query = 'Insert Into students_list(name, school, grade, telephone, register_date, introducer, receptionist, ' +
									'comments, subject, teacher, lession_time, semester, campus, lession_section) values (?,?,?,?,date(now()),?,?,?,?,?,?,?,?,?)';
				var subject_params = [
									raw_data.student_name, raw_data.school, raw_data.grade, raw_data.telephone, raw_data.introducer, 
									raw_data.receptionist, raw_data.comments, raw_data.subjects[i].subject_name, 
									raw_data.subjects[i].teacher_name, raw_data.subjects[i].lession_time, raw_data.subjects[i].semester, 
									raw_data.subjects[i].campus, raw_data.subjects[i].lession_section
									];
				connection.query(subject_query, subject_params, function (err, result){
					if(err){
			     		console.log('[INSERT ERROR] - ',err.message);
			     		return;
			    	}
				});
			}
			res.send(raw_data);		
		}, function (){
			res.send({msg:'redirect'});
		});
	});

router.route('/teacher_lessions')
	.post(function (req, res, nxt){
		back_login.return_back_into_login(req, res, function (){
			var teacher_lessions_query = 'select name, school, telephone, date_format(register_date, "%Y-%m-%d") as register_date, introducer, receptionist from students_list where '+
										'semester = ? and lession_section = ? and grade = ? and lession_time = ? and teacher = ?';
			var teacher_lessions_params = [req.body.semester, req.body.lession_section, req.body.grade, req.body.lession_time, req.session.user.staff_name];
			connection.query(teacher_lessions_query, teacher_lessions_params, function (err, rows, field){
				if (err){
					console.log('[Select Error] - ',err.message);
					res.sendStatus(500);
				}
				if (rows.length == 0){
					res.sendStatus(403);
				}else{
					res.locals.teacher_lession_list = rows;
					res.render('teacher_display');
				}
			});
		}, function (){
			res.send({msg:'redirect'});
		});
	});

module.exports = router;
