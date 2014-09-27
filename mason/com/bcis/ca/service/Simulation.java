package com.bcis.ca.service;

import com.bcis.ca.presentation.ExampleObject;
import javax.ejb.EJB;
import javax.ejb.Stateful;
import sim.app.tutorial1and2.Tutorial1;
import sim.engine.SimState;

/**
 * Acts as a middle layer between Mason and the presentation. It holds all the
 * simulation data and is able to create, edit and retrieve simulations and its
 * states
 *
 * @author Nawaz Gayoom
 * @version 0.1 - 14/09/2014: Created.
 * @version 1.0 - 22/09/2014: updated to load a simulation and start it
 * 
 * @author Vadim Chernov
 * @version 0.2 - 20/09/2014: Skeleton methods added and updated
 */
@Stateful
public class Simulation {

    private SimState simulationState;
    private String backgroundColor;
    private String backgroundImage;
    private Object[] objects;
    private Rule[] rules;
    private Agent[] agents;
    @EJB
    CanvasHandler canvasHandler;
    
    public Simulation() {
        
    }

    
    public void startSimulation() {
        canvasHandler.drawCanvas("drawca");
        this.simulationState = new Tutorial1(System.currentTimeMillis());
        simulationState.start();
        
    }

    public boolean createNewSimulation() {
        boolean simulationCreated = false;

        return simulationCreated;
    }
 
    public void stopSimulation() {
        simulationState.finish();
    }

    public void resetSimulation() {
        simulationState.kill();
    }

    public boolean updateSimulation() {
        boolean simulationUpdated = false;

        return simulationUpdated;
    }

    public void addRule(Rule rule) {

    }

    public boolean removeRule(int arrayIndex) {
        boolean ruleRemoved = false;

        return ruleRemoved;
    }

    public void addAgent(Agent agent) {

    }

    public boolean removeAgent(int arrayIndex) {
        boolean agentRemoved = false;

        return agentRemoved;
    }

    /**
     * @return the objects
     */
    public Object[] getObjects() {
        return objects;
    }

    /**
     * @return the rules
     */
    public Rule[] getRules() {
        return rules;
    }

    /**
     * @return the agents
     */
    public Agent[] getAgents() {
        return agents;
    }

    /**
     * @return the backgroundColor
     */
    public String getBackgroundColor() {
        return backgroundColor;
    }

    /**
     * @param backgroundColor the backgroundColor to set
     */
    public void setBackgroundColor(String backgroundColor) {
        this.backgroundColor = backgroundColor;
    }

    /**
     * @return the backgroundImage
     */
    public String getBackgroundImage() {
        return backgroundImage;
    }

    /**
     * @param backgroundImage the backgroundImage to set
     */
    public void setBackgroundImage(String backgroundImage) {
        this.backgroundImage = backgroundImage;
    }

    /**
     * loads the simulation
     * @param exampleToLoad  the simulationState to set
     */ 
    public void setSimulationStateFromExamples(ExampleObject exampleToLoad) {
        if(exampleToLoad.getExampleID() == 0){
            this.simulationState = new Tutorial1(System.currentTimeMillis());
        }
        
    }

    public void setSimulationState(SimState state){
        
    }
    
}
