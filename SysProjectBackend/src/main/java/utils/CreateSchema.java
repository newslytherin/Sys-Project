package utils;

import javax.persistence.Persistence;



public class CreateSchema {

    
    public static void main(String[] args) {
        Persistence.generateSchema("pu", null);
        
    }

}
