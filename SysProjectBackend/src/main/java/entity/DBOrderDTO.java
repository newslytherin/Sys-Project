/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

public class DBOrderDTO
{

    FlightDTO flightDTO;
    UserDTO userDTO;
    private Integer id;
    private int attendees;

    public DBOrderDTO(DBOrder o)
    {
        this.id = o.getId();
        this.attendees = o.getAttendees();
        this.flightDTO = new FlightDTO(o.getFlight());
        this.userDTO = new UserDTO(o.getUser());
    }

    
    ///////////////GETTERS//////////////////
    public FlightDTO getFlightDTO()
    {
        return flightDTO;
    }

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

    @Override
    public String toString()
    {
        return "DBOrderDTO{" + "flightDTO=" + flightDTO + ", userDTO=" + userDTO + ", id=" + id + ", attendees=" + attendees + '}';
    }

    
}
