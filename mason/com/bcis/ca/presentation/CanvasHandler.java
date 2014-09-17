package com.bcis.ca.presentation;

import java.io.FileNotFoundException;
import javax.inject.Named;
import javax.enterprise.context.Dependent;
import javax.script.*;
import java.io.FileReader;
import java.util.logging.Level;
import java.util.logging.Logger;

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
    
    
    public void drawCanvas() {
        ScriptEngineManager manager = new ScriptEngineManager();
        ScriptEngine engine = manager.getEngineByName("JavaScript");
        try {
            engine.put("object", "10");
            engine.eval(new FileReader("js/draw.js"));
        } catch (ScriptException se) {
            Logger.getLogger(CanvasHandler.class.getName()).log(Level.SEVERE, "Script exception", se);
        } catch (FileNotFoundException fnfe){
            Logger.getLogger(CanvasHandler.class.getName()).log(Level.SEVERE, "File not found", fnfe);
        }
    }
}
