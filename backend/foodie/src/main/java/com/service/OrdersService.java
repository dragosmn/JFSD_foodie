package com.service;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.entity.Orders;
import com.entity.User;
import com.repository.OrdersRepository;
import com.repository.UserRepository;

@Service
public class OrdersService {

	@Autowired
	OrdersRepository ordersRepository;
	
	@Autowired
	UserRepository userRepository;
	
	public String insertOrder(Orders order) {
		try {
			
			Optional<User> result = userRepository.findById(order.getUserid());
			if(result.isPresent()) {
				order.setOrderdata(LocalDateTime.now());
				ordersRepository.save(order);			
				return "Order inserted succesfully";
			}else {
				return "User not present";
			}
			
			}catch(Exception e) {
				System.err.println(e);
				return "Order wasn't inserted";
			}	
		
	}
	
}
