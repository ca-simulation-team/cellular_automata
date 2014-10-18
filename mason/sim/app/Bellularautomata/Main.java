package sim.app.Bellularautomata;

import sim.engine.UniformJSON;

/**
 *
 * @author Nawaz
 */
public class Main {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        System.out.println("yo");
    
        CellularAutomata ca = new CellularAutomata(System.currentTimeMillis());
        int[][] initial = {{0,0,0,0,0,0,0,0},
                                      {0,0,0,0,0,0,0,0},
                                      {0,0,0,0,0,0,0,0},
                                      {0,0,1,0,1,0,0,0},
                                      {0,0,1,0,1,1,0,0},
                                      {0,0,1,1,1,0,0,0},
                                      {0,0,0,1,0,0,0,0},
                                      {0,0,0,0,0,0,0,0},};
        
        ca.setSeededGrid(initial);
        
        ca.addRule(1, 1, 3, 1, 0);
        ca.addRule(1, 1, 4, 2, 0);
        ca.addRule(0, 1, 3, 0, 1);
        
        
        ca.start();
        
        UniformJSON ujson = new UniformJSON();
        
        for(int x = 0; x < 5; x++){
            ujson = ca.getCurrentState();
            for(int i = 0; i < ujson.currentGrid.length; i++){
                for(int j = 0; j < ujson.currentGrid.length; j++){
                    System.out.print("|");
                    if(ujson.currentGrid[i][j] != 0){
                        System.out.print(ujson.currentGrid[i][j]);
                    } else {
                        System.out.print(" ");
                    }
                    System.out.print("|");
                }
                System.out.println("");
            }
            System.out.println("---------------------------------------");
        }
    }
    
}
