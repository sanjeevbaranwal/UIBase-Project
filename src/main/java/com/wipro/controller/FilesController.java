package com.wipro.controller;

import org.springframework.web.servlet.mvc.multiaction.MultiActionController;

import com.wipro.model.InputFiles;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.bind.ServletRequestUtils;
import org.springframework.util.FileCopyUtils;
 
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
 
 
public class FilesController extends MultiActionController {
    private FilesService filesService;
 
    public void setFilesService(FilesService filesService) {
        this.filesService = filesService;
    }
 
    /**
     * upload
     */
    public ModelAndView upload(HttpServletRequest request,
        HttpServletResponse response) throws Exception {
 
        MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
        MultipartFile multipartFile = multipartRequest.getFile("file");
 
        InputFiles file = new InputFiles();
        file.setFilename(multipartFile.getOriginalFilename());
        file.setNotes(ServletRequestUtils.getStringParameter(request, "notes"));
        file.setType(multipartFile.getContentType());
        file.setFile(multipartFile.getBytes());
 
        this.filesService.save(file);
        
       // return null;
 
        return new ModelAndView("redirect:platformasservice");
    }
 
    /**
     * download
     */
    public ModelAndView download(HttpServletRequest request,
        HttpServletResponse response) throws Exception {
        int id = ServletRequestUtils.getRequiredIntParameter(request, "id");
 
        InputFiles file = this.filesService.find(id);
 
        response.setContentType(file.getType());
        response.setContentLength(file.getFile().length);
        response.setHeader("Content-Disposition","attachment; filename=\"" + file.getFilename() +"\"");
 
        FileCopyUtils.copy(file.getFile(), response.getOutputStream());
 
        return null;
 
    }
 
    /**
     * delete
     */
    public ModelAndView delete(HttpServletRequest request,
        HttpServletResponse response) throws Exception {
        int id = ServletRequestUtils.getRequiredIntParameter(request, "id");
 
        this.filesService.delete(id);
 
        return new ModelAndView("redirect:platformasservice");
    }
}