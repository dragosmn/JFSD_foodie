package com.entity;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;

@Entity
public class Dish {

	public Dish() {
		super();
		// TODO Auto-generated constructor stub
	}
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int dishid;
	private Integer resid;
	private String dishname;
	private String dishtype;
	private String dishphoto;
	private String dishdesc;
	private Boolean dishavail;
	private Float dishprice;
	@OneToMany
	@JoinColumn(name = "dishid")   
	private List<OrderDetails> listOfOrderDetails;
	
	public int getDishid() {
		return dishid;
	}
	public void setDishid(int dishid) {
		this.dishid = dishid;
	}
	public Integer getResid() {
		return resid;
	}
	public void setResid(Integer resid) {
		this.resid = resid;
	}
	public String getDishname() {
		return dishname;
	}
	public void setDishname(String dishname) {
		this.dishname = dishname;
	}
	public String getDishtype() {
		return dishtype;
	}
	public void setDishtype(String dishtype) {
		this.dishtype = dishtype;
	}
	public String getDishphoto() {
		return dishphoto;
	}
	public void setDishphoto(String dishphoto) {
		this.dishphoto = dishphoto;
	}
	public String getDishdesc() {
		return dishdesc;
	}
	public void setDishdesc(String dishdesc) {
		this.dishdesc = dishdesc;
	}
	public Boolean getDishavail() {
		return dishavail;
	}
	public void setDishavail(Boolean dishavail) {
		this.dishavail = dishavail;
	}
	public Float getDishprice() {
		return dishprice;
	}
	public void setDishprice(Float dishprice) {
		this.dishprice = dishprice;
	}
	public List<OrderDetails> getListOfOrderDetails() {
		return listOfOrderDetails;
	}
	public void setListOfOrderDetails(List<OrderDetails> listOfOrderDetails) {
		this.listOfOrderDetails = listOfOrderDetails;
	}
	public Dish(int dishid, Integer resid, String dishname, String dishtype, String dishphoto, String dishdesc,
			Boolean dishavail, Float dishprice, List<OrderDetails> listOfOrderDetails) {
		super();
		this.dishid = dishid;
		this.resid = resid;
		this.dishname = dishname;
		this.dishtype = dishtype;
		this.dishphoto = dishphoto;
		this.dishdesc = dishdesc;
		this.dishavail = dishavail;
		this.dishprice = dishprice;
		this.listOfOrderDetails = listOfOrderDetails;
	}
	@Override
	public String toString() {
		return "Dish [dishid=" + dishid + ", resid=" + resid + ", dishname=" + dishname + ", dishtype=" + dishtype
				+ ", dishphoto=" + dishphoto + ", dishdesc=" + dishdesc + ", dishavail=" + dishavail + ", dishprice="
				+ dishprice + ", listOfOrderDetails=" + listOfOrderDetails + "]";
	}
	
	
	
	

}
