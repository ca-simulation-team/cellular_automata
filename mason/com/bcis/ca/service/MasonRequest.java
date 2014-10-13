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
 * @author Nawaz Gayoom
 */
@WebServlet(name = "MasonRequest", urlPatterns = {"/MasonRequest"})
public class MasonRequest extends HttpServlet {

    public boolean firstRequest = true;
    public boolean seeded = true;
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
                String req = "";

                if (br != null) {
                    req = br.readLine();
                }

//                if (firstRequest) {
//                    firstRequest = false;
//
//                    System.err.println(req);
//                }
                Gson gson = new Gson();
                UniformJSON ujObj = gson.fromJson(req, UniformJSON.class);

                //Need to wokr on that later on!
                //if(ujObj.isRunning = false)
                    //sim.stopSimulation();
                //else
//                    if(seeded == true){
//                        sim.setSeed(ujObj.currentGrid);
//                        seeded = false;
//                    }
//                    
//                    sim.setNeighbourhood(ujObj.neighbourhoodGrid);
//                    sim.setSeed(ujObj.currentGrid);
                    ujObj = sim.stepThrough();




                response.setContentType("application/json");

                GsonBuilder builder = new GsonBuilder();
                gson = builder.create();
                String jsonContent = gson.toJson(ujObj);
                PrintWriter out = response.getWriter();
                out.print(jsonContent);
                out.close();
                //response.getOutputStream().print(jsonContent);
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
