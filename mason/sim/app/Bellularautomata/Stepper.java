package sim.app.Bellularautomata;

import ec.util.MersenneTwisterFast;
import java.util.ArrayList;
import java.util.List;
import sim.engine.SimState;
import sim.engine.Steppable;
import sim.field.grid.IntGrid2D;
/**
 *
 * @author Nawaz
 */
public class Stepper implements Steppable {
    
    
    private static final long serialVersionUID = 1;
    public IntGrid2D tempGrid = new IntGrid2D(0,0);
    public List<Rule> rules = new ArrayList<>();
    public List<int[]> changes = new ArrayList<>();
    
    public Stepper(){
        
    }
    
    public void step(SimState simState){
        CellularAutomata ca = (CellularAutomata)simState;
        rules = ca.rules;
        tempGrid.setTo(ca.grid);
        int width = tempGrid.getWidth();
        int height = tempGrid.getHeight();
        MersenneTwisterFast randomGen = new MersenneTwisterFast();
        int rndValue = randomGen.nextInt(100);
        boolean tester = true;
         for(int x=0;x<width;x++)
            for(int y=0;y<height;y++)
                {
                for(Rule rule : rules){
                    
                    int p = rule.getProbability();
                    if((rndValue <= p) || (p == 100)){
                        
                        //process for static rule
                        if(!rule.isIsDynamic()){
                            int[][] neighborPattern = new int[3][3];

                            for(int dx = -1; dx < 2; dx++) {
                                for(int dy = -1; dy < 2; dy++){
                                   int neighbourState = tempGrid.field[tempGrid.stx(x+dx)][tempGrid.sty(y+dy)];
                                   neighborPattern[dx+1][dy+1] = neighbourState;

                                }
                            }

                            int[][] rulePattern = rule.getRulePattern();

                            boolean match = true;
                            for(int i = 0; i < rulePattern.length; i++){
                                for(int j = 0; j < rulePattern.length; j++){
                                    if(neighborPattern[i][j] != rulePattern[i][j]){
                                        match = false;
                                    }
                                }
                            }

                            if(match){
                                ca.grid.field[x][y] = rule.getNextState();     
                            }
                        } else {
                            
                        //process for dynamic rule
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
                                    if(rule.getCurrentState() == tempGrid.field[x][y]){
                                        //int[] changeVal = {x,y,rule.getNextState()};
                                        //changes.add(changeVal);
                                        ca.grid.field[x][y] = rule.getNextState();
                                    }
                                }
                            } else if (rule.getEqualityModifier() == 1) {
                                if(count < rule.getNoOfNeighbors()){
                                    if(rule.getCurrentState() == tempGrid.field[x][y]){
                                        //int[] changeVal = {x,y,rule.getNextState()};
                                        //changes.add(changeVal);
                                        ca.grid.field[x][y] = rule.getNextState();
                                    }
                                }
                            } else if(rule.getEqualityModifier() == 2){
                                if(count > rule.getNoOfNeighbors()){
                                    if(rule.getCurrentState() == tempGrid.field[x][y]){
                                        //int[] changeVal = {x,y,rule.getNextState()};
                                        //changes.add(changeVal);
                                        ca.grid.field[x][y] = rule.getNextState();
                                    }
                                }
                            }

                        } //end of ruletype check
                    } //end of probability check
                } //end of rule loop
                
//                for(int[] changeValues : changes){
//             ca.grid.field[changeValues[0]][changeValues[1]] = changeValues[2];
//         }
        } // end of square loop
         
    } // end of method
}
