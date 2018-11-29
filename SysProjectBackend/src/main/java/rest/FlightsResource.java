package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import entity.Flight;
import exceptions.InvalidDataException;
import facade.DataFacade;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.persistence.Persistence;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("flights")
public class FlightsResource {

    @Context
    private UriInfo context;
    private Gson gson = new GsonBuilder().setPrettyPrinting().create();
    private static final String DATBOI$URL = "https://emilvh.dk/DATFlights/api/flights";
    private static final String MIXURL = "";
    private DataFacade facade = new DataFacade();

    public FlightsResource() {
        facade.setEntityManagerFactory(Persistence.createEntityManagerFactory("pu"));
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getFlights() throws InvalidDataException {
        return gson.toJson(facade.getAllFlights());
    }
    
    @GET
    @Path("own")
    @Produces(MediaType.APPLICATION_JSON)
    public String getOwnFlights() throws InvalidDataException {
        return gson.toJson(facade.getOwnFlights());
    }

    @GET
    @Path("all")
    @Produces(MediaType.APPLICATION_JSON)
    public String getAllFlights() {
        ExecutorService executor = Executors.newFixedThreadPool(3);
        List<Future<String>> data = new ArrayList<>();
        data.add(executor.submit(() -> {
            return getFlights();
        }));
        if (!DATBOI$URL.equals("")) {
            data.add(executor.submit(() -> {
                return getDatboi$Data();
            }));
        }
        if (!MIXURL.equals("")) {
            data.add(executor.submit(() -> {
                return getMixData();
            }));
        }
        List<String> dataAsString = new ArrayList<>();
//        JsonArray ja = new JsonArray();
        data.forEach((fut) -> {
            try {
//                ja.add(fut.get());
                dataAsString.add(fut.get());
            } catch (InterruptedException | ExecutionException ex) {
                Logger.getLogger(FlightsResource.class.getName()).log(Level.SEVERE, null, ex);
            }
        });
//        return ja.getAsString();
        return dataAsString.toString();
//        return data.toString();
    }

    @POST
    @Path("new")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response postFlights(String content) throws InvalidDataException {
        Flight f = gson.fromJson(content, Flight.class);
        return Response.ok(gson.toJson(facade.addNewFlight(f))).build();
    }

    @PUT
    @Path("edit/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response putFlights(String content, @PathParam("id") long id) {
        Flight f = gson.fromJson(content, Flight.class);
        return Response.ok(gson.toJson(facade.editFlight(f, id))).build();
    }

    public static String getDatboi$Data() {
        String jsonStr = "";
        try {
            URL url = new URL(DATBOI$URL);
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("GET");
            con.setRequestProperty("Accept", "application/json;charset=UTF-8");
            con.setRequestProperty("User-Agent", "server");
            Scanner scan = new Scanner(con.getInputStream());
            while(scan.hasNext()) {
                jsonStr += scan.nextLine();
            }
            scan.close();
        } catch (Exception ex) {
            Logger.getLogger(FlightsResource.class.getName()).log(Level.SEVERE, null, ex);
        }
        return jsonStr;
    }

    public static String getMixData() {
        String jsonStr = "";
        try {
            URL url = new URL(MIXURL);
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("GET");
            con.setRequestProperty("Accept", "application/json;charset=UTF-8");
            con.setRequestProperty("User-Agent", "server");
            Scanner scan = new Scanner(con.getInputStream());
            while (scan.hasNext()) {
                jsonStr += scan.nextLine();
            }
            scan.close();
        } catch (Exception ex) {
            Logger.getLogger(FlightsResource.class.getName()).log(Level.SEVERE, null, ex);
        }
        return jsonStr;
    }
}
