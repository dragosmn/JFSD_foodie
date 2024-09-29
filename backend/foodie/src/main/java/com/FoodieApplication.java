package com;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import com.entity.User;
import com.repository.UserRepository;

import jakarta.annotation.PostConstruct;

@SpringBootApplication(scanBasePackages = "com")
@EntityScan(basePackages = "com.entity")
@EnableJpaRepositories(basePackages = "com.repository")
public class FoodieApplication {
	
	@Autowired
	UserRepository userRepository;
	
	@PostConstruct
	public void init() {
		User uu = new User();
		uu.setUsername("admin");
		uu.setUserpassword("admin@123");		
		Optional<User> result  = userRepository.findUserByName("admin");
		if(result.isPresent()) {
			System.out.println("Admin Account already present");
		}else {
			userRepository.save(uu);
			System.err.println("Admin account created");
		}
	}

	public static void main(String[] args) {
		SpringApplication.run(FoodieApplication.class, args);
		System.out.println("Foodie Micro Service up on port number 9090");
	}

}
