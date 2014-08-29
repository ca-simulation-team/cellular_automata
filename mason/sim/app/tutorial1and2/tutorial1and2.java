package sim.app.tutorial1and2;

import ec.util.*;
import sim.engine.*;
import sim.field.grid.*;
import sim.util.*;
/**
 *
 * @author Nawaz Gayoom
 */
public class tutorial1and2 extends SimState {
    
    public static final long serialVersionUID = 1;
    
    public IntGrid2D grid;
    public int gridWidth = 100;
    public int gridHeight = 100;
    
    
    public static final int[][] b_heptomino = new int[][]
            {{0,1,1},
            {1,1,0},
            {0,1,1},
            {0,0,1}};
    
    public tutorial1and2(long seed){
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
    }
    
    public static void main(String[] args){
        tutorial1and2 tute = new tutorial1and2(System.currentTimeMillis());
        tute.start();
        long steps;
        
        do {
            if(!tute.schedule.step(tute)){
                break;
            }
            steps = tute.schedule.getSteps();
            if(steps % 500 == 0){
                System.out.println("Steps:" + steps + " Time: " + tute.schedule.getTime());
            }
        }
        while (steps < 5000);
        tute.finish();
        System.exit(0);
    }
}
