package com.wipro.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;

import com.wipro.configuration.ConfigReader;
import com.wipro.model.InputFiles;
 
public class FilesService {
    String query = null;
 
    /**
     * find
     */
    public InputFiles find(int id) {
 
        try {
            
                    InputFiles fl = null;
                    System.out.println("Number is "+ id);
                    String dirPath = ConfigReader.getParameter("InputFilesDir");
                    File[] dirfiles = new File(dirPath).listFiles();
                    int count = 1;
                    for (File file : dirfiles) {
                        if (file.isFile() && count == id) {
                        	
                        	 fl = new InputFiles();
                            fl.setFilename(file.getName());                           
                            fl.setFile(Files.readAllBytes(new File(dirPath +"/"+file.getName()).toPath()));
                                
                        }
                        count ++;
                    }
 
          
 
            return fl;
        } catch (Exception ex) {
            ex.printStackTrace();
        }
 
        return null;
    }
 
    /**
     * listAll
     */
    public List<InputFiles> listAll() {
 
        try{       	
            List<InputFiles> files = new ArrayList<InputFiles>();
            String dirPath = ConfigReader.getParameter("InputFilesDir");
            File[] dirfiles = new File(dirPath).listFiles();
            int count = 1;
            for (File file : dirfiles) {
                if (file.isFile()) {
                	
                	InputFiles fl = new InputFiles();
                    fl.setId(count);
                    fl.setFilename(file.getName());
                    fl.setNotes("https://52.25.206.225/HMIPlatformUIBase/service?name="+file.getName().substring(0,file.getName().length()-5));
                    fl.setType("xlsx");
                    files.add(fl); 
                    count++;
                }
            }
    
             return files;
        } catch(Exception e) {
            e.printStackTrace();
        }
 
        return null;
    }
 
    /**
     * save
     * @throws IOException 
     */
    public void save(final InputFiles file) throws IOException {
    	 String dirPath = ConfigReader.getParameter("InputFilesDir");
    	 File tempFile = new File("input.xlsx");
    	 FileInputStream fis = null;
    	 FileOutputStream fos = null;
    	 FileOutputStream fostrm = null;
    	 try {
        	 fostrm = new FileOutputStream(tempFile);
        	fostrm.write(file.getFile());
        	 fis  = new FileInputStream(tempFile);
        	File outFile = new File(dirPath+"/"+file.getFilename());
        	outFile.createNewFile();
        	   fos = new FileOutputStream(outFile);
        	  
        	    byte[] buf = new byte[1024];
        	    int i = 0;
        	    while ((i = fis.read(buf)) != -1) {
        	        fos.write(buf, 0, i);
        	    }
        	  } 
        	  catch (Exception e) {
        	   e.printStackTrace();
        	  }
        	  finally {
        	    if (fis != null) fis.close();
        	    if (fos != null) fos.close();
        	    if (fostrm != null) fostrm.close();
        	   
        	  }
       
    }
 
    /**
     * delete
     */
    public void delete(int id) {
        query = "delete from files where id = ?";
 
        try {
           
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
}
