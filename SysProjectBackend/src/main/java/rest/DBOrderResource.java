/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import exceptions.InvalidDataException;
import facade.DataFacade;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * REST Web Service
 *
 * @author Hupra Laptop
 */
@Path("order")
public class DBOrderResource
{

    @Context
    private UriInfo context;


    public DBOrderResource()
    {
    }

    @GET
    @Path("id/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getJson(@PathParam("id") int id) throws InvalidDataException
    {
        DataFacade df = new DataFacade();
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        return Response.ok(gson.toJson(df.getOrderByUserId(id))).build();
        
    }
}
