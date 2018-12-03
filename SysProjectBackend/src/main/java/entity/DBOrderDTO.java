/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

public class DBOrderDTO
{
    
    private UserDTO userDTO;
    private Integer id;
    private int attendees;
    private String airline;
    private String departure;
    private String destination;
    private String depTime;
    private String arrTime;
    private int duration;
    private int price;
    private int cancelInsurance;
    private String airplane;

    public DBOrderDTO(UserDTO userDTO, int attendees, String airline, String departure, String destination, String depTime, String arrTime, int duration, int price, int cancelInsurance, String airplane) {
        this.userDTO = userDTO;
        this.attendees = attendees;
        this.airline = airline;
        this.departure = departure;
        this.destination = destination;
        this.depTime = depTime;
        this.arrTime = arrTime;
        this.duration = duration;
        this.price = price;
        this.cancelInsurance = cancelInsurance;
        this.airplane = airplane;
    }    

    public DBOrderDTO(DBOrder o) {
        this.id = o.getId();
        this.userDTO = new UserDTO(o.getUser());
        this.attendees = o.getAttendees();
        this.airline = o.getAirline();
        this.departure = o.getDeparture();
        this.destination = o.getDestination();
        this.depTime = o.getDepTime();
        this.arrTime = o.getArrTime();
        this.duration = o.getDuration();
        this.price = o.getPrice();
        this.cancelInsurance = o.getCancelInsurance();
        this.airplane = o.getAirplane();
    }

    
    ///////////////GETTERS//////////////////
    

    public UserDTO getUserDTO()
    {
        return userDTO;
    }

    public Integer getId()
    {
        return id;
    }

    public int getAttendees()
    {
        return attendees;
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
        return price;
    }

    public int getCancelInsurance() {
        return cancelInsurance;
    }

    public String getAirplane() {
        return airplane;
    }
    
    
    
}
