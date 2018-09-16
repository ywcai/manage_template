var manager, g;	
var mdialog;
var userid;

function f_initGrid() {
	g = manager = $("#maingrid").ligerGrid(
			{
				title : '管理账号列表',
				columns : [
				           {
				        	   width:"10%",
				        	   display : '账户ID',
				        	   name : 'userid',
				        	   type : 'int',
				        	   isSort : false
				           },
				           {
				        	   width:"20%",
				        	   display : '账号名称',
				        	   name : 'username',
				        	   type : 'text',
				        	   isSort : false
				           },
				           {
				        	   width:"50%",
				        	   display : '权限列表',
				        	   name : 'roles',
				        	   type : 'text',
				        	   isSort : false
				           },
				           {
				        	   width:"20%",
				        	   display : '修改权限',
				        	   isSort : false,
				        	   render : function(rowdata, rowindex, value) {
				        		   var h = "<a href='javascript:setRoles(" + rowindex + ")'>修改</a>";
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
	mdialog = $.ligerDialog.open({
		target: $("#editform"),
		height : 400,
		width : 500,
		showMax : false,
		showToggle : false,
		show: false, 
		showMin : false,
		isResize : false,
		isHidden:true,
		modal : true,
		title : "修改权限",
		buttons : [ {
			text : '确认提交',
			onclick : function(item, dialog) {
				sub();		
				dialog.hidden();
			}
		} ]
	});
	$("#listbox1,#listbox2").ligerListBox({
		isShowCheckBox : false,
		isMultiSelect : false,
		height : 200
	});
	mdialog.hidden();
	var box1 = liger.get("listbox1"), box2 = liger.get("listbox2");
	var item=[{text:"xxx",id:"1"}];
	box1.setData(item);
	box2.setData(item);
	box2.removeItems(item);
	box1.removeItems(item);
}

//打开编辑权限窗口
function setRoles(rowid) {
	userid=g.getData()[rowid].userid;
	mdialog.show();
	loadEditForm(rowid);
}

//加载权限编辑窗口初始数据
function loadEditForm(rowid)
{
	var box1 = liger.get("listbox1"), box2 = liger.get("listbox2");
	var tempRoles=g.getData()[rowid].roles;
	//封装item
	var leftItems=[];
	var rightItems=[];
	var allRoles=[];
	$(authorDataList).each(function(xx, tt) {
		//保存存到左边数组缓存
		//保存存在右边数组缓存
		allRoles.push(tt);
	});

	console.info(authorDataList);
	$(tempRoles).each(function(ii, dd) {
		//保存存到左边数组缓存
		var item=new Object();
		item.id=ii+1;
		item.text=dd;
		leftItems.push(item);
		//保存存在右边数组缓存
		allRoles.splice($.inArray(dd,allRoles),1);
	});
	//组装到右边的item
	$(allRoles).each(function(ii, dd) {
		//保存存到右边数组缓存
		var item=[];
		item.id=ii+1;
		item.text=dd;
		rightItems.push(item);
	});
	box1.setData(leftItems);
	box2.setData(rightItems);
}
function sub() {
	var box1 = liger.get("listbox1");
	var object=new Object();
	object.userid=userid;
	object.roles=[];
	$(box1.data).each(function(ii, dd) {
		object.roles.push(dd.text);
	});
	console.info(object);
	lsAjaxPost2("role/update"
			,"application/json"
			,JSON.stringify(object)
			,"变更权限");
}

function toLeft()
{
	var box1 = liger.get("listbox1"), box2 = liger.get("listbox2");
	if(box1==null||box2==null)return;
	var selecteds = box2.getSelectedItems();
	if (selecteds==null) return;
	box2.removeItems(selecteds);
	box1.addItems(selecteds);
}
function toRight()
{
	var box1 = liger.get("listbox1"), box2 = liger.get("listbox2");
	if(box1==null||box2==null)return;
	var selecteds = box1.getSelectedItems();
	if (selecteds==null) return;
	box1.removeItems(selecteds);
	box2.addItems(selecteds);
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
				$.ligerDialog.waitting(tip+'失败:' +  results.msg);
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