package com.wipro.controller;

import org.springframework.web.servlet.mvc.AbstractController;

import com.wipro.model.InputFiles;

import org.springframework.web.servlet.ModelAndView;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
 
public class FilesForm extends AbstractController {
    private FilesService filesService;
 
    public void setFilesService(FilesService filesService) {
        this.filesService = filesService;
    }
 
    protected ModelAndView handleRequestInternal(HttpServletRequest request,
        HttpServletResponse response) throws Exception {
        System.out.println("File Testing");
        List<InputFiles> files = this.filesService.listAll();
 
        return new ModelAndView("platformasservice", "files", files);
    }
}