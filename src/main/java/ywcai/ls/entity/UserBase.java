package ywcai.ls.entity;

import java.util.List;




public class UserBase {


	private Long userid;


	private String username;


	private String password;


	private String createtime;


	private List<String> roles;


	public Long getUserid() {
		return userid;
	}


	public void setUserid(Long userid) {
		this.userid = userid;
	}


	public String getUsername() {
		return username;
	}


	public void setUsername(String username) {
		this.username = username;
	}


	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}


	public String getCreatetime() {
		return createtime;
	}


	public void setCreatetime(String createtime) {
		this.createtime = createtime;
	}


	public List<String> getRoles() {
		return roles;
	}


	public void setRoles(List<String> roles) {
		this.roles = roles;
	}


	@Override
	public String toString() {
		return "UserBase [userid=" + userid + ", username=" + username + ", password=" + password + ", createtime="
				+ createtime + ", roles=" + roles + "]";
	}

}