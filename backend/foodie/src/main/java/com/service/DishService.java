package com.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.entity.Dish;
import com.entity.Restaurant;
import com.repository.DishRepository;
import com.repository.RestaurantRepository;

@Service
public class DishService {

	@Autowired
	DishRepository dishRepository;
	
	@Autowired
	RestaurantRepository restaurantRepository;
	
	public String insertDish(Dish dish) {		
		try {
			
			Optional<Restaurant> result = restaurantRepository.findById(dish.getResid());
			if(result.isPresent()) {
				dishRepository.save(dish);			
				return "Dish inserted succesfully";
			}else {
				return "Restaurant not present";
			}
			
			}catch(Exception e) {
				System.err.println(e);
				return "Dish wasn't inserted";
			}		
	}
	
	public String[] findDishByResId(Integer resid) {		
		return dishRepository.findDishByResId(resid);				
	}
	
	public String deleteDish(int dishid) {
		Optional<Dish> result = dishRepository.findById(dishid);
		if (result.isPresent()) {
			dishRepository.deleteById(dishid);
			return "Dish Deleted Successfully";
		} else {
			return "Dish ID not found";
		}

	}
	
	public String updateDishPrice(int dishid, Float price) {
		Optional<Dish> result = dishRepository.findById(dishid);
		if(result.isPresent()) {
			Dish d = result.get();
			d.setDishprice(price); 
			dishRepository.saveAndFlush(d);		// update 
			return "Dish price updated successfully";
		}else {
			return "Dish not present";
		}
	}
	
}
