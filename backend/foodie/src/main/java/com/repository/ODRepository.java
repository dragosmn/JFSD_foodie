package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.entity.OrderDetails;

@Repository
public interface ODRepository extends JpaRepository<OrderDetails, Integer>{

	@Query("select d.dishname, d.dishphoto, o.dishid, sum(o.odamount) as amount from OrderDetails o, Dish d where o.dishid=d.dishid group by o.dishid order by amount desc limit 5")
	public Object[] viewPopularDish();
	
}
