package com.bcis.ca.service;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.Serializable;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ejb.Stateless;
import javax.script.*;
import org.w3c.dom.Document;
/**
 *
 * @author Nawaz Gayoom
 * @version 0.1 - 21/09/2014: Created.
 * @version 1.0 - 22/09/2014: wrote the method drawCanvas()
 * @version 1.1 - 22/09/2014: Fixed a bug: JavaScript was not executing
 */
@Stateless
public class CanvasHandler implements Serializable {

    public static final long serialVersionUID = 2;
    /**
     * Executes the JavaScript file to draw the canvas
     * @param functionToCall
     */
    public void drawCanvas(String functionToCall)  {
        
        ScriptEngineManager manager = new ScriptEngineManager();
        ScriptEngine engine = manager.getEngineByName("JavaScript");
        try {
            engine.eval(Files.newBufferedReader(Paths.get("C:\\Users\\Nawaz\\Documents\\NetBeansProjects\\cellular_automata\\web\\resources\\js\\draw.js"), StandardCharsets.UTF_8));
            Invocable inv = (Invocable) engine;
            inv.invokeFunction(functionToCall);
        } catch (ScriptException se){
            Logger.getLogger(CanvasHandler.class.getName()).log(Level.SEVERE, "Script exception", se);
        } catch (FileNotFoundException fnfe){
            Logger.getLogger(CanvasHandler.class.getName()).log(Level.SEVERE, "File not found", fnfe);
        } catch (NoSuchMethodException nsme){
            Logger.getLogger(CanvasHandler.class.getName()).log(Level.SEVERE, "Method does not exist", nsme);
        } catch (IOException ioe){
            Logger.getLogger(CanvasHandler.class.getName()).log(Level.SEVERE, "IO exception", ioe);
        }
    }
}
