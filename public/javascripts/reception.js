$(document).ready(function () {
    
    $('#search_student_btn').click(function (){
        $.ajax({
            url: '/search_student',
            type: 'post',
            data: {student_name: $('#search_student').val()},
            success: function (data) {
                if(!data.msg){
                    $('#search_table').html(data);
                    var _width=$('#search_table').width();  
                    $('#search_table th:first-child').width(_width*0.07);
                    $('#search_table td:first-child').width(_width*0.07);
                    $('#search_table th:nth-child(2)').width(_width*0.13);
                    $('#search_table td:nth-child(2)').width(_width*0.13);
                    $('#search_table th:nth-child(3)').width(_width*0.1);
                    $('#search_table td:nth-child(3)').width(_width*0.1);
                    $('#search_table th:nth-child(4)').width(_width*0.1);
                    $('#search_table td:nth-child(4)').width(_width*0.1);
                    $('#search_table th:nth-child(5)').width(_width*0.1);
                    $('#search_table td:nth-child(5)').width(_width*0.1);
                    $('#search_table th:nth-child(6)').width(_width*0.1);
                    $('#search_table td:nth-child(6)').width(_width*0.1);
                    $('#search_table td:nth-child(7)').width(_width*0.1);
                    $('#search_table th:nth-child(7)').width(_width*0.1);
                    $('#search_table td:nth-child(8)').width(_width*0.1);
                    $('#search_table th:nth-child(8)').width(_width*0.1);
                    $('#search_table td:nth-child(9)').width(_width*0.15);
                    $('#search_table th:nth-child(9)').width(_width*0.15);
                    $(".tooltips").tooltip({html : true });
                }else{
                    location.href='./login';
                }
            },
            error: function (data){
                $('#search_table').html('<h4>未有相关记录！</h4>');
            }
        });
    });

    $('#search_teacher_btn').click(function (){
        $.ajax({
            url: '/search_teacher',
            type: 'post',
            data: {teacher: $('#search_teacher').val()},
            success: function (data) {
                if(!data.msg){
                    $('#search_table').html(data);
                    var _width=$('#search_table').width();  
                    $('#search_table th:first-child').width(_width*0.1);
                    $('#search_table td:first-child').width(_width*0.1);
                    $('#search_table th:nth-child(2)').width(_width*0.1);
                    $('#search_table td:nth-child(2)').width(_width*0.1);
                    $('#search_table th:nth-child(3)').width(_width*0.2);
                    $('#search_table td:nth-child(3)').width(_width*0.2);
                    $('#search_table th:nth-child(4)').width(_width*0.2);
                    $('#search_table td:nth-child(4)').width(_width*0.2);
                    $('#search_table th:nth-child(5)').width(_width*0.1);
                    $('#search_table td:nth-child(5)').width(_width*0.1);
                    $('#search_table th:nth-child(6)').width(_width*0.2);
                    $('#search_table td:nth-child(6)').width(_width*0.2);
                    $(".tooltips").tooltip({html : true });
                }else{
                    location.href='./login';
                }
            },
            error: function (data){
                $('#search_table').html('<h4>未有相关记录！</h4>');
            }
        });
    });

    $('#search_select_btn').click(function (){
        $.ajax({
            url: '/search_select',
            type: 'post',
            data: {
                    subject: $('#search_subject').val(),
                    grade: $('#search_grade').val()
                },
            success: function (data) {
                if(!data.msg){
                    $('#search_table').html(data);
                    var _width=$('#search_table').width();  
                    $('#search_table th:first-child').width(_width*0.1);
                    $('#search_table td:first-child').width(_width*0.1);
                    $('#search_table th:nth-child(2)').width(_width*0.1);
                    $('#search_table td:nth-child(2)').width(_width*0.1);
                    $('#search_table th:nth-child(3)').width(_width*0.2);
                    $('#search_table td:nth-child(3)').width(_width*0.2);
                    $('#search_table th:nth-child(4)').width(_width*0.2);
                    $('#search_table td:nth-child(4)').width(_width*0.2);
                    $('#search_table th:nth-child(5)').width(_width*0.1);
                    $('#search_table td:nth-child(5)').width(_width*0.1);
                    $('#search_table th:nth-child(6)').width(_width*0.2);
                    $('#search_table td:nth-child(6)').width(_width*0.2);
                    $(".tooltips").tooltip({html : true });
                }else{
                    location.href='./login';
                }
            },
            error: function (data){
                $('#search_table').html('<h4>未有相关记录！</h4>');
            }
        });
    });

    $('#subject_submit').click(function (){
        if($('#student_name').val() == '' || $('#school').val() == '' || $('#telephone').val() == ''){
            alert('有必填项未填写正确！');
        }else{
            var data = {
                student_name: $('#student_name').val(),
                school: $('#school').val(),
                grade: $('#grade').val(),
                telephone: $('#telephone').val(),
                subjects: [],
                introducer: $('#introducer').val(),
                receptionist: $('#receptionist').val(),
                comments: $('#comments').val()
            }

            var num_children = $('#add_subject_info').children().length;
            for (var i = 1; i <= num_children; i++){
                if ($('#add_info_' + i).val() == null){
                    alert('课程不能为空！');
                    return;
                }
                var lession_info_list = $('#add_info_' + i).val().split(' ');
                var subject = {
                    subject_name: $('#add_subject_' + i).val(),
                    semester: $('#add_semester_' + i).val(),
                    campus: $('#add_campus_' + i).val(),
                    teacher_name: lession_info_list[0],
                    lession_section: lession_info_list[1],
                    lession_time: lession_info_list[2],
                };
                data.subjects.push(subject);
            }
            $.ajax({
                url: '/subject_submit',
                type: 'post',
                data: {data:JSON.stringify(data)},
                success: function (data){
                    if (!data.msg){
                        alert('报名成功！');
                        location.reload();
                        return;
                    }
                    alert('登陆超时，请重新登陆并填写！');
                    location.href='./login';
                },
                error: function (data){
                    alert('报名失败！');
                }
            });
        }
    });

});