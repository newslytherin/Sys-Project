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

    String email, user_name, user_pass, gender, token;
    List<String> roles;

    public UserDTO(User user, String token)
    {
        this.token = token;
        this.email = user.getEmail();
        this.user_name = user.getUserName();
        this.user_pass = user.getUserPass();
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
        return user_name;
    }

    public String getUser_pass()
    {
        return user_pass;
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
        return "UserDTO{" + "email=" + email + ", user_name=" + user_name + ", user_pass=" + user_pass + ", gender=" + gender + ", token=" + token + ", roles=" + roles + '}';
    }

}
