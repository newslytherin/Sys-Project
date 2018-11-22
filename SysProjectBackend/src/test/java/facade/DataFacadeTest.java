//package facade;
//
//import entity.Flight;
//import entity.FlightDTO;
//import java.util.List;
//import javax.persistence.EntityManagerFactory;
//import javax.persistence.Persistence;
//import org.junit.After;
//import org.junit.AfterClass;
//import org.junit.Before;
//import org.junit.BeforeClass;
//import org.junit.Test;
//import static org.junit.Assert.*;
//
//public class DataFacadeTest {
//
//    private EntityManagerFactory emf = Persistence.createEntityManagerFactory("testpu");
//    private DataFacade facade = new DataFacade();
//
//    public DataFacadeTest() {
//        facade.setEntityManagerFactory(emf);
//    }
//
//    @BeforeClass
//    public static void setUpClass() {
//    }
//
//    @AfterClass
//    public static void tearDownClass() {
//    }
//
//    @Before
//    public void setUp() {
//    }
//
//    @After
//    public void tearDown() {
//    }
//
//    @org.junit.Test
//    public void testGetAllFlights() throws Exception {
//        System.out.println("getAllFlights");
//        int expResult = 10;
//        List<FlightDTO> resultList = facade.getAllFlights();
//        assertEquals(expResult, resultList.size());
//    }
//
//    @org.junit.Test
//    public void testAddNewFlight() {
//        System.out.println("addNewFlight");
//        Flight f = null;
//        FlightDTO expResult = null;
//        FlightDTO result = facade.addNewFlight(f);
//        assertEquals(expResult, result);
//        // TODO review the generated test code and remove the default call to fail.
//        fail("The test case is a prototype.");
//    }
//
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
//}
