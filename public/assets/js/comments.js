//向服务器端发送请求 获取评论列表数据
$.ajax({
    type: 'get',
    url: '/comments',
    success: function (response) {
        console.log(response);
        var html = template('commentsTpl', response);
        console.log(html);
        $('#commentsBox').html(html)
        var page = template('pageTpl', response);
        console.log(page);
        $('#pageBox').html(page)
    }
})

//分页函数
function changePage(page) {
    //向服务器端发送请求 获取评论列表数据
    $.ajax({
        type: 'get',
        url: '/comments',
        data: page,
        success: function (response) {
            console.log(response);
            var html = template('commentsTpl', response);
            console.log(html);
            $('#commentsBox').html(html)
            var page = template('pageTpl', response);
            console.log(page);
            $('#pageBox').html(page)
        }
    })
}

//当批准或驳回按钮被点击时
$('#commentsBox').on('click', '.status', function () {
    //获取当前评论的状态
    var status = $(this).attr('data-status');
    //获取当前要修改的评论id
    var id = $(this).attr('data-id');
    //向服务器端发送请求 更改评论状态
    $.ajax({
        type: 'put',
        url: '/comments/' + id,
        data: {
            state: status == 0 ? 1 : 0
        },
        success: function () {
            location.reload()
        }
    })
})

//当删除按钮被点击时
$('#commentsBox').on('click', '.delete', function () {
    if (confirm('您确认要删除评论吗?')) {
        //获取将要删除评论的id
        var id = $(this).attr('data-id');
        //相服务器端发送请求 执行删除操作
        $.ajax({
            type: 'delete',
            url: '/comments/' + id,
            success: function () {
                location.reload()
            }
        })
    }
})