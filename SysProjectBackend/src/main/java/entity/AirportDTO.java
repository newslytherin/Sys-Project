package entity;

public class AirportDTO 
{
    private Long id;
    private String country;
    private String name;
    private String countryCode;
    private String city;

    public AirportDTO(Airport a)
    {
        this.id = a.getId();
        this.country = a.getCountry();
        this.name = a.getName();
        this.countryCode = a.getCountryCode();
        this.city = a.getCity();
    }

    public String getCountry()
    {
        return country;
    }

    public void setCountry(String country)
    {
        this.country = country;
    }

    public String getName()
    {
        return name;
    }

    public void setName(String name)
    {
        this.name = name;
    }

    public String getCountryCode()
    {
        return countryCode;
    }

    public void setCountryCode(String countryCode)
    {
        this.countryCode = countryCode;
    }

    public String getCity()
    {
        return city;
    }

    public void setCity(String city)
    {
        this.city = city;
    }
}
