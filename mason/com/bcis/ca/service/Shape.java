package com.bcis.ca.service;


/**
 * Represents a shape to be used in  an object or agent 
 * 
 * @author Vadim Chernov
 * 
 * @version 0.1 - 14/09/2014: Class with skeleton methods created - Vadim Chernov
 */

public abstract class Shape {

    private String name;
    
  

    /**
     * @return the name
     */
    public String getName() {
        return name;
    }

    /**
     * @param name the name to set
     */
    public void setName(String name) {
        this.name = name;
    }
}
