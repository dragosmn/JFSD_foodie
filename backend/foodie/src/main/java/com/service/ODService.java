package com.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.entity.Dish;
import com.entity.OrderDetails;
import com.entity.Orders; 
import com.repository.DishRepository;
import com.repository.ODRepository;
import com.repository.OrdersRepository;

@Service
public class ODService {

	@Autowired
	ODRepository odRepository;

	@Autowired
	OrdersRepository ordersRepository;

	@Autowired
	DishRepository dishRepository;

	public String insertOrderDetails(OrderDetails odetails) {
		try {

			Optional<Orders> result = ordersRepository.findById(odetails.getOrderid());
			if (result.isPresent()) {
				Optional<Dish> dresult = dishRepository.findById(odetails.getDishid());
				if (dresult.isPresent()) {
					odRepository.save(odetails);
					return "OrderDetails inserted succesfully";
				} else {
					return "Dish not present";
				}

			} else {
				return "Order not present";
			}

		} catch (Exception e) {
			System.err.println(e);
			return "OrderDetails weren't inserted";
		}

	}
	
	public Object[] viewPopularDish() {
		return odRepository.viewPopularDish();
	}

}
