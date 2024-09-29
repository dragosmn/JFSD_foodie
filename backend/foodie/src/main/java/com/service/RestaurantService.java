package com.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.entity.Restaurant;
import com.repository.RestaurantRepository;

@Service
public class RestaurantService {

	@Autowired
	RestaurantRepository restaurantRepository;

	public String insertRestaurant(Restaurant rest) {
		restaurantRepository.save(rest);
		return "Restaurant inserted successfully";
	}

	public String[] findRestaurantByCity(String usercity) {
		return restaurantRepository.findRestaurantByCity(usercity);
	}

	public String[] findRestaurantByName(String searchname, String usercity) {
		return restaurantRepository.findRestaurantByName(searchname, usercity);
	}

	public String[] filterRestaurantByCusine(String cusine, String usercity) {
		return restaurantRepository.filterRestaurantByCusine(cusine, usercity);
	}

	public String[] filterRestaurantByCusineAndName(String cusine, String usercity, String searchname) {
		return restaurantRepository.filterRestaurantByCusineAndName(cusine, usercity, searchname);
	}

	public String[] findRestaurantCusines(String usercity) {
		return restaurantRepository.findRestaurantCusines(usercity);
	}

	public String findRestaurantNameById(Integer resid) {
		return restaurantRepository.findRestaurantNameById(resid);
	}

	public String[] findRestaurantInfoById() {
		return restaurantRepository.findRestaurantInfoById();
	}

	public String deleteRestaurant(int resid) {
		Optional<Restaurant> result = restaurantRepository.findById(resid);
		if (result.isPresent()) {
			restaurantRepository.deleteById(resid);
			return "Restaurant Deleted Successfully";
		} else {
			return "Restaurant ID not found";
		}

	}

}
