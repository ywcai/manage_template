package ywcai.ls;

 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
 
 
@Configuration
@EnableOAuth2Sso
@EnableGlobalMethodSecurity(prePostEnabled = true)//如果要做本地权限控制，必须加这条注解
public class WebSecurityConfig  extends WebSecurityConfigurerAdapter {
 
	//必须主要权限管理的bean,否则无法开启权限控制，配合@EnableGlobalMethodSecurity注解。
		@Autowired
		AuthenticationManager authenticationManager;
		
		@Override
		protected void configure(HttpSecurity http) throws Exception {
			// TODO Auto-generated method stub
			super.configure(http);
			http.headers()
			.frameOptions().disable();
			http.csrf().disable();
//			http.authorizeRequests()
//			.anyRequest().authenticated();
		}
}
