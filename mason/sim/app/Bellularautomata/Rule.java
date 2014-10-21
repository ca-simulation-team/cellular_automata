/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package sim.app.Bellularautomata;

/**
 *
 * @author Nawaz Gayoom
 * @version 1.0
 */
public class Rule {
    
    int currentState;
    int neighborState;
    int noOfNeighbors;
    int equalityModifier;
    int nextState;
    int probability;
    
    public Rule(){
        
    }

    public int getEqualityModifier() {
        return equalityModifier;
    }

    public void setEqualityModifier(int equalityModifier) {
        this.equalityModifier = equalityModifier;
    }

    public int getCurrentState() {
        return currentState;
    }

    public void setCurrentState(int currentState) {
        this.currentState = currentState;
    }
    
    
    

    public int getNeighborState() {
        return neighborState;
    }

    public void setNeighborState(int neighborState) {
        this.neighborState = neighborState;
    }

    public int getNoOfNeighbors() {
        return noOfNeighbors;
    }

    public void setNoOfNeighbors(int noOfNeighbors) {
        this.noOfNeighbors = noOfNeighbors;
    }

    public int getNextState() {
        return nextState;
    }

    public void setNextState(int nextState) {
        this.nextState = nextState;
    }

    public int getProbability() {
        return probability;
    }

    public void setProbability(int probability) {
        this.probability = probability;
    }

    
    
    
}
