function add_lession_empty(item){
    var num = Number(item.split('_')[2]);
    if (item == 'grade'){
        $('.add_info').empty();
        return;
    }
    console.log(num);
    $('#add_info_' + num).empty();
    
}

function search_add_info(item) {
    var num = Number(item.split('_')[3]);
    $.ajax({
        url: '/search_add_info',
        type: 'post',
        data: {
            grade: $('#grade').val(),
            subject: $('#add_subject_' + num).val(),
            semester: $('#add_semester_' + num).val(),
            campus: $('#add_campus_' + num).val()
            },
        success: function (data){
            $('#add_info_' + num).empty();
            data.forEach(function (val, index){
                $('#add_info_' + num).append('<option>'+ val.teacher + ' ' + val.lession_section + ' ' + val.lession_time + '</option>');
            });
        }
    });
}

function keyPress() {    
    var keyCode = event.keyCode;
    if ((keyCode >= 48 && keyCode <= 57)){    
        event.returnValue = true;    
    }else{    
        event.returnValue = false;    
    }
} 

function add_div() {
    var last_child_num = $('#add_subject_info').children().length + 1;
    $('#add_subject_info').append($('#add_subject_info div.panel:last-child').clone());
    $('#add_subject_info .panel:last-child').attr('id','panel_' + last_child_num);
    $('#add_subject_info .panel:last-child .panel_close').attr('id','panel_close_' + last_child_num);
    $('#panel_close_' + last_child_num).attr('onclick','remove_div(this.id)');
    $('#add_subject_info .panel:last-child .add_subject').attr('id','add_subject_' + last_child_num);
    $('#add_subject_info .panel:last-child .add_semester').attr('id','add_semester_' + last_child_num);
    $('#add_subject_info .panel:last-child .add_campus').attr('id','add_campus_' + last_child_num);
    $('#add_subject_info .panel:last-child .add_info').attr('id','add_info_' + last_child_num);
    $('#add_subject_info .panel:last-child .add_info_btn').attr('id','add_info_btn_' + last_child_num);
    $('#add_info_' + last_child_num).empty();
    $('#num_subjects').text("已添加了"+ last_child_num +"门课");
 }

function remove_div(item){
    var num = Number(item.split('_')[2]);
    var removed_div_nxt = $('#' + item.replace('_close','')).nextAll();
    $('#' + item.replace('_close','')).remove();
    removed_div_nxt.each(function (index, element){
        $('#add_subject_info .panel:nth-child('+ (num + index) +')').attr('id','panel_' + (num + index));
        $('#add_subject_info .panel:nth-child('+ (num + index) +') .panel_close').attr('id','panel_close_' + (num + index));
        $('#add_subject_info .panel:nth-child('+ (num + index) +') .add_subject').attr('id','add_subject_' + (num + index));
        $('#add_subject_info .panel:nth-child('+ (num + index) +') .add_semester').attr('id','add_semester_' + (num + index));
        $('#add_subject_info .panel:nth-child('+ (num + index) +') .add_campus').attr('id','add_campus_' + (num + index));
        $('#add_subject_info .panel:nth-child('+ (num + index) +') .add_info').attr('id','add_info_' + (num + index));
        $('#add_subject_info .panel:nth-child('+ (num + index) +') .add_info_btn').attr('id','add_info_btn_' + (num + index));
    });
    $('#num_subjects').text("已添加了"+ $('#add_subject_info').children().length +"门课");
 }

function teacher_lessions(){
    var lessions_info_list = $('#teacher_lessions').val().split(' ');
    $.ajax({
        url: '/teacher_lessions',
        type: 'post',
        data: {
            semester: lessions_info_list[0],
            lession_section: lessions_info_list[1],
            grade: lessions_info_list[2],
            lession_time: lessions_info_list[3]
        },
        success: function (data){
            if (!data.msg){
                $('#teacher_display').html(data);
                var _width=$('#teacher_display').width();  
                $('#teacher_display th:first-child').width(_width*0.2);
                $('#teacher_display td:first-child').width(_width*0.2);
                $('#teacher_display th:nth-child(2)').width(_width*0.2);
                $('#teacher_display td:nth-child(2)').width(_width*0.2);
                $('#teacher_display th:nth-child(3)').width(_width*0.2);
                $('#teacher_display td:nth-child(3)').width(_width*0.2);
                $('#teacher_display th:nth-child(4)').width(_width*0.2);
                $('#teacher_display td:nth-child(4)').width(_width*0.2);
                $('#teacher_display th:nth-child(5)').width(_width*0.2);
                $('#teacher_display td:nth-child(5)').width(_width*0.2);
            }else{
                alert("登陆超时，请重新登陆！");
                location.href='./login';
            }
        },
        error: function (data){
            $('#teacher_display').html('<h4>未有相关记录！</h4>');
        }
    });
}

function logout(){
    $.ajax({
        url: '/logout',
        type: 'post',
        success: function (data) {
            if (!data.msg){
                alert(data.staff_name + '，您已登出。');
            }
            location.href = './login';
        }
    });
}