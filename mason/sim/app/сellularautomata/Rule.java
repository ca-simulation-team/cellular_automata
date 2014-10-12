/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package sim.app.сellularautomata;

/**
 *
 * @author Nawaz Gayoom
 * @version 1.0
 */
public class Rule {
    
    private int currentCellState;
    private int neighborState;
    private int noOfNeighbors;
    private int equalityModifier;
    private int nextState;
    
    public Rule(){
        
    }

    public int getEqualityModifier() {
        return equalityModifier;
    }

    public void setEqualityModifier(int equalityModifier) {
        this.equalityModifier = equalityModifier;
    }
    
    
    public int getCurrentCellState() {
        return currentCellState;
    }

    public void setCurrentCellState(int currentCellState) {
        this.currentCellState = currentCellState;
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
    
    
}
