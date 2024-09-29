package com.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class OrderDetails {
	
	public OrderDetails() {
		super();
		// TODO Auto-generated constructor stub
	}
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int odid;
	private int orderid;
	private int dishid;
	private Float odamount;
	public OrderDetails(int odid, int orderid, int dishid, Float odamount) {
		super();
		this.odid = odid;
		this.orderid = orderid;
		this.dishid = dishid;
		this.odamount = odamount;
	}
	public int getOdid() {
		return odid;
	}
	public void setOdid(int odid) {
		this.odid = odid;
	}
	public int getOrderid() {
		return orderid;
	}
	public void setOrderid(int orderid) {
		this.orderid = orderid;
	}
	public int getDishid() {
		return dishid;
	}
	public void setDishid(int dishid) {
		this.dishid = dishid;
	}
	public Float getOdamount() {
		return odamount;
	}
	public void setOdamount(Float odamount) {
		this.odamount = odamount;
	}
	@Override
	public String toString() {
		return "OrderDetails [odid=" + odid + ", orderid=" + orderid + ", dishid=" + dishid + ", odamount=" + odamount
				+ "]";
	}
	
	

}
