//获取文章分类数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (response) {
        // console.log(response);
        var html = template('categoryTpl', { data: response })
        $('#category').html(html);
    }
})

//当管理员选择文件时
$('#feature').on('change', function () {
    var file = this.files[0];  //获取到管理员选择到的文件
    //创建formData对象 实现二进制文件上传
    var formData = new FormData();
    //将管理员选择到的文件追加到formData对象中
    formData.append('cover', file);
    //实现文章封面图片上传
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        //告诉$.ajax方法不要处理data属性对应的参数值
        processData: false,
        //告诉#.ajax方法不要设置参数类型
        contentType: false,
        success: function (response) {
            $('#thumbnail').val(response[0].cover)

        }
    })
})

//当添加文章表单提交的时候
$('#addForm').on('submit', function () {
    //获取管理员在表单中输入的内容
    var formData = $(this).serialize();
    // console.log(formData);


    //向服务器端发送请求 实现添加文章功能
    $.ajax({
        type: 'post',
        url: '/posts',
        data: formData,
        success: function () {
            location.href = '/admin/posts.html'


        }
    })

    //阻止表单默认提交行为
    return false;
});

//获取浏览器地址栏中的id参数
var id = getUrlParams('id');
//说明当前管理员在做文章修改操作 从地址栏中传递了id参数
if (id != -1) {
    //根据id获取文章的详细信息
    $.ajax({
        type: 'get',
        url: '/posts/' + id,
        success: function (response) {
            console.log(response.category);
            
            //获取文章分类数据
            $.ajax({
                type: 'get',
                url: '/categories',
                success: function (categories) {
                    console.log(categories);
                    
                    response.categories = categories;
                    console.log(response);
                    
                    var html = template('modifyTpl', response);
                    console.log(html);
                    
                    $('#modifyBox').html(html)
                }
            })


        }
    })
}

//从浏览器的地址栏中获取参数
function getUrlParams(name) {
    // console.log(location.search);   //地址栏中?及?后面的内容
    var paramsAry = location.search.substr(1).split('&');   //保留?后面的字符串内容 并以&分割转换为数组
    for (var i = 0; i < paramsAry.length; i++) {
        var tmp = paramsAry[i].split('=');
        if (tmp[0] == name) {
            return tmp[1];
        }

    }
    //如果想要获取的参数在地址栏中找不到则返回-1
    return -1
}

//当修改文章信息表单发生提交行为的时候
$('#modifyBox').on('submit', '#modifyForm', function () {
    //获取管理员在表单中输入的内容
    var formData = $(this).serialize();
    var id = $(this).attr('data-id')
    $.ajax({
        type: 'put',
        url: '/posts/' + id,
        data: formData,
        success: function () {
            //跳转到文章列表页面
            location.href = '/admin/posts.html'
        }
    })
    //阻止表单默认提交行为
    return false;
})