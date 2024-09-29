package com.entity;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;

@Entity
public class Restaurant {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int resid;
	private String resname;
	public Restaurant() {
		super();
		// TODO Auto-generated constructor stub
	}
	private String rescity;
	private String rescusine;
	private String resphoto;
	@OneToMany
	@JoinColumn(name = "resid")
	private List<Dish> listofDishes;
	
	public Restaurant(int resid, String resname, String rescity, String rescusine, String resphoto,
			List<Dish> listofDishes) {
		super();
		this.resid = resid;
		this.resname = resname;
		this.rescity = rescity;
		this.rescusine = rescusine;
		this.resphoto = resphoto;
		this.listofDishes = listofDishes;
	}
	public int getResid() {
		return resid;
	}
	public void setResid(int resid) {
		this.resid = resid;
	}
	public String getResname() {
		return resname;
	}
	public void setResname(String resname) {
		this.resname = resname;
	}
	public String getRescity() {
		return rescity;
	}
	public void setRescity(String rescity) {
		this.rescity = rescity;
	}
	public String getRescusine() {
		return rescusine;
	}
	public void setRescusine(String rescusine) {
		this.rescusine = rescusine;
	}
	public String getResphoto() {
		return resphoto;
	}
	public void setResphoto(String resphoto) {
		this.resphoto = resphoto;
	}
	public List<Dish> getListofDishes() {
		return listofDishes;
	}
	public void setListofDishes(List<Dish> listofDishes) {
		this.listofDishes = listofDishes;
	}
	@Override
	public String toString() {
		return "Restaurant [resid=" + resid + ", resname=" + resname + ", rescity=" + rescity + ", rescusine="
				+ rescusine + ", resphoto=" + resphoto + ", listofDishes=" + listofDishes + "]";
	}
	
	
	
	
	
}
