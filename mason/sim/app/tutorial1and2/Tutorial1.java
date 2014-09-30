/*
  Copyright 2006 by Sean Luke and George Mason University
  Licensed under the Academic Free License version 3.0
  See the file "LICENSE" for more information
*/

package sim.app.tutorial1and2;

import com.bcis.ca.service.Simulation;
import sim.engine.UniformJSON;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import javax.ejb.EJB;
import sim.engine.*;
import sim.field.grid.*;

public class Tutorial1 extends SimState
    {
    public static final long serialVersionUID = 1;
    
    public IntGrid2D grid;
    public int gridWidth = 10;
    public int gridHeight = 10;
    int[][] currentGrid;
    
    
    public static final int[][] b_heptomino = new int[][]
            {{0,1,1},
            {1,1,0},
            {0,1,1},
            {0,0,1}};
    
    public Tutorial1(long seed){
        super(seed);
    }
    
//    void seedGrid(){
//        for(int x = 0; x < grid.field.length; x++)
//        {
//            for(int y = 0; y < grid.field.length; y ++)
//            {
//                grid.field[x][y] = seededGrid[x][y];
//            }
//        }
//    }
    
//    public int[][] getSeededGrid()
//    {
//        return seededGrid;
//    }
    
    @Override
    public void setSeededGrid(int[][] newSeededGrid)
    {
        grid = new IntGrid2D(gridWidth, gridHeight);
        
        for(int x = 0; x < 10; x++)
        {
            for(int y = 0; y < 10; y ++)
            {
                grid.field[x][y] = newSeededGrid[x][y];
            }
        }
    }
    
    public void start(){
        super.start();
        //seedGrid();
        schedule.scheduleRepeating(new CA());
    }
    
    public int[][] getGrid(){
        currentGrid = new int[gridHeight][gridWidth];
            for(int i = 0; i < gridHeight; i++){
                for(int j = 0; j < gridWidth; j++){
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
//    public static void main(String[] args)
//        {
//        Tutorial1 tutorial1 = new Tutorial1(System.currentTimeMillis());
//        tutorial1.start();
//        long steps = 0;
//        while(steps < 5000)
//            {
//            if (!tutorial1.schedule.step(tutorial1))
//                break;
//            steps = tutorial1.schedule.getSteps();
//            if (steps % 500 == 0)
//                System.out.println("Steps: " + steps + " Time: " + tutorial1.schedule.getTime());
//            
//        tutorial1.finish();
//        System.exit(0);
//            }
//        }
//   
    
    public boolean isIsRunning() {
        return isRunning;
    }

    public void setIsRunning(boolean isRunning) {
        this.isRunning = isRunning;
    }
    
    
    }
