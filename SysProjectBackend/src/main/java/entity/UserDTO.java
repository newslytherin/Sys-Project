/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.util.ArrayList;
import java.util.List;

public class UserDTO
{
    int id;
    String email, userName, userPass, gender, token;
    List<String> roles;

    public UserDTO(User user, String token)
    {
        this.id = user.getId();
        this.token = token;
        this.email = user.getEmail();
        this.userName = user.getUserName();
        this.userPass = user.getUserPass();
        this.gender = user.getGender();
        this.roles = new ArrayList();
        for (Role role : user.getRoleList())
        {
            this.roles.add(role.getRoleName());
        }

    }

    public UserDTO(User user)
    {
        this.id = user.getId();
        this.email = user.getEmail();
        this.userName = user.getUserName();
        this.userPass = user.getUserPass();
        this.gender = user.getGender();
        this.roles = new ArrayList();
        for (Role role : user.getRoleList())
        {
            this.roles.add(role.getRoleName());
        }
    }

    public String getEmail()
    {
        return email;
    }

    public String getUser_name()
    {
        return userName;
    }

    public String getUser_pass()
    {
        return userPass;
    }

    public String getGender()
    {
        return gender;
    }

    public String getToken()
    {
        return token;
    }

    public List<String> getRoles()
    {
        return roles;
    }

    @Override
    public String toString()
    {
        return "UserDTO{" + "email=" + email + ", user_name=" + userName + ", user_pass=" + userPass + ", gender=" + gender + ", token=" + token + ", roles=" + roles + '}';
    }

}
