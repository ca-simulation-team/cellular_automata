/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package beans;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.RequestScoped;
import sim.app.tutorial1and2.Tutorial1;

/**
 *
 * @author Hoana
 */
@ManagedBean(name="SimulationBean")
@RequestScoped
public class SimulationBean {
    
    private Tutorial1 data;
    private String simData;
    
    public SimulationBean()
        {
        
        }
    
    public void getData()
        {          
            data = new Tutorial1(System.currentTimeMillis());
            
            data.startSimulation(data);
        }
    
}
