package facade;

import entity.Airport;
import entity.Flight;
import entity.FlightDTO;
import java.util.List;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import static org.junit.Assert.*;

public class DataFacadeTest {

    private EntityManagerFactory emf = Persistence.createEntityManagerFactory("testpu");
    private DataFacade facade = new DataFacade();

    public DataFacadeTest() {
        facade.setEntityManagerFactory(emf);
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

    @org.junit.Test
    public void testAddNewFlightGetAllFlights() throws Exception {
        System.out.println("addNewFlight & getAllFlights");
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
        assertEquals("London, LHR, England", resultList.get(0).getDeparture());
        assertEquals("London, LHR, England", resultList.get(1).getDeparture());
        assertEquals("London, LHR, England", resultList.get(2).getDeparture());
        assertEquals("London, LHR, England", resultList.get(3).getDeparture());
        assertEquals("London, LHR, England", resultList.get(4).getDeparture());
        assertEquals("Paris, CDG, Frankrig", resultList.get(0).getDestination());
        assertEquals("Amsterdam, AMS, Holland", resultList.get(1).getDestination());
        assertEquals("Frankfurt, FRA, Tyskland", resultList.get(2).getDestination());
        assertEquals("Istanbul, IST, Tyrkiet", resultList.get(3).getDestination());
        assertEquals("Madrid, MAD, Spanien", resultList.get(4).getDestination());
    }

//    @org.junit.Test
//    public void testEditFlight() {
//        System.out.println("editFlight");
//        Flight f = null;
//        FlightDTO expResult = null;
//        FlightDTO result = facade.editFlight(f);
//        assertEquals(expResult, result);
//        // TODO review the generated test code and remove the default call to fail.
//        fail("The test case is a prototype.");
//    }
}
