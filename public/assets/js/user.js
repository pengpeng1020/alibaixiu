// 当表单发生提交行为的时候
$('#userForm').on('submit', function () {
	// 获取到用户在表单中输入的内容并将内容格式化成参数字符串
	var formData = $(this).serialize();
	console.log(formData);
	
	// 向服务器端发送添加用户的请求
	$.ajax({
		type: 'post',
		url: '/users',
		data: formData,
		success: function () {
			// 刷新页面
			location.reload();
		},
		error: function () {
			console.log('添加用户失败');

		}
	})
	// 阻止表单的默认提交行为
	return false;
});

//当用户选择文件的时候 采用事件委托 将onchange事件防止在父元素#modifyBox中 这样不管是修改文章还是上传文件都可触发
$('#modifyBox').on('change', '#avatar', function () {
	//this.files[0]  用户选择到的文件
	var formData = new FormData();
	formData.append('avatar', this.files[0]);

	$.ajax({
		type: 'post',
		url: '/upload',
		data: formData,
		//告诉$.ajax方法不要解析请求参数
		processData: false,
		//告诉$.ajax方法不要设置请求参数的类型
		contentType: false,
		success: function (response) {
			//头像预览功能
			$('#preview').attr('src', response[0].avatar);
			$('#hiddenAvatar').val(response[0].avatar);
		}
	})
})

//向服务器端发送请求 索要用户数据
$.ajax({
	type: 'get',
	url: '/users',
	success: function (response) {
		//使用模板引擎将数据和html字符串进行拼接
		var html = template('userTpl', {
			data: response
		})
		$('#userBox').html(html); //将拼接好的字符串显示在页面中
	}
})

//通过事件委托的方式为编辑按钮添加点击事件
$('#userBox').on('click', '.edit', function () {
	//获取被点击用户的id值
	var id = $(this).attr('data-id');
	//根据id获取用户的详细信息
	$.ajax({
		type: 'get',
		url: '/users/' + id,
		success: function (response) {
			var html = template('modifyTpl', response);
			$('#modifyBox').html(html)
		}
	})
})

// 为修改表单添加表单提交事件
$('#modifyBox').on('submit', '#modifyForm', function () {
	

	// 获取到用户在表单中输入的内容并将内容格式化成参数字符串
	var formData = $(this).serialize();
	//获取要修改的那个用户的id
	var id = $(this).attr('data-id')
	//发送请求 修改用户信息
	$.ajax({
		type: 'put',
		url: '/users/' + id,
		data: formData,
		success: function (response) {
			location.reload();  //重新刷新页面 用户列表重新获取
		}
	})
	//阻止表单默认提交
	return false;
})

//当删除按钮被点击时
$('#userBox').on('click', '.delete', function () {
	//如果管理员确认要删除用户 
	if (confirm('您真的要删除用户吗')) {
		//获取即将要删除的用户id
		var id = $(this).attr('data-id');
		//向服务器端发送请求 删除用户
		$.ajax({
			type: 'delete',
			url: '/users/' + id,
			success: function () {
				location.reload()
			}
		})
	}
})

//获取全选按钮
var selectAll = $('#selectAll');
//获取批量删除按钮
var deleteMany = $('#deleteMany');
//当全选按钮状态发生改变时
selectAll.on('change', function () {
	//获取到当前全选按钮的状态
	var status = $(this).prop('checked');

	if (status) {
		//显示批量删除按钮
		deleteMany.show();
	} else {
		//隐藏批量删除按钮
		deleteMany.hide()
	}
	//获取到所有的用户 并将用户的状态和全选按钮保持一致
	$('#userBox').find('input').prop('checked', status);
});

//当用户前面的复选框状态发生改变时
$('#userBox').on('change', '.userStatus', function () {
	//获取所有用户 在所有用户中过滤出被选中的用户
	//判断选中用户的数量和所有用葫芦数量是否一致
	//如果一致 就说明所有的用户都是被选中的
	// 否则 就是有用户没被选中
	var inputs = $('#userBox').find('input');

	if (inputs.length == inputs.filter(':checked').length) {
		// alert('所有用户都被选中')
		selectAll.prop('checked', true);
	} else {
		// alert('不是所有用户都被选中') 
		selectAll.prop('checked', false);
			
	}

	//如果选中的复选框的数量大于0 就显示批量删除按钮
	if (inputs.filter(':checked').length > 0) {
		deleteMany.show()
	} else {
		deleteMany.hide()
	}
})

//为批量删除按钮添加点击事件
deleteMany.on('click', function () {
	var ids = [];
	//获取选中的用户
	var checkedUser = $('#userBox').find('input').filter(':checked');
	//循环复选框 从复选框身上获取当前用户id
	checkedUser.each(function (index, element) {
		ids.push($(element).attr('data-id'));

	})
	if (confirm('您真的要进行批量删除操作吗?')) {
		$.ajax({
			type: 'delete',
			url: '/users/' + ids.join('-'),
			success: function () {
				location.reload()
			}
		})
	}
	
})

