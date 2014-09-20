package com.bcis.ca.presentation;

import com.bcis.ca.service.Simulation;
import java.awt.event.ActionEvent;
import javax.faces.view.ViewScoped;
import javax.inject.Named;

/**
 * Manages the main simulation view
 *
 * @author Nawaz Gayoom
 * @version 0.2 - 20/09/2014: Skeleton methods created - Vadim Chernov.
 */
@Named(value = "simManager")
@ViewScoped
public class SimManager {
    Simulation sim;

    
    public SimManager() {

    }

    public void playButton(ActionEvent actionEvent) {

    }

    public void stopButton(ActionEvent actionEvent) {

    }
    

    public void pauseButton(ActionEvent actionEvent) {
        
    }



}
