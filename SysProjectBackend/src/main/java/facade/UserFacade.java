package facade;

import entity.User;
import entity.UserDTO;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import exceptions.AuthenticationException;

/**
 *
 * @author lam@cphbusiness.dk
 */
public class UserFacade {

    //Default EntityManagerFactory
    EntityManagerFactory emf = Persistence.createEntityManagerFactory("pu");
    private static final UserFacade instance = new UserFacade();

    private UserFacade() {
    }

    public static UserFacade getInstance() {
        return instance;
    }

    public User getVeryfiedUser(String email, String password) throws AuthenticationException {
        EntityManager em = emf.createEntityManager();
        User user;
        try {
            user = em.createQuery("SELECT u FROM User u WHERE u.email = :email", User.class)
                    .setParameter("email", email)
                    .getSingleResult();
            //user = em.find(User.class, email);
            if (user == null || !user.verifyPassword(password)) {
                throw new AuthenticationException("Invalid email or password");
            }
        } finally {
            em.close();
        }
        return user;
    }

    public UserDTO addUser(User u) {
        EntityManager em = emf.createEntityManager();
        try {
            em.getTransaction().begin();
            em.merge(u);
            em.getTransaction().commit();
        } finally {
            em.close();
        }
        UserDTO udto = new UserDTO(u);
        return udto;
    }

}
