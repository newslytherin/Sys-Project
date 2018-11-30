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

@Entity
public class DBOrder implements Serializable
{

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private int attendees;

    @ManyToOne
    private User user;

    @ManyToOne
    private Flight flight;

    public DBOrder() {
    }
    
    public DBOrder(int attendees, User user, Flight flight)
    {
        this.attendees = attendees;
        this.user = user;
        this.flight = flight;
    }

    //-----------------------------------//
    public Integer getId()
    {
        return id;
    }

    public int getAttendees()
    {
        return attendees;
    }

    public User getUser()
    {
        return user;
    }

    public Flight getFlight()
    {
        return flight;
    }
    

    //-----------------------------------//
    public void setId(Integer id)
    {
        this.id = id;
    }

    public void setAttendees(int attendees)
    {
        this.attendees = attendees;
    }

    public void setUser(User user)
    {
        this.user = user;
        user.getOrders().add(this);
    }

    public void setFlgiht(Flight flight)
    {
        this.flight = flight;
        flight.getOrders().add(this);
    }

    //-----------------------------------//
    @Override
    public String toString()
    {
        return "entity.Order[ id=" + id + " ]";
    }

}
