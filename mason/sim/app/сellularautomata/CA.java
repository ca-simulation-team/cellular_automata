/*
 Copyright 2006 by Sean Luke and George Mason University
 Licensed under the Academic Free License version 3.0
 See the file "LICENSE" for more information
 */
package sim.app.сellularautomata;

import static java.lang.Math.random;
import java.util.Random;
import sim.engine.*;
import sim.field.grid.*;

public class CA implements Steppable {

    private static final long serialVersionUID = 1;

    // the width and height will change later
    public IntGrid2D tempGrid = new IntGrid2D(0, 0);
    public int x2, y2;
    private int liveCondCount;
    private int deadCondCountMin;
    private int deadCondCountMax;
    private int infectedCondCount;

    public void step(SimState state) {
        Random random = new Random();
        int neighbourhood[][] = {{0, 0, 1, 0, 0},
        {0, 1, 1, 1, 0},
        {1, 1, 0, 1, 1},
        {0, 1, 1, 1, 0},
        {0, 0, 1, 0, 0}};

        CellularAutomata tut = (CellularAutomata) state;
        // first copy the grid into tempGrid
        tempGrid.setTo(tut.grid);

        // now apply the Game of Life!
        // for each cell...
        int count;
        int width = tempGrid.getWidth();
        int height = tempGrid.getHeight();

        for (int x = 0; x < width; x++) {
            for (int y = 0; y < height; y++) {
                x2 = -2;
                y2 = -2;
                count = 0;
                // count the number of neighbors around the cell,
                // and for good measure include the cell itself


                for(int dx = 0; dx < 5; dx++)
                {
                    for(int dy = 0; dy < 5; dy++)
                    {

                        if(x + x2 >= 0 && x + x2 < width && y + y2 >= 0 && y+ y2 < height)
                        {
                            if(neighbourhood[dx][dy] == 1 && tempGrid.field[x + x2][y + y2] == 1)
                                {
                                    count += 1;
                                }
                        }

                        y2 += 1;

                    }
                    y2 = -2;
                    x2 += 1;
                }
                //System.out.println(count);


                // if the count is 2 or less, or 5 or higher, the cell dies
                // else if the count is 3 exactly, a dead cell becomes live again
                // else the cell stays as it is

                if (count <= getDeadCondCountMin() || count >= getDeadCondCountMax())  // dead
                    tut.grid.field[x][y] = 0;
                else if (count == getLiveCondCount()) // life
                    tut.grid.field[x][y] = 1;
                }
            
        }

    }

    /**
     * @return the liveCondCount
     */
    public int getLiveCondCount() {
        return liveCondCount;
    }

    /**
     * @param liveCondCount the liveCondCount to set
     */
    public void setLiveCondCount(int liveCondCount) {
        this.liveCondCount = liveCondCount;
    }

    /**
     * @return the deadCondCountMin
     */
    public int getDeadCondCountMin() {
        return deadCondCountMin;
    }

    /**
     * @param deadCondCountMin the deadCondCountMin to set
     */
    public void setDeadCondCountMin(int deadCondCountMin) {
        this.deadCondCountMin = deadCondCountMin;
    }

    /**
     * @return the deadCondCountMax
     */
    public int getDeadCondCountMax() {
        return deadCondCountMax;
    }

    /**
     * @param deadCondCountMax the deadCondCountMax to set
     */
    public void setDeadCondCountMax(int deadCondCountMax) {
        this.deadCondCountMax = deadCondCountMax;
    }

    /**
     * @return the infectedCondCount
     */
    public int getInfectedCondCount() {
        return infectedCondCount;
    }

    /**
     * @param infectedCondCount the infectedCondCount to set
     */
    public void setInfectedCondCount(int infectedCondCount) {
        this.infectedCondCount = infectedCondCount;
    }

}
