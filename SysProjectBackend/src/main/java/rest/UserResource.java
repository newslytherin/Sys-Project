/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import entity.Role;
import entity.RoleFacade;
import entity.DBOrder;
import entity.User;
import entity.UserFacade;
import exceptions.InvalidDataException;
import facade.DataFacade;
import javax.persistence.Persistence;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("user")
public class UserResource
{

    @Context
    private UriInfo context;
    private Gson gson = new GsonBuilder().setPrettyPrinting().create();
    private DataFacade facade = new DataFacade();

    public UserResource()
    {
        facade.setEntityManagerFactory(Persistence.createEntityManagerFactory("pu"));
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getJson()
    {
        //TODO return proper representation object
        throw new UnsupportedOperationException();
    }

    @PUT
    @Path("edit/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response putUser(String content, @PathParam("id") int id)
    {
        User u = gson.fromJson(content, User.class);
        return Response.ok(gson.toJson(facade.editUser(u, id))).build();
    }

    UserFacade uf = UserFacade.getInstance();

    @POST
    @Path("add")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response postUser(String json) throws InvalidDataException
    {
        Gson gson = new GsonBuilder().setPrettyPrinting().create();

        User user = gson.fromJson(json, User.class);

        if (user.getEmail() == null || user.getUserName() == null || user.getUserPass() == null)
        {
            throw new InvalidDataException("Not enough data");
        }

        Role role = RoleFacade.roleExist("user");
        if (role == null)
        {
            role = new Role("user");
            System.out.println("fisk");
        }
        
        
        
        user.addRole(role);

        user.BCryptPass();

        return Response.ok(gson.toJson(uf.addUser(user))).build();
    }

    
    @PUT
    @Path("add/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addTripToUser(String Content, @PathParam("id") int id){
        DBOrder o = gson.fromJson(Content, DBOrder.class);
        return Response.ok(gson.toJson(facade.addOrderToUser(o, id))).build();
    }
    
}
