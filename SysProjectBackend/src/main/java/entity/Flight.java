package entity;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Entity
public class Flight implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String airline;
    @OneToOne
    private Airport departure;
    @OneToOne
    private Airport destination;
    private String depTime;
    private String arrTime;
    private int duration;
    private int price;
    private int cancelInsurance;
    private String airplane;
    private String model;
    private int capacity;

    public Flight() {
    }

    public Flight(String airline, Airport departure, Airport destination, String depTime, String arrTime, int duration, int price, int cancelInsurance, String airplane, String model, int capacity) {
        this.airline = airline;
        this.departure = departure;
        this.destination = destination;
        this.depTime = depTime;
        this.arrTime = arrTime;
        this.duration = duration;
        this.price = price;
        this.cancelInsurance = cancelInsurance;
        this.airplane = airplane;
        this.model = model;
        this.capacity = capacity;
    }

    public Flight updateValues(Flight f) {
        airline = f.getAirline();
        departure = f.getDeparture();
        destination = f.getDestination();
        depTime = f.getDepTime();
        arrTime = f.getArrTime();
        duration = f.getDuration();
        price = f.getPrice();
        cancelInsurance = f.getCancelInsurance();
        airplane = f.getAirplane();
        model = f.getModel();
        capacity = f.getCapacity();
        return this;
    }

    public String getAirline() {
        return airline;
    }

    public void setAirline(String airline) {
        this.airline = airline;
    }

    public Airport getDeparture() {
        return departure;
    }

    public void setDeparture(Airport departure) {
        this.departure = departure;
    }

    public Airport getDestination() {
        return destination;
    }

    public void setDestination(Airport destination) {
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

    public Long getId() {
        return id;
    }

    @Override
    public String toString() {
        return "entity.Flight[ id=" + id + " ]";
    }

}
