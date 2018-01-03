$(document).ready(function () {
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
        success: function (html){
            $('#teacher_display').html(html);
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
        },
        error: function (data){
            $('#teacher_display').html('<h4>未有相关记录！</h4>');
        }
    });
});