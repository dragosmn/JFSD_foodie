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

import com.entity.Dish;
import com.service.DishService;

@RestController
@RequestMapping("dish")
@CrossOrigin
public class DishController {

	@Autowired
	DishService dishService;
	
	@PostMapping(value = "insert",consumes = MediaType.APPLICATION_JSON_VALUE)
	public String insertDish(@RequestBody Dish dish) {
		return dishService.insertDish(dish);
	}
	
	@GetMapping(value = "finddishbyresid/{resid}")
	public String[] findRestaurantByCity(@PathVariable("resid") Integer usercity) {
		return dishService.findDishByResId(usercity);
	}
	
	@DeleteMapping(value = "deletedishbydishid/{dishid}")
	public String deleteDish(@PathVariable("dishid") int dishid) {
		return dishService.deleteDish(dishid);		
	}
	
	@PostMapping(value = "updatedishprice/{dishid}/{price}")
	public String updateDishPrice(@PathVariable("dishid") int dishid, @PathVariable("price") Float price) {
		return dishService.updateDishPrice(dishid, price);
	}
	
}
