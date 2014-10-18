package sim.app.Bellularautomata;

import java.util.ArrayList;
import java.util.List;
import sim.engine.UniformJSON;
import sim.engine.*;
import sim.field.grid.*;

public class CellularAutomata extends SimState {

    public static final long serialVersionUID = 1;

    public IntGrid2D grid;
    public int gridSize;
    int[][] currentGrid;
    public List<Rule> rules = new ArrayList<>();
    
    public CellularAutomata(long seed) {
        super(seed);
    }

    
    public void setSeededGrid(int[][] newSeededGrid) {
        gridSize = newSeededGrid.length;

        currentGrid = new int[gridSize][gridSize];

        currentGrid = newSeededGrid;
    }

    public void seedGrid() {
        grid.field = currentGrid;
    }

    public void start() {
        super.start();
        grid = new IntGrid2D(gridSize, gridSize);
        seedGrid();

        schedule.scheduleRepeating(new Stepper());
    }
    

    public int[][] getGrid() {
        currentGrid = new int[gridSize][gridSize];
        for (int i = 0; i < gridSize; i++) {
            for (int j = 0; j < gridSize; j++) {
                currentGrid[i][j] = (grid.get(i, j));

            }
        }
        return currentGrid;
    }

    
    public UniformJSON getCurrentState() {
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
        ujson.rules = rules;
        return ujson;
    }

    public void addRule(int currentState, int neighbourState, int noOfNeighbours, int equalityModifier, int nextStep){
        Rule rule = new Rule();
        rule.setCurrentState(currentState);
        rule.setNoOfNeighbors(noOfNeighbours);
        rule.setNeighborState(neighbourState);
        rule.setEqualityModifier(equalityModifier);
        rule.setNextState(nextStep);
        rules.add(rule);
    }
    
    public void changeGrid(int[][] newGrid){
        grid.field = newGrid;
    }
}
