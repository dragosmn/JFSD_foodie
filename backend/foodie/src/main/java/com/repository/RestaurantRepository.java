package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.entity.Restaurant;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Integer> {

	@Query("select r.resphoto, r.resname, r.resid from Restaurant r where r.rescity = :usercity")
	String[] findRestaurantByCity(@Param("usercity") String usercity);
	
	@Query("select r.resphoto, r.resname, r.resid from Restaurant r where r.resname like %:searchname% and r.rescity = :usercity")
	String[] findRestaurantByName(@Param("searchname") String searchname, @Param("usercity") String usercity);

	@Query("select r.resphoto, r.resname, r.resid from from Restaurant r where r.rescusine = :cusine and r.rescity = :usercity")
	String[] filterRestaurantByCusine(String cusine, String usercity);
	
	@Query("select r.resphoto, r.resname, r.resid from from Restaurant r where r.rescusine = :cusine and r.resname like %:searchname% and r.rescity = :usercity")
	String[] filterRestaurantByCusineAndName(String cusine, String usercity, String searchname);
	
	@Query("select distinct(r.rescusine) from Restaurant r where r.rescity = :usercity")
	String[] findRestaurantCusines(@Param("usercity") String usercity);
	
	@Query("select r.resname from Restaurant r where r.resid = :resid")
	String findRestaurantNameById(@Param("resid") Integer resid);
	
	@Query("select r.resid, r.resname, r.rescity from Restaurant r ")
	String[] findRestaurantInfoById();
		
}
