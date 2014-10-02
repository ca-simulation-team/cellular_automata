package com.bcis.ca.service;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.Serializable;
import javax.ejb.EJB;
import javax.ejb.Stateful;
import javax.ejb.Stateless;
import sim.app.tutorial1and2.Tutorial1;
import sim.engine.SimState;
import sim.engine.UniformJSON;

/**
 * Acts as a middle layer between Mason and the presentation. It holds all the
 * simulation data and is able to create, edit and retrieve simulations and its
 * states
 *
 * @author Nawaz Gayoom
 * @version 0.1 - 14/09/2014: Created.
 * @version 1.0 - 22/09/2014: updated to load a simulation and start it
 * @version 1.1 - 29/09/2014: removed unnecessary code to clean up (file access
 *                            and managed beans are no longer necessary)
 * 
 * @author Vadim Chernov
 * @version 0.2 - 20/09/2014: Skeleton methods added and updated
 */
@Stateless
public class Simulation implements Serializable{

    private SimState simulationState = null;
    private String backgroundColor;
    private String backgroundImage;
    private Object[] objects;
    private Rule[] rules;
    private Agent[] agents;
    private int[][] seed;
    boolean started = false;
    
    public Simulation() {
    }

    
    public void startSimulation() {
        
        this.simulationState = new Tutorial1(System.currentTimeMillis());
        this.simulationState.setSeededGrid(seed);
        simulationState.start();
        
    }

    public void setSeed(int[][] newSeed){
        seed = newSeed;
    }
    
    public UniformJSON stepThrough(){
        UniformJSON ujson;
        if(simulationState == null){
            startSimulation();
        }
        
        ujson = simulationState.getCurrentState();
        return ujson;
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

    
    public void setSimulationState(SimState state){
        
    }
    
}
