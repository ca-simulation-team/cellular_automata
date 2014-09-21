package com.bcis.ca.service;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ejb.Stateless;
import javax.script.*;

/**
 *
 * @author Nawaz Gayoom
 */
@Stateless
public class CanvasHandler {

    public void drawCanvas() {
        ScriptEngineManager manager = new ScriptEngineManager();
        ScriptEngine engine = manager.getEngineByName("JavaScript");
        try {
            engine.eval(Files.newBufferedReader(Paths.get("js/draw.js"), StandardCharsets.UTF_8));
            Invocable inv = (Invocable) engine;
            inv.invokeFunction("drawca");
        } catch (ScriptException se) {
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
