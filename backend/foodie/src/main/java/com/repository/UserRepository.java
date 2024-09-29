package com.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>{

	@Query("select u from User u where u.username = :username")
	Optional<User> findUserByName(@Param("username") String username);
	
	@Query("select u.userCity from User u where u.username = :username")
	String findCityByUser(@Param("username") String username);
	
	@Query("select u.userid from User u where u.username = :username")
	int findUserId(@Param("username") String username);
	
}
