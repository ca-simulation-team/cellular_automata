/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package sim.app.Bellularautomata;

import java.io.File;
import java.io.InputStream;
import java.io.OutputStream;
import javax.ejb.embeddable.EJBContainer;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import static org.junit.Assert.*;
import sim.engine.AsynchronousSteppable;
import sim.engine.MakesSimState;
import sim.engine.SimState;
import sim.engine.UniformJSON;

/**
 *
 * @author Nawaz
 */
public class CellularAutomataTest {
    
    public CellularAutomataTest() {
    }
    
    @BeforeClass
    public static void setUpClass() {
    }
    
    @AfterClass
    public static void tearDownClass() {
    }
    
    @Before
    public void setUp() {
    }
    
    @After
    public void tearDown() {
    }

    /**
     * Test of setSeed method, of class CellularAutomata.
     */
    @Test
    public void testSetSeed() throws Exception {
        System.out.println("setSeed");
        long seed = 0L;
        EJBContainer container = javax.ejb.embeddable.EJBContainer.createEJBContainer();
        CellularAutomata instance = (CellularAutomata)container.getContext().lookup("java:global/classes/CellularAutomata");
        instance.setSeed(seed);
        container.close();
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of finish method, of class CellularAutomata.
     */
    @Test
    public void testFinish() throws Exception {
        System.out.println("finish");
        EJBContainer container = javax.ejb.embeddable.EJBContainer.createEJBContainer();
        CellularAutomata instance = (CellularAutomata)container.getContext().lookup("java:global/classes/CellularAutomata");
        instance.finish();
        container.close();
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of kill method, of class CellularAutomata.
     */
    @Test
    public void testKill() throws Exception {
        System.out.println("kill");
        EJBContainer container = javax.ejb.embeddable.EJBContainer.createEJBContainer();
        CellularAutomata instance = (CellularAutomata)container.getContext().lookup("java:global/classes/CellularAutomata");
        instance.kill();
        container.close();
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of addToAsynchronousRegistry method, of class CellularAutomata.
     */
    @Test
    public void testAddToAsynchronousRegistry() throws Exception {
        System.out.println("addToAsynchronousRegistry");
        AsynchronousSteppable stop = null;
        EJBContainer container = javax.ejb.embeddable.EJBContainer.createEJBContainer();
        CellularAutomata instance = (CellularAutomata)container.getContext().lookup("java:global/classes/CellularAutomata");
        boolean expResult = false;
        boolean result = instance.addToAsynchronousRegistry(stop);
        assertEquals(expResult, result);
        container.close();
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of removeFromAsynchronousRegistry method, of class CellularAutomata.
     */
    @Test
    public void testRemoveFromAsynchronousRegistry() throws Exception {
        System.out.println("removeFromAsynchronousRegistry");
        AsynchronousSteppable stop = null;
        EJBContainer container = javax.ejb.embeddable.EJBContainer.createEJBContainer();
        CellularAutomata instance = (CellularAutomata)container.getContext().lookup("java:global/classes/CellularAutomata");
        instance.removeFromAsynchronousRegistry(stop);
        container.close();
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of asynchronousRegistry method, of class CellularAutomata.
     */
    @Test
    public void testAsynchronousRegistry() throws Exception {
        System.out.println("asynchronousRegistry");
        EJBContainer container = javax.ejb.embeddable.EJBContainer.createEJBContainer();
        CellularAutomata instance = (CellularAutomata)container.getContext().lookup("java:global/classes/CellularAutomata");
        AsynchronousSteppable[] expResult = null;
        AsynchronousSteppable[] result = instance.asynchronousRegistry();
        assertArrayEquals(expResult, result);
        container.close();
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of preCheckpoint method, of class CellularAutomata.
     */
    @Test
    public void testPreCheckpoint() throws Exception {
        System.out.println("preCheckpoint");
        EJBContainer container = javax.ejb.embeddable.EJBContainer.createEJBContainer();
        CellularAutomata instance = (CellularAutomata)container.getContext().lookup("java:global/classes/CellularAutomata");
        instance.preCheckpoint();
        container.close();
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of postCheckpoint method, of class CellularAutomata.
     */
    @Test
    public void testPostCheckpoint() throws Exception {
        System.out.println("postCheckpoint");
        EJBContainer container = javax.ejb.embeddable.EJBContainer.createEJBContainer();
        CellularAutomata instance = (CellularAutomata)container.getContext().lookup("java:global/classes/CellularAutomata");
        instance.postCheckpoint();
        container.close();
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of awakeFromCheckpoint method, of class CellularAutomata.
     */
    @Test
    public void testAwakeFromCheckpoint() throws Exception {
        System.out.println("awakeFromCheckpoint");
        EJBContainer container = javax.ejb.embeddable.EJBContainer.createEJBContainer();
        CellularAutomata instance = (CellularAutomata)container.getContext().lookup("java:global/classes/CellularAutomata");
        instance.awakeFromCheckpoint();
        container.close();
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of writeToCheckpoint method, of class CellularAutomata.
     */
    @Test
    public void testWriteToCheckpoint_OutputStream() throws Exception {
        System.out.println("writeToCheckpoint");
        OutputStream stream = null;
        EJBContainer container = javax.ejb.embeddable.EJBContainer.createEJBContainer();
        CellularAutomata instance = (CellularAutomata)container.getContext().lookup("java:global/classes/CellularAutomata");
        instance.writeToCheckpoint(stream);
        container.close();
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of writeToCheckpoint method, of class CellularAutomata.
     */
    @Test
    public void testWriteToCheckpoint_File() throws Exception {
        System.out.println("writeToCheckpoint");
        File file = null;
        EJBContainer container = javax.ejb.embeddable.EJBContainer.createEJBContainer();
        CellularAutomata instance = (CellularAutomata)container.getContext().lookup("java:global/classes/CellularAutomata");
        SimState expResult = null;
        SimState result = instance.writeToCheckpoint(file);
        assertEquals(expResult, result);
        container.close();
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of readFromCheckpoint method, of class CellularAutomata.
     */
    @Test
    public void testReadFromCheckpoint_File() throws Exception {
        System.out.println("readFromCheckpoint");
        File file = null;
        SimState expResult = null;
        SimState result = CellularAutomata.readFromCheckpoint(file);
        assertEquals(expResult, result);
        //container.close();
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of readFromCheckpoint method, of class CellularAutomata.
     */
    @Test
    public void testReadFromCheckpoint_InputStream() throws Exception {
        System.out.println("readFromCheckpoint");
        InputStream stream = null;
        SimState expResult = null;
        SimState result = CellularAutomata.readFromCheckpoint(stream);
        assertEquals(expResult, result);
        //container.close();
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of seed method, of class CellularAutomata.
     */
    @Test
    public void testSeed() throws Exception {
        System.out.println("seed");
        EJBContainer container = javax.ejb.embeddable.EJBContainer.createEJBContainer();
        CellularAutomata instance = (CellularAutomata)container.getContext().lookup("java:global/classes/CellularAutomata");
        long expResult = 0L;
        long result = instance.seed();
        assertEquals(expResult, result);
        container.close();
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of setJob method, of class CellularAutomata.
     */
    @Test
    public void testSetJob() throws Exception {
        System.out.println("setJob");
        long job = 0L;
        EJBContainer container = javax.ejb.embeddable.EJBContainer.createEJBContainer();
        CellularAutomata instance = (CellularAutomata)container.getContext().lookup("java:global/classes/CellularAutomata");
        instance.setJob(job);
        container.close();
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of job method, of class CellularAutomata.
     */
    @Test
    public void testJob() throws Exception {
        System.out.println("job");
        EJBContainer container = javax.ejb.embeddable.EJBContainer.createEJBContainer();
        CellularAutomata instance = (CellularAutomata)container.getContext().lookup("java:global/classes/CellularAutomata");
        long expResult = 0L;
        long result = instance.job();
        assertEquals(expResult, result);
        container.close();
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of doLoop method, of class CellularAutomata.
     */
    @Test
    public void testDoLoop_Class_StringArr() throws Exception {
        System.out.println("doLoop");
        Class c = null;
        String[] args = null;
        CellularAutomata.doLoop(c, args);
        container.close();
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of doLoop method, of class CellularAutomata.
     */
    @Test
    public void testDoLoop_MakesSimState_StringArr() throws Exception {
        System.out.println("doLoop");
        MakesSimState generator = null;
        String[] args = null;
        CellularAutomata.doLoop(generator, args);
        container.close();
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of nameThread method, of class CellularAutomata.
     */
    @Test
    public void testNameThread() throws Exception {
        System.out.println("nameThread");
        EJBContainer container = javax.ejb.embeddable.EJBContainer.createEJBContainer();
        CellularAutomata instance = (CellularAutomata)container.getContext().lookup("java:global/classes/CellularAutomata");
        instance.nameThread();
        container.close();
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of version method, of class CellularAutomata.
     */
    @Test
    public void testVersion() throws Exception {
        System.out.println("version");
        double expResult = 0.0;
        double result = CellularAutomata.version();
        assertEquals(expResult, result, 0.0);
        container.close();
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of stepMethod method, of class CellularAutomata.
     */
    @Test
    public void testStepMethod() throws Exception {
        System.out.println("stepMethod");
        EJBContainer container = javax.ejb.embeddable.EJBContainer.createEJBContainer();
        CellularAutomata instance = (CellularAutomata)container.getContext().lookup("java:global/classes/CellularAutomata");
        instance.stepMethod();
        container.close();
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of setNeighbourhood method, of class CellularAutomata.
     */
    @Test
    public void testSetNeighbourhood() throws Exception {
        System.out.println("setNeighbourhood");
        int[][] neighbourhood = null;
        EJBContainer container = javax.ejb.embeddable.EJBContainer.createEJBContainer();
        CellularAutomata instance = (CellularAutomata)container.getContext().lookup("java:global/classes/CellularAutomata");
        instance.setNeighbourhood(neighbourhood);
        container.close();
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of addRule method, of class CellularAutomata.
     */
    @Test
    public void testAddRule_6args() throws Exception {
        System.out.println("addRule");
        int i = 0;
        int i0 = 0;
        int i1 = 0;
        int i2 = 0;
        int i3 = 0;
        int i4 = 0;
        EJBContainer container = javax.ejb.embeddable.EJBContainer.createEJBContainer();
        CellularAutomata instance = (CellularAutomata)container.getContext().lookup("java:global/classes/CellularAutomata");
        instance.addRule(i, i0, i1, i2, i3, i4);
        container.close();
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of setSeededGrid method, of class CellularAutomata.
     */
    @Test
    public void testSetSeededGrid() throws Exception {
        System.out.println("setSeededGrid");
        int[][] newSeededGrid = null;
        EJBContainer container = javax.ejb.embeddable.EJBContainer.createEJBContainer();
        CellularAutomata instance = (CellularAutomata)container.getContext().lookup("java:global/classes/CellularAutomata");
        instance.setSeededGrid(newSeededGrid);
        container.close();
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of seedGrid method, of class CellularAutomata.
     */
    @Test
    public void testSeedGrid() throws Exception {
        System.out.println("seedGrid");
        EJBContainer container = javax.ejb.embeddable.EJBContainer.createEJBContainer();
        CellularAutomata instance = (CellularAutomata)container.getContext().lookup("java:global/classes/CellularAutomata");
        instance.seedGrid();
        container.close();
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of start method, of class CellularAutomata.
     */
    @Test
    public void testStart() throws Exception {
        System.out.println("start");
        EJBContainer container = javax.ejb.embeddable.EJBContainer.createEJBContainer();
        CellularAutomata instance = (CellularAutomata)container.getContext().lookup("java:global/classes/CellularAutomata");
        instance.start();
        container.close();
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of getGrid method, of class CellularAutomata.
     */
    @Test
    public void testGetGrid() throws Exception {
        System.out.println("getGrid");
        EJBContainer container = javax.ejb.embeddable.EJBContainer.createEJBContainer();
        CellularAutomata instance = (CellularAutomata)container.getContext().lookup("java:global/classes/CellularAutomata");
        int[][] expResult = null;
        int[][] result = instance.getGrid();
        assertArrayEquals(expResult, result);
        container.close();
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of getCurrentState method, of class CellularAutomata.
     */
    @Test
    public void testGetCurrentState() throws Exception {
        System.out.println("getCurrentState");
        EJBContainer container = javax.ejb.embeddable.EJBContainer.createEJBContainer();
        CellularAutomata instance = (CellularAutomata)container.getContext().lookup("java:global/classes/CellularAutomata");
        UniformJSON expResult = null;
        UniformJSON result = instance.getCurrentState();
        assertEquals(expResult, result);
        container.close();
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of addRule method, of class CellularAutomata.
     */
    @Test
    public void testAddRule_9args() throws Exception {
        System.out.println("addRule");
        int currentState = 0;
        int neighbourState = 0;
        int noOfNeighbours = 0;
        int equalityModifier = 0;
        int nextStep = 0;
        int p = 0;
        boolean isDynamic = false;
        int[][] rulePattern = null;
        int[][] neighborhood = null;
        EJBContainer container = javax.ejb.embeddable.EJBContainer.createEJBContainer();
        CellularAutomata instance = (CellularAutomata)container.getContext().lookup("java:global/classes/CellularAutomata");
        instance.addRule(currentState, neighbourState, noOfNeighbours, equalityModifier, nextStep, p, isDynamic, rulePattern, neighborhood);
        container.close();
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of changeGrid method, of class CellularAutomata.
     */
    @Test
    public void testChangeGrid() throws Exception {
        System.out.println("changeGrid");
        int[][] newGrid = null;
        EJBContainer container = javax.ejb.embeddable.EJBContainer.createEJBContainer();
        CellularAutomata instance = (CellularAutomata)container.getContext().lookup("java:global/classes/CellularAutomata");
        instance.changeGrid(newGrid);
        container.close();
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of resetRules method, of class CellularAutomata.
     */
    @Test
    public void testResetRules() throws Exception {
        System.out.println("resetRules");
        EJBContainer container = javax.ejb.embeddable.EJBContainer.createEJBContainer();
        CellularAutomata instance = (CellularAutomata)container.getContext().lookup("java:global/classes/CellularAutomata");
        instance.resetRules();
        container.close();
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }
    
}
