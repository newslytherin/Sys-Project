package facade;

import entity.UserData;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class UserDataFacade {

    private static EntityManagerFactory emf = Persistence.createEntityManagerFactory("pu");

    public UserDataFacade() {
    }

    public void setEntityManagerFactory(EntityManagerFactory emf) {
        this.emf = emf;
    }

    public List<UserData> getAllUserData() {
        EntityManager em = emf.createEntityManager();
        String jpql = "SELECT ud FROM UserData ud";
        try {
            return em.createQuery(jpql, UserData.class).getResultList();
        } finally {
            em.close();
        }
    }

    public UserData saveUserData(UserData ud) {
        EntityManager em = emf.createEntityManager();
        UserData tmp = ud;
        try {
            em.getTransaction().begin();
            em.persist(ud);
            em.getTransaction().commit();
        } finally {
            em.close();
        }
        return tmp;
    }
}
