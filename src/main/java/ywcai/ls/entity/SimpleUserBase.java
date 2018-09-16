package ywcai.ls.entity;



import java.util.HashSet;
import java.util.Set;

 

public class SimpleUserBase {

	private Long userid;


	private String username;

	private String password;


	private String createtime;


	private Set<String> roles=new HashSet<String>();

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

	public Set<String> getRoles() {
		return roles;
	}
	public void setRoles(Set<String> roles) {
		this.roles = roles;
	}
	public Long getUserid() {
		return userid;
	}

	public void setUserid(Long userid) {
		this.userid = userid;
	}
	@Override
	public String toString() {
		return "SimpleUserBase [userid=" + userid + ", username=" + username + ", password=" + password
				+ ", createtime=" + createtime + ", roles=" + roles + "]";
	}
}