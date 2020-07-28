package com.ibm.snam.idm.controller;

import net.sf.json.JSONObject;
import org.keycloak.Config;
import org.keycloak.KeycloakPrincipal;
import org.keycloak.KeycloakSecurityContext;
import org.keycloak.adapters.springsecurity.account.SimpleKeycloakAccount;
import org.keycloak.adapters.springsecurity.client.KeycloakClientRequestFactory;
import org.keycloak.adapters.springsecurity.token.KeycloakAuthenticationToken;
import org.keycloak.representations.AccessToken;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.Principal;

@RestController
public class ViewController {

	Logger logger = LoggerFactory.getLogger(ViewController.class);


	@GetMapping("/dashboard")
	public ModelAndView dashboard(Principal principal, HttpServletResponse response) {
		logger.info("getting dashboard");
		/*Authentication authenticationToken = SecurityContextHolder.getContext().getAuthentication();
		Object detailsToken = authenticationToken.getDetails();
		String bearerToken = "";
		if (detailsToken instanceof OAuth2AuthenticationDetails) {
			OAuth2AuthenticationDetails oauthsDetails = (OAuth2AuthenticationDetails) detailsToken;
			bearerToken = oauthsDetails.getTokenValue();
		}*/
		String bearerToken = "";
		Authentication authentication = (Authentication) principal;
		JSONObject object = JSONObject.fromObject(authentication);
		Authentication authenticationToken = SecurityContextHolder.getContext().getAuthentication();
		Object detailsToken = authenticationToken.getDetails();
		SimpleKeycloakAccount account = (SimpleKeycloakAccount) detailsToken;
		bearerToken = account.getKeycloakSecurityContext().getTokenString();
		ModelAndView modelAndView = null;
		modelAndView = new ModelAndView("dashboard");
		logger.info("returning dashboard");
		Cookie cookieContextPath = new Cookie("contextPath", "/dashboard");
		Cookie cookieBearerToken = new Cookie("bearerToken", bearerToken);
		Cookie cookieBackendUrl = new Cookie("backendUrl", System.getenv("BACKEND_URL"));

		response.addCookie(cookieContextPath);
		response.addCookie(cookieBearerToken);
		response.addCookie(cookieBackendUrl);

		response.addHeader("Cache-Control", "no-store");
		return modelAndView;
	}

	@GetMapping("/bandiList")
	public ModelAndView bandiList(HttpServletRequest request, HttpServletResponse response) throws IOException {
		logger.info("getting bandiList");
		ModelAndView modelAndView = null;
		boolean loggedIn = verifyBearerToken(request);
		response.addHeader("Cache-Control", "no-store");
		if(loggedIn == true){
			modelAndView = new ModelAndView("bandiList");
			logger.info("returning bandiList");
			Cookie cookieContextPath = new Cookie("contextPath", "/dashboard/bandiList");
			response.addCookie(cookieContextPath);
		}else{
			response.sendRedirect("/dashboard");
		}
		return modelAndView;
	}


	@GetMapping("/garaOverview")
	public ModelAndView garaOverview(HttpServletRequest request, HttpServletResponse response) throws IOException {
		logger.info("getting garaOverview");
		ModelAndView modelAndView = null;
		boolean loggedIn = verifyBearerToken(request);
		response.addHeader("Cache-Control", "no-store");
		if(loggedIn == true){
			modelAndView = new ModelAndView("garaOverview");
			logger.info("returning garaOverview");
			Cookie cookieContextPath = new Cookie("contextPath", "/dashboard/bandiList/garaOverview");
			response.addCookie(cookieContextPath);

		}else{
			response.sendRedirect("/dashboard");
		}
		return modelAndView;
	}

	@GetMapping("/fornitoreOverview")
	public ModelAndView fornitoreOverview(HttpServletRequest request, HttpServletResponse response) throws IOException {
		logger.info("getting fornitoreOverview");
		ModelAndView modelAndView = null;
		boolean loggedIn = verifyBearerToken(request);
		response.addHeader("Cache-Control", "no-store");
		if(loggedIn == true){
			modelAndView = new ModelAndView("fornitoreOverview");
			Cookie cookieContextPath = new Cookie("contextPath", "/dashboard/bandiList/garaOverview/fornitoreOverview");
			response.addCookie(cookieContextPath);
			logger.info("returning fornitoreOverview");
		}else{
			response.sendRedirect("/dashboard");
		}
		return modelAndView;
	} 

	@GetMapping("/documentDetail")
	public ModelAndView documentDetail(HttpServletResponse response, HttpServletRequest request) throws IOException {
		logger.info("getting documentDetail");
	    ModelAndView modelAndView = null;
		boolean loggedIn = verifyBearerToken(request);
		response.addHeader("Cache-Control", "no-store");
		if(loggedIn == true){
			modelAndView = new ModelAndView("documentDetail");
			Cookie cookieContextPath = new Cookie("contextPath", "/dashboard/bandiList/garaOverview/fornitoreOverview/documentDetail");
			response.addCookie(cookieContextPath);
			logger.info("returning documentDetail");
		}
		else{
			response.sendRedirect("/dashboard");
		}
		return modelAndView;
	} 

	private boolean verifyBearerToken(HttpServletRequest request) {
		boolean loggedIn = false;
		Cookie[] cookies = request.getCookies();
		if(null != cookies){
			for(Cookie cookie: cookies){
				if(cookie.getName().equals("bearerToken")){
					loggedIn = true;
					break;
				}
			}
		}

		return loggedIn;
	}

}
