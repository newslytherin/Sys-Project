package rest;

import javax.persistence.Persistence;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;

@Path("init")
public class InitResource {

    @Context
    private UriInfo context;

    public InitResource() {
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public void getJson() {
        Persistence.generateSchema("pu", null);
    }
}
