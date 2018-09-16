function f_init() {
	
	$.each(
			$("canvas"),
			function(index,obj){
				var ctx=$(obj).get(0).getContext("2d");
				var myChart=new Chart(ctx, baseconfig[index]);
//				requestChartConfig(myChart,reqUrl[index],reqData[index]);
			}
	);
};

function requestChartConfig(chart,url,reqdata)
{

	$.ajax({
		//提交数据的类型 POST GET
		type : "POST",
		url : url,
		contentType : "application/json",
		data:reqdata,
		//返回数据的格式
		datatype : "json",//"xml", "html", "script", "json", "jsonp", "text".
		//成功返回之后调用的函数             
		success : function(result) {
			if (result.resultCode == "SUCCESS") {
				chart.config.data.labels=result.labels;
				if(chart.config.type=="line")
				{
					$.each(result.datas,
							function(index,data)
							{	
						var dataset={
								label:	result.label[index],
								data:data,
								backgroundColor:defaultCorlor[index],
								borderColor: defaultCorlor[index],
								fill: false
						}
						chart.config.data.datasets.push(dataset);
							}				
					);

				}
				if(chart.config.type=="pie")
				{	

					$.each(result.datas,
							function(index,data)
							{
						var backgroundColor=[];
						for(var i=0;i<data.length;i++)
						{
							backgroundColor.push(defaultCorlor[i]);
						}
						var dataset={
								label:	result.label[index],
								data:data,
								backgroundColor:backgroundColor
						}
						chart.config.data.datasets.push(dataset);
							}				
					);

				}
				if(chart.config.type=="bar")
				{

					$.each(result.datas,
							function(index,data)
							{
						var backgroundColor=[];
						for(var i=0;i<data.length;i++)
						{
							backgroundColor.push(defaultCorlor[i]);
						}
						var dataset={
								label:	result.label[index],
								data:data,
								backgroundColor:backgroundColor
						}
						chart.config.data.datasets.push(dataset);
							}				
					);

				}
				if(chart.config.type=="radar")
				{

					$.each(result.datas,
							function(index,data)
							{	
						var dataset={
								label:	result.label[index],
								data:data,
								backgroundColor:defaultCorlor[index],
								borderColor: defaultCorlor[index],
								pointBackgroundColor:defaultCorlor[index],
								fill:false
						}
						chart.config.data.datasets.push(dataset);
							}				
					);
				}	
				chart.update();
			}
		}
	});
}

