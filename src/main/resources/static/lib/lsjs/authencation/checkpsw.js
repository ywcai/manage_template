var manager, g;	

function f_init() {
	
//anything?
//	$("#loginBtn").click(function(){
//		checkPsw(null);
//		}
//	)
};



function checkPsw(formData)
{
	lsAjaxPost("/check",
			"application/json",
			JSON.stringify(formData),
	"用户登录");
}
function lsAjaxPost(postUrl,contentType,data,tip) {
	$.ajax({
		//提交数据的类型 POST GET
		type : "GET",
		//提交的网址
		contentType : contentType,
		url : postUrl,
		//提交的数据
		data : data,
		//返回数据的格式
		datatype : "text",//"xml", "html", "script", "json", "jsonp", "text".
		//成功返回之后调用的函数             
		success : function(result) {
			alert(tip+'成功!');
//			manager.loadData();
		},
		//调用出错执行的函数
		error : function() {
			alert(tip+'失败:网络请求错误!');
	 
		}
	});
}