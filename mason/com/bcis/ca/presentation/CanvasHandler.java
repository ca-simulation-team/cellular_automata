package com.bcis.ca.presentation;

import javax.inject.Named;
import javax.enterprise.context.Dependent;

/**
 * Acts as an I/O for JSON file for JavaScript to use. Holds the canvas drawable
 * data
 * @author Nawaz Gayoom
 * @version 0.1 - 11/09/2014: Created.
 */
@Named(value = "canvasHandler")
@Dependent
public class CanvasHandler {

    
    public CanvasHandler() {
    }
    
}
