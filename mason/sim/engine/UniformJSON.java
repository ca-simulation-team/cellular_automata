package sim.engine;

import java.util.List;
import sim.app.Bellularautomata.Rule;

/**
 *
 * @author Nawaz Gayoom
 */
public class UniformJSON
{ 
    public int[][] currentGrid;
    public List<Rule> rules;
    //public int[][] neighbourhoodGrid;
    public boolean stop;
    public long steps;
    public double time;
    public boolean rulesChanged;
    
}
