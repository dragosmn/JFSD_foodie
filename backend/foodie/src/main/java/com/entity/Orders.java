package com.entity;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;

@Entity
public class Orders {

	public Orders() {
		super();
		// TODO Auto-generated constructor stub
	}
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int orderid;
	private LocalDateTime orderdata;
	private Integer userid;
	private Float orderprice;
	@OneToMany
	@JoinColumn(name = "orderid")   
	private List<OrderDetails> listOfOrderDetail;
	public Orders(int orderid, LocalDateTime orderdata, Integer userid, Float orderprice,
			List<OrderDetails> listOfOrderDetail) {
		super();
		this.orderid = orderid;
		this.orderdata = orderdata;
		this.userid = userid;
		this.orderprice = orderprice;
		this.listOfOrderDetail = listOfOrderDetail;
	}
	public int getOrderid() {
		return orderid;
	}
	public void setOrderid(int orderid) {
		this.orderid = orderid;
	}
	public LocalDateTime getOrderdata() {
		return orderdata;
	}
	public void setOrderdata(LocalDateTime orderdata) {
		this.orderdata = orderdata;
	}
	public Integer getUserid() {
		return userid;
	}
	public void setUserid(Integer userid) {
		this.userid = userid;
	}
	public Float getOrderprice() {
		return orderprice;
	}
	public void setOrderprice(Float orderprice) {
		this.orderprice = orderprice;
	}
	public List<OrderDetails> getListOfOrderDetail() {
		return listOfOrderDetail;
	}
	public void setListOfOrderDetail(List<OrderDetails> listOfOrderDetail) {
		this.listOfOrderDetail = listOfOrderDetail;
	}
	@Override
	public String toString() {
		return "Order [orderid=" + orderid + ", orderdata=" + orderdata + ", userid=" + userid + ", orderprice="
				+ orderprice + ", listOfOrderDetail=" + listOfOrderDetail + "]";
	}
	
	

}
