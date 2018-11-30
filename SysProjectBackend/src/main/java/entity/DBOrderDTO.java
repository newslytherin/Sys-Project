package entity;

public class DBOrderDTO 
{

    private int attendees;
    private User user;
    private Flight flight;

    public DBOrderDTO(DBOrder o)
    {
        this.attendees = o.getAttendees();
        this.user = o.getUser();
        this.flight = o.getFlight();
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
    
}
