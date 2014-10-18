package com.bcis.ca.service;

import java.io.Serializable;
import java.util.List;
import javax.ejb.Stateless;
import sim.app.Bellularautomata.CellularAutomata;
import sim.engine.SimState;
import sim.engine.UniformJSON;
import sim.app.Bellularautomata.Rule;
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
    private List<Rule> rules;
    private Agent[] agents;
    private int[][] seed, newNeighbourhood;
    private boolean started = false;
    private int[][] gridFromClient;
    
    public Simulation() {
    }

    
    public void startSimulation() {
        
        this.simulationState = new CellularAutomata(System.currentTimeMillis());
        this.simulationState.setSeededGrid(gridFromClient); 
        for(Rule rule : rules){
            this.simulationState.addRule(rule.getCurrentState(), rule.getNeighborState(), rule.getNoOfNeighbors(), rule.getEqualityModifier(), rule.getNextState());
        }
        //this.simulationState.setNeighbourhood(newNeighbourhood);
        this.simulationState.start();
        started = true;
    }

    public void setSeed(int[][] newSeed){
        seed = newSeed;
    }
    
    public void setNeighbourhood(int[][] neighbourhood)
    {
        newNeighbourhood = neighbourhood;
    }
    public UniformJSON stepThrough(){
        UniformJSON ujson;
        if(simulationState == null){
            startSimulation();
        }
//        simulationState.changeGrid(gridFromClient);
//        for(Rule rule : rules){
//            this.simulationState.addRule(rule.getCurrentState(), rule.getNeighborState(), rule.getNoOfNeighbors(), rule.getEqualityModifier(), rule.getNextState());
//        }
        ujson = simulationState.getCurrentState();
        ujson.rules = rules;
        return ujson;
    }
    
    public boolean createNewSimulation() {
        boolean simulationCreated = false;

        return simulationCreated;
    }
 
    public void stopSimulation() {
        simulationState.finish();
        simulationState.kill();
        simulationState = null;
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
    public List<Rule> getRules() {
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

    public int[][] getGridFromClient() {
        return gridFromClient;
    }

    public void setGridFromClient(int[][] gridFromClient) {
        this.gridFromClient = gridFromClient;
    }

    public void setRules(List<Rule> rules) {
        this.rules = rules;
    }
    
    
}
