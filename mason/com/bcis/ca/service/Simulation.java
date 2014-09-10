package com.bcis.ca.service;

import javax.ejb.Stateful;
import sim.engine.SimState;

/**
 * Acts as a middle layer between Mason and the presentation.
 * It holds all the simulation data and is able to create, edit and retrieve
 * simulations and its states
 * @author Nawaz Gayoom
 * @version 0.1 - 11/09/2014: created.
 */
@Stateful
public class Simulation {

    SimState simulationState;
    public Simulation(){
        
    }
}
