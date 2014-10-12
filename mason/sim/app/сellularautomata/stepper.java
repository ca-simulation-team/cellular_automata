package sim.app.сellularautomata;

import java.util.ArrayList;
import java.util.List;
import sim.engine.SimState;
import sim.engine.Steppable;
import sim.field.grid.IntGrid2D;
/**
 *
 * @author Nawaz
 */
public class stepper implements Steppable {
    
    
    private static final long serialVersionUID = 1;
    public IntGrid2D tempGrid = new IntGrid2D(0,0);
    public List<Rule> rules = new ArrayList<>();
    
    public stepper(){
        
    }
    
    public void step(SimState simState){
        CellularAutomata ca = (CellularAutomata)simState;
        
        tempGrid.setTo(ca.grid);
        int width = tempGrid.getWidth();
        int height = tempGrid.getHeight();
        
         for(int x=0;x<width;x++)
            for(int y=0;y<height;y++)
                {
                for(Rule rule : rules){
                    int count = 0;
                    for(int dx = -1; dx < 2; dx++) {
                        for(int dy = -1; dy < 2; dy++){
                           int neighbourState = tempGrid.field[tempGrid.stx(x+dx)][tempGrid.sty(y+dy)];
                           if (neighbourState == rule.getNeighborState()){
                               ++count;
                           }
                        }
                    }
                    if(rule.getEqualityModifier() == 0){
                        if(count == rule.getNoOfNeighbors()){
                            if(rule.getCurrentCellState() == tempGrid.field[x][y]){
                                ca.grid.field[x][y] = rule.getNextState();
                            }
                        }
                    } else if (rule.getEqualityModifier() == 1) {
                        if(count < rule.getNoOfNeighbors()){
                            if(rule.getCurrentCellState() == tempGrid.field[x][y]){
                                ca.grid.field[x][y] = rule.getNextState();
                            }
                        }
                    } else {
                        if(count > rule.getNoOfNeighbors()){
                            if(rule.getCurrentCellState() == tempGrid.field[x][y]){
                                ca.grid.field[x][y] = rule.getNextState();
                            }
                        }
                    }
                         
                } //end of rule loop
        } // end of square loop
    } // end of method
}
