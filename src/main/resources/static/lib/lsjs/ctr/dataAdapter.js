$.lsfilter = function(results,p) {  
	var obj=new Object();
	obj[p.root]=results.data[1];
	obj[p.record]=results.data[0];
	console.log(JSON.stringify(obj));
	return obj;
}
