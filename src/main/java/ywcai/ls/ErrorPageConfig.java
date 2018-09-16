package ywcai.ls;

import org.springframework.boot.context.embedded.ConfigurableEmbeddedServletContainer;
import org.springframework.boot.context.embedded.EmbeddedServletContainerCustomizer;
import org.springframework.boot.web.servlet.ErrorPage;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;

@Configuration
public class ErrorPageConfig {

	@Bean
	public EmbeddedServletContainerCustomizer costomizer()
	{
 
		return new EmbeddedServletContainerCustomizer(){
			@Override
			public void customize(ConfigurableEmbeddedServletContainer contaners) {
				// TODO Auto-generated method stub
				contaners.addErrorPages(new ErrorPage(HttpStatus.BAD_REQUEST , "/err/400"));
				contaners.addErrorPages(new ErrorPage(HttpStatus.FORBIDDEN , "/err/403"));
				contaners.addErrorPages(new ErrorPage(HttpStatus.INTERNAL_SERVER_ERROR , "/err/500"));
				contaners.addErrorPages(new ErrorPage(HttpStatus.NOT_FOUND , "/err/404"));
				contaners.addErrorPages(new ErrorPage(HttpStatus.METHOD_NOT_ALLOWED , "/err/405"));
			}};
	}
}
