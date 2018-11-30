/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "DBORDER")
public class DBOrder implements Serializable
{

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private int attendees;

    @ManyToOne
    private User user;

    private String airline;
    private String departure;
    private String destination;
    private String depTime;
    private String arrTime;
    private int duration;
    private int totalPrice;
    private int cancelInsurance;
    private String airplane;

    public DBOrder() {
    }

    public DBOrder(int attendees, User user, String airline, String departure, String destination, String depTime, String arrTime, int duration, int pricePerPerson, int cancelInsurance, String airplane) {
        this.attendees = attendees;
        this.user = user;
        this.airline = airline;
        this.departure = departure;
        this.destination = destination;
        this.depTime = depTime;
        this.arrTime = arrTime;
        this.duration = duration;
        this.totalPrice = pricePerPerson * attendees;
        this.cancelInsurance = cancelInsurance;
        this.airplane = airplane;
    }

    //-----------------------------------//
    public Integer getId() {
        return id;
    }

    public int getAttendees() {
        return attendees;
    }

    public User getUser() {
        return user;
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public String getAirline() {
        return airline;
    }

    public String getDeparture() {
        return departure;
    }

    public String getDestination() {
        return destination;
    }

    public String getDepTime() {
        return depTime;
    }

    public String getArrTime() {
        return arrTime;
    }

    public int getDuration() {
        return duration;
    }

    public int getPrice() {
        return totalPrice;
    }

    public int getCancelInsurance() {
        return cancelInsurance;
    }

    public String getAirplane() {
        return airplane;
    }

    //-----------------------------------//
    public void setAttendees(int attendees) {
        this.attendees = attendees;
    }

    public void setUser(User user) {
        this.user = user;
        user.getOrders().add(this);
    }

    public void setAirline(String airline) {
        this.airline = airline;
    }

    public void setDeparture(String departure) {
        this.departure = departure;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public void setDepTime(String depTime) {
        this.depTime = depTime;
    }

    public void setArrTime(String arrTime) {
        this.arrTime = arrTime;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public void setPrice(int price) {
        this.totalPrice = price;
    }

    public void setCancelInsurance(int cancelInsurance) {
        this.cancelInsurance = cancelInsurance;
    }

    public void setAirplane(String airplane) {
        this.airplane = airplane;
    }

    //-----------------------------------//
    @Override
    public String toString() {
        return "entity.Order[ id=" + id + " ]";
    }

}
