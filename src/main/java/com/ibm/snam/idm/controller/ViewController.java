package com.ibm.snam.idm.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class ViewController {

	Logger logger = LoggerFactory.getLogger(ViewController.class);

	@GetMapping("/dashboard")
	public ModelAndView dashboard() {
		ModelAndView modelAndView = null;
		modelAndView = new ModelAndView("dashboard");
		return modelAndView;
	}

}
