/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Scanner;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
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
@Path("people")
public class PeopleResource
{

    public String fetchAPIfromInternet(String strUrl) throws MalformedURLException, IOException
    {
        URL url = new URL(strUrl);
        HttpURLConnection con = (HttpURLConnection) url.openConnection();
        con.setRequestMethod("GET");
        con.setRequestProperty("Accept", "application/json;charset=utf-8");
        con.setRequestProperty("User-Agent", "server");
        Scanner scan = new Scanner(con.getInputStream(), "UTF-8");
        String jsonStr = null;
        if (scan.hasNext())
        {
            jsonStr = scan.nextLine();
        }
        scan.close();
        System.out.println(jsonStr);
        return jsonStr;
    }
    
    public String getPeopleData(int amount) throws IOException{
        return fetchAPIfromInternet("https://randomuser.me/api/?seed=bobtheseed&gender=female&nat=dk&results=" + amount);
    }
    
    public String getPeopleData(int amount, int page) throws IOException{
        return fetchAPIfromInternet("https://randomuser.me/api/?seed=bobtheseed&gender=female&nat=dk&results=" + amount + "&page=" + page);
    }
    

    @Context
    private UriInfo context;

    public PeopleResource()
    {
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getJson() throws IOException
    {
        return Response.ok(getPeopleData(420)).header("x-total-count", 420).build();
    }
    
    @GET
    @Path("page/{page}/amount/{amount}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getJson2(@PathParam("page") int page, @PathParam("amount") int amount) throws IOException
    {
        return Response.ok(getPeopleData(amount, page)).header("x-total-count", 420).build();
    }
}
