package com.bcis.ca.presentation;

/**
 *
 * @author Nawaz Gayoom
 * @version 1.0 - 22/09/2014: Created and updated to hold information about
 *                            examples
 */
public class ExampleObject {
    private int exampleID;
    private String name;
    private String Description;
    
    public ExampleObject(){
        
    }
    
    public ExampleObject(int exampleID, String name, String Description){
        this.exampleID = exampleID;
        this.name = name;
        this.Description = Description;
    }

    public int getExampleID() {
        return exampleID;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return Description;
    }

    public void setExampleID(int exampleID) {
        this.exampleID = exampleID;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String Description) {
        this.Description = Description;
    }
    
    
}
