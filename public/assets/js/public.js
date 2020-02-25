//数据展示页面的公共js文件
//处理日期时间格式
function formateDate(date) {
    //将日期时间字符转换为日期对象
    date = new Date(date)
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}


//向服务器端发送请求 索要随机推荐数据
$.ajax({
    type: 'get',
    url: '/posts/random',
    success: function (response) {
        // console.log(response);
        var randomTpl = `
        {{each data}}
        <li>
            <a href="detail.html?id={{$value._id}}">
              <p class="title">{{$value.title}}</p>
              <p class="reading">阅读({{$value.meta.views}})</p>
              <div class="pic">
                <img src="{{$value.thumbnail}}" alt="">
              </div>
            </a>
          </li>
          {{/each}}
        `;
        var html = template.render(randomTpl, { data: response });
        $('#randomBox').html(html)

    }
});

//向服务器端发送请求 索要最新评论数据
$.ajax({
    type: 'get',
    url: '/comments/lasted',
    success: function (response) {
        var commentTpl = `
        {{each data}}
        <li>
            <a href="javascript:;">
              <div class="avatar">
                <img src="{{$value.author.avatar}}" alt="">
              </div>
              <div class="txt">
                <p>
                  <span>鲜活</span>{{$imports.formateDate($value.createAt)}}说:
                </p>
                <p>{{$value.content}}</p>
              </div>
            </a>
          </li>
          {{/each}}
        `;
        var html = template.render(commentTpl, { data: response });
        // console.log(html);
        $('#commentBox').html(html)
    }
})

//向服务器端发送请求 索要分类列表数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (response) {
        var navTpl = `
        {{each data}}
        <li><a href="list.html?categoryId={{$value._id}}"><i class="fa {{$value.className}}"></i>{{$value.title}}</a></li>
        {{/each}}
        `;
        var html = template.render(navTpl, { data: response });
        $('#navBox').html(html)
        $('#topNavBox').html(html)
    }
})

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

//获取到搜索表单
$('.search form').on('submit', function () {
  //获取到用户在表单中输入的搜索关键字
  var keys = $(this).find('.keys').val();
  //跳转到搜索结果页面 并且将用户输入的搜索关键字传递到搜索结果页面
  location.href = '/search.html?key=' + keys;

  //阻止表单默认提交行为
  return false;
})