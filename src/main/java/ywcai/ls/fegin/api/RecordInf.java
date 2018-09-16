package ywcai.ls.fegin.api;


import java.util.List;

import org.springframework.cloud.netflix.feign.FeignClient;

import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import ywcai.ls.bean.HttpBaseEntity;
import ywcai.ls.bean.LogEntity;
import ywcai.ls.bean.ResultState;



@Component
@FeignClient(value="recordinf")
public interface RecordInf {
	@RequestMapping(value="/add/{userid}",method=RequestMethod.POST)
	HttpBaseEntity<?> add(@PathVariable(value="userid") long userid,@RequestBody LogEntity logEntity)  ;
	@RequestMapping(value="/adds/{userid}",method=RequestMethod.POST)
	HttpBaseEntity<?> addAll(@PathVariable(value="userid") long userid,@RequestBody List<LogEntity> lists) ;


	@RequestMapping(value="/get/{userid}",method=RequestMethod.GET)
	HttpBaseEntity<?> getAll(@PathVariable(value="userid") long userid) ;

	//	@RequestMapping(value="/get/page/{userid}",method=RequestMethod.GET)
	//	HttpBaseEntity<?> getForPage(
	//			@PathVariable long userid,
	//			@PageableDefault(size = 20,page=0,sort = { "id" }, direction = Sort.Direction.DESC) Pageable pageable) ;


	@RequestMapping(value="/get/{userid}/{pos}",method=RequestMethod.POST)
	HttpBaseEntity<?> get(
			@PathVariable(value="userid") long userid
			,@PathVariable(value="pos") int pos
			,@RequestBody ResultState state);

	@RequestMapping(value="/edit/{userid}/{recordid}",method=RequestMethod.POST)

	HttpBaseEntity<?>  editNickname(@PathVariable(value="userid") long userid,@PathVariable(value="recordid") long recordid
			,@RequestParam(value="aliasname") String aliasname) ;

	//pos用于确定删除数据后返回新的记录位置
	@RequestMapping(value="/del/{userid}/{recordid}/{pos}",method=RequestMethod.POST)
	@ResponseBody
	HttpBaseEntity<?>  del(
			@PathVariable(value="userid") long userid
			,@PathVariable(value="recordid") long recordid
			,@PathVariable(value="pos") int pos
			,@RequestBody ResultState state) ;

	@RequestMapping(value="/del/{userid}",method=RequestMethod.POST)
	@ResponseBody
	HttpBaseEntity<?>  delAll(
			@PathVariable(value="userid") long userid)  ;
}
