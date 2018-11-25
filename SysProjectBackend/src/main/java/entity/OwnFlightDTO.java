/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

/**
 *
 * @author Stephan
 */
public class OwnFlightDTO {

    private long id;
    private String airline;
    private String departure;
    private String destination;
    private String depTime;
    private String arrTime;
    private int duration;
    private int price;
    private int cancelInsurance;
    private String airplane;
    private String model;
    private int capacity;

    public OwnFlightDTO(Flight f) {
        id = f.getId();
        airline = f.getAirline();
        departure = f.getDeparture().getCity() + ", " + f.getDeparture().getName() + ", " + f.getDeparture().getCountry();
        destination = f.getDestination().getCity() + ", " + f.getDestination().getName() + ", " + f.getDestination().getCountry();
        depTime = f.getDepTime();
        arrTime = f.getArrTime();
        duration = f.getDuration();
        price = f.getPrice();
        cancelInsurance = f.getCancelInsurance();
        airplane = f.getAirplane();
        model = f.getModel();
        capacity = f.getCapacity();
    }

    public long getId() {
        return id;
    }

    public String getAirline() {
        return airline;
    }

    public void setAirline(String airline) {
        this.airline = airline;
    }

    public String getDeparture() {
        return departure;
    }

    public void setDeparture(String departure) {
        this.departure = departure;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public String getDepTime() {
        return depTime;
    }

    public void setDepTime(String depTime) {
        this.depTime = depTime;
    }

    public String getArrTime() {
        return arrTime;
    }

    public void setArrTime(String arrTime) {
        this.arrTime = arrTime;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public int getCancelInsurance() {
        return cancelInsurance;
    }

    public void setCancelInsurance(int cancelInsurance) {
        this.cancelInsurance = cancelInsurance;
    }

    public String getAirplane() {
        return airplane;
    }

    public void setAirplane(String airplane) {
        this.airplane = airplane;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }
    
}
