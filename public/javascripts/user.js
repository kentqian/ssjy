$(document).ready(function () {
	$('#update_p').click(function (){
		if ($('#confirm_p').val() == '' || $('#new_p').val() == ''){
			alert('密码不能为空！');
			return;
		}
		if ($('#confirm_p').val() != $('#new_p').val()){
			alert('两次密码不统一！');
			location.reload();
			return;
		}
		$.ajax({
			url: '/users/pwd_modify',
        	type: 'post',
        	data: {
        		old_pwd: $('#old_p').val(),
        		new_pwd: $('#new_p').val()
        	},
        	success: function (data){
        		if (data.msg == '与旧密码一致'){
        			alert(data.msg);
        			location.reload();
        			return;
        		}
                        if (data.msg == 'redirect'){
                                location.href = '../login';
                                return;
                        }
                	alert('修改成功！');              
                        location.href = '/';
        	},
        	error: function (data){
        		alert('密码有误！');
        		location.reload();
        	}
		});
	});
});