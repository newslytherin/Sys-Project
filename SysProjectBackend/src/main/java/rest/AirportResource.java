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
import javax.ws.rs.core.MediaType;

/**
 * REST Web Service
 *
 * @author Jacob Borg
 */
@Path("airports")
public class AirportResource
{

    @Context
    private UriInfo context;
    private Gson gson = new GsonBuilder().setPrettyPrinting().create();
    private DataFacade facade = new DataFacade();

    /**
     * Creates a new instance of AirportResource
     */
    public AirportResource()
    {
    }

    /**
     * Retrieves representation of an instance of rest.AirportResource
     *
     * @return an instance of java.lang.String
     * @throws exceptions.InvalidDataException
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getJson() throws InvalidDataException
    {
        return gson.toJson(facade.getAllAirports());
    }

    /**
     * PUT method for updating or creating an instance of AirportResource
     *
     * @param content representation for the resource
     */
}
