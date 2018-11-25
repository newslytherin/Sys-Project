package facade;

import entity.Airport;
import entity.AirportDTO;
import entity.Flight;
import entity.FlightDTO;
import entity.OwnFlightDTO;
import java.util.List;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import static org.junit.Assert.*;
import org.junit.Test;

public class DataFacadeTest {

//    private EntityManagerFactory emf = Persistence.createEntityManagerFactory("testpu");
//    private DataFacade facade = new DataFacade();
    public DataFacadeTest() {
//        facade.setEntityManagerFactory(emf);
    }

    @BeforeClass
    public static void setUpClass() {
    }

    @AfterClass
    public static void tearDownClass() {
    }

    @Before
    public void setUp() {
    }

    @After
    public void tearDown() {
    }

    @Test
    public void testAddNewFlightGetAllFlights() throws Exception {
        System.out.println("addNewFlight & getAllFlights");
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("testpu");
        DataFacade facade = new DataFacade();
        facade.setEntityManagerFactory(emf);
        facade.addNewFlight(new Flight("SAS", new Airport("England", "LHR", "", "London"), new Airport("Frankrig", "CDG", "", "Paris"),
                "2019-09-01T10:10", "2019-09-01T12:00", 2, 1500, 150, "1", "Boeing 747", 300));
        facade.addNewFlight(new Flight("Norwegian", new Airport("England", "LHR", "", "London"), new Airport("Holland", "AMS", "", "Amsterdam"),
                "2019-09-01T10:10", "2019-09-01T12:00", 2, 1500, 150, "1", "Boeing 747", 300));
        facade.addNewFlight(new Flight("American Airlines", new Airport("England", "LHR", "", "London"), new Airport("Tyskland", "FRA", "", "Frankfurt"),
                "2019-09-01T10:10", "2019-09-01T12:00", 2, 1500, 150, "1", "Boeing 747", 300));
        facade.addNewFlight(new Flight("British Airways", new Airport("England", "LHR", "", "London"), new Airport("Tyrkiet", "IST", "", "Istanbul"),
                "2019-09-01T10:10", "2019-09-01T12:00", 2, 1500, 150, "1", "Boeing 747", 300));
        facade.addNewFlight(new Flight("Lufthansa", new Airport("England", "LHR", "", "London"), new Airport("Spanien", "MAD", "", "Madrid"),
                "2019-09-01T10:10", "2019-09-01T12:00", 2, 1500, 150, "1", "Boeing 747", 300));
        List<FlightDTO> resultList = facade.getAllFlights();
        assertEquals(5, resultList.size());
        assertEquals("SAS", resultList.get(0).getAirline());
        assertEquals("London, LHR, England", resultList.get(0).getDeparture());
        assertEquals("Paris, CDG, Frankrig", resultList.get(0).getDestination());
        assertEquals("2019-09-01T10:10", resultList.get(0).getDepTime());
        assertEquals("2019-09-01T12:00", resultList.get(0).getArrTime());
        assertEquals(2, resultList.get(0).getDuration());
        assertEquals(1500, resultList.get(0).getPrice());
        assertEquals(150, resultList.get(0).getCancelInsurance());
        assertEquals("1", resultList.get(0).getAirplane());
        assertEquals("Boeing 747", resultList.get(0).getModel());
        assertEquals(300, resultList.get(0).getCapacity());
    }

    @Test
    public void testEditFlight() {
        System.out.println("editFlight");
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("testpu");
        DataFacade facade = new DataFacade();
        facade.setEntityManagerFactory(emf);
        Flight f = new Flight("SAS", new Airport("England", "LHR", "", "London"), new Airport("Frankrig", "CDG", "", "Paris"),
                "2019-09-01T10:10", "2019-09-01T12:00", 2, 1500, 150, "1", "Boeing 747", 300);
//        facade.addNewFlight(new Flight("Norwegian", new Airport("England", "LHR", "", "London"), new Airport("Holland", "AMS", "", "Amsterdam"),
//                "2019-09-01T10:10", "2019-09-01T12:00", 2, 1500, 150, "1", "Boeing 747", 300));
        FlightDTO result = facade.editFlight(f, 1);
        assertEquals("Paris, CDG, Frankrig", result.getDestination());
    }

    @Test
    public void testAddNewAirportGetAllAirports() throws Exception {
        System.out.println("addNewAirport & getAllAirports");
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("testpu");
        DataFacade facade = new DataFacade();
        facade.setEntityManagerFactory(emf);
        List<AirportDTO> result = facade.getAllAirports();
        assertEquals(12, result.size());
    }

    @Test
    public void testGetOwnFlights() throws Exception {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("testpu");
        DataFacade facade = new DataFacade();
        facade.setEntityManagerFactory(emf);
//        facade.addNewFlight(new Flight("SAS", new Airport("England", "LHR", "", "London"), new Airport("Frankrig", "CDG", "", "Paris"),
//                "2019-09-01T10:10", "2019-09-01T12:00", 2, 1500, 150, "1", "Boeing 747", 300));
//        facade.addNewFlight(new Flight("Norwegian", new Airport("England", "LHR", "", "London"), new Airport("Holland", "AMS", "", "Amsterdam"),
//                "2019-09-01T10:10", "2019-09-01T12:00", 2, 1500, 150, "1", "Boeing 747", 300));
//        facade.addNewFlight(new Flight("American Airlines", new Airport("England", "LHR", "", "London"), new Airport("Tyskland", "FRA", "", "Frankfurt"),
//                "2019-09-01T10:10", "2019-09-01T12:00", 2, 1500, 150, "1", "Boeing 747", 300));
//        facade.addNewFlight(new Flight("British Airways", new Airport("England", "LHR", "", "London"), new Airport("Tyrkiet", "IST", "", "Istanbul"),
//                "2019-09-01T10:10", "2019-09-01T12:00", 2, 1500, 150, "1", "Boeing 747", 300));
//        facade.addNewFlight(new Flight("Lufthansa", new Airport("England", "LHR", "", "London"), new Airport("Spanien", "MAD", "", "Madrid"),
//                "2019-09-01T10:10", "2019-09-01T12:00", 2, 1500, 150, "1", "Boeing 747", 300));
        List<OwnFlightDTO> resultList = facade.getOwnFlights();
        assertEquals(5, resultList.size());
        assertEquals(1, resultList.get(0).getId());
        assertEquals("SAS", resultList.get(0).getAirline());
        assertEquals("London, LHR, England", resultList.get(0).getDeparture());
        assertEquals("Paris, CDG, Frankrig", resultList.get(0).getDestination());
        assertEquals("2019-09-01T10:10", resultList.get(0).getDepTime());
        assertEquals("2019-09-01T12:00", resultList.get(0).getArrTime());
        assertEquals(2, resultList.get(0).getDuration());
        assertEquals(1500, resultList.get(0).getPrice());
        assertEquals(150, resultList.get(0).getCancelInsurance());
        assertEquals("1", resultList.get(0).getAirplane());
        assertEquals("Boeing 747", resultList.get(0).getModel());
        assertEquals(300, resultList.get(0).getCapacity());
    }
}
