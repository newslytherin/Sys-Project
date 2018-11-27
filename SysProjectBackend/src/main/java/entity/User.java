package entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import org.mindrot.jbcrypt.BCrypt;

@Entity
@Table(name = "users")
public class User implements Serializable
{

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Basic(optional = false)
    @NotNull
    @Column(name = "user_name", length = 25)

    private String userName;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 255)
    @Column(name = "user_pass")
    private String userPass;
    @JoinTable(name = "user_roles", joinColumns =
    {
        @JoinColumn(name = "user_name", referencedColumnName = "user_name")
    }, inverseJoinColumns =
    {
        @JoinColumn(name = "role_name", referencedColumnName = "role_name")
    })
    @ManyToMany
    private List<Role> roleList = new ArrayList();
    @Basic(optional = true)
    private String gender;
    @Column(unique = true)
    private String email;
    @OneToMany(mappedBy = "user")
    private List<DBOrder> orders;

    //----------------------------------//
    public User()
    {
    }

    public User(String email, String userName, String userPass, String gender)
    {
        this.email = email;
        this.gender = gender;
        this.userName = userName;
        this.userPass = BCrypt.hashpw(userPass, BCrypt.gensalt());
    }
    //----------------------------------//

    public boolean verifyPassword(String pw)
    {
        return BCrypt.checkpw(pw, this.userPass);
    }

    //----------------------------------//
    public void setRoleList(List<Role> roleList)
    {
        this.roleList = roleList;
    }

    public void setUserName(String userName)
    {
        this.userName = userName;
    }

    public void setUserPass(String userPass)
    {
        this.userPass = userPass;
    }

    public void setGender(String gender)
    {
        this.gender = gender;
    }

    public void setEmail(String email)
    {
        this.email = email;
    }

    public void setId(int id)
    {
        this.id = id;
    }

    //----------------------------------//
    public String getUserName()
    {
        return userName;
    }

    public String getUserPass()
    {
        return this.userPass;
    }

    public List<Role> getRoleList()
    {
        return roleList;
    }

    public List<DBOrder> getOrders()
    {
        return orders;
    }

    public List<String> getRolesAsStrings()
    {
        if (roleList.isEmpty())
        {
            return null;
        }
        List<String> rolesAsStrings = new ArrayList();
        for (Role role : roleList)
        {
            rolesAsStrings.add(role.getRoleName());
        }
        return rolesAsStrings;
    }

    public String getGender()
    {
        return gender;
    }

    public String getEmail()
    {
        return email;
    }

    public int getId()
    {
        return id;
    }

    //----------------------------------//
    public void addRole(Role userRole)
    {
        roleList.add(userRole);
    }

    public void addOrder(DBOrder order)
    {
        order.setUser(this);
    }

    @Override
    public String toString()
    {
        return "User{" + "id=" + id + ", userName=" + userName + ", userPass=" + userPass + ", roleList=" + roleList + ", gender=" + gender + ", email=" + email + '}';
    }

    
    
}
