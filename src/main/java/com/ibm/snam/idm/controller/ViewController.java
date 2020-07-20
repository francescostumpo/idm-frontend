package com.ibm.snam.idm.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

@RestController
public class ViewController {

	Logger logger = LoggerFactory.getLogger(ViewController.class);

	@GetMapping("/dashboard")
	public ModelAndView dashboard(HttpServletResponse response) {
		logger.info("getting dashboard");
		ModelAndView modelAndView = null;
		modelAndView = new ModelAndView("dashboard");
		logger.info("returning dashboard");
		Cookie cookieContextPath = new Cookie("contextPath", "/dashboard");

		response.addCookie(cookieContextPath);
		response.addHeader("Cache-Control", "no-store");
		return modelAndView;
	}

	@GetMapping("/bandiList")
	public ModelAndView bandiList(HttpServletResponse response) {
		logger.info("getting bandiList");
		ModelAndView modelAndView = null;
		modelAndView = new ModelAndView("bandiList");
		logger.info("returning bandiList");
		Cookie cookieContextPath = new Cookie("contextPath", "/dashboard/bandiList");

		response.addCookie(cookieContextPath);
		response.addHeader("Cache-Control", "no-store");
		return modelAndView;
	}

	@GetMapping("/garaOverview")
	public ModelAndView garaOverview(HttpServletResponse response) {
		logger.info("getting garaOverview");
		ModelAndView modelAndView = null;
		modelAndView = new ModelAndView("garaOverview");
		logger.info("returning garaOverview");
		Cookie cookieContextPath = new Cookie("contextPath", "/dashboard/bandiList/garaOverview");

		response.addCookie(cookieContextPath);
		response.addHeader("Cache-Control", "no-store");
		return modelAndView;
	}

	@GetMapping("/overviewFornitore")
	public ModelAndView overviewFornitore() {
		logger.info("getting overviewFornitore");
		ModelAndView modelAndView = null;
		modelAndView = new ModelAndView("overviewFornitore");
		logger.info("returning overviewFornitore");
		return modelAndView;
	} 
	
	@GetMapping("/search") 
	public ModelAndView search() {
		logger.info("getting search view"); 
		ModelAndView modelAndView = null; 
		modelAndView = new ModelAndView("searchView"); 
		logger.info("returning search view"); 
		return modelAndView; 
	}

}
