package ywcai.ls.fegin.api;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import ywcai.ls.bean.HttpBaseEntity;
import ywcai.ls.entity.Product;

@Component
@FeignClient(name="product")
public interface ProductInf {

	@RequestMapping(value="/gets",method=RequestMethod.GET)
	HttpBaseEntity<?> getProducts(
			@RequestParam(value="page") int page,
			@RequestParam(value="pagesize") int size,
			@RequestParam(value="sortname") String sortname,
			@RequestParam(value="sortorder") String sortorder) ;

	@RequestMapping(value="/add",method=RequestMethod.POST)
	HttpBaseEntity<?> addProduct(@RequestBody Product product) ;
	
	@RequestMapping(value="/del",method=RequestMethod.POST)
	HttpBaseEntity<?> delProducts(@RequestBody int[] pids) ;
	
	@RequestMapping(value="/update",method=RequestMethod.POST)
	HttpBaseEntity<?> updateProduct(@RequestBody Product product) ;
	

}
