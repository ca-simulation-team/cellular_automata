/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.bcis.ca.service;

import com.bcis.ca.presentation.ExampleObject;
import java.util.ArrayList;
import javax.ejb.Stateless;

/**
 * Handles all available examples including mapping IDs and holding a list of 
 * all
 * @author Nawaz Gayoom
 * @version 0.1 - 22/09/2014: Created.
 */
@Stateless
public class ExampleManager {

    ArrayList<ExampleObject> examples;
    
    public ExampleManager(){
        
    }
    
    public void loadAllExamples(){
       examples = new ArrayList<>();
       ExampleObject gameOfLife = new ExampleObject(0,
                                                    "Game of Life - Heptomino B",
                                                    "Steven conway's game of life simplied into a single heptomino B form. Useful for testing purposes");
       examples.add(gameOfLife);
    }

    public ArrayList<ExampleObject> getExamples() {
        return examples;
    }
    
}
