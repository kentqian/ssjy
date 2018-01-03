exports.return_back_into_login = function (req, res, has_session,no_session){
	if (req.session.user){
		has_session();
	}else{
		no_session();
	}
};