/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.bcis.ca.service;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import sim.engine.UniformJSON;

/**
 *
 * @author Nawaz
 */
@WebServlet(name = "simController", urlPatterns = {"/simController"})
public class simController extends HttpServlet {

    @EJB
    Simulation sim;
    
    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
            BufferedReader br = new BufferedReader(new InputStreamReader(request.getInputStream()));
                String requestString = "";

                requestString = br.readLine();
               
                Gson gson = new Gson();
                UniformJSON requestObject = gson.fromJson(requestString, UniformJSON.class);
                
                
                sim.setRules(requestObject.rules);
                sim.setRulesChanged(requestObject.rulesChanged);
                
                if (sim.isStarted()){
                    sim.setGridFromClient(requestObject.currentGrid);
                } else {
                    sim.setSeed(requestObject.currentGrid);
                }
                
                
                if(requestObject.stop == false){
                    requestObject = sim.stepThrough();
                } else if (requestObject.stop == true){
                    sim.stopSimulation();
                    requestObject = sim.stepThrough();
                }
//               
                
                response.setContentType("application/json");

                GsonBuilder builder = new GsonBuilder();
                gson = builder.create();
                String jsonContent = gson.toJson(requestObject);
                PrintWriter out = response.getWriter();
                out.print(jsonContent);
                out.close();
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
