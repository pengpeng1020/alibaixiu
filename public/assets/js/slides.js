//当管理员选择文件的时候
$('#file').on('change', function () {
    //用户选择到的文件
    var file = this.files[0];
    var formData = new FormData();
    //将管理员选择到的文件添加到formData中
    formData.append('image', file);
    //向服务器端发送请求 实现图片上传
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,  //不要处理formData参数值
        contentType: false,  //在内部不要设置contentType属性的值
        success: function (response) {
            console.log(response[0].image);
            $('#image').val(response[0].image)

        }
    })
})

//当轮播图表单发送提交行为是
$('#slidesForm').on('submit', function () {
    //获取管理员在表单中输入的内容
    var formData = $(this).serialize();
    //向服务器端发送请求 添加轮播图数据
    $.ajax({
        type: 'post',
        url: '/slides',
        data: formData,
        success: function () {
            location.reload();
        }
    })
    //阻止表单提交行为
    return false;
})

//向服务器端发送请求 索要图片轮播列表数据
$.ajax({
    type: 'get',
    url: '/slides',
    success: function (response) {
        var html = template('slidesTpl', { data: response });
        $('#slidesBox').html(html);
    }
})

//当管理员点击删除按钮时
$('#slidesBox').on('click', '.delete', function () {
    if (confirm('您确认要删除该轮播图吗?')) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: '/slides/' + id,
            success: function () {
                location.reload();
            }
        })
    }
})