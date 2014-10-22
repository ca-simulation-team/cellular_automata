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
        int[][] initial = {{0,0,0,0,0,0,0,0,0,0,0,0,1,0,0},
                            {0,0,0,0,0,0,0,0,0,0,0,0,0,0,0},
                            {0,0,0,0,0,0,0,0,0,0,0,0,0,0,0},
                            {0,0,0,0,0,0,0,0,0,0,0,0,0,0,0},
                            {0,0,0,0,0,0,0,0,0,0,0,0,0,0,0},
                            {0,0,0,0,0,0,0,0,0,0,0,0,0,0,0},
                            {0,0,0,0,0,0,0,0,0,0,0,0,0,0,0},
                            {0,0,0,0,0,0,0,0,0,0,0,0,0,0,0},
                            {0,0,0,0,0,0,0,0,0,0,0,0,0,0,0},
                            {0,0,0,0,0,0,0,0,0,0,0,0,0,0,0},
                            {0,0,0,0,0,0,0,0,0,0,0,0,0,0,0},
                            {0,0,0,0,0,0,0,0,0,0,0,0,0,0,0},
                            {0,0,0,0,0,0,0,0,0,0,0,0,0,0,0},
                            {0,0,0,0,0,0,0,0,0,0,0,0,0,0,0},
                            {0,0,0,0,0,0,0,0,0,0,0,0,0,0,0}
        };
        int[][] rulepat = {{1,1,1},
                            {0,0,0},
                            {0,0,0}
                            };
        int[][] rulepat1 = {{1,1,0},
                            {0,0,0},
                            {0,0,0}
                            };
        int[][] rulepat2 = {{1,0,1},
                            {0,0,0},
                            {0,0,0}
                            };
        int[][] rulepat3 = {{1,0,0},
                            {0,0,0},
                            {0,0,0}
                            };
        int[][] rulepat4 = {{0,1,1},
                            {0,0,0},
                            {0,0,0}
                            };
        int[][] rulepat5 = {{0,1,0},
                            {0,0,0},
                            {0,0,0}
                            };
        int[][] rulepat6 = {{0,0,1},
                            {0,0,0},
                            {0,0,0}
                            };
        int[][] rulepat7 = {{0,0,0},
                            {0,0,0},
                            {0,0,0}
                            };
        ca.setSeededGrid(initial);
        
        ca.addRule(0, 1, 2, 0, 0, 100,false, rulepat);
        ca.addRule(0, 1, 2, 0, 1, 100,false, rulepat1);
        ca.addRule(0, 1, 2, 0, 1, 100,false, rulepat2);
        ca.addRule(0, 1, 2, 0, 0, 100,false, rulepat3);
        ca.addRule(0, 1, 2, 0, 1, 100,false, rulepat4);
        ca.addRule(0, 1, 2, 0, 1, 100,false, rulepat5);
        ca.addRule(0, 1, 2, 0, 1, 100,false, rulepat6);
        ca.addRule(0, 1, 2, 0, 0, 100,false, rulepat7);
        
//       ca.addRule(0, 1, 2, 2, 1, 50);
//       ca.addRule(1, 1, 4, 2, 0, 80);
//       ca.addRule(0, 1, 3, 0, 1, 80);
        
        
        ca.start();
        
        UniformJSON ujson = new UniformJSON();
        
        for(int x = 0; x < 10; x++){
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
