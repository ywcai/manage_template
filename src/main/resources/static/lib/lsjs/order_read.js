var manager, g;	

function f_initGrid() {
	g = manager = $("#maingrid").ligerGrid(
			{
				//toolbar: {},
				title : '订单列表',
				columns : [
				           {
				        	   width:'190',
				        	   display : '订单号',
				        	   name : 'ordernum'
				           },			    
				           {
				        	   width:'220',
				        	   display : '客户OPENID',
				        	   name : 'openid'
				           },

				           {
				        	   width:'95',
				        	   display : '充值号码',
				        	   name : 'mobile'
				           },
				           {
				        	   width:'60',
				        	   display : '产品ID',
				        	   name : 'productid'
				           },
				           {
				        	   width:'60',
				        	   display : '产品编码',
				        	   name : 'packcode'
				           },
				           {
				        	   width:'60',
				        	   display : '总金额  分',
				        	   name : 'totalfee'
				           },
				           {
				        	   width:'70',
				        	   display : '订单状态',
				        	   name : 'orderstatus',
				        	   render : function(item) {
				        
				        		   if (parseInt(item.orderstatus) == 0)
				        		   {
				        			   return "未支付";
				        		   }
				        		   else if(parseInt(item.orderstatus) == 1)
				        		   {
				        			   return "<span style='color:orange'>正在充值</span>";
				        		   }
				        		   else if(parseInt(item.orderstatus) == 2)
				        		   {
				        			   return "<span style='color:green'>充值成功</span>";
				        		   }
				        		   else if(parseInt(item.orderstatus) == 3)
				        		   {
				        			   return "<span style='color:red'>提交充值失败<br>第三方平台异常</span>"; 
				        		   }
				        		   else if(parseInt(item.orderstatus) == 4)
				        		   {
				        			   return "<span style='color:red'>充值失败<br>退款失败</span>"; 
				        		   }
				        		   else if(parseInt(item.orderstatus) == 5)
				        		   {
				        			   return "<span style='color:red'>充值失败<br>退款成功</span>"; 
				        		   }
				        		   else 
				        		   {
				        			   return "<span style='color:red'>未知错误订单</span>"; 
				        		   }
				        	   }
				           },
				           {
				        	   display : '处理描述',
				        	   name : 'orderdesc'
				           },
				           {
				        	   width:'100',
				        	   display : '客户端IP',
				        	   name : 'clientip'
				           },
				           {
				        	   width:'70',
				        	   display : '使用范围',
				        	   name : 'localproduct',
				        	   render : function(item) {
				        		   if (parseInt(item.localproduct) == 1)
				        			   return '本地流量';
				        		   return '全国流量';
				        	   }
				           }
				           ],
				           onSelectRow : function(rowdata, rowindex) {
				        	   $("#txtrowindex").val(rowindex);
				           },
				           url : "../../restful/order/read",
				           method : "GET",
				           enabledEdit : true,
				           clickToEdit : false,
				           isScroll : false,
				           rownumbers : true,
				           width: 'auto',
				           height: 'auto', 
				           resizable:false,
				           checkbox : false,
				           hideLoadButton:true,
				           frozen: false,
				           rowHeight: 'auto',                        
				           headerRowHeight: 25,
				           pageSize: 20
			});
}

