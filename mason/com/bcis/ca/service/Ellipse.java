package com.bcis.ca.service;

/**
 * Represents a ellipse or a circle (depending on the params) to be used in  an object or agent 
 * 
 * @author Vadim Chernov
 * 
 * @version 0.1 - 14/09/2014: Class with skeleton methods created - Vadim Chernov
 */

public class Ellipse extends Shape{
    private int horizontaLength;
    private int verticalLength;

    /**
     * @return the horizontaLength
     */
    public int getHorizontaLength() {
        return horizontaLength;
    }

    /**
     * @param horizontaLength the horizontaLength to set
     */
    public void setHorizontaLength(int horizontaLength) {
        this.horizontaLength = horizontaLength;
    }

    /**
     * @return the verticalLength
     */
    public int getVerticalLength() {
        return verticalLength;
    }

    /**
     * @param verticalLength the verticalLength to set
     */
    public void setVerticalLength(int verticalLength) {
        this.verticalLength = verticalLength;
    }
}
