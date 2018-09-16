package ywcai.ls.fegin.api;


import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.provider.authentication.OAuth2AuthenticationDetails;
import feign.RequestInterceptor;
import feign.RequestTemplate;

@Configuration
public class MyFeginFilter  implements RequestInterceptor  {
 
	@Override
	public void apply(RequestTemplate requestTemplate) {
		// TODO Auto-generated method stub
		OAuth2AuthenticationDetails myToken = (OAuth2AuthenticationDetails) SecurityContextHolder.getContextHolderStrategy().getContext().getAuthentication().getDetails();
		requestTemplate.header("Authorization",myToken.getTokenType()+" "+myToken.getTokenValue());
	}

}
