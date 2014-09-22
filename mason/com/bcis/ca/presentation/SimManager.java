package com.bcis.ca.presentation;

import com.bcis.ca.service.CanvasHandler;
import com.bcis.ca.service.ExampleManager;
import com.bcis.ca.service.Simulation;
import java.awt.event.ActionEvent;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.faces.application.FacesMessage;
import javax.faces.context.FacesContext;
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
    
    ExampleObject exampleToLoad;
    int exampleID;
    List<ExampleObject> examples;
    
    @EJB
    Simulation sim;
    @EJB
    CanvasHandler canvasHandler;
    @EJB
    ExampleManager exampleManager;
    
    public SimManager() {
        
    }
    
    @PostConstruct
    public void setExamples(){
       exampleManager.loadAllExamples();
       examples = exampleManager.getExamples();
    }

    public void playButton() {
        sim.startSimulation();
        
    }

    public void stopButton() {
        sim.stopSimulation();
    }
    

    public void pauseButton() {
        
    }

    public void loadSimulationFromExamples(){
        sim.setSimulationStateFromExamples(exampleToLoad);
    }
    
    public void loadSimulationFromFile(){
        
    }

    public ExampleObject getExampleToLoad() {
        return exampleToLoad;
    }

    public void setExampleToLoad(ExampleObject exampleToLoad) {
        
        this.exampleToLoad = exampleToLoad;
    }

    public List<ExampleObject> getExamples() {
        return examples;
    }

    public void setExamples(ArrayList<ExampleObject> examples) {
        this.examples = examples;
    }
    
    

    
    
}
