var manager,mdialog,mdialog2,myform,myform2 ;	
var accountName;
var errLab1,errLab2;
function f_initGrid() {
	manager = $("#maingrid").ligerGrid(
			{
				title : '管理账号列表',
				columns : [
				           {
				        	   width:"20%",
				        	   display : '账户ID',
				        	   name : 'userid',
				        	   type : 'int',
				        	   isSort : false
				           },
				           {
				        	   width:"40%",
				        	   display : '账号名称',
				        	   name : 'username',
				        	   type : 'text',
				        	   isSort : false
				           },
				           {
				        	   width:"20%",
				        	   display : '修改密码',
				        	   isSort : false,
				        	   render : function(rowdata, rowindex, value) {
				        		   var h = "<a href='javascript:popPswForm(" + rowindex + ")'>修改密码</a>";
				        		   return h;
				        	   } 

				           },
				           {
				        	   width:"20%",
				        	   display : '删除账号',
				        	   isSort : false,
				        	   render : function(rowdata, rowindex, value) {
				        		   var h = "";
				        		   h += "<a href='javascript:popDelAccount(" + rowindex + ")'>删除账号</a>";
				        		   return h;
				        	   }
				           }
				           ],
				           onSelectRow : function(rowdata, rowindex) {
				        	   $("#txtrowindex").val(rowindex);
				           },
				           url : "admin/gets",
				           method : "GET",
				           enabledEdit : false,
				           clickToEdit : false,
				           isScroll : false,
				           rownumbers : false,
				           width: "99%",
				           height: 'auto', 
				           resizable:false,
				           checkbox : false,
				           hideLoadButton:true,
				           frozen: false,
				           rowHeight: 25,                        
				           headerRowHeight: 25,
				           pageSize: 20
			});


	//修改密码弹出框
	mdialog = $.ligerDialog.open({
		target: $("#editpasswordform"),
		width : 500,
		modal : true,
		title : "修改密码",
		buttons : [ {
			text : '确认修改',
			onclick : function(item, dialog) {
				subPsw();		
			}
		} ],
		hidden : function()
		{
			clearErr();	
		}
	});
	mdialog.hidden();

	//设置密码框模式
	$("#password").attr("Type","password");
	$("#rpassword").attr("Type","password");

	$.metadata.setType("attr", "validate");
	$("#form1").ligerForm();
	$("#form1").validate({
		errorPlacement : function(lable, element) {
			lable.ligerHideTip();
			lable.remove();
			element.ligerTip({
				content : lable.html(),
				appendIdTo : lable
			});
		},
		success : function(lable) {
			lable.ligerHideTip();
			lable.remove();
		}
	});

	//新增用户弹出框
	mdialog2 = $.ligerDialog.open({
		target: $("#addAccountForm"),
		width : 500,
		modal : true,
		title : "新增账号",
		buttons : [ {
			text : '确认添加',
			onclick : function(item, dialog) {
				subAddAccount();
			}
		} ]
	});
	mdialog2.hidden();


	$("#password2").attr("Type","password");
	$("#rpassword2").attr("Type","password");
	$("#form2").ligerForm();
	$("#form2").validate({
		errorPlacement : function(lable2, element2) {
			lable2.ligerHideTip();
			lable2.remove();
			element2.ligerTip({
				content : lable2.html(),
				appendIdTo : lable2
			});
		},
		success : function(lable2) {
			lable2.ligerHideTip();
			lable2.remove();
		}
	});

	//修复关闭弹出框时，验证错误的tip无法关闭的问题;
	$(".l-dialog-close").click(clearErr);
	myform=liger.get("form1");
	myform2=liger.get("form2");
}




function clearErr()
{
	//先提交虚拟数据模拟通过验证，然后在重置数据
	$("#username").val("xxxxxx");
	$("#password").val("xxxxxx");
	$("#rpassword").val("xxxxxx");
	$("#username2").val("xxxxxx");
	$("#password2").val("xxxxxx");
	$("#rpassword2").val("xxxxxx");
	$("#form1").valid();
	$("#form2").valid();
	$("#password").val("");
	$("#rpassword").val("");
	$("#username2").val("");
	$("#password2").val("");
	$("#rpassword2").val("");

}

//提交添加账号本地验证
function subAddAccount()
{
	if ($("#form2").valid()) {
		var data = myform2.getData();
		addAccount(data);
		mdialog2.hidden();
	}
}

//提交密码更新进行本地验证
function subPsw() {
	if ($("#form1").valid()) {
		var data = myform.getData();
		console.info(data);
		updatePsw(data);
		mdialog.hidden();
	}
}

//提交服务器创建账号
function addAccount(formdata)
{
	lsAjaxPost2("admin/add"
			,"application/json"
			,JSON.stringify(formdata)
			,"添加账号");
}

//提交服务器更新密码
function updatePsw(formdata)
{
	console.info("updatepsw the data {}",formdata);
	lsAjaxPost2("admin/update"
			,"application/json"
			,JSON.stringify(formdata)
			,"修改密码");
}
//提交账号删除请求
function delAccountData(data) {

	lsAjaxPost2("admin/del"
			,"application/json"
			,JSON.stringify(data)
			,"删除账号");
}
//弹出新增账号表单
function popAccountForm() {
	mdialog2.show();
}
//弹出密码修改表单
function popPswForm(rowid) {
	mdialog.show();
	accountName = manager.getData()[rowid].username;
	userid = manager.getData()[rowid].userid;
	$("#_username").text(accountName);
	$("#username").val(accountName);
	$("#userid").val(userid);
}
//弹出删除对话框
function popDelAccount(rowid) {
	$.ligerDialog.confirm('确认删除?', function(sub) {
		if (sub) {
			var data = manager.getData()[rowid];
			delAccountData(data);
		}
	});
}
function lsAjaxPost2(postUrl,contentType,data,tip) {
	$.ajax({
		//提交数据的类型 POST GET
		type : "POST",
		//提交的网址
		contentType : contentType,
		url : postUrl,
		//提交的数据
		data : data,
		//返回数据的格式
		datatype : "text",//"xml", "html", "script", "json", "jsonp", "text".
		//成功返回之后调用的函数             
		success : function(results) {
			if (results.msg == "SUCCESS") {
				$.ligerDialog.waitting(tip+'成功');
				setTimeout(function() {
					$.ligerDialog.closeWaitting();
				}, 1000);

			} else {
				$.ligerDialog.waitting(tip+'失败:' + results.msg);
				setTimeout(function() {
					$.ligerDialog.closeWaitting();
				}, 1000);
			}
			manager.loadData();
		},
		//调用出错执行的函数
		error : function() {
			$.ligerDialog.waitting(tip+'失败:网络请求错误!');
			setTimeout(function() {
				$.ligerDialog.closeWaitting();
			}, 1000);
			manager.loadData();
		}
	});
}