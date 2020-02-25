//向服务器端发送请求 索要轮播图数据
$.ajax({
    type: 'get',
    url: '/slides',
    success: function (response) {
        var html = template('slidesTpl', { data: response });
        $('#slideBox').html(html);

        //因为$.ajax()是异步请求 当请求完成时 原先的轮播图效果js代码已经执行完毕 因此应将该js放在success内的最后面
        var swiper = Swipe(document.querySelector('.swipe'), {
            auto: 3000,
            transitionEnd: function (index) {
                // index++;

                $('.cursor span').eq(index).addClass('active').siblings('.active').removeClass('active');
            }
        });

        // 上/下一张
        $('.swipe .arrow').on('click', function () {
            var _this = $(this);

            if (_this.is('.prev')) {
                swiper.prev();
            } else if (_this.is('.next')) {
                swiper.next();
            }
        })
    }
})

//向服务器端发送请求 索取最新发布数据
$.ajax({
    type: 'get',
    url: '/posts/lasted',
    success: function (response) {
        // console.log(response);
        var html = template('lastedTpl', { data: response });
        $('#lastedBox').html(html)
    }
})