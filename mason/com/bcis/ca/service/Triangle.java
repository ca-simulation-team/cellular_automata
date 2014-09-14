package com.bcis.ca.service;


/**
 * Represents a triangle to be used in  an object or agent 
 * 
 * @author Vadim Chernov
 * 
 * @version 0.1 - 14/09/2014: Class with skeleton methods created - Vadim Chernov
 */

public class Triangle extends Shape{
    private int sideA;
    private int sideB;
    private int sideC;

    /**
     * @return the sideA
     */
    public int getSideA() {
        return sideA;
    }

    /**
     * @param sideA the sideA to set
     */
    public void setSideA(int sideA) {
        this.sideA = sideA;
    }

    /**
     * @return the sideB
     */
    public int getSideB() {
        return sideB;
    }

    /**
     * @param sideB the sideB to set
     */
    public void setSideB(int sideB) {
        this.sideB = sideB;
    }

    /**
     * @return the sideC
     */
    public int getSideC() {
        return sideC;
    }

    /**
     * @param sideC the sideC to set
     */
    public void setSideC(int sideC) {
        this.sideC = sideC;
    }

}
