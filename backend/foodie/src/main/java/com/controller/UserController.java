package com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.entity.User;
import com.service.UserService;

@RestController
@RequestMapping("user")
@CrossOrigin
public class UserController {

	@Autowired
	UserService userService;
	
	@PostMapping(value = "insert",consumes = MediaType.APPLICATION_JSON_VALUE)
	public String insertUser(@RequestBody User user) {
		return userService.insertUser(user);
	}
	
	@PostMapping(value = "signin",consumes = MediaType.APPLICATION_JSON_VALUE)
	public String signIn(@RequestBody User user) {
		return userService.signIn(user);
	}
	
	@GetMapping(value = "findcitybyuser/{user}")
	public String findCityByUser(@PathVariable("user") String username){
		return userService.findCityByUser(username);
	}
	
	@GetMapping(value = "finduserid/{user}")
	public int findUserId(@PathVariable("user") String username){
		return userService.findUserId(username);
	}
	
	
}
