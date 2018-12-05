/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package facade;

import entity.Role;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class RoleFacade {

    public static Role roleExist(String roleName) {

        EntityManagerFactory emf = Persistence.createEntityManagerFactory("pu");
        EntityManager em = emf.createEntityManager();
        Role role = null;
        try {
            role = em.find(Role.class, roleName);
        } finally {
            em.close();
        }
        //return (role != null);
        return role;

    }

    public static void main(String[] args) {
        System.out.println(RoleFacade.roleExist("user2"));
    }
}
