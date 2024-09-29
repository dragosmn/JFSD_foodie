package com.entity;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;

@Entity
public class User {

	public User() {
		super();
		// TODO Auto-generated constructor stub
	}
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int userid;
	private String username;
	private String userpassword;
	private String userCity;
	@OneToMany
	@JoinColumn(name = "userid")    
	private List<Orders> listOfOrders;
	public User(int userid, String username, String userpassword, String userCity, List<Orders> listOfOrders) {
		super();
		this.userid = userid;
		this.username = username;
		this.userpassword = userpassword;
		this.userCity = userCity;
		this.listOfOrders = listOfOrders;
	}
	public int getUserid() {
		return userid;
	}
	public void setUserid(int userid) {
		this.userid = userid;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getUserpassword() {
		return userpassword;
	}
	public void setUserpassword(String userpassword) {
		this.userpassword = userpassword;
	}
	public String getUserCity() {
		return userCity;
	}
	public void setUserCity(String userCity) {
		this.userCity = userCity;
	}
	public List<Orders> getListOfOrders() {
		return listOfOrders;
	}
	public void setListOfOrders(List<Orders> listOfOrders) {
		this.listOfOrders = listOfOrders;
	}
	@Override
	public String toString() {
		return "User [userid=" + userid + ", username=" + username + ", userpassword=" + userpassword + ", userCity="
				+ userCity + ", listOfOrders=" + listOfOrders + "]";
	}
	
	
	
	
	
	
}
