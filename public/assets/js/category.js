//当添加分类表单提交时触发
$('#addCategory').on('submit', function () {
    //获取用户在表单输入的内容
    var formData = $(this).serialize();
    //发服务器端发送请求 添加分类
    $.ajax({
        type: 'post',
        url: '/categories',
        data: formData,
        success: function () {
            //刷新页面
            location.reload();
        }
    })
    //阻止表单默认提交行为
    return false;
})

//发送ajax请求 向服务器端获取所有分类列表数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (response) {
        //将服务器端返回的数据和html模板进行拼接
        var html = template('categoriesTpl', { data: response });
        $('#categoriesBox').html(html);
    }
})

//向分类列表中点击编辑按钮时
$('#categoriesBox').on('click', '.btn-info', function () {
    //获取要修改的分类数据的id
    var id = $(this).attr('data-id');
    //根据id获取分类详细信息
    $.ajax({
        type: 'get',
        url: '/categories/' + id,
        success: function (response) {
            //将服务器端返回的根据id查询的用户数据和html模板进行拼接
            var html = template('modifyTpl', response);
            $('#formBox').html(html);
        }
    })
})

//当修改分类数据表单发生提交行为的时候
$('#formBox').on('submit', '#modifyCategory', function () {
    //获取管理员在表单中输入的内容
    var formData = $(this).serialize();
    //获取要修改的分类id
    var id = $(this).attr('data-id')
    $.ajax({
        type: 'put',
        url: '/categories/' + id,
        data: formData,
        success: function () {
            location.reload()
        }
    })
    //阻止表单的提交行为
    return false;
})

//管理员点击删除按钮时
$('#categoriesBox').on('click', '.delete', function () {
    if (confirm('您真的要执行删除操作吗?')) {
        //获取要删除的分类数据id
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: '/categories/' + id,
            success: function () {
                location.reload();
            }
        })
    }
})


