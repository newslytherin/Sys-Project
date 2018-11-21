package entity;

public class FlightDTO {
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

    public FlightDTO(Flight f) {
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
}
