package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.entity.Dish;

@Repository
public interface DishRepository extends JpaRepository<Dish, Integer>{
	
	@Query("select d.dishid, dishname, dishtype, dishdesc, dishavail, dishprice from Dish d where d.resid = :resid")
	String[] findDishByResId(@Param("resid") Integer resid);

}
