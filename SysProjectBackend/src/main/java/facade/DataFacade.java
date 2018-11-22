package facade;

import entity.Flight;
import entity.FlightDTO;
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

    public FlightDTO editFlight(Flight f) {
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
