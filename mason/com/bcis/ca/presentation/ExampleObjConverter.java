package com.bcis.ca.presentation;

import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.convert.Converter;
import javax.faces.convert.FacesConverter;
/**
 * 
 * @author Nawaz
 */
@FacesConverter("eoConverter")
public class ExampleObjConverter implements Converter{

    @Override
    public Object getAsObject(FacesContext context, UIComponent component, String value) {
        SimManager simManager = (SimManager)context.getExternalContext().getApplicationMap().get("simManager");
        Object example = simManager.getExamples().get(0);
        return example;
    }

    @Override
    public String getAsString(FacesContext context, UIComponent component, Object value) {
        String newVal = String.valueOf(((ExampleObject)value).getExampleID());
        return newVal;
    }
    
}
