package com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.entity.OrderDetails;
import com.service.ODService;

@RestController
@RequestMapping("od")
@CrossOrigin
public class ODController {

	@Autowired
	ODService odSerivce;
	
	@PostMapping(value = "insert",consumes = MediaType.APPLICATION_JSON_VALUE)
	public String insertOrderDetails(@RequestBody OrderDetails od) {
		return odSerivce.insertOrderDetails(od);
	}
	
	@GetMapping(value = "viewpopulardish")
	public Object[] viewPopularDish() {
		return odSerivce.viewPopularDish();
	}
	
}
