package com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.entity.Orders;
import com.service.OrdersService;

@RestController
@RequestMapping("orders")
@CrossOrigin
public class OrdersController {

	@Autowired
	OrdersService ordersService;
	
	@PostMapping(value = "insert",consumes = MediaType.APPLICATION_JSON_VALUE)
	public String insertOrder(@RequestBody Orders order) {
		return ordersService.insertOrder(order);
	}
	
}
