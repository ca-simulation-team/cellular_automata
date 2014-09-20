package com.bcis.ca.presentation;

import java.awt.event.ActionEvent;
import javax.inject.Named;
import javax.enterprise.context.RequestScoped;

/**
 * Manages loading of existing examples to the simulation window
 *
 * @author Nawaz Gayoom
 * @version 0.1 - 20/09/2014: Methods updated - Vadim Chernov.
 */
@Named(value = "exampleManager")
@RequestScoped
public class ExampleManager {

    SimManager simManager;
    
    public ExampleManager() {
        simManager =  new SimManager();
    }

    public void loadExampleButton(ActionEvent actionEvent) {
       simManager.loadGoL();
    }

}
