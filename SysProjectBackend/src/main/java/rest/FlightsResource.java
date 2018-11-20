package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
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
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.core.MediaType;

@Path("flights")
public class FlightsResource {

    @Context
    private UriInfo context;
    private Gson gson;
    private static final String DATBOI$URL = "";
    private static final String MIXURL = "";

    public FlightsResource() {
        gson = new GsonBuilder().setPrettyPrinting().create();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getFlights() {
        return gson.toJson(DataFacade.getAllFlights());
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
        data.add(executor.submit(() -> {
            return getDatboi$Data();
        }));
        data.add(executor.submit(() -> {
            return getMixData();
        }));
        JsonArray ja = new JsonArray();
        for (Future<String> fut : data) {
            try {
                ja.add(fut.get());
            } catch (InterruptedException | ExecutionException ex) {
                Logger.getLogger(FlightsResource.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        return ja.getAsString();
    }

    @POST
    @Path("new")
    @Consumes(MediaType.APPLICATION_JSON)
    public void postFlights(String content) {
        DataFacade.addNewFlight();
    }

    @PUT
    @Path("edit")
    @Consumes(MediaType.APPLICATION_JSON)
    public void putFlights(String content) {
        DataFacade.editFlight();
    }

    public static String getDatboi$Data() {
        String jsonStr = null;
        try {
            URL url = new URL(DATBOI$URL);
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("GET");
            con.setRequestProperty("Accept", "application/json;charset=UTF-8");
            con.setRequestProperty("User-Agent", "server");
            Scanner scan = new Scanner(con.getInputStream());
            if (scan.hasNext()) {
                jsonStr = scan.nextLine();
            }
            scan.close();
        } catch (Exception ex) {
            Logger.getLogger(FlightsResource.class.getName()).log(Level.SEVERE, null, ex);
        }
        return jsonStr;
    }

    public static String getMixData() {
        String jsonStr = null;
        try {
            URL url = new URL(MIXURL);
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("GET");
            con.setRequestProperty("Accept", "application/json;charset=UTF-8");
            con.setRequestProperty("User-Agent", "server");
            Scanner scan = new Scanner(con.getInputStream());
            if (scan.hasNext()) {
                jsonStr = scan.nextLine();
            }
            scan.close();
        } catch (Exception ex) {
            Logger.getLogger(FlightsResource.class.getName()).log(Level.SEVERE, null, ex);
        }
        return jsonStr;
    }
}
