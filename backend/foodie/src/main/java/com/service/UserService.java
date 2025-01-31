package com.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.entity.User;
import com.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	UserRepository userRepository;
	
	public String insertUser(User user) {
		Optional<User> result = userRepository.findUserByName(user.getUsername());
		if(result.isPresent()) {
			return "Username already exists. Please choose another one";
		}else if(user.getUsername().equals("admin")){
			return "You can't create admin account";
		}else {
			userRepository.save(user);
			return "Account created successfully";
		}
	}
	
	public String signIn(User user) {
		Optional<User> result = userRepository.findUserByName(user.getUsername());
		if(result.isPresent()) {
				User uu=result.get();
				if(uu.getUserpassword().equals(user.getUserpassword())) {
					
					if(uu.getUsername().equals("admin")) {
						return "Admin login successfully";
					}else {
						return "user login successfully";
					}
					
				}else {
					return "Password is invalid";
				}
		}else {
			return "Username is invalid";
		}
		
	}
	
	public String findCityByUser(String username) {
		return userRepository.findCityByUser(username);		
		
	}
	
	public int findUserId(String username) {
		return userRepository.findUserId(username);		
		
	}
	
}
