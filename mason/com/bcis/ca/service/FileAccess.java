package com.bcis.ca.service;

import java.io.Serializable;
import javax.ejb.Stateless;

/**
 * Handles the saving and loading of user created files from local machines
 *
 * @author Nawaz Gayoom
 * 
 * @version 0.2 - 14/09/2014: Skeleton methods added - Vadim Chernov
 * 
 */
@Stateless
public class FileAccess implements Serializable {

    Simulation simulation;

    public FileAccess() {

    }

    /*
     Method for loading a simulation from a file
     */
    public boolean loadFile(String filePath) {
        boolean fileLoaded = false;
        return fileLoaded;
    }

    /*
     Method for saving a simulation file
     */
    public boolean saveFile(String fileName) {
        boolean fileSaved = false;
        return fileSaved;
    }

}
