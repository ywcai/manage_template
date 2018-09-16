var manager, g;	
var localData = [ {
	local : 1,
	text : '本地流量'
}, {
	local : 0,
	text : '全国流量'
} ];
var isOnline = [ {
	delflag : 1,
	text : '上架'
}, {
	delflag : 0,
	text : '下架'
} ];
function f_initGrid() {
	g = manager = $("#maingrid").ligerGrid(
			{
				//toolbar: {},
				title : '产品列表',
				columns : [
				           {
				        	   display : '产品ID',
				        	   name : 'productid',
				        	   type : 'int'
				           },
				           {
				        	   display : '产品名称',
				        	   name : 'des',
				        	   editor : {
				        		   type : 'text'
				        	   }
				           },
				           {
				        	   display : '充值编码',
				        	   name : 'packcode',
				        	   editor : {
				        		   type : 'int'
				        	   }
				           },
				           {
				        	   display : '原价(分) ',
				        	   name : 'price'
				           },
				           {
				        	   display : '折扣率(%)',
				        	   name : 'rate',
				        	   editor : {
				        		   type : 'int'
				        	   }
				           },
				           {
				        	   display : '使用范围',
				        	   name : 'local',
				        	   type : 'int',
				        	   editor : {
				        		   type : 'select',
				        		   data : localData,
				        		   valueField : 'local'
				        	   },
				        	   render : function(item) {
				        		   if (parseInt(item.local) == 1)
				        			   return '本地流量';
				        		   return '全国流量';
				        	   }
				           },
				           {
				        	   display : '运营商',
				        	   name : 'province',
				        	   editor : {
				        		   type : 'text'
				        	   }
				           },
				           {
				        	   display : '产品状态',
				        	   name : 'delflag',
				        	   type : 'int',
				        	   editor : {
				        		   type : 'select',
				        		   data : isOnline,
				        		   valueField : 'delflag'
				        	   },
				        	   render : function(item) {
				        		   if (parseInt(item.delflag) == 1)
				        			   return "<span style='color:green'>上架</span>";
				        		   return '下架';
				        	   }
				           },
				           {
				        	   display : '操作',
				        	   isSort : false,
				        	   render : function(rowdata, rowindex, value) {
				        		   var h = "";
				        		   if (!rowdata._editing) {
				        			   h += "<a href='javascript:beginEdit(" + rowindex + ")'>修改</a>";
				        		   } else {
				        			   h += "<a href='javascript:endEdit(" + rowindex + ")'>提交</a> ";
				        			   h += "<a href='javascript:cancelEdit(" + rowindex + ")'>取消</a>"; 
				        		   }
				        		   return h;
				        	   }
				           }],
				           onSelectRow : function(rowdata, rowindex) {
				        	   $("#txtrowindex").val(rowindex);
				           },
				           onError:function(XMLHttpRequest, textStatus, errorThrown)
				           {
				        	   $.ligerDialog.waitting('网络连接失败!');
				        	   setTimeout(function() {
				        		   $.ligerDialog.closeWaitting();
				        	   }, 1000);
				           },
				           onSuccess:function(data,g)
				           {	
				        	   if (data.msg != "SUCCESS") {
				        		   $.ligerDialog.waitting(JSON.stringify(data.msg));
				        		   setTimeout(function() {
				        			   $.ligerDialog.closeWaitting();
				        		   }, 1000);
				        	   } 
				           },
				           url : "product/gets",
				           method : "GET",
				           allowAdjustColWidth:false,
				           fixedCellHeight:false,
				           enabledEdit : true,
				           clickToEdit : false,
				           isScroll : false,
				           rownumbers : true,
				           width: "99%",
				           height: 'auto', 
				           resizable:false,
				           checkbox : true,
				           hideLoadButton:true,
				           frozen: false,
				           rowHeight: 25,                        
				           headerRowHeight: 25
//				           pageSizeOptions:[8,16,32]//可指定每页页面大小
//				           pageSize: 20,//默认的初始页面大小数据
//				           pageParmName: 'page',               //页索引参数名，(提交给服务器)
//				           pagesizeParmName: 'pagesize',        //页记录数参数名，(提交给服务器)
//				           sortnameParmName: 'sortname',        //页排序列名(提交给服务器)
//				           sortorderParmName: 'sortorder'     //页排序方向(提交给服务器) 
			});
}
function beginEdit(rowid) {
	manager.beginEdit(rowid);
}
function cancelEdit(rowid) {
	manager.cancelEdit(rowid);
}
function endEdit(rowid) {
	$.ligerDialog.confirm('确认修改?', function(sub) {
		if (sub) {
			updateProduct(rowid);
		} else {
			manager.cancelEdit(rowid);
		}
	});
}

function delSelectRows() {
	var row = manager.getSelectedRow();
	if (!row) {
		$.ligerDialog.warn('还未选中数据');
		return;
	}
	var rows = manager.selected;
	var uids = [];
	for ( var i in rows) {
		var row = manager.selected[i];
		uids.push(row.uid);
	}

	$.ligerDialog.confirm('确认删除?', function(sub) {
		if (sub) {
			delProducts(uids);
		}
	});
}
//var isPopWin = false;
function popWindow() {
//	if (!isPopWin) {
//	f_open1();
//	isPopWin = true;
//	} else {
//	$.ligerDialog.warn('已经创建了产品录入表单，请误重复开启');
//	}
	f_open1();
}
function f_open1() {
	$.ligerDialog.open({
		height : 400,
		url : 'product_form',
		width : 500,
		showMax : true,
		showToggle : false,
		showMin : true,
		isResize : true,
		modal : true,
		title : "新增产品",
		buttons : [ {
			text : '确认提交',
			onclick : function(item, dialog) {
				if (dialog.frame.$("#form1").valid()) {
					dialog.frame.$("#form1").submit();
					var myform=dialog.frame.liger.get("form1");
					var data = myform.getData();
					addProduct(data);
					dialog.close();
				}
			}
		} ]
	});
}

function addProduct(formData)
{
//	console.info( formData);
//	lsAjaxPost("product/add",
//			"application/json",
//			JSON.stringify(formData),
//	"新增产品");
	lsAjaxPost("product/add",
			"application/json",
			JSON.stringify(formData),
	"新增产品");
}

function delProducts(rowUids) {
	lsAjaxPost("product/del"
			,"application/json"
			,JSON.stringify(rowUids)
			,"删除产品");
}
function updateProduct(rowid) {
	manager.endEdit();
	var rowData = manager.getRow(rowid);
	lsAjaxPost("product/update"
			,"application/json"
			,JSON.stringify(rowData)
			,"更新产品");
}
function lsAjaxPost(postUrl,contentType,data,tip) {
	$.ligerDialog.waitting("loading...");
	$.ajax({
		//提交数据的类型 POST GET
//		headers : {
//			Accept : "text/plain",
//			"Content-Type" : "application/json"
//		},
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
			$.ligerDialog.closeWaitting();
			$.ligerDialog.waitting(tip+'失败:网络请求错误!');
			setTimeout(function() {
				$.ligerDialog.closeWaitting();
			}, 1000);
		}
	});
}