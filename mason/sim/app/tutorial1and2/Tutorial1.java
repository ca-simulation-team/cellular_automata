/*
  Copyright 2006 by Sean Luke and George Mason University
  Licensed under the Academic Free License version 3.0
  See the file "LICENSE" for more information
*/

package sim.app.tutorial1and2;

import com.bcis.ca.service.CanvasHandler;
import com.bcis.ca.service.UniformJSON;
import com.google.gson.*;
import javax.ejb.EJB;
import sim.engine.*;
import sim.field.grid.*;

public class Tutorial1 extends SimState
    {
    public static final long serialVersionUID = 1;
    
    public IntGrid2D grid;
    public int gridWidth = 100;
    public int gridHeight = 100;
    boolean isRunning = false;
//    @EJB
//    CanvasHandler cHandler;
    public static final int[][] b_heptomino = new int[][]
            {{0,1,1},
            {1,1,0},
            {0,1,1},
            {0,0,1}};
    
    public Tutorial1(long seed){
        super(seed);
    }
    
    void seedGrid(){
        for(int x = 0; x < b_heptomino.length; x++){
            for(int y = 0; y < b_heptomino[x].length; y++){
                grid.field[x + grid.field.length/2 - b_heptomino.length/2][y + grid.field[x].length/2 - b_heptomino.length/2] = b_heptomino[x][y];
            }
        }
    }
    
    public void start(){
        super.start();
        grid = new IntGrid2D(gridWidth, gridHeight);
        seedGrid();
        schedule.scheduleRepeating(new CA());
        long steps;
        
        do {
            
            if(!schedule.step(this)){
                break;
            }
            steps = schedule.getSteps();
            int[][] currentGrid = new int[gridHeight][gridWidth];
            for(int i = 0; i < gridHeight; i++){
                for(int j = 0; j < gridWidth; j++){
                    currentGrid[i][j] = (grid.get(i, j));
                    
                }
            }
            CanvasHandler caHandler = new CanvasHandler();
            caHandler.drawCanvas("drawca");
//            UniformJSON ujson = new UniformJSON();
//            ujson.setCurrentGrid(currentGrid);
//            GsonBuilder builder = new GsonBuilder();
//            Gson gson = builder.create();
//            String arrayString = (gson.toJson(ujson));
            
        }
        while (steps < 100);
        finish();
    }
    
//    public void runSim(){
//        Tutorial1 tute = new Tutorial1(System.currentTimeMillis());
//        tute.start();
//        long steps;
//        
//        do {
//            
//            if(!tute.schedule.step(tute)){
//                break;
//            }
//            steps = tute.schedule.getSteps();
//            int[][] currentGrid = new int[tute.gridHeight][tute.gridWidth];
//            for(int i = 0; i < tute.gridHeight; i++){
//                for(int j = 0; j < tute.gridWidth; j++){
//                    currentGrid[i][j] = (tute.grid.get(i, j));
//                    
//                }
//            }
//            
//        }
//        while (steps < 100);
//        tute.finish();
//    }
    
    public boolean isIsRunning() {
        return isRunning;
    }

    public void setIsRunning(boolean isRunning) {
        this.isRunning = isRunning;
    }
    
    
    }
