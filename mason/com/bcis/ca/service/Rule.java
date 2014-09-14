package com.bcis.ca.service;

import javax.ejb.Stateless;

/**
 * Holds information about a rule for a simulation
 * @author Nawaz Gayoom
 * @version 0.1 - 14/09/2014: Skeleton methods added - Vadim Chernov
 */
@Stateless
public class Rule {
    private String ruleName;
    private Agent[] agents;
    private String[] rulePredicates;

    /**
     * @return the ruleName
     */
    public String getRuleName() {
        return ruleName;
    }

    /**
     * @param ruleName the ruleName to set
     */
    public void setRuleName(String ruleName) {
        this.ruleName = ruleName;
    }

    /**
     * @return the agents
     */
    public Agent[] getAgents() {
        return agents;
    }

    /**
     * @return the rulePredicates
     */
    public String[] getRulePredicates() {
        return rulePredicates;
    }
    
    public void addPredicate(String predicate){
    
    }
    
    public boolean removePredicate(int arrayIndex){
        boolean predicateRemoved = false;
        
        return predicateRemoved;
    }
    
}
