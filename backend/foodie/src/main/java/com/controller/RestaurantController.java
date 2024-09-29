package com.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.entity.Restaurant;
import com.service.RestaurantService;

@RestController
@RequestMapping("restaurant")
@CrossOrigin
public class RestaurantController {

	@Autowired
	RestaurantService restaurantService;
	
	@PostMapping(value = "insert",consumes = MediaType.APPLICATION_JSON_VALUE)
	public String insertRestaurant(@RequestBody Restaurant restaurant) {
		return restaurantService.insertRestaurant(restaurant);
	}
	
	@GetMapping(value = "findrestaurantbycity/{usercity}")
	public String[] findRestaurantByCity(@PathVariable("usercity") String usercity) {
		return restaurantService.findRestaurantByCity(usercity);
	}
	
	@GetMapping(value = "findrestaurantbyname/{searchname}/{usercity}")
	public String[] findRestaurantByName(@PathVariable("searchname") String searchname, @PathVariable("usercity") String usercity) {
		return restaurantService.findRestaurantByName(searchname, usercity);
	}
	
	@GetMapping(value = "filterrestaurantbycusine/{cusine}/{usercity}")
	public String[] filterRestaurantByCusine(@PathVariable("cusine") String cusine, @PathVariable("usercity") String usercity) {
		return restaurantService.filterRestaurantByCusine(cusine, usercity);
	}
	
	@GetMapping(value = "filterrestaurantbycusineandname/{cusine}/{usercity}/{searchname}")
	public String[] filterRestaurantByCusineAndName(@PathVariable("cusine") String cusine, @PathVariable("usercity") String usercity, @PathVariable("searchname") String searchname) {
		return restaurantService.filterRestaurantByCusineAndName(cusine, usercity, searchname);
	}
	
	@GetMapping(value = "findrestaurantcusines/{usercity}")
	public String[] findRestaurantCusines(@PathVariable("usercity") String usercity) {
		return restaurantService.findRestaurantCusines(usercity);
	}
	
	@GetMapping(value = "findrestaurantnamebyid/{resid}")
	public String findRestaurantNameById(@PathVariable("resid") Integer resid) {
		return restaurantService.findRestaurantNameById(resid);
	}
	
	@GetMapping(value = "findrestaurantinfobyid")
	public String[] findRestaurantInfoById() {
		return restaurantService.findRestaurantInfoById();
	}
	
	@DeleteMapping(value = "delete/{resid}")
	public String deleteRestaurant(@PathVariable("resid") int resid) {
		return restaurantService.deleteRestaurant(resid);		
	}
	
}
