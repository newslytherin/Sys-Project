package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import entity.UserData;
import facade.UserDataFacade;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;

@Path("userdata")
public class UserDataResource {

    @Context
    private UriInfo context;
    private Gson gson = new GsonBuilder().setPrettyPrinting().create();
    private UserDataFacade facade = new UserDataFacade();

    public UserDataResource() {
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getAllData() {
        return gson.toJson(facade.getAllUserData());
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public void postNewData(String content) {
        facade.saveUserData(gson.fromJson(content, UserData.class));
    }
}
