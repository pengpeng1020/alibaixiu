//从地址栏中获取文章id
var postId = getUrlParams('id');

//评论是否经过人工审核
var review;
//向服务器端发送请求 根据文章id获取文章详细信息
$.ajax({
    type: 'get',
    url: '/posts/' + postId,
    success: function (response) {
        console.log(response);
        var html = template('postTpl', response);
        $('#postBox').html(html)
        
    }
})

$('.article').on('click', '#like', function () {
    //向服务器端发送请求 执行点赞操作
    $.ajax({
        type: 'post',
        url: '/posts/fabulous/' + postId,
        success: function () {
            alert('点赞成功')
        }
    })
})

//获取网站的配置信息
$.ajax({
    type: 'get',
    url: '/settings',
    success: function (response) {
        //对全局变量review是否需要人工审核进行赋值 这样可以再其他作用域中拿到review的值
        review = response.review;
        console.log(response);
        //判断管理员是否开启了评论功能
        if (response.comment) {
            //管理员开启了评论功能 渲染评论模板
            var html = template('commentTpl');
            $('#comment').html(html)
        }
    }
})

//当评论表单发送提交行为时
$('#comment').on('submit', 'form', function () {
    //获取用户输入的评论内容
    var content = $(this).find('textarea').val();
    
    if (review) {
        //需要经过人工审核 (未批准)
        state = 0;
    } else {
        //不需要经过人工审核 (已批准)
        state = 1;
    }
    //向服务器端发送请求 执行添加评论操作
    $.ajax({
        type: 'post',
        url: '/comments',
        data: {
            content: content,
            post: postId,
            state: state
        },
        success: function () {
            alert('评论成功')
            location.reload();
        },
        error: function () {
            alert('评论失败')
        }

    })
    //阻止表单默认提交行为
    return false;
})