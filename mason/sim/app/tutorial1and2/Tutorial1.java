/*
  Copyright 2006 by Sean Luke and George Mason University
  Licensed under the Academic Free License version 3.0
  See the file "LICENSE" for more information
*/

package sim.app.tutorial1and2;

import sim.engine.UniformJSON;
import sim.engine.*;
import sim.field.grid.*;

public class Tutorial1 extends SimState
    {
    public static final long serialVersionUID = 1;
    
    public IntGrid2D grid;
    public int gridSize;
    public CA ca;
    int[][] currentGrid;
    
    public Tutorial1(long seed){
        super(seed);
    }
    
    @Override
    public void setSeededGrid(int[][] newSeededGrid)
    {
        gridSize = newSeededGrid.length;
        
        currentGrid = new int[gridSize][gridSize];
        
        currentGrid = newSeededGrid;
    }
    
    public void seedGrid()
    {
        grid.field = currentGrid;
    }
    
    public void start(){
        super.start();
        grid = new IntGrid2D(gridSize, gridSize);
        seedGrid();
        schedule.scheduleRepeating(ca);
    }
    
    @Override
    public void setNeighbourhood(int[][] neighbourhood)
    {
        ca = new CA();
        ca.setNewNeighbourhood(neighbourhood);
    }
    
    public int[][] getGrid(){
        currentGrid = new int[gridSize][gridSize];
            for(int i = 0; i < gridSize; i++){
                for(int j = 0; j < gridSize; j++){
                    currentGrid[i][j] = (grid.get(i, j));
                    
               }
            }
        return currentGrid;
    }
    
    @Override
    public UniformJSON getCurrentState(){
        UniformJSON ujson = new UniformJSON();
        //initialize
        int[][] thisgrid;
        long steps = 0;
        double time = 0;
        
        //step
        schedule.step(this);
        
        //get step details
        thisgrid = getGrid();
        steps = schedule.getSteps();
        time = schedule.getTime();
        
        //create ujson object
        ujson.currentGrid = thisgrid;
        ujson.steps = steps;
        ujson.time = time;
        ujson.isRunning = true;
        return ujson;
    }
    
    public boolean isIsRunning() {
        return isRunning;
    }

    public void setIsRunning(boolean isRunning) {
        this.isRunning = isRunning;
    }
    
    
    }
