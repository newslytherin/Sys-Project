package facade;

import entity.Flight;
import entity.FlightDTO;
import exceptions.InvalidDataException;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.TypedQuery;

public class DataFacade {

    private static EntityManagerFactory emf;

    public DataFacade() {
        emf = Persistence.createEntityManagerFactory("pu");
    }

    public void addEntityManageractory(EntityManagerFactory emf) {
        this.emf = emf;
    }

    public static List<FlightDTO> getAllFlights() throws InvalidDataException {
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

    public static FlightDTO addNewFlight(Flight f) {
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

    public static FlightDTO editFlight(Flight f) {
        EntityManager em = emf.createEntityManager();
        Flight tmp = null;
        try {
            em.getTransaction().begin();
            tmp = em.find(Flight.class, f.getId()).updateValues(f);
            em.getTransaction().commit();
        } finally {
            em.close();
        }
        return new FlightDTO(tmp);
    }

}
