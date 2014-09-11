package com.bcis.ca.presentation;

import javax.inject.Named;
import javax.enterprise.context.RequestScoped;

/**
 * Manages loading of existing examples to the simulation window
 * @author Nawaz Gayoom
 * @version 0.1 - 11/09/2014: Created.
 */
@Named(value = "exampleManager")
@RequestScoped
public class ExampleManager {

    
    public ExampleManager() {
    }
    
}
