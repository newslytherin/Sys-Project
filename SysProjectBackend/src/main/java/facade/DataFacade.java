package facade;

import entity.Airport;
import entity.Flight;
import entity.FlightDTO;
import entity.AirportDTO;
import entity.DBOrder;
import entity.OwnFlightDTO;
import entity.User;
import entity.UserDTO;
import exceptions.InvalidDataException;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.TypedQuery;

public class DataFacade {

    public static void main(String[] args) {
        try {
            DataFacade facade = new DataFacade();
            facade.setEntityManagerFactory(Persistence.createEntityManagerFactory("pu"));
            System.out.println(facade.getAllFlights());
        } catch (InvalidDataException ex) {
            Logger.getLogger(DataFacade.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    private static EntityManagerFactory emf;


    public DataFacade() {
    }

    public void setEntityManagerFactory(EntityManagerFactory emf) {
        this.emf = emf;
    }

    public List<FlightDTO> getAllFlights() throws InvalidDataException {
        EntityManager em = emf.createEntityManager();
        String jpql = "SELECT new entity.FlightDTO(f) FROM Flight f";

        try {
            TypedQuery<FlightDTO> query = em.createQuery(jpql, FlightDTO.class);
            return query.getResultList();
        } catch (Exception ex) {
            throw new InvalidDataException("Inserted data is not valid");
        } finally {
            em.close();
        }
    }

    public FlightDTO addNewFlight(Flight f) {
        EntityManager em = emf.createEntityManager();
        try {
            em.getTransaction().begin();
            em.persist(f);
            em.getTransaction().commit();
        } finally {
            em.close();
        }
        FlightDTO fdto = new FlightDTO(f);
        return fdto;
    }

    public FlightDTO editFlight(Flight f, long id) {
        EntityManager em = emf.createEntityManager();
        Flight tmp = null;
        try {
            em.getTransaction().begin();
            tmp = em.find(Flight.class, id).updateValues(f);
            em.merge(tmp);
            em.getTransaction().commit();
        } finally {
            em.close();
        }
        return new FlightDTO(tmp);
    }

    public List<AirportDTO> getAllAirports() throws InvalidDataException
    {
        EntityManager em = emf.createEntityManager();
        String jpql = "SELECT new entity.AirportDTO(a) FROM Airport a";

        try {
            TypedQuery<AirportDTO> query = em.createQuery(jpql, AirportDTO.class);
            return query.getResultList();
        } catch (Exception ex) {
            throw new InvalidDataException("Inserted data is not valid");
        } finally {
            em.close();
        }
    }
    
    public AirportDTO addNewAirport(Airport a) {
        EntityManager em = emf.createEntityManager();
        try {
            em.getTransaction().begin();
            em.persist(a);
            em.getTransaction().commit();
        } finally {
            em.close();
        }
        AirportDTO adto = new AirportDTO(a);
        return adto;
    }
    
    public List<OwnFlightDTO> getOwnFlights() throws InvalidDataException {
        EntityManager em = emf.createEntityManager();
        String jpql = "SELECT new entity.OwnFlightDTO(f) FROM Flight f";

        try {
            TypedQuery<OwnFlightDTO> query = em.createQuery(jpql, OwnFlightDTO.class);
            return query.getResultList();
        } catch (Exception ex) {
            throw new InvalidDataException("Inserted data is not valid");
        } finally {
            em.close();
        }
    }
    
    public UserDTO editUser(User u, int id) {
        EntityManager em = emf.createEntityManager();
        User tmp = null;
        try {
            em.getTransaction().begin();
            tmp = em.find(User.class, id).updateValues(u);
            em.merge(tmp);
            em.getTransaction().commit();
        } finally {
            em.close();
        }
        return new UserDTO(tmp);
    }
    
    public UserDTO addOrderToUser(DBOrder o, int id){
        EntityManager em = emf.createEntityManager();
        User u = null;
        try{
            em.getTransaction().begin();
            u = em.find(User.class, id);
            u.addOrder(o);
            em.merge(u);
            em.getTransaction().commit();
        } finally{
            em.close();
        }
        return new UserDTO(u);
    }
}
