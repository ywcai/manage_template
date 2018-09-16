package ywcai.ls.controller;


import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.extern.slf4j.Slf4j;
import ywcai.ls.bean.HttpBaseEntity;
import ywcai.ls.entity.UserBase;
import ywcai.ls.entity.Product;
import ywcai.ls.entity.SimpleUserBase;
import ywcai.ls.fegin.api.ProductInf;
import ywcai.ls.fegin.api.UserBaseInf;



@Controller
@Slf4j
public class CoreController {
	@Autowired
	UserBaseInf userinf;
	//	@Autowired
	//	RecordInf recordinf;
	@Autowired
	ProductInf productinf;
	@RequestMapping(value="/index",method=RequestMethod.GET)
	String index() {
		return  "index";
	}
	@RequestMapping(value="/welcome",method=RequestMethod.GET)
	String welcome() {
		return  "welcome";
	}

	@RequestMapping(value="/err/{code}",method=RequestMethod.GET)
	String ERR(@PathVariable String code) {
		String path="err/"+code;
		log.warn(path);
		return  path+"";
	}

	@RequestMapping(value="/product_show",method=RequestMethod.GET)
	@PreAuthorize("hasAuthority('product')")
	String productList() {
		return "product/productList";
	}
	@RequestMapping(value="/product_form",method=RequestMethod.GET)
	@PreAuthorize("hasAuthority('product')")
	String productForm() {
		return "product/addProductForm";
	}
	@RequestMapping(value="/product/gets",method=RequestMethod.GET)
	@PreAuthorize("hasAuthority('product')")
	@ResponseBody
	HttpBaseEntity<?> productGets(
			@RequestParam(value="page", defaultValue = "1") int page,
			@RequestParam(value="pagesize", defaultValue = "20") int size,
			@RequestParam(value="sortname", defaultValue = "productid") String sortname,
			@RequestParam(value="sortorder",defaultValue = "desc") String sortorder) {
		log.warn("get product page={},size={},sortname={},sortorder={}",page,size,sortname,sortorder);
		HttpBaseEntity<?>  base=productinf.getProducts(page, size, sortname, sortorder);
		log.warn("get product back  = {} ",base.data);
		return base;
	}
	@RequestMapping(value="/product/add",method=RequestMethod.POST)
	@PreAuthorize("hasAuthority('product')")
	@ResponseBody
	HttpBaseEntity<?> productAdd(@RequestBody Product product) {	
		log.warn("add the  product = {} ",product);
		HttpBaseEntity<?>  base=productinf.addProduct(product);
		log.warn("update  product back  = {} ",base);
		return base;
	}
	@RequestMapping(value="/product/update")
	@PreAuthorize("hasAuthority('product')")
	@ResponseBody
	HttpBaseEntity<?> productUpdate(@RequestBody Product product
			) {	
		log.warn("update  the product   = {} ",product);
		HttpBaseEntity<?>  base=productinf.updateProduct(product);
		log.warn("update  product back  = {} ",base);
		return base;
	}
	@RequestMapping(value="/product/del" )
	@PreAuthorize("hasAuthority('product')")
	@ResponseBody
	HttpBaseEntity<?> productDel(@RequestBody int[] pids  
			) {	
		log.warn("del the product id = {} ",pids);
		HttpBaseEntity<?>  base=productinf.delProducts(pids);
		log.warn("del product back  = {} ",base);
		return base;
	}


	@RequestMapping(value="/admin_list",method=RequestMethod.GET)
	@PreAuthorize("hasAuthority('admin')")
	String accountList() {
		return "admin/adminList";
	}
	@RequestMapping(value="/admin_edit",method=RequestMethod.GET)
	@PreAuthorize("hasAuthority('admin')")
	String accountFormAdd() {
		return "admin/adminEditForm";
	}
	@RequestMapping(value="/role_list",method=RequestMethod.GET)
	@PreAuthorize("hasAuthority('admin')")
	String roleList() {
		return "admin/adminRoleList";
	}

	@RequestMapping(value="/admin/gets",method=RequestMethod.GET)
	@PreAuthorize("hasAuthority('admin')")
	@ResponseBody
	HttpBaseEntity<?> getAdminList(
			@RequestParam(value="page", defaultValue = "1") int page,
			@RequestParam(value="pagesize", defaultValue = "10") int size,
			@RequestParam(value="sortname", defaultValue = "userid") String sortname,
			@RequestParam(value="sortorder",defaultValue = "desc") String sortorder) {
		HttpBaseEntity<?>  base=userinf.gets(page, size, sortname, sortorder);
		return base;
	}
	@RequestMapping(value="/admin/add",method=RequestMethod.POST)
	@PreAuthorize("hasAuthority('admin')")
	@ResponseBody
	HttpBaseEntity<?> addAdmin(@RequestBody UserBase user) {
		HttpBaseEntity<?>  base=userinf.add(user);
		return base;
	}
	@RequestMapping(value="/admin/update",method=RequestMethod.POST)
	@PreAuthorize("hasAuthority('admin')")
	@ResponseBody
	HttpBaseEntity<?> updateAdmin(@RequestBody UserBase userBase) {
		log.warn("update  the  user = {} ",userBase);
		HttpBaseEntity<?>  base=userinf.update(userBase);
		return base;
	}

	@RequestMapping(value="/admin/del",method=RequestMethod.POST)
	@PreAuthorize("hasAuthority('admin')")
	@ResponseBody
	HttpBaseEntity<?> delAdmin(@RequestBody UserBase userBase) {
		log.warn("del  the  user = {} ",userBase);
		HttpBaseEntity<?>  base=userinf.del(userBase.getUserid());
		return base;
	}
	@RequestMapping(value="/role/update",method=RequestMethod.POST)
	@PreAuthorize("hasAuthority('admin')")
	@ResponseBody
	HttpBaseEntity<?> updateRoles(@RequestBody SimpleUserBase simpleUserBase) {
		log.warn("UPDATE  the  simpleUserBase = {} ",simpleUserBase);
 		HttpBaseEntity<?>  base=userinf.updateAuthorization(simpleUserBase);
		return base;
	}

	
	




	//	@RequestMapping(value="/order",method=RequestMethod.GET)
	//	String orderList() {
	//		return "order/order_list";
	//	}
	//	@RequestMapping(value="/order/chart",method=RequestMethod.GET)
	//	String orderChart() {
	//		return "order/order_charts";
	//	}
	//
	//	@RequestMapping(value="/article",method=RequestMethod.GET)
	//	String articleList() {
	//		return "article/article_list";
	//	}
	//
	//	@RequestMapping(value="/record",method=RequestMethod.GET)
	//	String recordList() {
	//		return "record/record_list";
	//	}

	//	@RequestMapping(value="/comment",method=RequestMethod.GET)
	//	String commentList() {
	//		return "comment/comment_list";
	//	}

}
