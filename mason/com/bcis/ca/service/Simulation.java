package com.bcis.ca.service;

import javax.ejb.Stateful;
import sim.engine.SimState;

/**
 * Acts as a middle layer between Mason and the presentation. It holds all the
 * simulation data and is able to create, edit and retrieve simulations and its
 * states
 *
 * @author Nawaz Gayoom
 * @version 0.1 - 14/09/2014: Skeleton methods added - Vadim Chernov
 */
@Stateful
public class Simulation {

    SimState simulationState;
    private String backgroundColor;
    private String backgroundImage;
    private Object[] objects;
    private Rule[] rules;
    private Agent[] agents;

    public Simulation() {

    }

    public void startSimulation() {
    }

    public boolean createNewSimulation() {
        boolean simulationCreated = false;

        return simulationCreated;
    }

    public void stopSimulation() {

    }

    public void resetSimulation() {

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

}
