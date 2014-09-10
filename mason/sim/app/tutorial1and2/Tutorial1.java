package sim.app.tutorial1and2;

import sim.app.tutorial1and2.CA;
import sim.engine.*;
import sim.field.grid.*;

public class Tutorial1 extends SimState
    
{
    private static final long serialVersionUID = 1;
    public IntGrid2D grid;
    
    // our own parameters for setting the grid size later on
    public int gridWidth = 100;
    public int gridHeight = 100;
    public String simulationString;
    
    public static final int[][] b_heptomino = new int[][]
        {{0, 1, 1},
         {1, 1, 0},
         {0, 1, 1},
         {0, 0, 1}};
    

    public Tutorial1(long seed)
        {
        super(seed);
        }
    
    void seedGrid()
        {
        // we stick a b_heptomino in the center of the grid
        for(int x=0;x<b_heptomino.length;x++)
            for(int y=0;y<b_heptomino[x].length;y++)
                grid.field[x + grid.field.length/2 - b_heptomino.length/2]
                          [y + grid.field[x].length/2 - b_heptomino[x].length/2] =
                    b_heptomino[x][y];
        }
    
    public void startSimulation(Tutorial1 tutorial1)
        {
        tutorial1.start();
        long steps;
        do
            {
            if (!tutorial1.schedule.step(tutorial1))
                break;
            steps = tutorial1.schedule.getSteps();
            if (steps % 100 == 0)
                System.out.println("Steps: " + steps + " Time: " + tutorial1.schedule.getTime());
            }
        while(steps < 5000);
        tutorial1.finish();
        }
    
    public void start()
        {
        super.start();  // very important!  This resets and cleans out the Schedule.
        grid = new IntGrid2D(gridWidth, gridHeight);
        seedGrid();
        schedule.scheduleRepeating(new CA());
        }
    
}