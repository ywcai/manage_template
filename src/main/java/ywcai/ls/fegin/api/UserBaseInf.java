package ywcai.ls.fegin.api;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import ywcai.ls.bean.HttpBaseEntity;
import ywcai.ls.entity.SimpleUserBase;
import ywcai.ls.entity.UserBase;

@Component
@FeignClient(value="userbase")
public interface UserBaseInf {
	
	@RequestMapping(value="/gets",method=RequestMethod.GET)
	HttpBaseEntity<?> gets(
			@RequestParam(value="page") int page,
			@RequestParam(value="pagesize") int size,
			@RequestParam(value="sortname") String sortname,
			@RequestParam(value="sortorder") String sortorder) ;

	@RequestMapping(value="/add",method=RequestMethod.POST)
	HttpBaseEntity<?> add(@RequestBody UserBase userBase) ;
	
	@RequestMapping(value="/delete",method=RequestMethod.POST)
	HttpBaseEntity<?> del(@RequestBody long userid) ;
	
	@RequestMapping(value="/update",method=RequestMethod.POST)
	HttpBaseEntity<?> update(@RequestBody UserBase userBase) ;
	
	@RequestMapping(value="/authors/update",method=RequestMethod.POST)
	HttpBaseEntity<?> updateAuthorization(@RequestBody SimpleUserBase simpleUserBase);
}
