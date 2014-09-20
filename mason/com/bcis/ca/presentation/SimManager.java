package com.bcis.ca.presentation;

import com.bcis.ca.service.Simulation;
import java.awt.event.ActionEvent;
import javax.ejb.EJB;
import javax.faces.view.ViewScoped;
import javax.inject.Named;
import sim.app.tutorial1and2.Tutorial1;

/**
 * Manages the main simulation view
 *
 * @author Nawaz Gayoom
 * @version 0.2 - 20/09/2014: Skeleton methods created - Vadim Chernov.
 */
@Named(value = "simManager")
@ViewScoped
public class SimManager {
    
    @EJB
    Simulation sim;

    
    public SimManager() {
        
    }

    public void playButton(ActionEvent actionEvent) {
        sim.startSimulation();
    }

    public void stopButton(ActionEvent actionEvent) {
        sim.stopSimulation();
    }
    

    public void pauseButton(ActionEvent actionEvent) {
        
    }

    public void loadGoL() {
        sim = new Simulation(new Tutorial1(System.currentTimeMillis()));
        
    }
    
    

    
    
}
