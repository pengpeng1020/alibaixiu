//获取地址栏中的id参数
var categoryId = getUrlParams('categoryId');

//向服务器端发送请求 根据分类id获取文章列表
$.ajax({
    type: 'get',
    url: '/posts/category/' + categoryId,
    success: function (response) {
        console.log(response);
        var html = template('listTpl', { data: response });
        $('#listBox').html(html)
        
    }
})

//根据分类id获取分类信息
$.ajax({
    type: 'get',
    url: '/categories/' + categoryId,
    success: function (response) {
        console.log(response);
        $('#categoryTitle').html(response.title)
    }
})