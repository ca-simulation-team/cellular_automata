
package com.bcis.ca.service;

import javax.ejb.Stateless;

/**
 * Holds all objects in a simulation.
 * @author Vadim Chernov
 * @version 0.1 - 14/09/2014: created.
 */
@Stateless
public class Object {

    private String objectName;
    private int positionX;
    private int positoinY;

    /**
     * @return the objectName
     */
    public String getObjectName() {
        return objectName;
    }

    /**
     * @param objectName the objectName to set
     */
    public void setObjectName(String objectName) {
        this.objectName = objectName;
    }

    /**
     * @return the positionX
     */
    public int getPositionX() {
        return positionX;
    }

    /**
     * @param positionX the positionX to set
     */
    public void setPositionX(int positionX) {
        this.positionX = positionX;
    }

    /**
     * @return the positoinY
     */
    public int getPositoinY() {
        return positoinY;
    }

    /**
     * @param positoinY the positoinY to set
     */
    public void setPositoinY(int positoinY) {
        this.positoinY = positoinY;
    }
    

}
