package com.bcis.ca.service;

/**
 * Represents a rectangle to be used in  an object or agent 
 * 
 * @author Vadim Chernov
 * 
 * @version 0.1 - 14/09/2014: Class with skeleton methods created - Vadim Chernov
 */

public class Rectangle extends Shape {
    private int width;
    private int height;

    /**
     * @return the width
     */
    public int getWidth() {
        return width;
    }

    /**
     * @param width the width to set
     */
    public void setWidth(int width) {
        this.width = width;
    }

    /**
     * @return the height
     */
    public int getHeight() {
        return height;
    }

    /**
     * @param height the height to set
     */
    public void setHeight(int height) {
        this.height = height;
    }
    
}
